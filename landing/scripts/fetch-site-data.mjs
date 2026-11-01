// Build-time data fetch for the landing page.
//
// Reads LandingConfig and the published HonourRoll rows from the database and
// writes them to src/data/site-data.json, which the components import. After
// the build the data is part of the shipped files: visitors never touch the DB.
//
// SAFETY
//   - Read-only: one READ ONLY transaction, SELECTs only, nothing is written.
//   - Public data only: HonourRoll.rollNumber is deliberately never selected —
//     it is the student's login ID.
//   - Fail-soft: if the DB can't be reached, the last good site-data.json
//     (committed to git) is kept and the build carries on. Set
//     LANDING_STRICT=1 to fail the build instead.
//
// CONNECTION
//   Set LANDING_DATABASE_URL (preferably a read-only DB role) in the build
//   environment, or in landing/.env.local (git-ignored) for local runs.
//   DATABASE_URL is deliberately NOT used as a fallback, so a build never
//   reaches the full-access production credentials by accident.

import { existsSync, readFileSync, writeFileSync, mkdirSync } from 'node:fs'
import { dirname, resolve } from 'node:path'
import { fileURLToPath } from 'node:url'
import pg from 'pg'

const root = resolve(dirname(fileURLToPath(import.meta.url)), '..')
const OUT_FILE = resolve(root, 'src/data/site-data.json')
const STRICT = process.env.LANDING_STRICT === '1'

try {
  process.loadEnvFile(resolve(root, '.env.local'))
} catch {
  // no .env.local — fine, the variable may come from the environment
}

const CONFIG_FIELDS = [
  'phoneDisplay', 'phoneHref', 'whatsappDisplay', 'whatsappHref', 'email', 'address', 'mapUrl',
  'heroHeadline', 'heroHeadlineHighlight', 'heroParagraph', 'heroTagline', 'heroStripText', 'heroFeatures',
  'aboutHeading', 'aboutDescription', 'aboutFeatures', 'statYears', 'statTeachers', 'statPassRate', 'footerBlurb',
  'admissionsOpen', 'admissionsLabel', 'documentsNeeded', 'programs',
]

const JSON_ARRAY_FIELDS = ['heroFeatures', 'aboutFeatures', 'documentsNeeded', 'programs']

function keepLastGoodOrFail(reason) {
  if (STRICT || !existsSync(OUT_FILE)) {
    console.error(`[site-data] ${reason}`)
    console.error(
      STRICT
        ? '[site-data] LANDING_STRICT=1 — failing the build.'
        : '[site-data] No previous site-data.json to fall back on — failing the build.'
    )
    process.exit(1)
  }
  console.warn(`[site-data] ${reason}`)
  console.warn('[site-data] Keeping the existing src/data/site-data.json.')
  process.exit(0)
}

function normaliseUrl(raw) {
  // pg does not implement channel binding; Neon URLs often carry the flag.
  const url = new URL(raw)
  url.searchParams.delete('channel_binding')
  // pg already treats 'require' as 'verify-full'; say so to silence its warning.
  if (url.searchParams.get('sslmode') === 'require') url.searchParams.set('sslmode', 'verify-full')
  return url.toString()
}

function validateConfig(row) {
  if (!row) return 'LandingConfig has no row (id = 1).'
  for (const field of CONFIG_FIELDS) {
    if (row[field] === null || row[field] === undefined) return `LandingConfig.${field} is empty.`
  }
  for (const field of JSON_ARRAY_FIELDS) {
    if (!Array.isArray(row[field]) || row[field].length === 0) {
      return `LandingConfig.${field} must be a non-empty list.`
    }
  }
  return null
}

const rawUrl = process.env.LANDING_DATABASE_URL
if (!rawUrl) {
  keepLastGoodOrFail('LANDING_DATABASE_URL is not set — skipping the fetch.')
}

const client = new pg.Client({
  connectionString: normaliseUrl(rawUrl),
  connectionTimeoutMillis: 15000,
  statement_timeout: 15000,
})

let config
let honourRows

try {
  await client.connect()
  await client.query('BEGIN READ ONLY')

  const configRes = await client.query(
    `SELECT ${CONFIG_FIELDS.map((f) => `"${f}"`).join(', ')} FROM "LandingConfig" WHERE "id" = 1`
  )
  config = configRes.rows[0]

  // rollNumber is intentionally absent from this SELECT.
  const honourRes = await client.query(
    `SELECT "batchYear", "name", "program", "marks", "totalMarks", "note"
       FROM "HonourRoll"
      WHERE "isPublished" = true
      ORDER BY "batchYear" DESC, "marks" DESC, "name" ASC`
  )
  honourRows = honourRes.rows

  await client.query('COMMIT')
} catch (err) {
  keepLastGoodOrFail(`Could not read from the database: ${err.message}`)
} finally {
  await client.end().catch(() => {})
}

const problem = validateConfig(config)
if (problem) keepLastGoodOrFail(`Refusing to write incomplete data: ${problem}`)

const honourRoll = {}
for (const r of honourRows) {
  ;(honourRoll[r.batchYear] ??= []).push({
    name: r.name,
    program: r.program,
    marks: r.marks,
    totalMarks: r.totalMarks,
    note: r.note,
  })
}

const data = { config, honourRoll }

// Only rewrite when the content changed, so the file doesn't churn in git.
const next = JSON.stringify(data, null, 2) + '\n'
let current = null
try {
  current = readFileSync(OUT_FILE, 'utf8')
} catch {
  // first run
}

if (current === next) {
  console.log('[site-data] Up to date — no changes.')
} else {
  mkdirSync(dirname(OUT_FILE), { recursive: true })
  writeFileSync(OUT_FILE, next)
  const years = Object.keys(honourRoll).length
  console.log(`[site-data] Wrote src/data/site-data.json (config + ${honourRows.length} honour-roll rows across ${years} year${years === 1 ? '' : 's'}).`)
}

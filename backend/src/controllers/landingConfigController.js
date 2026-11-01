const prisma = require('../lib/prisma');
const AppError = require('../utils/AppError');
const catchAsync = require('../utils/catchAsync');

// The landing page config is a single row (id = 1, enforced by a CHECK
// constraint). The public landing site reads it at build time, so a change only
// goes live after a landing deployment — see POST /deployments/landing.

const CONFIG_ID = 1;

// Icons the landing page knows how to render. Keep in sync with
// landing/src/siteData.js and the picker in staff/.../LandingTab.jsx.
const ICONS = [
  'Users', 'BookOpen', 'Star', 'ShieldCheck', 'GraduationCap', 'FlaskConical', 'Wallet',
  'Stethoscope', 'Cog', 'Monitor', 'Cpu', 'Award', 'Heart', 'Clock', 'Library', 'Microscope',
  'Trophy', 'Laptop', 'Calculator', 'Languages', 'Building2', 'Bus', 'Dumbbell', 'Palette',
];

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const TEL_HREF_RE = /^tel:\+?[0-9]{7,15}$/;
const HTTPS_RE = /^https:\/\/[^\s]+$/;

// ── Small validators — each returns an error string, or null when valid ──────

const text = (value, { max, required = true } = {}) => {
  if (typeof value !== 'string') return required ? 'This field is required' : null;
  const v = value.trim();
  if (!v) return required ? 'This field is required' : null;
  if (v.length > max) return `Must be ${max} characters or fewer`;
  return null;
};

const listOf = (value, { min, max, label, check }) => {
  if (!Array.isArray(value)) return `${label} must be a list`;
  if (value.length < min) return `Add at least ${min} ${min === 1 ? 'item' : 'items'}`;
  if (value.length > max) return `No more than ${max} items allowed`;
  for (let i = 0; i < value.length; i += 1) {
    const problem = check(value[i]);
    if (problem) return `Item ${i + 1}: ${problem}`;
  }
  return null;
};

const icon = (v) => (ICONS.includes(v) ? null : 'Choose an icon');

const firstProblem = (checks) => {
  for (const [label, problem] of checks) if (problem) return `${label}: ${problem}`;
  return null;
};

// ── Normalisers — trim strings so stored values are clean ────────────────────

const clean = (v) => (typeof v === 'string' ? v.trim() : v);

const normaliseCards = (items, keys) =>
  items.map((item) => Object.fromEntries(keys.map((k) => [k, clean(item[k])])));

// ── GET /landing-config ──────────────────────────────────────────────────────

const getLandingConfig = catchAsync(async (req, res) => {
  const config = await prisma.landingConfig.findUnique({ where: { id: CONFIG_ID } });
  if (!config) throw new AppError(404, 'Landing configuration has not been set up yet');
  res.json({ config, icons: ICONS });
});

// ── PUT /landing-config ──────────────────────────────────────────────────────

const updateLandingConfig = catchAsync(async (req, res) => {
  const b = req.body || {};
  const errors = {};
  const check = (field, problem) => { if (problem) errors[field] = problem; };

  // Contact
  check('phoneDisplay', text(b.phoneDisplay, { max: 30 }));
  check('phoneHref', TEL_HREF_RE.test(clean(b.phoneHref) || '') ? null : 'Use the format tel:+923001234567');
  check('whatsappDisplay', text(b.whatsappDisplay, { max: 30 }));
  check('whatsappHref', HTTPS_RE.test(clean(b.whatsappHref) || '') ? null : 'Must be a full https:// link, e.g. https://wa.me/923001234567');
  check('email', EMAIL_RE.test(clean(b.email) || '') ? null : 'Enter a valid email address');
  check('address', text(b.address, { max: 160 }));
  check('mapUrl', HTTPS_RE.test(clean(b.mapUrl) || '') ? null : 'Must be a full https:// link');

  // Hero
  check('heroHeadline', text(b.heroHeadline, { max: 120 }));
  check('heroHeadlineHighlight', text(b.heroHeadlineHighlight, { max: 60 }));
  check('heroParagraph', text(b.heroParagraph, { max: 400 }));
  check('heroTagline', text(b.heroTagline, { max: 120 }));
  check('heroStripText', text(b.heroStripText, { max: 120 }));
  check('heroFeatures', listOf(b.heroFeatures, {
    min: 1, max: 8, label: 'Feature cards',
    check: (f) => firstProblem([
      ['Icon', icon(f?.icon)],
      ['Title', text(f?.title, { max: 60 })],
      ['Subtitle', text(f?.subtitle, { max: 80 })],
    ]),
  }));

  // About
  check('aboutHeading', text(b.aboutHeading, { max: 140 }));
  check('aboutDescription', text(b.aboutDescription, { max: 500 }));
  check('aboutFeatures', listOf(b.aboutFeatures, {
    min: 1, max: 8, label: 'Feature blocks',
    check: (f) => firstProblem([
      ['Icon', icon(f?.icon)],
      ['Title', text(f?.title, { max: 60 })],
      ['Description', text(f?.body, { max: 240 })],
    ]),
  }));
  check('statYears', text(b.statYears, { max: 20 }));
  check('statTeachers', text(b.statTeachers, { max: 20 }));
  check('statPassRate', text(b.statPassRate, { max: 20 }));
  check('footerBlurb', text(b.footerBlurb, { max: 300 }));

  // Admissions & programs
  if (typeof b.admissionsOpen !== 'boolean') errors.admissionsOpen = 'Choose open or closed';
  check('admissionsLabel', text(b.admissionsLabel, { max: 60 }));
  check('documentsNeeded', listOf(b.documentsNeeded, {
    min: 1, max: 20, label: 'Documents',
    check: (d) => text(d, { max: 120 }),
  }));
  check('programs', listOf(b.programs, {
    min: 1, max: 10, label: 'Programs',
    check: (p) => firstProblem([
      ['Name', text(p?.code, { max: 30 })],
      ['Badge', text(p?.badge, { max: 40 })],
      ['Icon', icon(p?.icon)],
      ['Subjects', text(p?.subjects, { max: 160 })],
      ['Leads to', text(p?.leads, { max: 160 })],
    ]),
  }));
  if (!errors.programs) {
    const names = b.programs.map((p) => clean(p.code).toLowerCase());
    if (new Set(names).size !== names.length) errors.programs = 'Each program needs a different name';
  }

  if (Object.keys(errors).length > 0) throw new AppError(400, errors);

  const data = {
    phoneDisplay: clean(b.phoneDisplay),
    phoneHref: clean(b.phoneHref),
    whatsappDisplay: clean(b.whatsappDisplay),
    whatsappHref: clean(b.whatsappHref),
    email: clean(b.email),
    address: clean(b.address),
    mapUrl: clean(b.mapUrl),
    heroHeadline: clean(b.heroHeadline),
    heroHeadlineHighlight: clean(b.heroHeadlineHighlight),
    heroParagraph: clean(b.heroParagraph),
    heroTagline: clean(b.heroTagline),
    heroStripText: clean(b.heroStripText),
    heroFeatures: normaliseCards(b.heroFeatures, ['icon', 'title', 'subtitle']),
    aboutHeading: clean(b.aboutHeading),
    aboutDescription: clean(b.aboutDescription),
    aboutFeatures: normaliseCards(b.aboutFeatures, ['icon', 'title', 'body']),
    statYears: clean(b.statYears),
    statTeachers: clean(b.statTeachers),
    statPassRate: clean(b.statPassRate),
    footerBlurb: clean(b.footerBlurb),
    admissionsOpen: b.admissionsOpen,
    admissionsLabel: clean(b.admissionsLabel),
    documentsNeeded: b.documentsNeeded.map(clean),
    programs: normaliseCards(b.programs, ['code', 'badge', 'icon', 'subjects', 'leads']),
  };

  // Guard against two admins overwriting each other: the client sends the
  // updatedAt it loaded, and we only write if nobody has saved since.
  const existing = await prisma.landingConfig.findUnique({ where: { id: CONFIG_ID }, select: { updatedAt: true } });
  if (existing && b.updatedAt && new Date(b.updatedAt).getTime() !== existing.updatedAt.getTime()) {
    throw new AppError(409, {
      message: 'These settings were changed by someone else since you opened them. Reload the page to see the latest version.',
    });
  }

  const config = await prisma.landingConfig.upsert({
    where: { id: CONFIG_ID },
    update: data,
    create: { id: CONFIG_ID, ...data },
  });

  console.log(`[Landing] config saved by user ${req.user.id}`);
  res.json({ message: 'Landing settings saved', config });
});

module.exports = { getLandingConfig, updateLandingConfig };

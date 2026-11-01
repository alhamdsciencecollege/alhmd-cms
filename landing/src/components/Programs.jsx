import { ArrowRight } from 'lucide-react'
import SectionLabel from './SectionLabel'
import { config, SiteIcon, numberWord } from '../siteData'

const ICON_BGS = ['bg-secondary text-primary', 'bg-input text-primary', 'bg-ink text-primary-foreground']

const PROGRAMS = config.programs.map((p, i) => ({ ...p, iconBg: ICON_BGS[i % ICON_BGS.length] }))

function ProgramCard({ p }) {
  return (
    <div className="bg-card border border-border rounded-lg p-6 flex flex-col gap-4">
      <div className="flex items-start justify-between gap-3">
        <div className={`w-12 h-12 rounded-md flex items-center justify-center shrink-0 ${p.iconBg}`}>
          <SiteIcon name={p.icon} className="h-6 w-6" />
        </div>
        <span className="font-body text-xs font-semibold bg-sand border border-border text-foreground px-3 py-1.5 rounded-full whitespace-nowrap">
          {p.badge}
        </span>
      </div>
      <div>
        <div className="font-headings font-bold text-xl text-foreground">{p.code}</div>
        <p className="font-body text-sm text-muted-foreground leading-relaxed mt-2">
          {p.subjects}. For {p.leads}.
        </p>
      </div>
      <div className="flex items-center justify-between border-t border-border pt-4 mt-1">
        <span className="font-body text-sm font-medium text-primary">2 years • Board exam</span>
        <a href="#admissions" className="font-body text-sm font-semibold text-foreground flex items-center gap-1.5 hover:text-primary transition-colors">
          Apply
          <ArrowRight className="h-4 w-4" />
        </a>
      </div>
    </div>
  )
}

export default function Programs() {
  const [first3, rest] = [PROGRAMS.slice(0, 3), PROGRAMS.slice(3)]
  return (
    <section id="programs" className="px-4 py-16 sm:px-8 sm:py-20 lg:px-16 lg:py-24 flex flex-col gap-10">
      <div className="flex flex-col gap-3 max-w-[640px]">
        <SectionLabel>Programs of study</SectionLabel>
        <h2 className="font-headings font-bold text-3xl sm:text-4xl text-foreground">
          {numberWord(PROGRAMS.length)} {PROGRAMS.length === 1 ? 'path' : 'paths'}. One goal — your Board success.
        </h2>
        <p className="font-body text-lg text-muted-foreground">
          Each program is a 2-year intermediate course, examined by the board. Pick the one that
          fits where you want to study next.
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
        {first3.map((p) => <ProgramCard key={p.code} p={p} />)}
      </div>
      {rest.length > 0 && (
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
          {rest.map((p) => <ProgramCard key={p.code} p={p} />)}
        </div>
      )}
    </section>
  )
}

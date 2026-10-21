import { ArrowRight, BookOpen, GraduationCap, Phone, ShieldCheck, Star, Trophy, Users } from 'lucide-react'
import { PHONE_DISPLAY, PHONE_HREF } from '../siteInfo'

const FEATURES = [
  { icon: Users, title: 'Experienced Faculty', subtitle: 'Dedicated & caring teachers' },
  { icon: BookOpen, title: 'Modern Learning Environment', subtitle: 'Safe, supportive, inspiring' },
  { icon: Star, title: 'Proven Track Record', subtitle: 'Consistent academic success' },
  { icon: ShieldCheck, title: 'Discipline & Moral Values', subtitle: 'Building better citizens' },
]

export default function Hero() {
  return (
    <section id="top" className="relative isolate overflow-hidden bg-ink">
      <img
        src="/images/campus-hero.webp"
        alt="Al-Hamd Science College campus building"
        fetchPriority="high"
        className="absolute inset-0 -z-20 h-full w-full object-cover"
      />
      <div
        aria-hidden="true"
        className="absolute inset-0 -z-10"
        style={{
          background:
            'linear-gradient(to right, color-mix(in srgb, var(--color-ink) 93%, transparent), color-mix(in srgb, var(--color-ink) 72%, transparent) 45%, color-mix(in srgb, var(--color-ink) 15%, transparent) 80%), ' +
            'linear-gradient(to top, color-mix(in srgb, var(--color-ink) 75%, transparent), transparent 45%)',
        }}
      />

      <div className="relative px-4 pt-8 pb-10 sm:px-8 sm:pt-12 sm:pb-14 lg:px-16 lg:pt-16 lg:pb-20">
        <div className="max-w-2xl flex flex-col gap-5">
          <div className="flex items-center gap-3">
            <div className="h-[3px] w-10 rounded-full bg-accent shrink-0" />
            <span className="font-body text-xs font-semibold uppercase tracking-wide text-white/90">
              Quality education • Strong values • Bright futures
            </span>
          </div>

          <h1 className="font-headings font-bold text-4xl sm:text-5xl leading-[1.08] text-white">
            A college seat is open to <span className="text-primary-light">every student.</span>
          </h1>

          <p className="font-body text-base sm:text-lg text-white/85 leading-relaxed max-w-lg">
            Al-Hamd Science College is a girls' intermediate college in Bahawalpur. We nurture
            curious minds, build strong character and provide quality education — because every
            student deserves a chance to achieve their dreams.
          </p>

          <div className="flex flex-col sm:flex-row gap-3">
            <a
              href="#admissions"
              className="bg-primary text-primary-foreground font-body font-semibold text-base px-7 py-3.5 rounded-md flex items-center justify-center gap-2 hover:bg-primary/90 transition-colors"
            >
              <GraduationCap className="h-[18px] w-[18px]" />
              Apply for admission
              <ArrowRight className="h-[18px] w-[18px]" />
            </a>
            <a
              href={PHONE_HREF}
              className="border-2 border-white/80 font-body font-semibold text-base px-7 py-3.5 rounded-md text-white flex items-center justify-center gap-2 hover:bg-white hover:text-ink transition-colors"
            >
              <Phone className="h-[18px] w-[18px]" />
              Call us
            </a>
          </div>

          {/* PLACEHOLDER — confirm this year's real topper/marks before launch */}
          <div className="w-fit bg-ink/90 border border-accent/40 rounded-lg px-4 py-3 flex items-center gap-3 shadow-lg lg:hidden">
            <div className="w-10 h-10 rounded-md bg-accent text-accent-foreground flex items-center justify-center shrink-0">
              <Trophy className="h-5 w-5" />
            </div>
            <div>
              <div className="font-headings font-bold text-lg text-accent leading-none">1062 / 1100</div>
              <div className="font-body text-xs text-white/70 mt-1">Highest marks 2025 • Pre-Medical</div>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-x-6 gap-y-5 lg:gap-x-10 mt-9 lg:mt-14 max-w-3xl">
          {FEATURES.map((f) => {
            const Icon = f.icon
            return (
              <div key={f.title} className="flex items-start gap-3">
                <Icon className="h-6 w-6 shrink-0 text-primary-light" strokeWidth={1.75} />
                <div>
                  <div className="font-body text-sm font-semibold text-white leading-tight">{f.title}</div>
                  <div className="font-body text-xs text-white/60 mt-0.5">{f.subtitle}</div>
                </div>
              </div>
            )
          })}
        </div>

        {/* PLACEHOLDER — confirm this year's real topper/marks before launch */}
        <div className="hidden lg:flex absolute bottom-10 right-16 bg-ink/90 border border-accent/40 rounded-lg px-4 py-3 items-center gap-3 shadow-lg">
          <div className="w-10 h-10 rounded-md bg-accent text-accent-foreground flex items-center justify-center shrink-0">
            <Trophy className="h-5 w-5" />
          </div>
          <div>
            <div className="font-headings font-bold text-lg text-accent leading-none">1062 / 1100</div>
            <div className="font-body text-xs text-white/70 mt-1">Highest marks 2025 • Pre-Medical</div>
          </div>
        </div>
      </div>

      <div className="relative bg-primary px-4 py-4 sm:px-8 lg:px-16 flex flex-col sm:flex-row items-center justify-between gap-2 text-center sm:text-left">
        <span className="font-body text-sm font-semibold text-primary-foreground">
          Visit any day 8am–4pm • A girls' college in Bahawalpur
        </span>
        <a href={PHONE_HREF} className="font-body text-sm font-semibold text-primary-foreground flex items-center gap-2 hover:underline">
          <Phone className="h-[15px] w-[15px]" />
          {PHONE_DISPLAY}
        </a>
      </div>
    </section>
  )
}

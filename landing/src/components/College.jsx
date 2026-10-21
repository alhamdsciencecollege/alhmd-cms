import { FlaskConical, GraduationCap, ShieldCheck, Wallet } from 'lucide-react'
import SectionLabel from './SectionLabel'

const FEATURES = [
  {
    icon: FlaskConical,
    title: 'Dedicated science labs',
    body: 'Physics, chemistry, biology and computer labs, with weekly practicals for every student.',
  },
  {
    icon: GraduationCap,
    title: 'Experienced teachers',
    body: 'Senior teachers who mark your own work and guide you through Board preparation.',
  },
  {
    icon: ShieldCheck,
    title: 'Safe & disciplined campus',
    body: 'A calm, orderly campus with regular attendance checks and parent contact.',
  },
  {
    icon: Wallet,
    title: 'Affordable fees',
    body: 'Fee plans designed to be affordable for local families, with discounts for siblings.',
  },
]

export default function College() {
  return (
    <div id="college" className="mx-4 sm:mx-10 rounded-xl bg-ink text-primary-foreground px-5 py-10 sm:px-10 sm:py-14 lg:px-14 lg:py-16 flex flex-col lg:flex-row gap-10 lg:gap-14 lg:items-center scroll-mt-16">
      <div className="w-full lg:w-[420px] xl:w-[480px] shrink-0 flex flex-col gap-5">
        <img
          src="/images/microscope.jpg"
          alt="A student examining a slide under a microscope"
          loading="lazy"
          className="w-full aspect-[4/3] object-cover rounded-lg"
        />
        {/* PLACEHOLDER STATS — confirm real figures with the college before launch */}
        <div className="bg-primary-foreground/10 rounded-lg px-4 py-4 sm:px-5 flex items-center justify-between gap-2">
          <div>
            <div className="font-headings font-bold text-xl sm:text-2xl">22 years</div>
            <div className="font-body text-xs sm:text-sm opacity-70">serving Bahawalpur</div>
          </div>
          <div className="w-px h-12 bg-primary-foreground/20 shrink-0" />
          <div>
            <div className="font-headings font-bold text-xl sm:text-2xl">40+</div>
            <div className="font-body text-xs sm:text-sm opacity-70">teachers</div>
          </div>
          <div className="w-px h-12 bg-primary-foreground/20 shrink-0" />
          <div>
            <div className="font-headings font-bold text-xl sm:text-2xl">92%</div>
            <div className="font-body text-xs sm:text-sm opacity-70">pass rate</div>
          </div>
        </div>
      </div>

      <div className="flex-1 flex flex-col gap-6 lg:gap-7">
        <SectionLabel tone="accent">About the college</SectionLabel>
        <h2 className="font-headings font-bold text-3xl sm:text-4xl leading-tight">
          A disciplined campus where teachers know every student by name.
        </h2>
        <p className="font-body text-base opacity-80 leading-relaxed">
          We are a girls' intermediate college in Bahawalpur — one building, not a sprawl of
          campuses. Small classes, weekly tests, and extra help before Board exams.
        </p>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-6">
          {FEATURES.map((f) => {
            const Icon = f.icon
            return (
              <div key={f.title} className="flex gap-4">
                <div className="w-11 h-11 shrink-0 rounded-md bg-card border border-border flex items-center justify-center text-primary">
                  <Icon className="h-[22px] w-[22px]" />
                </div>
                <div>
                  <div className="font-body font-semibold text-base text-card-foreground">{f.title}</div>
                  <p className="font-body text-sm opacity-70 leading-relaxed mt-1">{f.body}</p>
                </div>
              </div>
            )
          })}
        </div>
        <a
          href="#honour-roll"
          className="flex items-center gap-3 bg-accent rounded-lg px-5 py-4 hover:bg-accent/90 transition-colors"
        >
          <GraduationCap className="h-[22px] w-[22px] text-accent-foreground shrink-0" />
          <span className="font-body text-sm font-semibold text-accent-foreground">
            See this year's top Board results in our Honour Roll
          </span>
        </a>
      </div>
    </div>
  )
}

import { useEffect, useRef, useState } from 'react'
import { ArrowUpRight, Award, CalendarCheck, Clock, FileText, GraduationCap, Home, Receipt } from 'lucide-react'
import SectionLabel from './SectionLabel'
import { PHONE_DISPLAY, PHONE_HREF, STUDENT_PORTAL_URL } from '../siteInfo'

// What the portal actually offers — each line matches a page in the student app.
const FEATURES = [
  { icon: CalendarCheck, title: 'Attendance', body: 'Present, leave and absent days, with the percentage for each month.' },
  { icon: Clock, title: 'Timetable', body: "Today's lectures and the full weekly timetable for your class." },
  { icon: Receipt, title: 'Fee challans', body: 'Download your challan, see past payments and the bank details to pay into.' },
  { icon: Award, title: 'Marks', body: 'Exam marks, subject by subject.' },
  { icon: FileText, title: 'Monthly reports', body: 'A progress report for each month that you can print.' },
]

// ── The drawn mockup ─────────────────────────────────────────────────────────
// A phone showing the portal's dashboard, built from HTML/CSS/SVG. The figures
// are illustrative, which the "Sample screen" stamp says out loud.

const RING_RADIUS = 30
const RING_LENGTH = 2 * Math.PI * RING_RADIUS
const SAMPLE_PRESENT = 22
const SAMPLE_LEAVE = 1
const SAMPLE_ABSENT = 1
const SAMPLE_PCT = Math.round((SAMPLE_PRESENT / (SAMPLE_PRESENT + SAMPLE_LEAVE + SAMPLE_ABSENT)) * 100)

const LECTURES = [
  { time: '08:30', subject: 'English', room: 'Room 01' },
  { time: '09:30', subject: 'Mathematics', room: 'Room 01' },
  { time: '11:20', subject: 'Physics', room: 'Room 02' },
]

const TABS = [
  { icon: Home, label: 'Home', active: true },
  { icon: Clock, label: 'Timetable' },
  { icon: Receipt, label: 'Fees' },
  { icon: Award, label: 'Marks' },
  { icon: FileText, label: 'Reports' },
]

// Draws the attendance ring once, when the phone first scrolls into view.
function useInView() {
  const ref = useRef(null)
  // Reduced-motion visitors (and old browsers) get the finished ring straight away.
  const [seen, setSeen] = useState(
    () => window.matchMedia('(prefers-reduced-motion: reduce)').matches || !('IntersectionObserver' in window)
  )

  useEffect(() => {
    if (seen) return undefined
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setSeen(true)
          observer.disconnect()
        }
      },
      { threshold: 0.4 }
    )
    if (ref.current) observer.observe(ref.current)
    return () => observer.disconnect()
  }, [seen])

  return [ref, seen]
}

function PortalMockup() {
  const [ref, seen] = useInView()

  return (
    <div
      ref={ref}
      role="img"
      aria-label="Sample student portal screen showing this month's attendance, today's lectures and the fee challan."
      className="relative mx-auto w-[272px] sm:w-[296px] lg:rotate-[1.5deg]"
    >
      <div
        aria-hidden="true"
        className="font-headings absolute -right-3 -top-3 z-10 rotate-6 border-2 border-accent bg-sand px-2.5 py-0.5 text-xs font-bold text-accent sm:-right-5 sm:text-sm"
      >
        Sample screen
      </div>

      {/* Phone body */}
      <div aria-hidden="true" className="rounded-[2.4rem] border-2 border-ink bg-ink p-2 shadow-[7px_7px_0_var(--color-primary)]">
        <div className="mx-auto mb-1.5 h-1.5 w-14 rounded-full bg-white/20" />

        {/* Screen */}
        <div className="overflow-hidden rounded-[1.8rem] bg-background">
          <div className="space-y-3 px-3.5 pb-3 pt-4">
            {/* Greeting */}
            <div className="flex items-center gap-2.5">
              <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-primary text-primary-foreground">
                <GraduationCap className="h-[18px] w-[18px]" />
              </div>
              <div className="min-w-0">
                <div className="font-headings text-sm font-bold leading-tight text-foreground">Ayesha Khalid</div>
                <div className="text-[11px] leading-tight text-muted-foreground">I.C.S &bull; ICS26-014</div>
              </div>
            </div>

            {/* Attendance */}
            <div className="flex items-center gap-3 rounded-xl border border-border bg-card p-3">
              <div className="relative h-[76px] w-[76px] shrink-0">
                <svg viewBox="0 0 76 76" className="h-full w-full -rotate-90">
                  <circle cx="38" cy="38" r={RING_RADIUS} fill="none" strokeWidth="8" stroke="var(--color-border)" />
                  <circle
                    cx="38"
                    cy="38"
                    r={RING_RADIUS}
                    fill="none"
                    strokeWidth="8"
                    strokeLinecap="round"
                    stroke="var(--color-primary)"
                    strokeDasharray={RING_LENGTH}
                    strokeDashoffset={seen ? RING_LENGTH * (1 - SAMPLE_PCT / 100) : RING_LENGTH}
                    style={{ transition: 'stroke-dashoffset 1.2s cubic-bezier(0.22, 1, 0.36, 1)' }}
                    className="motion-reduce:!transition-none"
                  />
                </svg>
                <div className="absolute inset-0 flex items-center justify-center font-headings text-lg font-bold text-foreground">
                  {SAMPLE_PCT}%
                </div>
              </div>
              <div className="min-w-0 flex-1">
                <div className="text-xs font-semibold text-foreground">Attendance this month</div>
                <ul className="mt-1.5 space-y-0.5 text-[11px] text-muted-foreground">
                  <li className="flex items-center gap-1.5"><span className="h-1.5 w-1.5 rounded-full bg-emerald-500" />Present <b className="ml-auto text-foreground">{SAMPLE_PRESENT}</b></li>
                  <li className="flex items-center gap-1.5"><span className="h-1.5 w-1.5 rounded-full bg-amber-500" />Leave <b className="ml-auto text-foreground">{SAMPLE_LEAVE}</b></li>
                  <li className="flex items-center gap-1.5"><span className="h-1.5 w-1.5 rounded-full bg-rose-500" />Absent <b className="ml-auto text-foreground">{SAMPLE_ABSENT}</b></li>
                </ul>
              </div>
            </div>

            {/* Today's lectures */}
            <div className="rounded-xl border border-border bg-card">
              <div className="px-3 pb-1.5 pt-2.5 text-xs font-semibold text-foreground">Today&apos;s lectures</div>
              <ul>
                {LECTURES.map((l) => (
                  <li key={l.time} className="flex items-center gap-2.5 border-t border-border px-3 py-2">
                    <span className="font-headings w-10 shrink-0 text-[11px] font-bold text-primary">{l.time}</span>
                    <span className="min-w-0 flex-1 truncate text-xs font-medium text-foreground">{l.subject}</span>
                    <span className="shrink-0 text-[10px] text-muted-foreground">{l.room}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Fee challan */}
            <div className="flex items-center gap-2.5 rounded-xl border border-border bg-card px-3 py-2.5">
              <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-md bg-secondary text-primary">
                <Receipt className="h-4 w-4" />
              </div>
              <div className="min-w-0 flex-1">
                <div className="truncate text-xs font-semibold text-foreground">Fee challan</div>
                <div className="text-[10px] text-muted-foreground">Download or print</div>
              </div>
              <span className="shrink-0 rounded-full border border-accent px-2 py-0.5 text-[10px] font-semibold text-accent">PDF</span>
            </div>
          </div>

          {/* Tab bar — the same five places as the real portal */}
          <div className="grid grid-cols-5 border-t border-border bg-card px-1 pb-2 pt-1.5">
            {TABS.map(({ icon: Icon, label, active }) => (
              <div key={label} className={`flex flex-col items-center gap-0.5 ${active ? 'text-primary' : 'text-muted-foreground'}`}>
                <Icon className="h-4 w-4" strokeWidth={active ? 2.4 : 1.8} />
                <span className="text-[9px] font-medium">{label}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

// ── The section ──────────────────────────────────────────────────────────────

export default function StudentPortal() {
  return (
    <section id="student-portal" className="border-y border-border bg-sand">
      <div className="mx-auto grid max-w-6xl gap-10 px-4 py-16 sm:px-8 sm:py-24 lg:grid-cols-[1.1fr_0.9fr] lg:gap-x-16 lg:gap-y-8">
        <div className="flex flex-col gap-6 lg:col-start-1 lg:row-start-1">
          <SectionLabel>Student portal</SectionLabel>
          <h2 className="font-headings text-3xl font-bold leading-tight text-foreground sm:text-4xl">
            See attendance, fees and results from your phone.
          </h2>
          <p className="font-body max-w-xl text-base leading-relaxed text-muted-foreground sm:text-lg">
            Every enrolled student has a login to the college portal. It shows the same records the office keeps,
            so a quick question doesn&apos;t need a trip to the college.
          </p>
        </div>

        <div className="lg:col-start-2 lg:row-span-2 lg:row-start-1 lg:self-center">
          <PortalMockup />
        </div>

        <div className="flex flex-col gap-6 lg:col-start-1 lg:row-start-2">
          <ul className="border-y border-border">
            {FEATURES.map((f) => {
              const Icon = f.icon
              return (
                <li key={f.title} className="flex items-start gap-4 border-b border-border py-4 last:border-b-0">
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-md border border-border bg-card text-primary">
                    <Icon className="h-5 w-5" />
                  </div>
                  <div>
                    <div className="font-body text-base font-semibold text-foreground">{f.title}</div>
                    <p className="font-body mt-0.5 text-sm leading-relaxed text-muted-foreground">{f.body}</p>
                  </div>
                </li>
              )
            })}
          </ul>

          <div>
            <h3 className="font-headings text-lg font-bold text-foreground">How to sign in</h3>
            <ol className="mt-3 space-y-2.5">
              {[
                'Open the student portal.',
                'Enter your roll number and password.',
                <>No password yet? Ask the office, or call <a href={PHONE_HREF} className="font-semibold text-primary underline-offset-2 hover:underline">{PHONE_DISPLAY}</a>.</>,
              ].map((step, i) => (
                <li key={i} className="grid grid-cols-[1.5rem_1fr] items-baseline gap-2 font-body text-sm text-foreground sm:text-base">
                  <span className="font-headings text-lg font-bold text-accent">{i + 1}</span>
                  <span>{step}</span>
                </li>
              ))}
            </ol>
          </div>

          <a
            href={STUDENT_PORTAL_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="font-body flex w-full items-center justify-center gap-2 rounded-md bg-primary px-8 py-4 text-base font-semibold text-primary-foreground transition-colors hover:bg-primary/90 sm:w-fit"
          >
            Open student portal
            <ArrowUpRight className="h-[18px] w-[18px]" />
          </a>
        </div>
      </div>
    </section>
  )
}

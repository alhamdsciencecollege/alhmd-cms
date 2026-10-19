const PROGRAMS = [
  { code: 'F.Sc Pre-Medical', subjects: 'Biology, Chemistry, Physics, English', leads: 'MBBS, BDS and allied health degrees' },
  { code: 'F.Sc Pre-Engineering', subjects: 'Mathematics, Physics, Chemistry, English', leads: 'Engineering and architecture' },
  { code: 'I.C.S', subjects: 'Computer Science, Mathematics, Physics, English', leads: 'Software and computing degrees' },
  { code: 'I.T', subjects: 'Computer Science, Statistics, Economics, English', leads: 'IT, business and data degrees' },
  { code: 'F.A', subjects: 'Education, Economics, English Literature', leads: 'Teaching, humanities, civil service' },
]

export default function Programs() {
  return (
    <section id="programs" className="border-y-2 border-ink-deep bg-board">
      <div className="mx-auto max-w-6xl px-4 py-16 sm:px-8 sm:py-24">
        <div className="grid gap-4 lg:grid-cols-[0.8fr_1.2fr] lg:gap-16">
          <div>
            <h2 className="font-display text-4xl font-extrabold text-ink-deep sm:text-5xl">Pick your group</h2>
            <p className="mt-4 max-w-sm text-lg leading-relaxed text-soft">
              Each one is a two-year course, examined by the board. Choose by where you want to study next.
            </p>
          </div>

          <ul className="border-t-2 border-ink-deep">
            {PROGRAMS.map((p) => (
              <li key={p.code} className="group border-b border-ink/25 py-5 transition-colors hover:bg-marker/40">
                <h3 className="font-display text-2xl font-bold text-ink-deep">{p.code}</h3>
                <p className="mt-1 text-[15px] text-text">{p.subjects}</p>
                <p className="mt-1 text-sm text-soft">
                  <span className="font-hand text-xl text-pen">leads to</span> {p.leads}
                </p>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  )
}

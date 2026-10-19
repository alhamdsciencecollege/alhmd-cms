const STEPS = [
  { title: 'Apply online', body: 'Enter your matric result and choose Pre-Medical, Pre-Engineering, I.C.S, I.T or F.A.' },
  { title: 'Get your seat confirmed', body: 'There is no entry test and no merit list. Everyone who meets the matric requirement is admitted.' },
  { title: 'Pay the admission fee', body: 'Pay at the college office, or with the bank challan sent with your confirmation.' },
  { title: 'Collect your timetable', body: 'Classes start the following week. Books and the practical schedule are given on day one.' },
]

function Tick() {
  return (
    <svg viewBox="0 0 28 28" className="h-7 w-7 text-pen" fill="none" stroke="currentColor" strokeWidth="3.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M4 15 l7 8 L25 4" />
    </svg>
  )
}

export default function Admissions() {
  return (
    <section id="admissions" className="mx-auto max-w-6xl px-4 py-16 sm:px-8 sm:py-24">
      <div className="grid gap-12 lg:grid-cols-[0.8fr_1.2fr] lg:gap-16">
        <div>
          <h2 className="font-display text-4xl font-extrabold text-ink-deep sm:text-5xl">How to join</h2>
          <p className="mt-4 max-w-sm text-lg leading-relaxed text-soft">
            Passed your matric? Then a seat is waiting. Four things to do.
          </p>
          <img
            src="/images/grad-cap.jpg"
            alt="A graduation cap and green tassel on a wooden rail"
            loading="lazy"
            className="mt-9 hidden aspect-[4/5] w-64 rotate-2 border-2 border-ink-deep object-cover shadow-[6px_6px_0_var(--color-ink-deep)] lg:block"
          />
        </div>

        <ol className="border-t-2 border-ink-deep">
          {STEPS.map((s) => (
            <li key={s.title} className="grid grid-cols-[2.5rem_1fr] gap-4 border-b border-ink/25 py-6">
              <span className="mt-0.5 grid h-8 w-8 place-items-center border-2 border-ink-deep bg-paper">
                <Tick />
              </span>
              <div>
                <h3 className="font-display text-2xl font-bold text-ink-deep">{s.title}</h3>
                <p className="mt-1 max-w-lg text-[16px] leading-relaxed text-soft">{s.body}</p>
              </div>
            </li>
          ))}
          <li className="pt-8">
            <a href="#contact" className="btn w-full bg-ink text-white sm:w-auto">
              Ask the admissions office
            </a>
          </li>
        </ol>
      </div>
    </section>
  )
}

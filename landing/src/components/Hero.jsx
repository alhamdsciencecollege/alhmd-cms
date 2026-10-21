const FACTS = [
  { k: 'Entry test', v: 'None' },
  { k: 'Merit list', v: 'None' },
  { k: 'You need', v: 'Your matric result' },
]

export default function Hero() {
  return (
    <section id="top" className="relative isolate overflow-hidden bg-ink-deep">
      {/* Photo of a college building, darkened on the text side for contrast */}
      <img
        src="/images/college-hero.jpg"
        alt=""
        fetchPriority="high"
        className="absolute inset-0 -z-20 h-full w-full object-cover object-[60%_50%]"
      />
      <div
        aria-hidden="true"
        className="absolute inset-0 -z-10 bg-[linear-gradient(to_right,rgb(17_25_107/0.92),rgb(17_25_107/0.78)_45%,rgb(17_25_107/0.35)),linear-gradient(to_top,rgb(17_25_107/0.7),transparent_40%)]"
      />
      <div className="relative mx-auto max-w-6xl px-4 pb-20 pt-12 sm:px-8 lg:pb-28 lg:pt-20">
        <h1
          className="font-display text-[clamp(2.5rem,9vw,6rem)] font-extrabold leading-[1] text-white"
          style={{ fontVariationSettings: "'wdth' 106" }}
        >
          Two years.
          <br />
          Make them count.
        </h1>

        <svg
          viewBox="0 0 320 18"
          className="pen-draw mt-2 h-4 w-64 text-marker sm:w-96"
          fill="none"
          stroke="currentColor"
          strokeWidth="3.5"
          strokeLinecap="round"
          aria-hidden="true"
        >
          <path pathLength="1" d="M4 11 C 60 3, 120 15, 190 7 S 290 12, 316 6" />
        </svg>

        <div className="mt-8 grid gap-12 lg:grid-cols-[1.2fr_0.8fr] lg:items-start lg:gap-16">
          <div>
            <p className="max-w-[34rem] text-lg leading-relaxed text-white/90">
              Al-Hamd Science College teaches Pre-Medical, Pre-Engineering,
              I.C.S, I.T and F.A in one building, with real labs, teachers who
              mark your work, and a seat for every student who applies.
            </p>

            <div className="mt-9 flex flex-col gap-4 sm:flex-row">
              <a href="#admissions" className="btn border-white bg-marker text-ink-deep shadow-[4px_4px_0_var(--color-white)] hover:shadow-[2px_2px_0_var(--color-white)]">
                Apply for admission
              </a>
              <a href="#honour-roll" className="btn border-white bg-transparent text-white shadow-[4px_4px_0_var(--color-marker)] hover:shadow-[2px_2px_0_var(--color-marker)]">
                See who topped each batch
              </a>
            </div>
          </div>

        {/* A pinned notice, the way admissions really get announced */}
        <aside className="relative mx-auto w-full max-w-sm rotate-[1.2deg] border-2 border-ink-deep bg-board p-6 shadow-[6px_6px_0_var(--color-ink-deep)] lg:max-w-sm lg:justify-self-end">
          <span aria-hidden="true" className="absolute -top-3 left-1/2 h-6 w-20 -translate-x-1/2 -rotate-2 bg-marker/90" />
          <p className="font-display text-2xl font-bold leading-tight text-ink-deep">Admissions are open</p>
          <dl className="mt-4 divide-y divide-ink/20 border-y border-ink/20">
            {FACTS.map((f) => (
              <div key={f.k} className="flex items-baseline justify-between gap-4 py-2.5">
                <dt className="text-sm text-soft">{f.k}</dt>
                <dd className="text-right font-semibold text-ink-deep">{f.v}</dd>
              </div>
            ))}
          </dl>
          <p className="font-hand mt-4 -rotate-2 text-2xl leading-none text-pen">first come, first seated!</p>
        </aside>
        </div>
      </div>
    </section>
  )
}

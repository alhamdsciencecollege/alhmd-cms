const DAY = [
  { slot: 'Morning', what: 'Lectures', detail: 'Your core subjects, taught in full from the board syllabus.' },
  { slot: 'Midday', what: 'Practical lab', detail: 'Physics, chemistry, biology or computers, in a lab built for it.' },
  { slot: 'Afternoon', what: 'Library hour', detail: 'Quiet reading, reference books and past papers.' },
  { slot: 'Every week', what: 'Class test', detail: 'Marked and handed back, so you know where you stand.' },
]

export default function College() {
  return (
    <section id="college" className="mx-auto max-w-6xl px-4 py-16 sm:px-8 sm:py-24">
      <div className="grid gap-12 lg:grid-cols-[1fr_1fr] lg:gap-16">
        <div>
          <h2 className="font-display text-4xl font-extrabold text-ink-deep sm:text-5xl">
            One building, built around the day
          </h2>
          <p className="mt-5 max-w-lg text-lg leading-relaxed text-soft">
            We are one college, not a sprawl of campuses. Classrooms, labs and
            the library share a roof, so less of your day goes on walking and
            more of it goes on learning.
          </p>
          <figure className="mt-9 max-w-md">
            <img
              src="/images/microscope.jpg"
              alt="A student placing a slide under a microscope"
              loading="lazy"
              className="aspect-[4/3] w-full -rotate-1 border-2 border-ink-deep object-cover shadow-[6px_6px_0_var(--color-ink-deep)]"
            />
            <figcaption className="font-hand mt-4 pl-2 text-2xl text-pen">every student does her own practicals</figcaption>
          </figure>
        </div>

        <div>
          <h3 className="font-display text-2xl font-bold text-ink-deep">A typical day</h3>
          <ol className="mt-4 border-t-2 border-ink-deep">
            {DAY.map((d) => (
              <li key={d.what} className="grid grid-cols-[6.5rem_1fr] gap-4 border-b border-ink/25 py-5">
                <p className="text-sm font-semibold text-ink">{d.slot}</p>
                <div>
                  <p className="font-display text-xl font-bold text-ink-deep">{d.what}</p>
                  <p className="mt-1 text-[15px] leading-relaxed text-soft">{d.detail}</p>
                </div>
              </li>
            ))}
          </ol>
        </div>
      </div>
    </section>
  )
}

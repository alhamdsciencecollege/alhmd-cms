import { useState } from 'react'

// SAMPLE DATA: replace names, marks and notes with real results before launch.
// Add a batch by adding another key; the tabs and rows render from this object.
const TOTAL = 1100
const BATCHES = {
  2025: [
    { name: 'Ayesha Khalid', program: 'Pre-Medical', marks: 1062, note: 'College topper' },
    { name: 'Hira Fatima', program: 'Pre-Engineering', marks: 1048, note: 'Mathematics 100/100' },
    { name: 'Maryam Tariq', program: 'I.C.S', marks: 1031, note: 'Computer Science 98/100' },
    { name: 'Zainab Raza', program: 'Pre-Medical', marks: 1024, note: 'Biology 99/100' },
    { name: 'Sana Iqbal', program: 'F.A', marks: 987, note: 'F.A group topper' },
    { name: 'Noor ul Ain', program: 'I.T', marks: 978, note: 'I.T group topper' },
  ],
  2024: [
    { name: 'Fatima Noor', program: 'Pre-Medical', marks: 1057, note: 'College topper' },
    { name: 'Laiba Aslam', program: 'Pre-Engineering', marks: 1041, note: 'Physics 98/100' },
    { name: 'Iqra Shahid', program: 'I.C.S', marks: 1019, note: 'Computer Science 100/100' },
    { name: 'Khadija Bashir', program: 'Pre-Medical', marks: 1012, note: 'Chemistry 97/100' },
    { name: 'Amna Rafiq', program: 'F.A', marks: 968, note: 'F.A group topper' },
    { name: 'Rabia Anwar', program: 'I.T', marks: 960, note: 'I.T group topper' },
  ],
  2023: [
    { name: 'Saba Majeed', program: 'Pre-Medical', marks: 1049, note: 'College topper' },
    { name: 'Mahnoor Ali', program: 'Pre-Engineering', marks: 1036, note: 'Mathematics 99/100' },
    { name: 'Eman Farooq', program: 'I.C.S', marks: 1008, note: 'Computer Science 97/100' },
    { name: 'Hafsa Younas', program: 'Pre-Medical', marks: 1001, note: 'Biology 98/100' },
    { name: 'Areeba Javed', program: 'F.A', marks: 951, note: 'F.A group topper' },
    { name: 'Tooba Siddiq', program: 'I.T', marks: 944, note: 'I.T group topper' },
  ],
  2022: [
    { name: 'Ume Habiba', program: 'Pre-Medical', marks: 1041, note: 'College topper' },
    { name: 'Rimsha Akram', program: 'Pre-Engineering', marks: 1029, note: 'Physics 97/100' },
    { name: 'Dua Fatima', program: 'I.C.S', marks: 997, note: 'Computer Science 96/100' },
    { name: 'Kinza Mehmood', program: 'Pre-Medical', marks: 990, note: 'Chemistry 96/100' },
    { name: 'Sidra Naeem', program: 'F.A', marks: 940, note: 'F.A group topper' },
    { name: 'Alishba Zahid', program: 'I.T', marks: 932, note: 'I.T group topper' },
  ],
}

const YEARS = Object.keys(BATCHES).sort((a, b) => b - a)
const pct = (m) => ((m / TOTAL) * 100).toFixed(1)

export default function Achievers() {
  const [year, setYear] = useState(YEARS[0])
  const [first, ...rest] = [...BATCHES[year]].sort((a, b) => b.marks - a.marks)

  return (
    <section id="honour-roll" className="ruled margin-line relative border-b-2 border-ink-deep">
      <div className="mx-auto max-w-6xl px-4 py-16 pl-[calc(clamp(0.75rem,5vw,4.5rem)+1.25rem)] sm:pr-8 sm:py-24">
        <h2 className="font-display text-3xl font-extrabold text-ink-deep sm:text-6xl">Honour roll</h2>
        <p className="mt-3 max-w-xl text-base leading-relaxed text-soft sm:mt-4 sm:text-lg">
          The students who topped each batch. Choose a year to see who they were and how they scored.
        </p>

        <div role="tablist" aria-label="Batch" className="no-scrollbar -ml-1 mt-9 flex gap-2 overflow-x-auto pb-0.5 pl-1 pr-4 pt-1">
          {YEARS.map((y) => (
            <button
              key={y}
              role="tab"
              type="button"
              id={`tab-${y}`}
              aria-selected={y === year}
              aria-controls="roll-panel"
              onClick={() => setYear(y)}
              className={`font-display min-h-11 flex-none cursor-pointer border-2 border-b-0 border-ink-deep px-4 text-base sm:px-5 sm:text-lg font-bold transition-colors ${
                y === year ? 'bg-marker text-ink-deep' : 'bg-paper text-soft hover:bg-board'
              }`}
            >
              {y}
            </button>
          ))}
        </div>

        <div
          id="roll-panel"
          role="tabpanel"
          aria-labelledby={`tab-${year}`}
          className="grid gap-0 border-2 border-ink-deep bg-paper shadow-[6px_6px_0_var(--color-ink-deep)] lg:grid-cols-[0.95fr_1.05fr]"
        >
          {/* Batch topper */}
          <div className="relative border-b-2 border-ink-deep p-4 sm:p-9 lg:border-b-0 lg:border-r-2">
            <div
              aria-hidden="true"
              className="font-display absolute right-3 top-3 -rotate-6 border-2 border-pen px-2 py-0.5 text-xs sm:border-[3px] sm:px-3 sm:py-1 sm:text-sm font-bold text-pen sm:right-6 sm:top-6"
            >
              Topper, {year}
            </div>
            <p className="font-hand mt-9 text-2xl leading-none text-pen sm:mt-8 sm:text-3xl">top of the batch</p>
            <h3 className="font-display mt-2 text-2xl font-extrabold leading-[1.05] text-ink-deep sm:mt-3 sm:text-5xl">{first.name}</h3>
            <p className="mt-1 text-base text-soft sm:mt-2 sm:text-lg">{first.program}</p>

            <p className="font-display mt-5 text-6xl font-black leading-none text-ink sm:mt-8 sm:text-8xl">{first.marks}</p>
            <p className="mt-1.5 text-sm font-semibold text-text sm:mt-2 sm:text-lg">
              out of {TOTAL} <span className="text-soft">({pct(first.marks)}%)</span>
            </p>
            <p className="font-hand mt-2 text-xl leading-none text-pen sm:mt-3 sm:text-2xl">{first.note}</p>
          </div>

          {/* Everyone else, ranked */}
          <ol className="divide-y divide-ink/20">
            {rest.map((s, i) => (
              <li key={s.name} className="grid grid-cols-[1.25rem_1fr_auto] items-center gap-3 px-4 py-3 sm:grid-cols-[2rem_1fr_auto] sm:px-7 sm:py-4 sm:px-7">
                <span className="font-display text-lg font-bold text-pen sm:text-2xl">{i + 2}</span>
                <div className="min-w-0">
                  <h3 className="font-display truncate text-base font-bold text-ink-deep sm:text-xl">{s.name}</h3>
                  <p className="text-xs text-soft sm:text-sm">
                    {s.program}, {s.note}
                  </p>
                </div>
                <p className="text-right">
                  <span className="font-display text-xl font-extrabold text-ink sm:text-2xl">{s.marks}</span>
                  <span className="block text-xs text-soft">{pct(s.marks)}%</span>
                </p>
              </li>
            ))}
          </ol>
        </div>
      </div>
    </section>
  )
}

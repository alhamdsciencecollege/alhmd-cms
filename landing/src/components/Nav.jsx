import { useEffect, useState } from 'react'

const LINKS = [
  { href: '#programs', label: 'Programs' },
  { href: '#college', label: 'The college' },
  { href: '#honour-roll', label: 'Honour roll' },
  { href: '#admissions', label: 'Admissions' },
  { href: '#contact', label: 'Contact' },
]

export default function Nav() {
  const [open, setOpen] = useState(false)

  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : ''
    const onKey = (e) => e.key === 'Escape' && setOpen(false)
    window.addEventListener('keydown', onKey)
    return () => {
      document.body.style.overflow = ''
      window.removeEventListener('keydown', onKey)
    }
  }, [open])

  return (
    <header className="sticky top-0 z-50 border-b-2 border-ink-deep bg-paper">
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-4 sm:px-8">
        <a href="#top" className="flex items-center gap-3" onClick={() => setOpen(false)}>
          <img src="/images/crest.png" alt="" className="h-10 w-10 object-contain" />
          <span className="font-display text-lg font-bold leading-none text-ink-deep">
            Al-Hamd Science College
          </span>
        </a>

        <nav aria-label="Primary" className="hidden items-center gap-7 lg:flex">
          {LINKS.map((l) => (
            <a
              key={l.href}
              href={l.href}
              className="text-[15px] font-medium text-text underline-offset-8 hover:text-ink hover:underline hover:decoration-pen hover:decoration-2"
            >
              {l.label}
            </a>
          ))}
          <a href="#admissions" className="btn bg-ink py-2 text-white" style={{ minHeight: '2.5rem' }}>
            Apply
          </a>
        </nav>

        <button
          type="button"
          onClick={() => setOpen((v) => !v)}
          className="flex h-11 cursor-pointer items-center gap-2 border-2 border-ink-deep px-3 text-sm font-semibold text-ink-deep lg:hidden"
          aria-expanded={open}
          aria-controls="mobile-menu"
        >
          {open ? 'Close' : 'Menu'}
        </button>
      </div>

      {open && (
        <div id="mobile-menu" className="ruled h-[calc(100dvh-4rem)] overflow-y-auto px-4 pb-10 pt-2 lg:hidden">
          <nav aria-label="Mobile">
            {LINKS.map((l) => (
              <a
                key={l.href}
                href={l.href}
                onClick={() => setOpen(false)}
                className="font-display block py-3 text-3xl font-bold text-ink-deep active:text-pen"
              >
                {l.label}
              </a>
            ))}
          </nav>
          <a href="#admissions" onClick={() => setOpen(false)} className="btn mt-6 w-full bg-ink text-white">
            Apply for admission
          </a>
        </div>
      )}
    </header>
  )
}

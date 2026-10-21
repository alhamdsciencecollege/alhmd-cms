import { useEffect, useState } from 'react'
import { GraduationCap, Menu, Phone, X } from 'lucide-react'
import { MAP_URL, PHONE_DISPLAY, PHONE_HREF } from '../siteInfo'

const LINKS = [
  { href: '#top', label: 'Home' },
  { href: '#programs', label: 'Programs' },
  { href: '#college', label: 'About' },
  { href: '#honour-roll', label: 'Achievers' },
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
    <header className="sticky top-0 z-50 bg-background border-b border-border">
      {/* Top info bar */}
      <div className="flex items-center justify-between gap-2 bg-ink text-primary-foreground px-4 py-2 sm:px-8 lg:px-16 text-[11px] sm:text-xs">
        <span className="font-body flex items-center gap-1.5 truncate">
          <a href={MAP_URL} target="_blank" rel="noopener noreferrer" className="hover:underline">
            Bahawalpur
          </a>
          <span className="hidden sm:inline opacity-60">|</span>
          <span className="hidden sm:inline-flex items-center gap-1.5">
            <GraduationCap className="h-3.5 w-3.5" />
            Affiliated with BISE Bahawalpur
          </span>
        </span>
        <a href={PHONE_HREF} className="font-body flex items-center gap-1.5 shrink-0 hover:underline">
          <Phone className="h-3.5 w-3.5" />
          <span className="hidden sm:inline">{PHONE_DISPLAY}</span>
        </a>
      </div>

      {/* Main row */}
      <div className="flex items-center justify-between gap-4 px-4 py-3 sm:px-8 lg:px-16 lg:py-4">
        <a href="#top" className="flex items-center gap-3 min-w-0" onClick={() => setOpen(false)}>
          <img src="/images/crest.png" alt="" className="h-10 w-10 lg:h-11 lg:w-11 object-contain shrink-0" />
          <div className="min-w-0">
            <div className="font-headings font-bold text-base lg:text-lg text-foreground leading-tight truncate">
              Al-Hamd Science College
            </div>
            <div className="text-xs font-body text-muted-foreground mt-0.5 hidden sm:block">
              Girls Intermediate College • Bahawalpur
            </div>
          </div>
        </a>

        <nav aria-label="Primary" className="hidden lg:flex items-center gap-7">
          {LINKS.map((l) => (
            <a
              key={l.href}
              href={l.href}
              className={`font-body text-sm font-medium transition-colors ${
                l.href === '#top' ? 'text-primary border-b-2 border-primary pb-1' : 'text-foreground hover:text-primary'
              }`}
            >
              {l.label}
            </a>
          ))}
        </nav>

        <div className="flex items-center gap-3">
          <a
            href={PHONE_HREF}
            className="border border-border font-body font-semibold text-sm px-4 sm:px-5 py-2.5 sm:py-3 rounded-md text-foreground flex items-center gap-2 hover:bg-secondary transition-colors"
          >
            <Phone className="h-4 w-4" />
            <span className="hidden sm:inline">Call us</span>
          </a>
          <a
            href="#admissions"
            className="hidden lg:flex bg-primary text-primary-foreground font-body font-semibold text-sm px-6 py-3 rounded-md items-center gap-2 hover:bg-primary/90 transition-colors"
          >
            Apply Now
          </a>
          <button
            type="button"
            onClick={() => setOpen((v) => !v)}
            className="flex h-10 w-10 items-center justify-center rounded-md border border-border text-foreground lg:hidden"
            aria-expanded={open}
            aria-controls="mobile-menu"
            aria-label={open ? 'Close menu' : 'Open menu'}
          >
            {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </div>

      {open && (
        <div id="mobile-menu" className="border-t border-border bg-background px-4 pb-8 pt-2 lg:hidden">
          <nav aria-label="Mobile" className="flex flex-col">
            {LINKS.map((l) => (
              <a
                key={l.href}
                href={l.href}
                onClick={() => setOpen(false)}
                className="font-headings border-b border-border py-3.5 text-xl font-bold text-foreground"
              >
                {l.label}
              </a>
            ))}
          </nav>
          <div className="mt-5 flex flex-col gap-3">
            <a href="#admissions" onClick={() => setOpen(false)} className="bg-primary text-primary-foreground font-body font-semibold text-center px-6 py-3.5 rounded-md">
              Apply for admission
            </a>
          </div>
        </div>
      )}
    </header>
  )
}

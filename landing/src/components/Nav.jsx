import { useEffect, useState } from 'react'
import { Phone, Menu, X } from 'lucide-react'

const LINKS = [
  { href: '#programs', label: 'Programs' },
  { href: '#college', label: 'About' },
  { href: '#honour-roll', label: 'Achievers' },
  { href: '#admissions', label: 'Admissions' },
  { href: '#contact', label: 'Contact' },
]

const PHONE = '+92 62 111 000 222'
const PHONE_HREF = 'tel:+92621110002220'

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
      <div className="hidden sm:flex items-center justify-between gap-4 bg-ink text-primary-foreground px-4 py-2 sm:px-8 lg:px-16">
        <span className="font-body text-xs">Model Town Road, Bahawalpur • Affiliated with BISE Bahawalpur</span>
        <a href={PHONE_HREF} className="font-body text-xs flex items-center gap-2 hover:underline">
          <Phone className="h-3.5 w-3.5" />
          {PHONE}
        </a>
      </div>

      {/* Main row */}
      <div className="flex items-center justify-between gap-4 px-4 py-3 sm:px-8 lg:px-16 lg:py-4">
        <a href="#top" className="flex items-center gap-3 min-w-0" onClick={() => setOpen(false)}>
          <img src="/images/crest.png" alt="" className="h-10 w-10 lg:h-11 lg:w-11 object-contain shrink-0" />
          <div className="min-w-0">
            <div className="font-headings font-bold text-base lg:text-lg text-foreground leading-none truncate">
              Al-Hamd Science College
            </div>
            <div className="text-xs font-body text-muted-foreground mt-1 hidden sm:block">
              Intermediate • Bahawalpur
            </div>
          </div>
        </a>

        <nav aria-label="Primary" className="hidden lg:flex items-center gap-7">
          {LINKS.map((l) => (
            <a
              key={l.href}
              href={l.href}
              className="font-body text-sm font-medium text-foreground hover:text-primary transition-colors"
            >
              {l.label}
            </a>
          ))}
        </nav>

        <div className="hidden lg:flex items-center gap-3">
          <a
            href={PHONE_HREF}
            className="border border-border font-body font-semibold text-sm px-5 py-3 rounded-md text-foreground flex items-center gap-2 hover:bg-secondary transition-colors"
          >
            <Phone className="h-4 w-4" />
            Call us
          </a>
          <a
            href="#admissions"
            className="bg-primary text-primary-foreground font-body font-semibold text-sm px-6 py-3 rounded-md hover:bg-primary/90 transition-colors"
          >
            Apply Now
          </a>
        </div>

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
            <a href={PHONE_HREF} className="border border-border font-body font-semibold text-sm px-5 py-3.5 rounded-md text-foreground flex items-center justify-center gap-2">
              <Phone className="h-4 w-4" />
              {PHONE}
            </a>
          </div>
        </div>
      )}
    </header>
  )
}

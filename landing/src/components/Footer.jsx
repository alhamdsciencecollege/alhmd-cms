import { Mail, MapPin, MessageCircle, Phone, ShieldCheck } from 'lucide-react'
import { ADDRESS, EMAIL, MAP_URL, PHONE_DISPLAY, PHONE_HREF, WHATSAPP_DISPLAY, WHATSAPP_HREF } from '../siteInfo'

const COLLEGE_LINKS = [
  { href: '#programs', label: 'Programs' },
  { href: '#college', label: 'About' },
  { href: '#honour-roll', label: 'Achievers' },
  { href: '#admissions', label: 'Admissions' },
]

export default function Footer() {
  return (
    <footer id="contact" className="bg-ink text-primary-foreground">
      <div className="px-4 py-12 sm:px-8 lg:px-16 lg:py-14 flex flex-col lg:flex-row gap-10 lg:gap-16">
        <div className="w-full lg:w-[320px] shrink-0 flex flex-col gap-4">
          <div className="flex items-center gap-3">
            <img src="/images/crest.png" alt="" className="h-11 w-11 object-contain shrink-0" />
            <div>
              <div className="font-headings font-bold text-lg leading-none">Al-Hamd Science College</div>
              <div className="font-body text-xs opacity-70 mt-1">Bahawalpur</div>
            </div>
          </div>
          <p className="font-body text-sm leading-relaxed opacity-80">
            A disciplined, affordable girls' college for F.Sc, I.C.S, I.T and F.A. Small classes,
            strong Board results.
          </p>
          <div className="inline-flex items-center gap-2 border border-primary-foreground/20 rounded-md px-3 py-2 w-fit">
            <ShieldCheck className="h-4 w-4 shrink-0" />
            <span className="font-body text-xs">Affiliated with the Board of Intermediate &amp; Secondary Education</span>
          </div>
        </div>

        <div className="flex flex-col sm:flex-row gap-10 lg:gap-16 flex-1">
          <div className="flex flex-col gap-3 flex-1">
            <div className="font-body text-sm font-bold text-accent">Contact</div>
            <a href={MAP_URL} target="_blank" rel="noopener noreferrer" className="flex items-start gap-2.5 hover:underline">
              <MapPin className="h-4 w-4 mt-0.5 shrink-0" />
              <span className="font-body text-sm opacity-90">{ADDRESS}</span>
            </a>
            <a href={PHONE_HREF} className="flex items-center gap-2.5 hover:underline">
              <Phone className="h-4 w-4 shrink-0" />
              <span className="font-body text-sm opacity-90">{PHONE_DISPLAY}</span>
            </a>
            <a href={WHATSAPP_HREF} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2.5 hover:underline">
              <MessageCircle className="h-4 w-4 shrink-0" />
              <span className="font-body text-sm opacity-90">{WHATSAPP_DISPLAY} (WhatsApp)</span>
            </a>
            <a href={`mailto:${EMAIL}`} className="flex items-center gap-2.5 hover:underline">
              <Mail className="h-4 w-4 shrink-0" />
              <span className="font-body text-sm opacity-90 break-all">{EMAIL}</span>
            </a>
          </div>

          <div className="flex flex-col gap-3">
            <div className="font-body text-sm font-bold text-accent">College</div>
            {COLLEGE_LINKS.map((l) => (
              <a key={l.href} href={l.href} className="font-body text-sm opacity-90 hover:underline">
                {l.label}
              </a>
            ))}
          </div>

          <div className="flex flex-col gap-3">
            <div className="font-body text-sm font-bold text-accent">Visit</div>
            <span className="font-body text-sm opacity-90">Admissions open now</span>
            <a
              href="#admissions"
              className="bg-accent text-accent-foreground font-body font-semibold text-sm px-5 py-3 rounded-md mt-1 text-center hover:bg-accent/90 transition-colors"
            >
              Apply for admission
            </a>
          </div>
        </div>
      </div>

      <div className="border-t border-primary-foreground/15 px-4 py-5 sm:px-8 lg:px-16 flex flex-col sm:flex-row items-center justify-between gap-3">
        <span className="font-body text-xs opacity-60">© {new Date().getFullYear()} Al-Hamd Science College, Bahawalpur</span>
        <div className="flex gap-5">
          <a href="/privacy" className="font-body text-xs opacity-80 hover:opacity-100 hover:underline">Privacy Policy</a>
          <a href="/terms" className="font-body text-xs opacity-80 hover:opacity-100 hover:underline">Terms of Service</a>
        </div>
      </div>
    </footer>
  )
}

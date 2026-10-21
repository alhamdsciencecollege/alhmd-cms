import { ArrowRight, Check, ClipboardList, FolderOpen, Info, MessageCircle, PhoneCall } from 'lucide-react'
import SectionLabel from './SectionLabel'
import { PHONE_HREF, WHATSAPP_DISPLAY, WHATSAPP_HREF } from '../siteInfo'

const STEPS = [
  { icon: PhoneCall, title: 'Visit or call', body: 'Enter your matric result and choose Pre-Medical, Pre-Engineering, I.C.S, I.T or F.A.' },
  { icon: ClipboardList, title: 'Get your seat confirmed', body: 'There is no entry test and no merit list. Everyone who meets the matric requirement is admitted.' },
  { icon: FolderOpen, title: 'Submit documents & pay the fee', body: 'Pay at the college office, or with the bank challan sent with your confirmation.' },
  { icon: Check, title: 'Collect your timetable', body: 'Classes start the following week. Books and the practical schedule are given on day one.' },
]

const DOCUMENTS = [
  'Matric result card (copy)',
  'Student B-Form (copy)',
  'Father / guardian CNIC (copy)',
  '4 passport photos',
  'School leaving certificate',
]

export default function Admissions() {
  return (
    <div id="admissions" className="mx-4 sm:mx-10 mb-16 sm:mb-20 rounded-xl border border-border bg-card overflow-hidden flex flex-col lg:flex-row scroll-mt-16">
      <div className="flex-1 p-6 sm:p-10 lg:p-14 flex flex-col gap-7 lg:gap-8">
        <SectionLabel>Admissions — open now</SectionLabel>
        <h2 className="font-headings font-bold text-3xl sm:text-4xl text-foreground leading-tight">
          Join in a few easy steps. Start class this week.
        </h2>

        <div className="flex flex-col">
          {STEPS.map((s, i) => {
            const Icon = s.icon
            const isLast = i === STEPS.length - 1
            return (
              <div key={s.title} className="flex gap-5">
                <div className="flex flex-col items-center">
                  <div className="w-12 h-12 rounded-md bg-primary text-primary-foreground flex items-center justify-center font-headings font-bold text-lg shrink-0">
                    {i + 1}
                  </div>
                  {!isLast && <div className="w-px flex-1 bg-border my-1 min-h-[24px]" />}
                </div>
                <div className="pb-7">
                  <div className="font-body font-semibold text-lg text-foreground flex items-center gap-2">
                    {s.title}
                    <Icon className="h-[17px] w-[17px] text-muted-foreground" />
                  </div>
                  <p className="font-body text-sm text-muted-foreground leading-relaxed mt-1 max-w-[440px]">
                    {s.body}
                  </p>
                </div>
              </div>
            )
          })}
        </div>

        <div className="flex flex-col sm:flex-row gap-3">
          <a
            href={PHONE_HREF}
            className="bg-primary text-primary-foreground font-body font-semibold text-base px-8 py-4 rounded-md flex items-center justify-center gap-2 hover:bg-primary/90 transition-colors"
          >
            Ask the admissions office
            <ArrowRight className="h-[18px] w-[18px]" />
          </a>
          <a
            href={WHATSAPP_HREF}
            target="_blank"
            rel="noopener noreferrer"
            className="border-2 border-ink font-body font-semibold text-base px-8 py-4 rounded-md text-ink flex items-center justify-center gap-2 hover:bg-ink hover:text-primary-foreground transition-colors"
          >
            <MessageCircle className="h-[18px] w-[18px]" />
            WhatsApp {WHATSAPP_DISPLAY}
          </a>
        </div>
      </div>

      <div className="w-full lg:w-[380px] xl:w-[440px] shrink-0 bg-sand border-t lg:border-t-0 lg:border-l border-border p-6 sm:p-10 lg:p-12 flex flex-col gap-5 sm:gap-6">
        <div className="font-headings font-bold text-xl text-foreground flex items-center gap-2">
          <ClipboardList className="h-[22px] w-[22px]" />
          Documents needed
        </div>

        {DOCUMENTS.map((d) => (
          <div key={d} className="flex items-center gap-3 bg-card border border-border rounded-md px-4 py-3.5">
            <div className="w-8 h-8 rounded-full bg-secondary text-primary flex items-center justify-center shrink-0">
              <Check className="h-4 w-4" />
            </div>
            <span className="font-body text-sm font-medium text-foreground">{d}</span>
          </div>
        ))}

        <div className="bg-ink rounded-md px-5 py-4 flex gap-3 items-start">
          <Info className="h-[18px] w-[18px] text-primary-foreground shrink-0 mt-0.5" />
          <p className="font-body text-sm text-primary-foreground leading-relaxed">
            No documents yet? Come anyway — we can usually still help you get started.
          </p>
        </div>
      </div>
    </div>
  )
}

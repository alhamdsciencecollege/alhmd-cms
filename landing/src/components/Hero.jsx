import { ArrowRight, BadgeCheck, DoorOpen, MapPin, Phone, ShieldCheck } from 'lucide-react'

const PHONE = '+92 62 111 000 222'
const PHONE_HREF = 'tel:+92621110002220'

export default function Hero() {
  return (
    <section id="top">
      <div className="px-4 pt-10 pb-12 sm:px-8 sm:pt-14 sm:pb-16 lg:px-16 flex flex-col lg:flex-row gap-10 lg:gap-14 lg:items-center bg-background">
        <div className="flex-1 flex flex-col gap-6">
          <div className="flex flex-wrap items-center gap-2">
            <span className="bg-ink text-primary-foreground font-body text-xs font-semibold px-3 py-1.5 rounded-full flex items-center gap-1.5">
              <BadgeCheck className="h-3.5 w-3.5" />
              Admissions open • Session 2026–27
            </span>
            <span className="bg-sand border border-border font-body text-xs font-semibold px-3 py-1.5 rounded-full text-foreground">
              Grades 11–12
            </span>
          </div>

          <h1 className="font-headings font-bold text-4xl sm:text-5xl leading-[1.05] text-foreground">
            A college seat is open to every student.
          </h1>

          <div className="flex items-center gap-3 bg-secondary border border-primary/20 rounded-lg px-5 py-4">
            <div className="w-10 h-10 rounded-md bg-primary text-primary-foreground flex items-center justify-center shrink-0">
              <DoorOpen className="h-5 w-5" />
            </div>
            <p className="font-body text-base sm:text-lg font-semibold text-primary">
              No entry test. No merit list. Just bring your matric result.
            </p>
          </div>

          <p className="font-body text-lg text-muted-foreground leading-relaxed">
            Al-Hamd Science College in Bahawalpur gives you small classes, teachers who mark your
            own work, and real science labs — in Pre-Medical, Pre-Engineering, I.C.S, I.T and F.A.
          </p>

          <div className="flex flex-col sm:flex-row gap-3">
            <a
              href="#admissions"
              className="bg-primary text-primary-foreground font-body font-semibold text-base px-8 py-4 rounded-md flex items-center justify-center gap-2 hover:bg-primary/90 transition-colors"
            >
              Apply for admission
              <ArrowRight className="h-[18px] w-[18px]" />
            </a>
            <a
              href={PHONE_HREF}
              className="border-2 border-ink font-body font-semibold text-base px-8 py-4 rounded-md text-ink flex items-center justify-center gap-2 hover:bg-ink hover:text-primary-foreground transition-colors"
            >
              <Phone className="h-[18px] w-[18px]" />
              Call us
            </a>
          </div>

          <div className="flex flex-wrap items-center gap-x-6 gap-y-2 pt-1">
            <div className="flex items-center gap-2">
              <ShieldCheck className="h-[18px] w-[18px] text-primary" />
              <span className="font-body text-sm font-medium text-foreground">BISE Affiliated</span>
            </div>
            <div className="flex items-center gap-2">
              <DoorOpen className="h-[18px] w-[18px] text-primary" />
              <span className="font-body text-sm font-medium text-foreground">No entry test</span>
            </div>
            <div className="flex items-center gap-2">
              <BadgeCheck className="h-[18px] w-[18px] text-primary" />
              <span className="font-body text-sm font-medium text-foreground">Small classes</span>
            </div>
          </div>
        </div>

        <div className="w-full lg:w-[480px] xl:w-[560px] shrink-0 relative">
          <img
            src="/images/college-hero.jpg"
            alt="Al-Hamd Science College building"
            fetchPriority="high"
            className="w-full aspect-[4/3] object-cover rounded-xl border border-border"
          />
          <div className="absolute -top-3 -right-2 sm:-top-4 sm:-right-3 bg-ink text-primary-foreground rounded-lg px-3.5 py-2.5 sm:px-4 sm:py-3 flex items-center gap-2 shadow-sm">
            <MapPin className="h-4 w-4 shrink-0" />
            <span className="font-body text-xs sm:text-sm font-semibold">Model Town Road, BWP</span>
          </div>
        </div>
      </div>

      <div className="bg-primary px-4 py-4 sm:px-8 lg:px-16 flex flex-col sm:flex-row items-center justify-between gap-2 text-center sm:text-left">
        <span className="font-body text-sm font-semibold text-primary-foreground">
          Admissions open for Session 2026–27 • No entry test, no merit list
        </span>
        <a href={PHONE_HREF} className="font-body text-sm font-semibold text-primary-foreground flex items-center gap-2 hover:underline">
          <Phone className="h-[15px] w-[15px]" />
          {PHONE}
        </a>
      </div>
    </section>
  )
}

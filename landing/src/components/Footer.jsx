export default function Footer() {
  return (
    <footer id="contact" className="bg-ink text-white">
      <div className="mx-auto max-w-6xl px-4 py-14 sm:px-8 sm:py-20">
        <p className="font-display text-[clamp(2.4rem,8vw,6rem)] font-extrabold leading-[0.98]">
          Al-Hamd
          <br />
          Science College
        </p>

        <div className="mt-12 grid gap-10 border-t border-white/30 pt-8 sm:grid-cols-3">
          <div>
            <h4 className="font-hand text-2xl text-marker">Visit</h4>
            <address className="mt-1 not-italic leading-relaxed text-white/90">
              Model Town Road
              <br />
              Bahawalpur, Punjab, Pakistan
            </address>
          </div>
          <div>
            <h4 className="font-hand text-2xl text-marker">Call</h4>
            <a href="tel:+92621110002220" className="mt-1 inline-block py-1 text-white/90 underline-offset-4 hover:underline">
              +92 62 111 000 222
            </a>
          </div>
          <div>
            <h4 className="font-hand text-2xl text-marker">Write</h4>
            <a href="mailto:admissions@alhamdscience.edu.pk" className="mt-1 inline-block break-all py-1 text-white/90 underline-offset-4 hover:underline">
              admissions@alhamdscience.edu.pk
            </a>
          </div>
        </div>

        <p className="mt-14 text-sm text-white/70">
          &copy; {new Date().getFullYear()} Al-Hamd Science College. Affiliated with the Board of Intermediate &amp; Secondary Education.
          {' '}
          <a href="/privacy" className="underline underline-offset-4 hover:text-white">Privacy</a>
          {' | '}
          <a href="/terms" className="underline underline-offset-4 hover:text-white">Terms</a>
        </p>
      </div>
    </footer>
  )
}

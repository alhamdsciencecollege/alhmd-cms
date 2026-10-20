const EMAIL = 'admissions@alhamdscience.edu.pk'
const UPDATED = '20 October 2026'

const PAGES = {
  '/privacy': {
    title: 'Privacy Policy',
    sections: [
      ['Who we are', 'Al-Hamd Science College, Model Town Road, Bahawalpur, Punjab, Pakistan ("the College") runs a college management system used by its students, teachers and administrators.'],
      ['What we collect', 'Information that students and staff give us or that the College records: name, contact details, guardian details, class and enrolment records, attendance, timetable and results, and the documents uploaded for admission and records (for example B-Form, previous result cards and photographs).'],
      ['How we use it', 'Only to run the College: admissions, enrolment, attendance, timetables, results and communication with students and guardians. We do not sell personal data and we do not use it for advertising.'],
      ['Where documents are stored', 'Uploaded documents are stored in a Google Drive account owned by the College, through the Google Drive API using the limited "drive.file" permission. This permission lets the system access only the files and folders it creates itself. It cannot see or change any other file in that Drive account. Students and staff do not sign in to Google and are not asked to share their own Google accounts.'],
      ['Google user data', 'The system does not read, collect or store any data from the personal Google accounts of students, staff or visitors. The only Google account connected is the College’s own, authorised once by an administrator for the purpose of storing uploaded documents. Our use of information received from Google APIs adheres to the Google API Services User Data Policy, including the Limited Use requirements.'],
      ['Who can see it', 'A student can see their own records and documents. Authorised teachers and administrators can see the records they need for their role. We do not share personal data with third parties except where required by law.'],
      ['Keeping and deleting data', 'Records are kept while a student is enrolled and for as long afterwards as the College needs them. Documents can be deleted or replaced by authorised staff. To ask for your data to be corrected or removed, write to us at the address below.'],
      ['Security', 'Access to the system requires a login, and permissions limit what each user can see. No system is perfectly secure, but we take reasonable steps to protect the data we hold.'],
      ['Changes', 'We may update this policy. The date at the top shows when it last changed.'],
    ],
  },
  '/terms': {
    title: 'Terms of Service',
    sections: [
      ['Acceptance', 'By using the College’s management system ("the Service") you agree to these terms. If you do not agree, please do not use it.'],
      ['Who may use it', 'The Service is for enrolled students, College staff and administrators. Accounts are issued by the College and are personal. Keep your login details private and do not share them.'],
      ['Acceptable use', 'Use the Service only for College purposes. Do not upload unlawful, harmful or unrelated material, try to access another person’s records, or interfere with the Service’s operation or security.'],
      ['Documents you upload', 'You confirm that documents you upload are genuine and that you are entitled to provide them. They are stored and used as described in our Privacy Policy. The College may remove documents that are false, unreadable or inappropriate.'],
      ['Accuracy of records', 'We work to keep attendance, timetable and result information accurate, but the College’s official records take priority if there is a difference.'],
      ['Availability', 'The Service is provided as is. We may change it, pause it for maintenance, or withdraw it, and we do not promise it will always be available or error-free.'],
      ['Suspension', 'The College may suspend or close an account that breaks these terms or when a person leaves the College.'],
      ['Changes', 'We may update these terms. Continued use of the Service after a change means you accept the updated terms.'],
    ],
  },
}

export function legalPage(pathname) {
  return PAGES[pathname.replace(/\/+$/, '')]
}

export default function Legal({ page }) {
  const other = page.title === 'Privacy Policy' ? ['/terms', 'Terms of Service'] : ['/privacy', 'Privacy Policy']
  return (
    <div className="ruled margin-line relative min-h-screen">
      <header className="border-b-2 border-ink bg-ink text-white">
        <div className="mx-auto flex max-w-3xl items-center justify-between px-4 py-4 sm:px-8">
          <a href="/" className="font-display text-lg font-extrabold">Al-Hamd Science College</a>
          <a href="/" className="py-2 text-sm underline-offset-4 hover:underline">&larr; Back to home</a>
        </div>
      </header>

      <main className="mx-auto max-w-3xl px-4 py-12 sm:px-8 sm:py-16">
        <h1 className="font-display text-4xl font-extrabold text-ink-deep sm:text-5xl">{page.title}</h1>
        <p className="mt-2 font-hand text-2xl text-pen">Last updated {UPDATED}</p>

        {page.sections.map(([heading, body]) => (
          <section key={heading} className="mt-8">
            <h2 className="font-display text-xl font-bold text-ink">{heading}</h2>
            <p className="mt-2 leading-relaxed text-soft">{body}</p>
          </section>
        ))}

        <section className="mt-8">
          <h2 className="font-display text-xl font-bold text-ink">Contact</h2>
          <p className="mt-2 leading-relaxed text-soft">
            Questions about this page: <a className="text-ink underline underline-offset-4" href={`mailto:${EMAIL}`}>{EMAIL}</a>, or write to Al-Hamd Science College, Model Town Road, Bahawalpur, Punjab, Pakistan.
          </p>
        </section>

        <p className="mt-12 border-t border-rule pt-6 text-sm text-soft">
          Also see our <a className="text-ink underline underline-offset-4" href={other[0]}>{other[1]}</a>.
        </p>
      </main>
    </div>
  )
}

-- Additive only: creates one new table and inserts its single row.
-- No existing table, column or row is touched.

-- CreateTable
CREATE TABLE "LandingConfig" (
    "id" INTEGER NOT NULL DEFAULT 1,
    "phoneDisplay" TEXT NOT NULL,
    "phoneHref" TEXT NOT NULL,
    "whatsappDisplay" TEXT NOT NULL,
    "whatsappHref" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "address" TEXT NOT NULL,
    "mapUrl" TEXT NOT NULL,
    "heroHeadline" TEXT NOT NULL,
    "heroHeadlineHighlight" TEXT NOT NULL,
    "heroParagraph" TEXT NOT NULL,
    "heroTagline" TEXT NOT NULL,
    "heroStripText" TEXT NOT NULL,
    "heroFeatures" JSONB NOT NULL,
    "aboutHeading" TEXT NOT NULL,
    "aboutDescription" TEXT NOT NULL,
    "aboutFeatures" JSONB NOT NULL,
    "statYears" TEXT NOT NULL,
    "statTeachers" TEXT NOT NULL,
    "statPassRate" TEXT NOT NULL,
    "footerBlurb" TEXT NOT NULL,
    "admissionsOpen" BOOLEAN NOT NULL DEFAULT true,
    "admissionsLabel" TEXT NOT NULL,
    "documentsNeeded" JSONB NOT NULL,
    "programs" JSONB NOT NULL,
    "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "LandingConfig_pkey" PRIMARY KEY ("id"),
    -- The landing page has exactly one config; this makes a second row impossible.
    CONSTRAINT "LandingConfig_single_row" CHECK ("id" = 1)
);

-- Seed the single row with what the landing page shows today, so the page
-- looks identical once it starts reading from this table.
INSERT INTO "LandingConfig" (
    "id",
    "phoneDisplay", "phoneHref", "whatsappDisplay", "whatsappHref", "email", "address", "mapUrl",
    "heroHeadline", "heroHeadlineHighlight", "heroParagraph", "heroTagline", "heroStripText", "heroFeatures",
    "aboutHeading", "aboutDescription", "aboutFeatures",
    "statYears", "statTeachers", "statPassRate",
    "footerBlurb",
    "admissionsOpen", "admissionsLabel", "documentsNeeded", "programs"
) VALUES (
    1,
    '0307 7041999', 'tel:+923077041999',
    '0343 7163094', 'https://wa.me/923437163094',
    'alhamdsciencecollege@gmail.com',
    'Bahawalpur, Punjab, Pakistan',
    'https://share.google/G6czjPQ1QCtalOEkN',

    'A college seat is open to', 'every student.',
    $t$We nurture curious minds, build strong character and provide quality education — because every student deserves a chance to achieve their dreams.$t$,
    'Quality education • Strong values • Bright futures',
    $t$Visit any day 8am–4pm • A girls' college in Bahawalpur$t$,
    $j$[
      {"icon":"Users","title":"Experienced Faculty","subtitle":"Dedicated & caring teachers"},
      {"icon":"BookOpen","title":"Modern Learning Environment","subtitle":"Safe, supportive, inspiring"},
      {"icon":"Star","title":"Proven Track Record","subtitle":"Consistent academic success"},
      {"icon":"ShieldCheck","title":"Discipline & Moral Values","subtitle":"Building better citizens"}
    ]$j$::jsonb,

    'A disciplined campus where teachers know every student by name.',
    $t$We are a girls' intermediate college in Bahawalpur — one building, not a sprawl of campuses. Small classes, weekly tests, and extra help before Board exams.$t$,
    $j$[
      {"icon":"FlaskConical","title":"Dedicated science labs","body":"Physics, chemistry, biology and computer labs, with weekly practicals for every student."},
      {"icon":"GraduationCap","title":"Experienced teachers","body":"Senior teachers who mark your own work and guide you through Board preparation."},
      {"icon":"ShieldCheck","title":"Safe & disciplined campus","body":"A calm, orderly campus with regular attendance checks and parent contact."},
      {"icon":"Wallet","title":"Affordable fees","body":"Fee plans designed to be affordable for local families, with discounts for siblings."}
    ]$j$::jsonb,

    '22 years', '40+', '92%',

    $t$A disciplined, affordable girls' college for F.Sc, I.C.S, F.A IT and F.A. Small classes, strong Board results.$t$,

    true, 'Admissions open now',
    $j$[
      "Matric result card (copy)",
      "Student B-Form (copy)",
      "Father / guardian CNIC (copy)",
      "4 passport photos",
      "School leaving certificate"
    ]$j$::jsonb,
    $j$[
      {"code":"Pre-Medical","badge":"For doctors","icon":"Stethoscope","subjects":"Biology, Chemistry, Physics, English","leads":"MBBS, BDS and allied health degrees"},
      {"code":"Pre-Engineering","badge":"For engineers","icon":"Cog","subjects":"Mathematics, Physics, Chemistry, English","leads":"Engineering and architecture"},
      {"code":"I.C.S","badge":"Computer science","icon":"Monitor","subjects":"Computer Science, Mathematics, Physics, English","leads":"Software and computing degrees"},
      {"code":"F.A IT","badge":"New • Practical","icon":"Cpu","subjects":"Computer Science, Statistics, Economics, English","leads":"IT, business and data degrees"},
      {"code":"F.A","badge":"Arts & humanities","icon":"BookOpen","subjects":"Education, Economics, English Literature","leads":"Teaching, humanities, civil service"}
    ]$j$::jsonb
);

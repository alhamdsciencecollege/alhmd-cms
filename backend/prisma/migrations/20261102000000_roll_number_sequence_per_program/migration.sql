-- Roll number serials now restart per (enrollment year, program), e.g. MED26-001 and ICS26-001.
DROP TABLE "RollNumberSequence";

CREATE TABLE "RollNumberSequence" (
    "year" INTEGER NOT NULL,
    "program" TEXT NOT NULL,
    "lastSerial" INTEGER NOT NULL DEFAULT 0,
    "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "RollNumberSequence_pkey" PRIMARY KEY ("year","program")
);

-- Rebuild counters from existing roll numbers (PREFIX + YY - SERIAL) so new
-- admissions continue after the highest serial already issued per program/year.
INSERT INTO "RollNumberSequence" ("year", "program", "lastSerial", "updatedAt")
SELECT 2000 + m[2]::int, m[1], MAX(m[3]::int), CURRENT_TIMESTAMP
FROM (
    SELECT regexp_match("rollNumber", '^(.*?)(\d{2})-(\d+)$') AS m FROM "Student"
) t
WHERE m IS NOT NULL
GROUP BY 1, 2;

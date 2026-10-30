-- Rename the "IT" program to "FA_IT" in place.
-- RENAME VALUE only changes the enum label in pg_enum; no table is rewritten and
-- every "Class"."program" row keeps pointing at the same value, so no data is lost.
-- Existing student roll numbers (e.g. IT26-003) are plain text and are left untouched.
ALTER TYPE "ClassProgram" RENAME VALUE 'IT' TO 'FA_IT';

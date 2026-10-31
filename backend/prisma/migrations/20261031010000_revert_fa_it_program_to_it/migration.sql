-- Revert the "FA_IT" program back to "IT" in place.
-- RENAME VALUE only changes the enum label in pg_enum; no table is rewritten and
-- every "Class"."program" row keeps pointing at the same value, so no data is lost.
-- Student roll numbers are plain text and are left untouched.
ALTER TYPE "ClassProgram" RENAME VALUE 'FA_IT' TO 'IT';

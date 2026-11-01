-- Additive only: creates one new table. No existing table, column or row is touched.

-- CreateTable
CREATE TABLE "HonourRoll" (
    "id" SERIAL NOT NULL,
    "batchYear" INTEGER NOT NULL,
    "name" TEXT NOT NULL,
    "rollNumber" TEXT,
    "program" TEXT NOT NULL,
    "marks" INTEGER NOT NULL,
    "totalMarks" INTEGER NOT NULL DEFAULT 1100,
    "note" TEXT,
    "isPublished" BOOLEAN NOT NULL DEFAULT true,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "HonourRoll_pkey" PRIMARY KEY ("id"),
    CONSTRAINT "HonourRoll_marks_range" CHECK ("marks" >= 0 AND "marks" <= "totalMarks")
);

-- CreateIndex
CREATE INDEX "HonourRoll_batchYear_idx" ON "HonourRoll"("batchYear");

-- CreateIndex
CREATE UNIQUE INDEX "HonourRoll_batchYear_name_key" ON "HonourRoll"("batchYear", "name");

/*
  Warnings:

  - You are about to drop the column `isCorrectt` on the `MCQSubmission` table. All the data in the column will be lost.
  - Added the required column `result` to the `MCQSubmission` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "MCQSubmission" DROP COLUMN "isCorrectt",
ADD COLUMN     "result" TEXT NOT NULL;

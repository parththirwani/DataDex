/*
  Warnings:

  - You are about to drop the column `isCorrect` on the `MCQSubmission` table. All the data in the column will be lost.
  - Added the required column `isCorrectt` to the `MCQSubmission` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "MCQSubmission" DROP COLUMN "isCorrect",
ADD COLUMN     "isCorrectt" TEXT NOT NULL;

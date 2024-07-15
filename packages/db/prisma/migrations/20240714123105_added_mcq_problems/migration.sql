-- CreateTable
CREATE TABLE "MCQProblem" (
    "id" TEXT NOT NULL,
    "question" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "hidden" BOOLEAN NOT NULL DEFAULT true,
    "category" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "MCQProblem_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "MCQOption" (
    "id" TEXT NOT NULL,
    "optionText" TEXT NOT NULL,
    "isCorrect" BOOLEAN NOT NULL,
    "description" TEXT NOT NULL,
    "mcqProblemId" TEXT NOT NULL,

    CONSTRAINT "MCQOption_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "MCQSubmission" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "mcqProblemId" TEXT NOT NULL,
    "selectedOptionId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "MCQSubmission_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ContestMCQProblem" (
    "id" TEXT NOT NULL,
    "contestId" TEXT NOT NULL,
    "mcqProblemId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "index" INTEGER NOT NULL,
    "solved" INTEGER NOT NULL DEFAULT 0,

    CONSTRAINT "ContestMCQProblem_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "ContestMCQProblem_contestId_mcqProblemId_key" ON "ContestMCQProblem"("contestId", "mcqProblemId");

-- AddForeignKey
ALTER TABLE "MCQOption" ADD CONSTRAINT "MCQOption_mcqProblemId_fkey" FOREIGN KEY ("mcqProblemId") REFERENCES "MCQProblem"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "MCQSubmission" ADD CONSTRAINT "MCQSubmission_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "MCQSubmission" ADD CONSTRAINT "MCQSubmission_mcqProblemId_fkey" FOREIGN KEY ("mcqProblemId") REFERENCES "MCQProblem"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "MCQSubmission" ADD CONSTRAINT "MCQSubmission_selectedOptionId_fkey" FOREIGN KEY ("selectedOptionId") REFERENCES "MCQOption"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ContestMCQProblem" ADD CONSTRAINT "ContestMCQProblem_contestId_fkey" FOREIGN KEY ("contestId") REFERENCES "Contest"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ContestMCQProblem" ADD CONSTRAINT "ContestMCQProblem_mcqProblemId_fkey" FOREIGN KEY ("mcqProblemId") REFERENCES "MCQProblem"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

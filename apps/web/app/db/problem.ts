import { db } from ".";

export const getProblem = async (problemId: string, contestId?: string) => {
  if (contestId) {
    const contest = await db.contest.findFirst({
      where: {
        id: contestId,
        hidden: false,
      },
    });

    if (!contest) {
      return null;
    }

    const problem = await db.problem.findFirst({
      where: {
        id: problemId,
        contests: {
          some: {
            contestId: contestId,
          },
        },
      },
      include: {
        defaultCode: true,
      },
    });
    return problem;
  }

  const problem = await db.problem.findFirst({
    where: {
      id: problemId,
    },
    include: {
      defaultCode: true,
    },
  });
  return problem;
};

export const getProblems = async () => {
  const problems = await db.problem.findMany({
    where: {
      hidden: false,
    },
    include: {
      defaultCode: true,
    },
  });
  return problems;
};

type MCQProblem = {
  id: string;
  question: string;
  description: string;
  category: string | null; // Update to allow null
  options: {
    id: string;
    optionText: string;
    isCorrect: boolean;
    description: string;
    mcqProblemId: string;
  }[];
};

export const getMCQProblems = async () :Promise<MCQProblem[]>=> {
  const problems = await db.mCQProblem.findMany({
    where: {
      hidden: false,
    },
    include: {
      options: true,
    },
  });
  return problems;
};

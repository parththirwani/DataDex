import prismaClient from "../src";
// import { PrismaClient } from "@prisma/client";

// const prismaClient = new PrismaClient();

async function main() {
  const newMCQ = await prismaClient.mCQProblem.create({
    data: {
      question: "Is Paris the capital of France?",
      description: "Choose the correct option.",
      category: "General Knowledge",
      hidden: false,
      options: {
        create: [
          { optionText: "I dont know", isCorrect: true, description: "The capital of France." },
          { optionText: "may be it is", isCorrect: false, description: "The capital of England." },
          { optionText: "I dont think so", isCorrect: false, description: "The capital of Germany." },
          { optionText: "Yes", isCorrect: false , description: "The capital of Spain." },
        ],
      },
    },
  });

  console.log('MCQ Created:', newMCQ);
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prismaClient.$disconnect();
  });
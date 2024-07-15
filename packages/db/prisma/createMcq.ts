import prismaClient from "../src";
// import { PrismaClient } from "@prisma/client";

// const prismaClient = new PrismaClient();

async function main() {
  const newMCQ = await prismaClient.mCQProblem.create({
    data: {
      question: "What is the capital of France?",
      description: "This is a geography question.",
      category: "Geography",
      hidden: false,
      options: {
        create: [
          { optionText: "Paris", isCorrect: true, description: "The capital of France." },
          { optionText: "London", isCorrect: false, description: "The capital of England." },
          { optionText: "Berlin", isCorrect: false, description: "The capital of Germany." },
          { optionText: "Madrid", isCorrect: false , description: "The capital of Spain." },
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
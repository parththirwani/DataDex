// import { LANGUAGE_MAPPING } from "@repo/common/language";
// import fs from "fs";
// import prismaClient from "../src";

// const MOUNT_PATH = process.env.MOUNT_PATH ?? "../../apps/problems";
// function promisifedReadFile(path: string): Promise<string> {
//   return new Promise((resolve, reject) => {
//     fs.readFile(path, "utf8", (err, data) => {
//       if (err) {
//         reject(err);
//       }
//       resolve(data);
//     });
//   });
// }

// async function main(problemSlug: string, problemTitle: string) {
//   const problemStatement = await promisifedReadFile(
//     `${MOUNT_PATH}/${problemSlug}/Problem.md`
//   );

//   const problem = await prismaClient.problem.upsert({
//     where: {
//       slug: problemSlug,
//     },
//     create: {
//       title: problemSlug,
//       slug: problemSlug,
//       description: problemStatement,
//       hidden: false,
//     },
//     update: {
//       description: problemStatement,
//     },
//   });

//   await Promise.all(
//     Object.keys(LANGUAGE_MAPPING).map(async (language) => {
//       const code = await promisifedReadFile(
//         `${MOUNT_PATH}/${problemSlug}/boilerplate/function.${language}`
//       );
//       console.log(code);
//       console.log("contorl here");
//       await prismaClient.defaultCode.upsert({
//         where: {
//           problemId_languageId: {
//             problemId: problem.id,
//             languageId: LANGUAGE_MAPPING[language].internal,
//           },
//         },
//         create: {
//           problemId: problem.id,
//           languageId: LANGUAGE_MAPPING[language].internal,
//           code,
//         },
//         update: {
//           code,
//         },
//       });
//     })
//   );
// }

// export function addProblemsInDB() {
//   fs.readdir(MOUNT_PATH, (err, dirs) => {
//     if (err) {
//       console.error("Error reading directory:", err);
//       return;
//     }
//     dirs.forEach(async (dir) => {
//       await main(dir, dir);
//     });
//   });
// }


import { LANGUAGE_MAPPING } from "@repo/common/language";
import fs from "fs";
import prismaClient from "../src";

const MOUNT_PATH = process.env.MOUNT_PATH ?? "../../apps/problems";

function promisifedReadFile(path: string): Promise<string> {
  return new Promise((resolve, reject) => {
    fs.readFile(path, "utf8", (err, data) => {
      if (err) {
        reject(err);
      }
      resolve(data);
    });
  });
}

async function main(problemSlug: string, problemTitle: string) {
  try {
    const problemStatement = await promisifedReadFile(
      `${MOUNT_PATH}/${problemSlug}/Problem.md`
    );

    const problem = await prismaClient.problem.upsert({
      where: {
        slug: problemSlug,
      },
      create: {
        title: problemTitle,
        slug: problemSlug,
        description: problemStatement,
        hidden: false,
      },
      update: {
        description: problemStatement,
      },
    });

    await Promise.all(
      Object.keys(LANGUAGE_MAPPING).map(async (language) => {
        try {
          const code = await promisifedReadFile(
            `${MOUNT_PATH}/${problemSlug}/boilerplate/function.${language}`
          );
          console.log(code);
          console.log("control here");

          const languageRecord = LANGUAGE_MAPPING[language];
          if (!languageRecord) {
            throw new Error(`Language ${language} does not exist in LANGUAGE_MAPPING`);
          }

          await prismaClient.defaultCode.upsert({
            where: {
              problemId_languageId: {
                problemId: problem.id,
                languageId: languageRecord.internal,
              },
            },
            create: {
              problemId: problem.id,
              languageId: languageRecord.internal,
              code,
            },
            update: {
              code,
            },
          });
        } catch (error) {
          console.error(`Error processing language ${language} for problem ${problemSlug}:`, error);
        }
      })
    );
  } catch (error) {
    console.error(`Error processing problem ${problemSlug}:`, error);
  }
}

export function addProblemsInDB() {
  fs.readdir(MOUNT_PATH, (err, dirs) => {
    if (err) {
      console.error("Error reading directory:", err);
      return;
    }
    dirs.forEach(async (dir) => {
      try {
        await main(dir, dir);
      } catch (error) {
        console.error(`Error processing directory ${dir}:`, error);
      }
    });
  });
}


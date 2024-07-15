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
  const problemStatement = await promisifedReadFile(
    `${MOUNT_PATH}/${problemSlug}/Problem.md`
  );

  const problem = await prismaClient.problem.upsert({
    where: {
      slug: problemSlug,
    },
    create: {
      title: problemSlug,
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
      const code = await promisifedReadFile(
        `${MOUNT_PATH}/${problemSlug}/boilerplate/function.${language}`
      );
      console.log(code);
      console.log("contorl here");
      await prismaClient.defaultCode.upsert({
        where: {
          problemId_languageId: {
            problemId: problem.id,
            languageId: LANGUAGE_MAPPING[language].internal,
          },
        },
        create: {
          problemId: problem.id,
          languageId: LANGUAGE_MAPPING[language].internal,
          code,
        },
        update: {
          code,
        },
      });
    })
  );
}

export function addProblemsInDB() {
  fs.readdir(MOUNT_PATH, (err, dirs) => {
    if (err) {
      console.error("Error reading directory:", err);
      return;
    }
    dirs.forEach(async (dir) => {
      await main(dir, dir);
    });
  });
}



// import { LANGUAGE_MAPPING } from "@repo/common/language";
// import fs from "fs";
// import prismaClient from "../src";

// const MOUNT_PATH = process.env.MOUNT_PATH ?? "../../apps/problems";

// function promisifiedReadFile(path: string): Promise<string> {
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
//   try {
//     const problemStatement = await promisifiedReadFile(
//       `${MOUNT_PATH}/${problemSlug}/Problem.md`
//     );

//     const problem = await prismaClient.problem.upsert({
//       where: {
//         slug: problemSlug,
//       },
//       create: {
//         title: problemTitle,
//         slug: problemSlug,
//         description: problemStatement,
//         hidden: false,
//       },
//       update: {
//         description: problemStatement,
//       },
//     });

//     await Promise.all(
//       Object.keys(LANGUAGE_MAPPING).map(async (language) => {
//         const codePath = `${MOUNT_PATH}/${problemSlug}/boilerplate/function.${language}`;
//         try {
//           const code = await promisifiedReadFile(codePath);
//           console.log(`Code for ${language}:\n${code}`);
//           await prismaClient.defaultCode.upsert({
//             where: {
//               problemId_languageId: {
//                 problemId: problem.id,
//                 languageId: LANGUAGE_MAPPING[language].internal,
//               },
//             },
//             create: {
//               problemId: problem.id,
//               languageId: LANGUAGE_MAPPING[language].internal,
//               code,
//             },
//             update: {
//               code,
//             },
//           });
//         } catch (err) {
//           console.error(`Error reading code file for ${language} at ${codePath}:`, err);
//         }
//       })
//     );
//   } catch (err) {
//     console.error(`Error processing problem ${problemSlug}:`, err);
//   }
// }

// export function addProblemsInDB() {
//   fs.readdir(MOUNT_PATH, (err, dirs) => {
//     if (err) {
//       console.error("Error reading directory:", err);
//       return;
//     }

//     dirs = dirs.filter((dir) => {
//       const fullPath = `${MOUNT_PATH}/${dir}`;
//       return fs.lstatSync(fullPath).isDirectory();
//     });

//     dirs.forEach(async (dir) => {
//       try {
//         await main(dir, dir);
//       } catch (err) {
//         console.error(`Error adding problem ${dir} to DB:`, err);
//       }
//     });
//   });
// }
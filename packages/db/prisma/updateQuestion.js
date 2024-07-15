"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
var _a;
Object.defineProperty(exports, "__esModule", { value: true });
exports.addProblemsInDB = void 0;
const language_1 = require("@repo/common/language");
const fs_1 = __importDefault(require("fs"));
const src_1 = __importDefault(require("../src"));
const MOUNT_PATH = (_a = process.env.MOUNT_PATH) !== null && _a !== void 0 ? _a : "../../apps/problems";
function promisifedReadFile(path) {
    return new Promise((resolve, reject) => {
        fs_1.default.readFile(path, "utf8", (err, data) => {
            if (err) {
                reject(err);
            }
            resolve(data);
        });
    });
}
function main(problemSlug, problemTitle) {
    return __awaiter(this, void 0, void 0, function* () {
        const problemStatement = yield promisifedReadFile(`${MOUNT_PATH}/${problemSlug}/Problem.md`);
        const problem = yield src_1.default.problem.upsert({
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
        yield Promise.all(Object.keys(language_1.LANGUAGE_MAPPING).map((language) => __awaiter(this, void 0, void 0, function* () {
            const code = yield promisifedReadFile(`${MOUNT_PATH}/${problemSlug}/boilerplate/function.${language}`);
            yield src_1.default.defaultCode.upsert({
                where: {
                    problemId_languageId: {
                        problemId: problem.id,
                        languageId: language_1.LANGUAGE_MAPPING[language].internal,
                    },
                },
                create: {
                    problemId: problem.id,
                    languageId: language_1.LANGUAGE_MAPPING[language].internal,
                    code,
                },
                update: {
                    code,
                },
            });
        })));
    });
}
function addProblemsInDB() {
    fs_1.default.readdir(MOUNT_PATH, (err, dirs) => {
        if (err) {
            console.error("Error reading directory:", err);
            return;
        }
        dirs.forEach((dir) => __awaiter(this, void 0, void 0, function* () {
            yield main(dir, dir);
        }));
    });
}
exports.addProblemsInDB = addProblemsInDB;

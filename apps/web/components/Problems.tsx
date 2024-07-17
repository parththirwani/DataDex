"use client"
import {
  Table,
  TableHeader,
  TableRow,
  TableHead,
  TableBody,
  TableCell,
} from "@repo/ui/table";
import { getMCQProblems, getProblems } from "../app/db/problem";
import { PrimaryButton } from "./LinkButton";
import Link from "next/link";
import { useRouter } from 'next/navigation';
import { Button } from "@repo/ui/button";
import { use, useEffect, useState } from "react";

export function Problems(
) {
  const [selected, setSelected] = useState("mcq");
  return (
    <section className="bg-white dark:bg-gray-900 py-8 md:py-12 min-h-screen">
      <div className="container mx-auto px-4 md:px-6">
        <div className="mb-6">
          <h2 className="text-2xl font-bold mb-2">Popular Problems</h2>
          <p className="text-gray-500 dark:text-gray-400 mb-3">
            Check out the most popular programming problems on Code100x.
          </p>
          <div className="flex flex-row space-x-5">
            <Button onClick={()=>{setSelected(
              "coding"
            )}}>Coding</Button>
            <Button
            onClick={()=>{setSelected(
              "mcq"
            )}}
            >MCQ</Button>
          </div>
        </div>
        <div className="">
          {/* {selected === "coding" ? <ProblemCard problem={problems} /> : <McqProblemCard Mcqproblems={Mcqproblems} />} */}
          
        </div>
      </div>
    </section>
  );
}



function ProblemCard({ problem }: { problem: any }) {
  if (!problem) return null;
  return (
    <div className="">
      <Table>
        <TableHeader >
          <TableRow className="hover:bg-white">
          <TableHead>S.No</TableHead>
            <TableHead>Title</TableHead>
            <TableHead>Difficulty</TableHead>
            <TableHead>Submissions</TableHead>
            <TableHead></TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {problem.map((problem: any,index: number) => (
            <Link href={`/problem/${problem.id}`} >
            <TableRow>
            <TableCell>{index + 1}</TableCell>
                <TableCell>{problem.title}</TableCell>
                <TableCell>{problem.difficulty}</TableCell>
                <TableCell>{problem.solved}</TableCell>
              </TableRow>
              </Link>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}



function McqProblemCard({ Mcqproblems }: { Mcqproblems: any }) {
  const router = useRouter();
  if (!Mcqproblems) return null;
  return (
    <div className="">
      <Table>
        <TableHeader >
          <TableRow className="hover:bg-white">
          <TableHead>S.No</TableHead>
            <TableHead>Title</TableHead>
            <TableHead>Category</TableHead>
            <TableHead>Desciption</TableHead>
            <TableHead></TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {Mcqproblems.map((problem: any,index: number) => (
            <Link href={`/problem/${problem.id}`} >
            <TableRow>
            <TableCell>{index + 1}</TableCell>
                <TableCell>{problem.question}</TableCell>
                <TableCell>{problem.category}</TableCell>
                <TableCell>{problem.description.substr(0,20)}....</TableCell>
              </TableRow>
              </Link>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}




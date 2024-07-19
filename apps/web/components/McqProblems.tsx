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

export function McqProblems(
) {
  
  return (
    <section className="bg-white dark:bg-gray-900 py-8 md:py-12 min-h-screen">
      <div className="container mx-auto px-4 md:px-6">
        <div className="mb-6">
          <h2 className="text-2xl font-bold mb-2">Popular Problems</h2>
          <p className="text-gray-500 dark:text-gray-400 mb-3">
            Check out the most popular programming problems on Code100x.
          </p>
          
        </div>
        <div className="">
           <McqProblemCard /> 
        </div>
      </div>
    </section>
  );
}


async function McqProblemCard() {
  const Mcqproblems = await getMCQProblems()
  
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




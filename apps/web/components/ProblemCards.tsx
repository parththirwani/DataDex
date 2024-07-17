// components/ProblemCard.tsx

import { Table, TableHeader, TableRow, TableHead, TableBody, TableCell } from '@repo/ui/table';
import Link from 'next/link';

export function ProblemCard({ problems }: { problems: any[] }) {
  return (
    <div>
      <Table>
        <TableHeader>
          <TableRow className="hover:bg-white">
            <TableHead>S.No</TableHead>
            <TableHead>Title</TableHead>
            <TableHead>Difficulty</TableHead>
            <TableHead>Submissions</TableHead>
            <TableHead></TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {problems.map((problem, index) => (
            <TableRow key={problem.id} className="cursor-pointer hover:bg-gray-100">
              <TableCell>{index + 1}</TableCell>
              <TableCell>{problem.title}</TableCell>
              <TableCell>{problem.difficulty}</TableCell>
              <TableCell>{problem.solved}</TableCell>
              <TableCell>
                <Link href={`/problem/${problem.id}`} passHref>
                  View
                </Link>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}

// components/McqProblemCard.tsx



export function McqProblemCard({ mcqProblems }: { mcqProblems: any[] }) {
  return (
    <div>
      <Table>
        <TableHeader>
          <TableRow className="hover:bg-white">
            <TableHead>S.No</TableHead>
            <TableHead>Title</TableHead>
            <TableHead>Category</TableHead>
            <TableHead>Description</TableHead>
            <TableHead></TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {mcqProblems.map((problem, index) => (
            <TableRow key={problem.id} className="cursor-pointer hover:bg-gray-100">
              <TableCell>{index + 1}</TableCell>
              <TableCell>{problem.question}</TableCell>
              <TableCell>{problem.category}</TableCell>
              <TableCell>{problem.description.substr(0, 20)}...</TableCell>
              <TableCell>
                <Link href={`/problem/${problem.id}`} passHref>
                  View
                </Link>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
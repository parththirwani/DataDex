// 'use client';
// import { useEffect, useState } from 'react';

// type Option = {
//   id: string;
//   optionText: string;
//   isCorrect: boolean;
// };

// type MCQProblem = {
//   id: string;
//   question: string;
//   description: string;
//   options: Option[];
// };

// export default function MCQs() {
//   const [mcqs, setMcqs] = useState<MCQProblem[]>([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState<string | null>(null);

//   useEffect(() => {
//     async function fetchMcqs() {
//       try {
//         const res = await fetch('/api/mcqs');
//         if (!res.ok) {
//           throw new Error('Failed to fetch MCQs');
//         }
//         const data = await res.json();
//         setMcqs(data);
//       } catch (error: any) {
//         setError(error.message);
//       } finally {
//         setLoading(false);
//       }
//     }
//     fetchMcqs();
//   }, []);

//   if (loading) return <p>Loading...</p>;
//   if (error) return <p>Error: {error}</p>;

//   return (
//     <div>
//       <h1 className='text-center mt-3 text-3xl'>MCQ Problems</h1>
//       <ul>
//         {mcqs.map((mcq) => (
//           <li key={mcq.id}>
//             <a href={`/mcq/${mcq.id}`}>{mcq.question}</a>
//           </li>
//         ))}
//       </ul>
//     </div>
//   );
// }

"use client"
import { useState } from "react";
import { Problems}  from "../../components/Problems";
import { McqProblems } from "../../components/McqProblems";
import { Button } from "@repo/ui/button";

export default function Page() {
  
  return (
    <main>
      
            <McqProblems />
      
     
    </main>
  );
}

export const dynamic = "force-dynamic"


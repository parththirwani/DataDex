'use client';
import { useState, useEffect } from 'react';
import { useSearchParams } from 'next/navigation';
import { Tabs, TabsList, TabsTrigger } from "@repo/ui/tabs";
import { Button } from '@repo/ui/button';
import { CardTitle,CardDescription } from '@repo/ui/card';
import axios from 'axios';
import { McqISubmission, McqSubmissionTable, SubmissionTable } from '../../../components/SubmissionTable';


type MCQOption = {
  id: string;
  optionText: string;
};

type MCQProblem = {
  id: string;
  question: string;
  description: string;
  options: MCQOption[];
};

export default function MCQ({params: { mcqId }}: {params: {mcqId: string}}
) {
  console.log(mcqId);
  const [mcq, setMcq] = useState<MCQProblem | null>(null);
  const [selectedOption, setSelectedOption] = useState<string | null>(null);
  const [submissionResult, setSubmissionResult] = useState<string | null>(null); 
  const [activeTab, setActiveTab] = useState("mcq");

  useEffect(() => {
    if (mcqId) {
      async function fetchMcq() {
        const res = await fetch(`/api/mcqs/${mcqId}`);
        const data = await res.json();
        setMcq(data);
      }
      fetchMcq();
    }
  }, [mcqId]);

  const handleSubmit = async () => {
    if (!selectedOption) {
      alert('Please select an option.');
      return;
    }

    try {
      const res = await fetch(`/api/mcqs/${mcqId}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          selectedOptionId: selectedOption,
        }),
      });

      const result = await res.json();

      if (res.ok) {
        setSubmissionResult(result.message); // Update the result state
      } else {
        setSubmissionResult(result.error || 'Submission failed.');
      }
    } catch (error) {
      console.error(error);
      setSubmissionResult('An error occurred.');
    }
  };

  if (!mcq) return <div>Loading...</div>;
    return (
      <div className="flex min-h-screen w-full">
        <div className="bg-white dark:bg-gray-900 h-full max-h-[1000px] p-6 items-center justify-center rounded-lg mt-7  ml-[200px] w-[1300px]">
            <div className=" grid grid-cols-2 gap-4 w-full ml-[150px] items-start ">
              <div className=''>
                <Tabs
                  defaultValue="mcq"
                  className="rounded-md p-1 "
                  value={activeTab}
                  onValueChange={setActiveTab}
                >
                  <TabsList className="grid grid-cols-2 w-full">
                    <TabsTrigger value="mcq">MCQ</TabsTrigger>
                    <TabsTrigger value="submissions">Submissions</TabsTrigger>
                  </TabsList>
                </Tabs>
              </div>
            </div>
            {activeTab === "mcq" && (
              <div className='ml-[150px]'>
                <CardTitle className='mb-3 mt-5'>{mcq.question}</CardTitle>
                <CardDescription className='mb-3'>{mcq.description}</CardDescription>
                <div className="flex items-center space-x-2">
                <ul className=' space-y-2'>
                  {mcq.options.map((option) => (
                    <li key={option.id} >
                      <label className='hover:cursor-pointer '>
                        <input
                          className='mr-2'
                          type="radio"
                          name="option"
                          value={option.id}
                          onChange={() => setSelectedOption(option.id)}
                        />
                        {option.optionText}
                      </label>
                    </li>
                  ))}
                </ul>
                
                </div>
                <Button className="mt-3" onClick={handleSubmit}>Submit</Button>
                {submissionResult && <p>{submissionResult}</p>} {/* Display result message */}
              </div>
            )}
            {activeTab === "submissions" && (
              <div>
                <Submissions mcqId={mcqId}></Submissions>
              </div>
            )}
            
          </div>
        </div>
      
  );
}

function Submissions({ mcqId }: { mcqId: string }) {
  const [submissions, setSubmissions] = useState<McqISubmission[]>([]);
  useEffect(() => {
    const fetchData = async () => {
      const response = await axios.get(
        `/api/mcqs/bulk?mcqId=${mcqId}`
      );
      console.log(response.data);
      setSubmissions(response.data.submissions || []);
    };
    fetchData();
  }, [mcqId]);

  console.log(submissions);
  return (
    <div>
      <McqSubmissionTable submissions={submissions} />
    </div>
  );
}
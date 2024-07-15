'use client';
import { useState, useEffect } from 'react';
import { useSearchParams } from 'next/navigation';
import { Tabs, TabsList, TabsTrigger } from "@repo/ui/tabs";
import { Button } from '@repo/ui/button';
import { CardTitle,CardDescription } from '@repo/ui/card';

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

export default function MCQ() {
  const params = useSearchParams();
  // @ts-ignore
  const mcqId  = "clymis0mo0000tfxbvpwvo70k";
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
      <div className="flex items-center justify-center h-screen">
        <div className="bg-white dark:bg-gray-900 ml-[400px] h-full max-h-[1000px] p-6 w-max-[5000px] items-center justify-center">
          <div className="grid gap-4 w-full">
            <div className="grid grid-cols-2 gap-4 w-full">
              <div>
                <Tabs
                  defaultValue="mcq"
                  className="rounded-md p-1"
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
              <div>
                <CardTitle className='mb-3'>{mcq.question}</CardTitle>
                <CardDescription className='mb-3'>{mcq.description}</CardDescription>
                <ul>
                  {mcq.options.map((option) => (
                    <li key={option.id}>
                      <label>
                        <input
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
                <Button className="mt-3" onClick={handleSubmit}>Submit</Button>
                {submissionResult && <p>{submissionResult}</p>} {/* Display result message */}
              </div>
            )}
            {activeTab === "submissions" && (
              <div>
                {/* Add the logic to display submissions */}
                <p>Submissions will be displayed here.</p>
              </div>
            )}
          </div>
        </div>
      </div>
  );
}
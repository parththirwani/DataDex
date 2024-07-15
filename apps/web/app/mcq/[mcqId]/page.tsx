'use client';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useSearchParams } from 'next/navigation'

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
  const mcqId  = "clyljqqub0000kb5ystvb3lph"
  console.log(mcqId);
  const [mcq, setMcq] = useState<MCQProblem | null>(null);
  const [selectedOption, setSelectedOption] = useState<string | null>(null);
  const [submissionResult, setSubmissionResult] = useState<string | null>(null); 

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
   <div>
      <h1>{mcq.question}</h1>
      <p>{mcq.description}</p>
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
      <button onClick={handleSubmit}>Submit</button>
      {submissionResult && <p>{submissionResult}</p>} {/* Display result message */}
    </div>
  );
}
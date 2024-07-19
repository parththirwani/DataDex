'use client';
import { useState, useEffect } from 'react';
import { Tabs, TabsList, TabsTrigger } from "@repo/ui/tabs";
import { Button } from '@repo/ui/button';
import { CardTitle, CardDescription } from '@repo/ui/card';
import axios from 'axios';
import { McqISubmission, McqSubmissionTable } from '../../../components/SubmissionTable';

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

type Comment = {
  id: string;
  text: string;
  author: string;
};

export default function MCQ({ params: { mcqId } }: { params: { mcqId: string } }) {
  console.log(mcqId);
  const [mcq, setMcq] = useState<MCQProblem | null>(null);
  const [selectedOption, setSelectedOption] = useState<string | null>(null);
  const [submissionResult, setSubmissionResult] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState("mcq");
  const [comments, setComments] = useState<Comment[]>([]);
  const [newComment, setNewComment] = useState<string>('');

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

  useEffect(() => {
    const fetchComments = async () => {
      const response = await axios.get(`/api/mcqs/${mcqId}/comments`);
      setComments(response.data);
    };
    fetchComments();
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

  const handleAddComment = async () => {
    if (!newComment.trim()) return;

    const response = await axios.post(`/api/mcqs/${mcqId}/comments`, {
      text: newComment,
    });

    setComments([...comments, response.data]);
    setNewComment('');
  };

  if (!mcq) return <div>Loading...</div>;
  return (
    <div className="relative min-h-screen w-full bg-white flex flex-col items-center py-10 dark:bg-gray-800">
      <Button
        className="absolute top-4 left-4 text-lg p-2"
        onClick={() => console.log('Previous')}
      >
        Previous
      </Button>
      <Button
        className="absolute top-4 right-4 text-lg p-2"
        onClick={() => console.log('Next')}
      >
        Next
      </Button>
      <div className="bg-white dark:bg-gray-900 max-h-[1000px] p-6 rounded-lg w-full max-w-[1300px] shadow-lg flex flex-col items-center">
        <div className="w-full">
          <Tabs
            defaultValue="mcq"
            className="rounded-md p-1 text-lg"
            value={activeTab}
            onValueChange={setActiveTab}
          >
            <TabsList className="grid grid-cols-2 w-full">
              <TabsTrigger className="" value="mcq">MCQ</TabsTrigger>
              <TabsTrigger className="" value="submissions">Submissions</TabsTrigger>
            </TabsList>
          </Tabs>
        </div>
        {activeTab === "mcq" && (
          <div className="flex flex-col items-center w-full">
            <CardTitle className="mb-3 mt-5 text-2xl">{mcq.question}</CardTitle>
            <CardDescription className="mb-3 text-xl">{mcq.description}</CardDescription>
            <div className="flex flex-col items-center space-y-2 w-full">
              <ul className="space-y-2 w-full">
                {mcq.options.map((option) => (
                  <li key={option.id} className="w-full">
                    <label className="hover:cursor-pointer text-lg flex items-center w-full">
                      <input
                        className="mr-2"
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
              <div className="mt-10"></div>
              <Button className="mt-4 text-lg p-2" onClick={handleSubmit}>Submit</Button>
              {submissionResult && <p className="text-lg mt-4">{submissionResult}</p>} {/* Display result message */}
            </div>
            <div className="mt-10 w-full">
              <h3 className="text-xl mb-4">Discussion</h3>
              <ul className="mb-4">
                {comments.map((comment) => (
                  <li key={comment.id} className="mb-2">
                    <div className="text-lg">{comment.text}</div>
                    <div className="text-sm text-gray-500">- {comment.author}</div>
                  </li>
                ))}
              </ul>
              <textarea
                className="w-full p-2 border rounded mb-2 bg-white text-black placeholder-black"
                rows={4}
                value={newComment}
                onChange={(e) => setNewComment(e.target.value)}
                placeholder="Add a comment"
              ></textarea>
              <Button onClick={handleAddComment}>Add Comment</Button>
            </div>
          </div>
        )}
        {activeTab === "submissions" && (
          <div className="flex justify-center w-full">
            <Submissions mcqId={mcqId} />
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

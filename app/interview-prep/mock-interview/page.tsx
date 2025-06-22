"use client";

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { CheckCircle, Lightbulb } from 'lucide-react';

const mockInterviewQuestions = [
    {
        question: "Tell me about yourself.",
        feedback: "A good answer to this question should be a brief, 1-2 minute pitch that connects your experience and skills to the role you're applying for. Try to use the 'Present, Past, Future' model to structure your answer."
    },
    {
        question: "What are your biggest strengths and weaknesses?",
        feedback: "For strengths, choose qualities that are relevant to the job and back them up with specific examples. For weaknesses, be honest but choose a real weakness you've been actively working to improve. Show self-awareness."
    },
    {
        question: "Describe a challenging situation you've faced at work and how you handled it.",
        feedback: "The STAR method (Situation, Task, Action, Result) is perfect for this. Be specific about the challenge and focus on the actions *you* took and the positive outcome."
    },
    {
        question: "Where do you see yourself in 5 years?",
        feedback: "Your answer should show ambition and a desire for growth, while also aligning with the opportunities available at this company. It's good to show you've thought about your career path."
    },
    {
        question: "Do you have any questions for us?",
        feedback: "Always have a few thoughtful questions prepared. Asking about the team, the company culture, or the challenges of the role shows genuine interest. Avoid asking about salary or benefits until you have an offer."
    }
];

export default function MockInterviewPage() {
  const [interviewStarted, setInterviewStarted] = useState(false);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [answers, setAnswers] = useState<string[]>(new Array(mockInterviewQuestions.length).fill(''));
  const [isCompleted, setIsCompleted] = useState(false);

  const handleNextQuestion = () => {
    if (currentQuestionIndex < mockInterviewQuestions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    } else {
      setIsCompleted(true);
    }
  };

  const handleAnswerChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const newAnswers = [...answers];
    newAnswers[currentQuestionIndex] = e.target.value;
    setAnswers(newAnswers);
  };
  
  const restartInterview = () => {
    setInterviewStarted(false);
    setCurrentQuestionIndex(0);
    setAnswers(new Array(mockInterviewQuestions.length).fill(''));
    setIsCompleted(false);
  }

  if (!interviewStarted) {
    return (
        <div className="flex h-[calc(100vh-10rem)] flex-col items-center justify-center text-center">
            <h1 className="text-3xl font-bold mb-4">Mock Interview</h1>
            <div className="text-lg text-muted-foreground mb-8 max-w-md">
                <p>This will simulate a real, 5-question interview.</p>
                <p>You will get feedback on your answers at the end.</p>
            </div>
            <Button onClick={() => setInterviewStarted(true)} size="lg">Start</Button>
        </div>
    )
  }

  return (
    <>
        <div className="mx-auto max-w-4xl text-center mb-8">
            <h1 className="text-2xl font-bold">Mock Interview</h1>
        </div>

        {isCompleted ? (
            <div className="mx-auto max-w-3xl space-y-8">
                <div className="text-center">
                    <h2 className="text-3xl font-bold">Interview Summary</h2>
                    <p className="text-muted-foreground mt-2">Here is a summary of your answers and feedback for each question.</p>
                </div>
                <div className='space-y-6'>
                {mockInterviewQuestions.map((item, index) => (
                    <Card key={index}>
                        <CardHeader>
                            <CardTitle className="text-lg">{item.question}</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <div className="space-y-4">
                                <div>
                                    <h4 className="font-semibold mb-2 text-gray-800">Your Answer:</h4>
                                    <p className="text-gray-700 p-4 bg-gray-50 rounded-md whitespace-pre-wrap">
                                        {answers[index] || <span className="text-gray-400">No answer provided.</span>}
                                    </p>
                                </div>
                                <div className="p-4 bg-yellow-50 border-l-4 border-yellow-400">
                                    <div className="flex items-start">
                                        <Lightbulb className="h-5 w-5 text-yellow-600 mr-3 mt-1 flex-shrink-0" />
                                        <div>
                                            <h4 className="font-semibold text-yellow-800 mb-1">Feedback:</h4>
                                            <p className="text-yellow-900">{item.feedback}</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </CardContent>
                    </Card>
                ))}
                </div>
                <div className="text-center mt-8">
                    <Button onClick={restartInterview}>Start Over</Button>
                </div>
            </div>
        ) : (
            <div className="mx-auto max-w-2xl">
                <Card>
                    <CardHeader>
                    <CardTitle>Question {currentQuestionIndex + 1} of {mockInterviewQuestions.length}</CardTitle>
                    </CardHeader>
                    <CardContent>
                    <div className="space-y-6">
                        <p className="text-lg font-semibold text-gray-800">
                        {mockInterviewQuestions[currentQuestionIndex].question}
                        </p>
                        <div>
                        <Textarea
                            id="userAnswer"
                            value={answers[currentQuestionIndex]}
                            onChange={handleAnswerChange}
                            placeholder="Type your answer here..."
                            className="min-h-[200px]"
                        />
                        </div>
                        <div className="flex justify-end">
                        <Button onClick={handleNextQuestion}>
                            {currentQuestionIndex === mockInterviewQuestions.length - 1 ? 'Finish' : 'Next Question'}
                        </Button>
                        </div>
                    </div>
                    </CardContent>
                </Card>
            </div>
        )}
    </>
  );
} 
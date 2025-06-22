"use client";

import { useState } from 'react';
import { useSearchParams } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Lightbulb, Loader2 } from 'lucide-react';
import { z } from "zod";
import { QuestionSchema } from '@/lib/questionSchema';
import { Application } from '@/app/dashboard/types';

const MOCK_INTERVIEW_STORAGE_KEY = 'mockInterviewState';

const QuestionWithAnswerSchema = QuestionSchema.extend({
    userAnswer: z.string(),
});
type QuestionWithAnswer = z.infer<typeof QuestionWithAnswerSchema>;

// Define the structure for the feedback from the API
const FeedbackSchema = z.object({
  feedback: z.string(),
  question: z.string(),
});
type Feedback = z.infer<typeof FeedbackSchema>;

interface MockInterviewState {
    questions: QuestionWithAnswer[];
    answers: string[];
    currentQuestionIndex: number;
}

export default function MockInterviewPage() {
  const searchParams = useSearchParams();
  const appId = searchParams.get('appId');

  const [interviewStarted, setInterviewStarted] = useState(false);
  const [questions, setQuestions] = useState<QuestionWithAnswer[]>([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [answers, setAnswers] = useState<string[]>([]);
  const [isCompleted, setIsCompleted] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [feedback, setFeedback] = useState<Feedback[]>([]);
  const [error, setError] = useState<string | null>(null);

  const startInterview = async () => {
    // Always start fresh: clear any previous state and fetch new questions.
    localStorage.removeItem(MOCK_INTERVIEW_STORAGE_KEY);
    setIsLoading(true);
    setError(null);

    // Get the role from the application in localStorage
    let role = "Software Engineer"; // Default role
    if (appId) {
        const storedApps = localStorage.getItem("applications");
        if (storedApps) {
            const apps: Application[] = JSON.parse(storedApps);
            const currentApp = apps.find(app => app.id.toString() === appId);
            if (currentApp) {
                role = currentApp.position;
            } else {
                setError("Could not find the application details.");
                setIsLoading(false);
                return;
            }
        }
    }
    
    try {
        const response = await fetch('/api/generate-interview-questions', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ role }),
        });

        if (!response.ok) {
            throw new Error("Failed to generate new questions.");
        }
        const result = await response.json();
        if (result.success && result.questions) {
            const newQuestions = result.questions.map((q: z.infer<typeof QuestionSchema>) => ({ ...q, userAnswer: '' }));
            const newAnswers = new Array(result.questions.length).fill('');
            setQuestions(newQuestions);
            setAnswers(newAnswers);
            setInterviewStarted(true);

            // Save initial state to localStorage for the current session
            const newState: MockInterviewState = { questions: newQuestions, answers: newAnswers, currentQuestionIndex: 0 };
            localStorage.setItem(MOCK_INTERVIEW_STORAGE_KEY, JSON.stringify(newState));
        } else {
            throw new Error(result.error || "An unknown error occurred while generating questions.");
        }
    } catch (err) {
        setError((err as Error).message);
    } finally {
        setIsLoading(false);
    }
  };

  const handleNextQuestion = () => {
    if (currentQuestionIndex < questions.length - 1) {
        const nextIndex = currentQuestionIndex + 1;
        setCurrentQuestionIndex(nextIndex);
        // Save new index to localStorage
        const savedState = JSON.parse(localStorage.getItem(MOCK_INTERVIEW_STORAGE_KEY) || '{}');
        savedState.currentQuestionIndex = nextIndex;
        localStorage.setItem(MOCK_INTERVIEW_STORAGE_KEY, JSON.stringify(savedState));
    } else {
      handleFinishInterview();
    }
  };

  const handleFinishInterview = async () => {
    setIsLoading(true);
    setError(null);

    // Get final Q&A from localStorage
    const savedState = localStorage.getItem(MOCK_INTERVIEW_STORAGE_KEY);
    if (!savedState) {
        setError("Could not retrieve interview data. Please try again.");
        setIsLoading(false);
        return;
    }
    const { questions, answers } = JSON.parse(savedState) as MockInterviewState;

    const questionsAndAnswers = questions.map((q, i) => ({
      question: q.question,
      answer: answers[i]
    }));

    try {
      const response = await fetch('/api/generate-answer-improvements', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ questionsAndAnswers }),
      });

      if (!response.ok) {
        throw new Error('Failed to get feedback from the API.');
      }
      const result = await response.json();
      setFeedback(result.feedback);
      setIsCompleted(true);
      localStorage.removeItem(MOCK_INTERVIEW_STORAGE_KEY); // Clean up on success
    } catch (err) {
      setError((err as Error).message);
    } finally {
      setIsLoading(false);
    }
  };


  const handleAnswerChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const newAnswers = [...answers];
    newAnswers[currentQuestionIndex] = e.target.value;
    setAnswers(newAnswers);
    
    // Save updated state to localStorage
    const newState: MockInterviewState = { questions, answers: newAnswers, currentQuestionIndex };
    localStorage.setItem(MOCK_INTERVIEW_STORAGE_KEY, JSON.stringify(newState));
  };
  
  const restartInterview = () => {
    setInterviewStarted(false);
    setCurrentQuestionIndex(0);
    setAnswers([]);
    setQuestions([]);
    setIsCompleted(false);
    setFeedback([]);
    setError(null);
    localStorage.removeItem(MOCK_INTERVIEW_STORAGE_KEY);
  }

  if (!interviewStarted) {
    return (
        <div className="flex h-[calc(100vh-10rem)] flex-col items-center justify-center text-center">
            <h1 className="text-3xl font-bold mb-4">Mock Interview</h1>
            <div className="text-lg text-muted-foreground mb-8 max-w-md">
                <p>Click Start to generate 5 random questions for your role.</p>
                <p>You will get personalized feedback on your answers at the end.</p>
            </div>
            {error && <p className="text-red-500 mb-4">{error}</p>}
            <Button onClick={startInterview} size="lg" disabled={isLoading}>
                {isLoading ? <><Loader2 className="mr-2 h-4 w-4 animate-spin" /> Generating...</> : 'Start'}
            </Button>
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
                {error && <p className="text-red-500 text-center">{error}</p>}
                <div className='space-y-6'>
                {feedback.map((item, index) => (
                    <Card key={index}>
                        <CardHeader>
                            <CardTitle className="text-lg">{item.question}</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <div className="space-y-4">
                                <div>
                                    <h4 className="font-semibold mb-2 text-gray-800">Your Answer:</h4>
                                    <p className="text-gray-700 p-4 bg-gray-50 rounded-md whitespace-pre-wrap">
                                        {answers[questions.findIndex(q => q.question === item.question)] || <span className="text-gray-400">No answer provided.</span>}
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
                    <CardTitle>Question {currentQuestionIndex + 1} of {questions.length}</CardTitle>
                    </CardHeader>
                    <CardContent>
                    <div className="space-y-6">
                        <p className="text-lg font-semibold text-gray-800">
                        {questions[currentQuestionIndex].question}
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
                        <Button onClick={handleNextQuestion} disabled={isLoading}>
                            {isLoading && currentQuestionIndex === questions.length - 1 ? (
                              <><Loader2 className="mr-2 h-4 w-4 animate-spin" /> Finishing...</>
                            ) : (
                              currentQuestionIndex === questions.length - 1 ? 'Finish' : 'Next Question'
                            )}
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
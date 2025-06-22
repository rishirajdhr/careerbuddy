"use client";

import { useState, useEffect } from "react";
import { useSearchParams } from 'next/navigation';
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { ChevronLeft, ChevronRight, Loader2 } from "lucide-react";
import { InterviewPrepSidebar } from "./sidebar";
import { QuestionSchema } from "@/lib/questionSchema";
import { z } from "zod";

// Define the structure for a question, including a user-provided answer
const QuestionWithAnswerSchema = QuestionSchema.extend({
    userAnswer: z.string(),
});
type QuestionWithAnswer = z.infer<typeof QuestionWithAnswerSchema>;

export default function InterviewPrepPage() {
    const searchParams = useSearchParams();
    const appId = searchParams.get('appId');

    const [jobDescription, setJobDescription] = useState("");
    const [questions, setQuestions] = useState<QuestionWithAnswer[]>([]);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    
    const [currentIndex, setCurrentIndex] = useState(0);
    const [activeTab, setActiveTab] = useState("answer");
    const [userAnswer, setUserAnswer] = useState("");
    const [saveStatus, setSaveStatus] = useState<'idle' | 'saved'>('idle');

    // Effect to load questions from localStorage if an appId is present
    useEffect(() => {
        if (appId) {
            const storageKey = `interview_questions_${appId}`;
            const storedQuestions = localStorage.getItem(storageKey);
            if (storedQuestions) {
                try {
                    const parsedQuestions: z.infer<typeof QuestionSchema>[] = JSON.parse(storedQuestions);
                    setQuestions(
                        parsedQuestions.map((q) => ({ ...q, userAnswer: "" }))
                    );
                } catch(e) {
                    console.error("Failed to parse questions from localStorage", e);
                    setError("Could not load pre-generated questions. Please generate new ones.");
                }
            }
        }
    }, [appId]);
    
    // Effect to load a user's saved answer when the question changes
    useEffect(() => {
        if (questions.length > 0) {
            const selectedQuestion = questions[currentIndex];
            // Use a more robust key for localStorage
            const answerKey = `interview_answer_${appId || 'general'}_${selectedQuestion.question}`;
            const savedAnswer = localStorage.getItem(answerKey);
            setUserAnswer(savedAnswer || '');
        }
    }, [currentIndex, questions, appId]);

    const handleGenerateQuestions = async () => {
        if (!jobDescription.trim()) {
            setError("Please enter a job description.");
            return;
        }
        setIsLoading(true);
        setError(null);
        setQuestions([]);

        try {
            const response = await fetch('/api/generate-interview-prep', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ jobDescription }),
            });

            if (!response.ok) {
                throw new Error("Failed to generate questions. Please try again.");
            }
            const result = await response.json();
            if (result.success && result.questions) {
                setQuestions(result.questions.map((q: z.infer<typeof QuestionSchema>) => ({ ...q, userAnswer: '' })));
            } else {
                throw new Error(result.error || "An unknown error occurred.");
            }
        } catch (err) {
            setError((err as Error).message);
        } finally {
            setIsLoading(false);
        }
    };
    
    const handleQuestionSelect = (index: number) => {
        setCurrentIndex(index);
        setActiveTab("answer");
    };

    const handleSubmitAnswer = () => {
        if (!userAnswer.trim() || questions.length === 0) return;
        const selectedQuestion = questions[currentIndex];
        const answerKey = `interview_answer_${appId || 'general'}_${selectedQuestion.question}`;
        localStorage.setItem(answerKey, userAnswer);
        setSaveStatus('saved');
        setTimeout(() => setSaveStatus('idle'), 2000);
    };

    const goToNext = () => {
        if (currentIndex < questions.length - 1) {
            handleQuestionSelect(currentIndex + 1);
        }
    };

    const goToPrevious = () => {
        if (currentIndex > 0) {
            handleQuestionSelect(currentIndex - 1);
        }
    };

    // If there are no questions yet, show the form to generate them
    if (questions.length === 0 && !isLoading) {
        return (
            <div className="flex flex-col items-center justify-center min-h-screen bg-gray-50 p-8">
                <div className="w-full max-w-2xl text-center">
                    <h1 className="text-3xl font-bold text-gray-800 mb-2">Interview Preparation</h1>
                    <p className="text-gray-600 mb-8">
                        Paste a job description below to generate tailored interview questions.
                    </p>
                    <div className="bg-white p-6 rounded-lg shadow-md">
                        <Textarea
                            value={jobDescription}
                            onChange={(e) => setJobDescription(e.target.value)}
                            placeholder="Paste the full job description here..."
                            className="min-h-[250px] w-full rounded-md border-gray-300"
                        />
                        {error && <p className="text-red-500 text-sm mt-2 text-left">{error}</p>}
                        <Button
                            onClick={handleGenerateQuestions}
                            disabled={isLoading}
                            className="mt-4 w-full"
                        >
                            {isLoading ? (
                                <>
                                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                                    Generating Questions...
                                </>
                            ) : (
                                "Generate Questions"
                            )}
                        </Button>
                    </div>
                </div>
            </div>
        );
    }
    
    // Loading state while questions are being generated for the first time
    if (isLoading) {
        return (
            <div className="flex flex-col items-center justify-center min-h-screen bg-gray-50 p-8">
                <Loader2 className="mr-2 h-8 w-8 animate-spin" />
                <p className="mt-4 text-gray-600">Generating your questions...</p>
            </div>
        );
    }
    
    const selectedQuestion = questions[currentIndex];

    // Once questions are loaded, show the interview prep UI
    return (
        <div className="flex h-screen flex-col bg-gray-50 font-sans">
            <div className="flex flex-1 overflow-hidden">
                <InterviewPrepSidebar
                    questions={questions}
                    selectedQuestion={selectedQuestion}
                    onQuestionSelect={handleQuestionSelect}
                />

                <main className="flex-1 overflow-y-auto p-8">
                    <div className="mx-auto max-w-4xl">
                        <div className="mb-6">
                            <h2 className="text-xl font-bold text-gray-800 capitalize">
                                {selectedQuestion.type.replace(/([A-Z])/g, ' $1').toLowerCase()} Question
                            </h2>
                        </div>

                        <div className="mb-8 rounded-lg bg-blue-50 p-6">
                            <p className="text-lg text-gray-800 font-semibold">
                                {selectedQuestion.question}
                            </p>
                        </div>

                        <div className="flex border-b border-gray-200">
                            <button onClick={() => setActiveTab("answer")} className={`px-4 py-2 text-sm font-medium ${activeTab === 'answer' ? 'border-b-2 border-blue-500 text-blue-600' : 'text-gray-500 hover:text-gray-700'}`}>Your Answer</button>
                            <button onClick={() => setActiveTab("tips")} className={`px-4 py-2 text-sm font-medium ${activeTab === 'tips' ? 'border-b-2 border-blue-500 text-blue-600' : 'text-gray-500 hover:text-gray-700'}`}>Tips</button>
                            <button onClick={() => setActiveTab("sample")} className={`px-4 py-2 text-sm font-medium ${activeTab === 'sample' ? 'border-b-2 border-blue-500 text-blue-600' : 'text-gray-500 hover:text-gray-700'}`}>Sample Answer</button>
                        </div>

                        <div className="pt-6">
                            {activeTab === 'answer' && (
                                <div>
                                    <h3 className="font-semibold text-gray-800">Your Answer</h3>
                                    <Textarea
                                        value={userAnswer}
                                        onChange={(e) => setUserAnswer(e.target.value)}
                                        placeholder="Type your answer here"
                                        className="mt-2 min-h-[250px] w-full rounded-md border border-gray-300 p-3"
                                    />
                                    <div className="mt-4 flex justify-end items-center gap-4">
                                        {saveStatus === 'saved' && (
                                            <span className="text-sm text-green-700">Answer Saved!</span>
                                        )}
                                        <Button onClick={handleSubmitAnswer}>
                                            Submit
                                        </Button>
                                    </div>
                                </div>
                            )}

                            {activeTab === 'tips' && (
                                <div>
                                    <h3 className="font-semibold text-gray-800">Tips</h3>
                                    <p className="mt-2 text-gray-600">{selectedQuestion.hint}</p>
                                </div>
                            )}

                            {activeTab === 'sample' && (
                                <div>
                                    <h3 className="font-semibold text-gray-800">Sample Answer</h3>
                                    <p className="mt-2 text-gray-600 prose-sm">{selectedQuestion.sampleAnswer}</p>
                                </div>
                            )}
                        </div>

                        <div className="mt-10 flex justify-between border-t border-gray-200 pt-6">
                            <Button variant="outline" onClick={goToPrevious} disabled={currentIndex === 0}>
                                <ChevronLeft className="mr-2 h-4 w-4" />
                                Previous Question
                            </Button>
                            <Button onClick={goToNext} disabled={currentIndex === questions.length - 1}>
                                Next Question
                                <ChevronRight className="ml-2 h-4 w-4" />
                            </Button>
                        </div>
                    </div>
                </main>
            </div>
        </div>
    );
} 
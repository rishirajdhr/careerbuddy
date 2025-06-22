"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import {
    ChevronLeft,
    ChevronRight,
} from "lucide-react";
import { allQuestions } from "./data";
import { InterviewPrepSidebar } from "./sidebar";

export default function InterviewPrepPage() {
    const [currentIndex, setCurrentIndex] = useState(0);
    const [activeTab, setActiveTab] = useState("answer");
    const [userAnswer, setUserAnswer] = useState("");
    const [saveStatus, setSaveStatus] = useState<'idle' | 'saved'>('idle');

    const selectedQuestion = allQuestions[currentIndex];

    useEffect(() => {
        const savedAnswer = localStorage.getItem(`interview-answer-${selectedQuestion.id}`);
        if (savedAnswer) {
            setUserAnswer(savedAnswer);
        } else {
            setUserAnswer('');
        }
    }, [currentIndex, selectedQuestion.id]);

    const handleQuestionSelect = (index: number) => {
        setCurrentIndex(index);
        setActiveTab("answer");
    };

    const handleSubmit = () => {
        if (!userAnswer.trim()) return;
        localStorage.setItem(`interview-answer-${selectedQuestion.id}`, userAnswer);
        setSaveStatus('saved');
        setTimeout(() => setSaveStatus('idle'), 2000); // Hide message after 2s
    };

    const goToNext = () => {
        if (currentIndex < allQuestions.length - 1) {
            handleQuestionSelect(currentIndex + 1);
        }
    };

    const goToPrevious = () => {
        if (currentIndex > 0) {
            handleQuestionSelect(currentIndex - 1);
        }
    };

    return (
        <div className="flex h-screen flex-col bg-gray-50 font-sans">
            <div className="flex flex-1 overflow-hidden">
                <InterviewPrepSidebar
                    selectedQuestion={selectedQuestion}
                    onQuestionSelect={handleQuestionSelect}
                />

                {/* Main Content */}
                <main className="flex-1 overflow-y-auto p-8">
                    <div className="mx-auto max-w-4xl">
                        <div className="mb-6">
                            <h2 className="text-xl font-bold text-gray-800 capitalize">
                                {selectedQuestion.category.replace(/([A-Z])/g, ' $1').toLowerCase()} Question
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
                                    />f
                                    <div className="mt-4 flex justify-end items-center gap-4">
                                        {saveStatus === 'saved' && (
                                            <span className="text-sm text-green-700">Answer Saved!</span>
                                        )}
                                        <Button onClick={handleSubmit}>
                                            Submit
                                        </Button>
                                    </div>
                                </div>
                            )}

                            {activeTab === 'tips' && (
                                <div>
                                    <h3 className="font-semibold text-gray-800">Tips</h3>
                                    <p className="mt-2 text-gray-600">{selectedQuestion.tips}</p>
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
                            <Button onClick={goToNext} disabled={currentIndex === allQuestions.length - 1}>
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
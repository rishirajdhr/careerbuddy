"use client";

import Link from "next/link";
import { Lightbulb } from "lucide-react";
import { interviewTips, interviewQuestionsData, allQuestions, Question, Category } from "./data";
import { Button } from "@/components/ui/button";

interface InterviewPrepSidebarProps {
    selectedQuestion: Question & { category: Category };
    onQuestionSelect: (index: number) => void;
}

export function InterviewPrepSidebar({ selectedQuestion, onQuestionSelect }: InterviewPrepSidebarProps) {
    return (
        <aside className="w-80 flex-shrink-0 overflow-y-auto border-r border-gray-200 bg-white p-6">
            <div className="space-y-8">
                <div className="mb-6">
                    <Button asChild className="w-full">
                        <Link href="/interview-prep/mock-interview">Start Mock Interview</Link>
                    </Button>
                </div>
                <div>
                    <h2 className="mb-4 flex items-center text-lg font-semibold">
                        <Lightbulb className="mr-2 h-5 w-5 text-yellow-500" />
                        Quick Interview Tips
                    </h2>
                    <div className="space-y-3">
                        {interviewTips.map((tip) => (
                            <div
                                key={tip.title}
                                className={`rounded-lg border-l-4 bg-gray-50 p-2 ${tip.borderColor}`}
                            >
                                <h3 className={`font-semibold text-sm ${tip.textColor}`}>{tip.title}</h3>
                                <p className="text-xs text-gray-600">{tip.content}</p>
                            </div>
                        ))}
                    </div>
                </div>

                {Object.entries(interviewQuestionsData).map(([category, questions]) => (
                    <div key={category}>
                        <h3 className="mb-3 text-base font-semibold capitalize text-gray-800">
                            {category.replace(/([A-Z])/g, ' $1').toLowerCase()}
                        </h3>
                        <ul className="space-y-1">
                            {questions.map((q) => {
                                const globalIndex = allQuestions.findIndex(item => item.id === q.id);
                                const isSelected = selectedQuestion.id === q.id;
                                return (
                                    <li key={q.id}>
                                        <button
                                            onClick={() => onQuestionSelect(globalIndex)}
                                            className={`w-full rounded-md p-2 text-left text-sm transition-colors ${isSelected
                                                    ? "bg-blue-50 text-blue-600 font-semibold"
                                                    : "text-gray-600 hover:bg-gray-100"
                                                }`}
                                        >
                                            {q.question}
                                        </button>
                                    </li>
                                );
                            })}
                        </ul>
                    </div>
                ))}
            </div>
        </aside>
    );
} 
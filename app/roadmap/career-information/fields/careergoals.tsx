"use client";

import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Target } from "lucide-react";

export function CareerGoalsCard({
    formData,
    setFormData,
}: {
    formData: { careerGoal: string; timeline: string };
    setFormData: (data: any) => void;
}) {
    return (
        <Card className="py-2">
            <div className="px-6 py-4 text-xl font-semibold">
                <div className="flex items-center gap-3">
                    <div className="grid size-12 place-items-center rounded-full bg-blue-600 text-white">
                        <Target className="h-5 w-5" />
                    </div>
                    <div className="text-left">
                        <div>Career Goals</div>
                        <div className="text-sm font-normal text-muted-foreground">
                            Define your career objectives and timeline
                        </div>
                    </div>
                </div>
            </div>
            <div className="space-y-6 px-6 pt-4 pb-6">
                <div className="space-y-2">
                    <Label htmlFor="careerGoal">Career Goal</Label>
                    <Textarea
                        id="careerGoal"
                        placeholder="Describe your career goal (e.g., Become a Senior Software Engineer or Transition to Product Management)"
                        rows={3}
                        value={formData.careerGoal}
                        onChange={(e) =>
                            setFormData({
                                ...formData,
                                careerGoal: e.target.value,
                            })
                        }
                    />
                </div>
                <div className="space-y-2">
                    <Label htmlFor="timeline">Timeline</Label>
                    <Input
                        id="timeline"
                        placeholder="e.g., 2-3 years"
                        value={formData.timeline}
                        onChange={(e) =>
                            setFormData({
                                ...formData,
                                timeline: e.target.value,
                            })
                        }
                    />
                </div>
            </div>
        </Card>
    );
}

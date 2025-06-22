"use client";

import {
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Target } from "lucide-react";
import { useFormContext } from "react-hook-form";
import { Roadmap } from "@/lib/roadmap-schema";

function CareerGoalField() {
    const form = useFormContext<Roadmap>();
    return (
        <FormField
            control={form.control}
            name="careerGoal"
            render={({ field }) => (
                <FormItem>
                    <Label htmlFor="careerGoal">Target Role</Label>
                    <FormControl>
                        <Input
                            id="careerGoal"
                            placeholder="e.g., Senior Software Engineer, Product Manager"
                            {...field}
                        />
                    </FormControl>
                    <FormMessage />
                </FormItem>
            )}
        />
    );
}

function JobDescriptionField() {
    const form = useFormContext<Roadmap>();
    return (
        <FormField
            control={form.control}
            name="jobDescription"
            render={({ field }) => (
                <FormItem>
                    <Label htmlFor="jobDescription">
                        Job Description of Target Role (Optional)
                    </Label>
                    <FormControl>
                        <Textarea
                            id="jobDescription"
                            placeholder="Paste or describe the job description for your target role..."
                            rows={15}
                            className="min-h-[300px]"
                            {...field}
                        />
                    </FormControl>
                    <FormMessage />
                </FormItem>
            )}
        />
    );
}

export function CareerGoalsCard() {
    return (
        <Card className="py-2">
            <div className="px-6 pt-4 pb-2 text-xl font-semibold">
                <div className="flex items-center gap-3">
                    <div className="grid size-12 place-items-center rounded-full bg-blue-600 text-white">
                        <Target className="h-5 w-5" />
                    </div>
                    <div className="text-left">
                        <div>Target Role</div>
                        <div className="text-sm font-normal text-muted-foreground">
                            What role are you aiming for?
                        </div>
                    </div>
                </div>
            </div>
            <div className="space-y-6 px-6 pb-6">
                <CareerGoalField />
                <JobDescriptionField />
            </div>
        </Card>
    );
}

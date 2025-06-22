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
import { User } from "lucide-react";
import { useFormContext } from "react-hook-form";
import { CareerInformation } from "@/lib/roadmap-schema";

function CurrentRoleField() {
    const form = useFormContext<CareerInformation>();
    return (
        <FormField
            control={form.control}
            name="currentRole"
            render={({ field }) => (
                <FormItem>
                    <Label htmlFor="currentRole">Current Role</Label>
                    <FormControl>
                        <Input
                            id="currentRole"
                            placeholder="e.g., Software Engineer"
                            {...field}
                        />
                    </FormControl>
                    <FormMessage />
                </FormItem>
            )}
        />
    );
}

function ExperienceField() {
    const form = useFormContext<CareerInformation>();
    return (
        <FormField
            control={form.control}
            name="experience"
            render={({ field }) => (
                <FormItem>
                    <Label htmlFor="experience">Years of Experience</Label>
                    <FormControl>
                        <Input
                            id="experience"
                            placeholder="e.g., 3 years"
                            {...field}
                        />
                    </FormControl>
                    <FormMessage />
                </FormItem>
            )}
        />
    );
}

export function CareerInfoCard() {
    return (
        <Card className="py-2">
            <div className="px-6 pt-4 pb-2 text-xl font-semibold">
                <div className="flex items-center gap-3">
                    <div className="grid size-12 place-items-center rounded-full bg-blue-600 text-white">
                        <User className="h-5 w-5" />
                    </div>
                    <div className="text-left">
                        <div>Current Career Information</div>
                        <div className="text-sm font-normal text-muted-foreground">
                            Tell us about your current position and experience
                        </div>
                    </div>
                </div>
            </div>
            <div className="space-y-6 px-6 pb-6">
                <div className="grid grid-cols-2 gap-6">
                    <CurrentRoleField />
                    <ExperienceField />
                </div>
            </div>
        </Card>
    );
}

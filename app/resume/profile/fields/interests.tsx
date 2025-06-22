"use client";

import { useState } from "react";
import {
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Resume } from "@/lib/schema";
import { useFormContext } from "react-hook-form";
import { TagInput, TagsList } from "@/components/ui/tag-input";

type InterestFieldProps = { index: number };

export function InterestNameField({ index }: InterestFieldProps) {
    const form = useFormContext<Resume>();

    return (
        <FormField
            control={form.control}
            name={`interests.${index}.name`}
            render={({ field }) => (
                <FormItem>
                    <FormLabel>Interest Name</FormLabel>
                    <FormControl>
                        <Input placeholder="e.g., Photography" {...field} />
                    </FormControl>
                    <FormMessage />
                </FormItem>
            )}
        />
    );
}

export function InterestKeywordsField({ index }: InterestFieldProps) {
    const form = useFormContext<Resume>();

    return (
        <FormField
            control={form.control}
            name={`interests.${index}.keywords`}
            render={({ field }) => (
                <FormItem>
                    <FormLabel>Keywords</FormLabel>
                    <FormControl>
                        <Input
                            placeholder="e.g., landscape, portrait, digital (comma separated)"
                            {...field}
                        />
                    </FormControl>
                    <FormMessage />
                </FormItem>
            )}
        />
    );
}

// Main Interests Component using reusable TagInput
export function InterestsSearchField() {
    const form = useFormContext<Resume>();
    const [inputValue, setInputValue] = useState("");

    const currentInterests = form.watch("interests") || [];

    const addInterest = () => {
        if (inputValue.trim()) {
            const newInterest = { name: inputValue.trim(), keywords: [] };
            const updatedInterests = [...currentInterests, newInterest];
            form.setValue("interests", updatedInterests);
            setInputValue("");
        }
    };

    const removeInterest = (index: number) => {
        const updatedInterests = currentInterests.filter((_, i) => i !== index);
        form.setValue("interests", updatedInterests);
    };

    const interestNames = currentInterests
        .map((interest) => interest.name)
        .filter(Boolean) as string[];

    return (
        <FormItem>
            <FormLabel>Interests</FormLabel>
            <div className="space-y-3">
                <TagInput
                    value={inputValue}
                    onChange={setInputValue}
                    onAdd={addInterest}
                    placeholder="Type an interest and press Enter or click +"
                />
                <TagsList
                    tags={interestNames}
                    onRemove={removeInterest}
                    color="blue"
                />
            </div>
            <FormMessage />
        </FormItem>
    );
}

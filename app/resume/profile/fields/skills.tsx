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
import { Button } from "@/components/ui/button";
import { Resume } from "@/lib/schema";
import { useFormContext } from "react-hook-form";
import { X, Plus } from "lucide-react";
import { cn } from "@/lib/utils";
import { TagInput, TagsList } from "@/components/ui/tag-input";

type SkillFieldProps = { index: number };

export function SkillNameField({ index }: SkillFieldProps) {
    const form = useFormContext<Resume>();

    return (
        <FormField
            control={form.control}
            name={`skills.${index}.name`}
            render={({ field }) => (
                <FormItem>
                    <FormLabel>Skill Name</FormLabel>
                    <FormControl>
                        <Input placeholder="e.g., JavaScript" {...field} />
                    </FormControl>
                    <FormMessage />
                </FormItem>
            )}
        />
    );
}

export function ProficiencyLevelField({ index }: SkillFieldProps) {
    const form = useFormContext<Resume>();

    return (
        <FormField
            control={form.control}
            name={`skills.${index}.level`}
            render={({ field }) => (
                <FormItem>
                    <FormLabel>Proficiency Level</FormLabel>
                    <FormControl>
                        <Input
                            placeholder="e.g., Advanced, Intermediate"
                            {...field}
                        />
                    </FormControl>
                    <FormMessage />
                </FormItem>
            )}
        />
    );
}

export function SkillKeywordsField({ index }: SkillFieldProps) {
    const form = useFormContext<Resume>();

    return (
        <FormField
            control={form.control}
            name={`skills.${index}.keywords`}
            render={({ field }) => (
                <FormItem>
                    <FormLabel>Keywords (Optional)</FormLabel>
                    <FormControl>
                        <Input
                            placeholder="e.g., React, Node.js, TypeScript (comma separated)"
                            {...field}
                        />
                    </FormControl>
                    <FormMessage />
                </FormItem>
            )}
        />
    );
}

// Main Skills Search Component using reusable TagInput
export function SkillsSearchField() {
    const form = useFormContext<Resume>();
    const [inputValue, setInputValue] = useState("");

    return (
        <FormField
            control={form.control}
            name="skills"
            render={({ field }) => {
                const currentSkills = field.value || [];

                const addSkill = () => {
                    if (inputValue.trim()) {
                        const newSkill = {
                            name: inputValue.trim(),
                            level: "",
                            keywords: [],
                        };
                        const updatedSkills = [...currentSkills, newSkill];
                        field.onChange(updatedSkills);
                        setInputValue("");
                    }
                };

                const removeSkill = (index: number) => {
                    const updatedSkills = currentSkills.filter(
                        (_: any, i: number) => i !== index,
                    );
                    field.onChange(updatedSkills);
                };

                const skillNames = currentSkills
                    .map((skill: any) => skill.name)
                    .filter(Boolean) as string[];

                return (
                    <FormItem>
                        <FormLabel>Skills</FormLabel>
                        <div className="space-y-3">
                            <TagInput
                                value={inputValue}
                                onChange={setInputValue}
                                onAdd={addSkill}
                                placeholder="Type a skill and press Enter or click +"
                            />
                            <TagsList
                                tags={skillNames}
                                onRemove={removeSkill}
                                color="blue"
                            />
                        </div>
                        <FormMessage />
                    </FormItem>
                );
            }}
        />
    );
}

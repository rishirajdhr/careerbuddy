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

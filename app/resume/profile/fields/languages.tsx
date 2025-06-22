import {
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import { Resume } from "@/lib/schema";
import { useFormContext } from "react-hook-form";

type LanguageFieldProps = { index: number };

const proficiencyLevels = [
    "Fluent/Native",
    "Advanced",
    "Intermediate",
    "Beginner",
];

export function LanguageField({ index }: LanguageFieldProps) {
    const form = useFormContext<Resume>();

    return (
        <FormField
            control={form.control}
            name={`languages.${index}.language`}
            render={({ field }) => (
                <FormItem>
                    <FormLabel>Language</FormLabel>
                    <FormControl>
                        <Input placeholder="e.g., Spanish" {...field} />
                    </FormControl>
                    <FormMessage />
                </FormItem>
            )}
        />
    );
}

export function FluencyField({ index }: LanguageFieldProps) {
    const form = useFormContext<Resume>();

    return (
        <FormField
            control={form.control}
            name={`languages.${index}.fluency`}
            render={({ field }) => (
                <FormItem>
                    <FormLabel>Proficiency Level</FormLabel>
                    <Select onValueChange={field.onChange} value={field.value}>
                        <FormControl>
                            <SelectTrigger>
                                <SelectValue placeholder="Select proficiency level" />
                            </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                            {proficiencyLevels.map((level) => (
                                <SelectItem key={level} value={level}>
                                    {level}
                                </SelectItem>
                            ))}
                        </SelectContent>
                    </Select>
                    <FormMessage />
                </FormItem>
            )}
        />
    );
}

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

type LanguageFieldProps = { index: number };

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
                    <FormControl>
                        <Input
                            placeholder="e.g., Fluent, Intermediate, Basic"
                            {...field}
                        />
                    </FormControl>
                    <FormMessage />
                </FormItem>
            )}
        />
    );
}

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

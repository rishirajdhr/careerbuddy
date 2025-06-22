import {
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Resume } from "@/lib/schema";
import { useFormContext } from "react-hook-form";
import { MonthYearPicker } from "@/components/ui/month-year-picker";

type AwardFieldProps = { index: number };

export function AwardTitleField({ index }: AwardFieldProps) {
    const form = useFormContext<Resume>();

    return (
        <FormField
            control={form.control}
            name={`awards.${index}.title`}
            render={({ field }) => (
                <FormItem>
                    <FormLabel>Award Title</FormLabel>
                    <FormControl>
                        <Input
                            placeholder="e.g., Employee of the Year"
                            {...field}
                        />
                    </FormControl>
                    <FormMessage />
                </FormItem>
            )}
        />
    );
}

export function AwarderField({ index }: AwardFieldProps) {
    const form = useFormContext<Resume>();

    return (
        <FormField
            control={form.control}
            name={`awards.${index}.awarder`}
            render={({ field }) => (
                <FormItem>
                    <FormLabel>Awarding Organization</FormLabel>
                    <FormControl>
                        <Input placeholder="e.g., TechCorp Inc." {...field} />
                    </FormControl>
                    <FormMessage />
                </FormItem>
            )}
        />
    );
}

export function AwardDateField({ index }: AwardFieldProps) {
    return (
        <MonthYearPicker name={`awards.${index}.date`} label="Date Received" />
    );
}

export function AwardSummaryField({ index }: AwardFieldProps) {
    const form = useFormContext<Resume>();

    return (
        <FormField
            control={form.control}
            name={`awards.${index}.summary`}
            render={({ field }) => (
                <FormItem>
                    <FormLabel>Summary (Optional)</FormLabel>
                    <FormControl>
                        <Textarea
                            placeholder="Brief description of the award and why you received it"
                            rows={3}
                            {...field}
                        />
                    </FormControl>
                    <FormMessage />
                </FormItem>
            )}
        />
    );
}

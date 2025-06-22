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

type PublicationFieldProps = { index: number };

export function PublicationNameField({ index }: PublicationFieldProps) {
    const form = useFormContext<Resume>();

    return (
        <FormField
            control={form.control}
            name={`publications.${index}.name`}
            render={({ field }) => (
                <FormItem>
                    <FormLabel>Publication Title</FormLabel>
                    <FormControl>
                        <Input
                            placeholder="e.g., Advanced Machine Learning Techniques"
                            {...field}
                        />
                    </FormControl>
                    <FormMessage />
                </FormItem>
            )}
        />
    );
}

export function PublisherField({ index }: PublicationFieldProps) {
    const form = useFormContext<Resume>();

    return (
        <FormField
            control={form.control}
            name={`publications.${index}.publisher`}
            render={({ field }) => (
                <FormItem>
                    <FormLabel>Publisher</FormLabel>
                    <FormControl>
                        <Input
                            placeholder="e.g., IEEE Computer Society"
                            {...field}
                        />
                    </FormControl>
                    <FormMessage />
                </FormItem>
            )}
        />
    );
}

export function PublicationReleaseDateField({ index }: PublicationFieldProps) {
    return (
        <MonthYearPicker
            name={`publications.${index}.releaseDate`}
            label="Release Date"
        />
    );
}

export function PublicationUrlField({ index }: PublicationFieldProps) {
    const form = useFormContext<Resume>();

    return (
        <FormField
            control={form.control}
            name={`publications.${index}.url`}
            render={({ field }) => (
                <FormItem>
                    <FormLabel>Publication URL (Optional)</FormLabel>
                    <FormControl>
                        <Input
                            placeholder="e.g., https://ieeexplore.ieee.org/document/..."
                            {...field}
                        />
                    </FormControl>
                    <FormMessage />
                </FormItem>
            )}
        />
    );
}

export function PublicationSummaryField({ index }: PublicationFieldProps) {
    const form = useFormContext<Resume>();

    return (
        <FormField
            control={form.control}
            name={`publications.${index}.summary`}
            render={({ field }) => (
                <FormItem>
                    <FormLabel>Summary (Optional)</FormLabel>
                    <FormControl>
                        <Textarea
                            placeholder="Brief description of the publication and its significance"
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

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
                            placeholder="e.g., Advanced React Patterns"
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
                            placeholder="e.g., ACM Digital Library"
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
    const form = useFormContext<Resume>();

    return (
        <FormField
            control={form.control}
            name={`publications.${index}.releaseDate`}
            render={({ field }) => (
                <FormItem>
                    <FormLabel>Release Date</FormLabel>
                    <FormControl>
                        <Input type="date" {...field} />
                    </FormControl>
                    <FormMessage />
                </FormItem>
            )}
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
                    <FormLabel>Publication URL</FormLabel>
                    <FormControl>
                        <Input placeholder="https://..." {...field} />
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
                    <FormLabel>Summary</FormLabel>
                    <FormControl>
                        <Textarea
                            placeholder="Brief description of the publication..."
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

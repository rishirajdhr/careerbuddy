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

type ProjectFieldProps = { index: number };

export function ProjectNameField({ index }: ProjectFieldProps) {
    const form = useFormContext<Resume>();

    return (
        <FormField
            control={form.control}
            name={`projects.${index}.name`}
            render={({ field }) => (
                <FormItem>
                    <FormLabel>Project Name</FormLabel>
                    <FormControl>
                        <Input
                            placeholder="e.g., E-commerce Platform"
                            {...field}
                        />
                    </FormControl>
                    <FormMessage />
                </FormItem>
            )}
        />
    );
}

export function ProjectDescriptionField({ index }: ProjectFieldProps) {
    const form = useFormContext<Resume>();

    return (
        <FormField
            control={form.control}
            name={`projects.${index}.description`}
            render={({ field }) => (
                <FormItem>
                    <FormLabel>Description</FormLabel>
                    <FormControl>
                        <Textarea
                            placeholder="Describe the project..."
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

export function ProjectStartDateField({ index }: ProjectFieldProps) {
    const form = useFormContext<Resume>();

    return (
        <FormField
            control={form.control}
            name={`projects.${index}.startDate`}
            render={({ field }) => (
                <FormItem>
                    <FormLabel>Start Date</FormLabel>
                    <FormControl>
                        <Input placeholder="e.g., 2023-01" {...field} />
                    </FormControl>
                    <FormMessage />
                </FormItem>
            )}
        />
    );
}

export function ProjectEndDateField({ index }: ProjectFieldProps) {
    const form = useFormContext<Resume>();

    return (
        <FormField
            control={form.control}
            name={`projects.${index}.endDate`}
            render={({ field }) => (
                <FormItem>
                    <FormLabel>End Date</FormLabel>
                    <FormControl>
                        <Input placeholder="e.g., 2023-06" {...field} />
                    </FormControl>
                    <FormMessage />
                </FormItem>
            )}
        />
    );
}

export function ProjectUrlField({ index }: ProjectFieldProps) {
    const form = useFormContext<Resume>();

    return (
        <FormField
            control={form.control}
            name={`projects.${index}.url`}
            render={({ field }) => (
                <FormItem>
                    <FormLabel>Project URL (Optional)</FormLabel>
                    <FormControl>
                        <Input
                            placeholder="https://github.com/username/project"
                            {...field}
                        />
                    </FormControl>
                    <FormMessage />
                </FormItem>
            )}
        />
    );
}

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

type EducationFieldProps = { index: number };

export function DegreeTypeField({ index }: EducationFieldProps) {
    const form = useFormContext<Resume>();

    return (
        <FormField
            control={form.control}
            name={`education.${index}.studyType`}
            render={({ field }) => (
                <FormItem>
                    <FormLabel>Degree Type</FormLabel>
                    <FormControl>
                        <Input placeholder="e.g., Bachelor's" {...field} />
                    </FormControl>
                    <FormMessage />
                </FormItem>
            )}
        />
    );
}

export function FieldOfStudyField({ index }: EducationFieldProps) {
    const form = useFormContext<Resume>();

    return (
        <FormField
            control={form.control}
            name={`education.${index}.area`}
            render={({ field }) => (
                <FormItem>
                    <FormLabel>Field of Study</FormLabel>
                    <FormControl>
                        <Input
                            placeholder="e.g., Computer Science"
                            {...field}
                        />
                    </FormControl>
                    <FormMessage />
                </FormItem>
            )}
        />
    );
}

export function InstitutionField({ index }: EducationFieldProps) {
    const form = useFormContext<Resume>();

    return (
        <FormField
            control={form.control}
            name={`education.${index}.institution`}
            render={({ field }) => (
                <FormItem>
                    <FormLabel>Institution</FormLabel>
                    <FormControl>
                        <Input
                            placeholder="e.g., University of Technology"
                            {...field}
                        />
                    </FormControl>
                    <FormMessage />
                </FormItem>
            )}
        />
    );
}

export function GpaField({ index }: EducationFieldProps) {
    const form = useFormContext<Resume>();

    return (
        <FormField
            control={form.control}
            name={`education.${index}.score`}
            render={({ field }) => (
                <FormItem>
                    <FormLabel>GPA (Optional)</FormLabel>
                    <FormControl>
                        <Input placeholder="e.g., 3.8" {...field} />
                    </FormControl>
                    <FormMessage />
                </FormItem>
            )}
        />
    );
}

export function EducationStartDateField({ index }: EducationFieldProps) {
    const form = useFormContext<Resume>();

    return (
        <FormField
            control={form.control}
            name={`education.${index}.startDate`}
            render={({ field }) => (
                <FormItem>
                    <FormLabel>Start Date</FormLabel>
                    <FormControl>
                        <Input type="date" {...field} />
                    </FormControl>
                    <FormMessage />
                </FormItem>
            )}
        />
    );
}

export function EducationEndDateField({ index }: EducationFieldProps) {
    const form = useFormContext<Resume>();

    return (
        <FormField
            control={form.control}
            name={`education.${index}.endDate`}
            render={({ field }) => (
                <FormItem>
                    <FormLabel>End Date</FormLabel>
                    <FormControl>
                        <Input type="date" {...field} />
                    </FormControl>
                    <FormMessage />
                </FormItem>
            )}
        />
    );
}

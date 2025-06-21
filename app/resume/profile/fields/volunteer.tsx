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

type VolunteerFieldProps = { index: number };

export function VolunteerPositionField({ index }: VolunteerFieldProps) {
    const form = useFormContext<Resume>();

    return (
        <FormField
            control={form.control}
            name={`volunteer.${index}.position`}
            render={({ field }) => (
                <FormItem>
                    <FormLabel>Position</FormLabel>
                    <FormControl>
                        <Input placeholder="e.g., Board Member" {...field} />
                    </FormControl>
                    <FormMessage />
                </FormItem>
            )}
        />
    );
}

export function OrganizationField({ index }: VolunteerFieldProps) {
    const form = useFormContext<Resume>();

    return (
        <FormField
            control={form.control}
            name={`volunteer.${index}.organization`}
            render={({ field }) => (
                <FormItem>
                    <FormLabel>Organization</FormLabel>
                    <FormControl>
                        <Input placeholder="e.g., Local Food Bank" {...field} />
                    </FormControl>
                    <FormMessage />
                </FormItem>
            )}
        />
    );
}

export function VolunteerStartDateField({ index }: VolunteerFieldProps) {
    const form = useFormContext<Resume>();

    return (
        <FormField
            control={form.control}
            name={`volunteer.${index}.startDate`}
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

export function VolunteerEndDateField({ index }: VolunteerFieldProps) {
    const form = useFormContext<Resume>();

    return (
        <FormField
            control={form.control}
            name={`volunteer.${index}.endDate`}
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

export function VolunteerUrlField({ index }: VolunteerFieldProps) {
    const form = useFormContext<Resume>();

    return (
        <FormField
            control={form.control}
            name={`volunteer.${index}.url`}
            render={({ field }) => (
                <FormItem>
                    <FormLabel>Organization URL (Optional)</FormLabel>
                    <FormControl>
                        <Input placeholder="https://..." {...field} />
                    </FormControl>
                    <FormMessage />
                </FormItem>
            )}
        />
    );
}

export function VolunteerSummaryField({ index }: VolunteerFieldProps) {
    const form = useFormContext<Resume>();

    return (
        <FormField
            control={form.control}
            name={`volunteer.${index}.summary`}
            render={({ field }) => (
                <FormItem>
                    <FormLabel>Summary</FormLabel>
                    <FormControl>
                        <Textarea
                            placeholder="Describe your volunteer work and contributions..."
                            rows={4}
                            {...field}
                        />
                    </FormControl>
                    <FormMessage />
                </FormItem>
            )}
        />
    );
}

import {
    FormControl,
    FormDescription,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Resume } from "@/lib/schema";
import { useFormContext } from "react-hook-form";

type WorkFieldProps = { index: number };

export function PositionField({ index }: WorkFieldProps) {
    const form = useFormContext<Resume>();

    return (
        <FormField
            control={form.control}
            name={`work.${index}.position`}
            render={({ field }) => (
                <FormItem>
                    <FormLabel>Job Title</FormLabel>
                    <FormControl>
                        <Input
                            placeholder="e.g., Senior Software Engineer"
                            {...field}
                        />
                    </FormControl>
                    <FormMessage />
                </FormItem>
            )}
        />
    );
}

export function CompanyNameField({ index }: WorkFieldProps) {
    const form = useFormContext<Resume>();

    return (
        <FormField
            control={form.control}
            name={`work.${index}.name`}
            render={({ field }) => (
                <FormItem>
                    <FormLabel>Company</FormLabel>
                    <FormControl>
                        <Input placeholder="e.g., TechCorp Inc." {...field} />
                    </FormControl>
                    <FormMessage />
                </FormItem>
            )}
        />
    );
}

export function WorkStartDateField({ index }: WorkFieldProps) {
    const form = useFormContext<Resume>();

    return (
        <FormField
            control={form.control}
            name={`work.${index}.startDate`}
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

export function WorkEndDateField({ index }: WorkFieldProps) {
    const form = useFormContext<Resume>();

    return (
        <FormField
            control={form.control}
            name={`work.${index}.endDate`}
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

export function WorkSummaryField({ index }: WorkFieldProps) {
    const form = useFormContext<Resume>();

    return (
        <FormField
            control={form.control}
            name={`work.${index}.summary`}
            render={({ field }) => (
                <FormItem className="col-span-2">
                    <FormLabel>Summary</FormLabel>
                    <FormControl>
                        <Textarea
                            placeholder="Describe your key responsibilities and achievements..."
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

export function WorkLocationField({ index }: WorkFieldProps) {
    const form = useFormContext<Resume>();

    return (
        <FormField
            control={form.control}
            name={`work.${index}.location`}
            render={({ field }) => (
                <FormItem>
                    <FormLabel>Location</FormLabel>
                    <FormControl>
                        <Input placeholder="e.g., New York, NY" {...field} />
                    </FormControl>
                    <FormMessage />
                </FormItem>
            )}
        />
    );
}

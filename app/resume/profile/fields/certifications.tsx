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

type CertificationFieldProps = { index: number };

export function CertificationNameField({ index }: CertificationFieldProps) {
    const form = useFormContext<Resume>();

    return (
        <FormField
            control={form.control}
            name={`certificates.${index}.name`}
            render={({ field }) => (
                <FormItem>
                    <FormLabel>Certification Name</FormLabel>
                    <FormControl>
                        <Input
                            placeholder="e.g., AWS Certified Solutions Architect"
                            {...field}
                        />
                    </FormControl>
                    <FormMessage />
                </FormItem>
            )}
        />
    );
}

export function IssuerField({ index }: CertificationFieldProps) {
    const form = useFormContext<Resume>();

    return (
        <FormField
            control={form.control}
            name={`certificates.${index}.issuer`}
            render={({ field }) => (
                <FormItem>
                    <FormLabel>Issuing Organization</FormLabel>
                    <FormControl>
                        <Input
                            placeholder="e.g., Amazon Web Services"
                            {...field}
                        />
                    </FormControl>
                    <FormMessage />
                </FormItem>
            )}
        />
    );
}

export function CertificationDateField({ index }: CertificationFieldProps) {
    const form = useFormContext<Resume>();

    return (
        <FormField
            control={form.control}
            name={`certificates.${index}.date`}
            render={({ field }) => (
                <FormItem>
                    <FormLabel>Date Earned</FormLabel>
                    <FormControl>
                        <Input type="date" {...field} />
                    </FormControl>
                    <FormMessage />
                </FormItem>
            )}
        />
    );
}

export function CertificationUrlField({ index }: CertificationFieldProps) {
    const form = useFormContext<Resume>();

    return (
        <FormField
            control={form.control}
            name={`certificates.${index}.url`}
            render={({ field }) => (
                <FormItem>
                    <FormLabel>Certificate URL (Optional)</FormLabel>
                    <FormControl>
                        <Input
                            placeholder="https://credly.com/badges/..."
                            {...field}
                        />
                    </FormControl>
                    <FormMessage />
                </FormItem>
            )}
        />
    );
}

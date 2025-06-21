import {
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormDescription,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Resume } from "@/lib/schema";
import { useFormContext } from "react-hook-form";

export function NameField() {
  const form = useFormContext<Resume>();

  return (
    <FormField
      control={form.control}
      name="basics.name"
      render={({ field }) => (
        <FormItem>
          <FormLabel>Full Name</FormLabel>
          <FormControl>
            <Input placeholder="Enter your full name" {...field} />
          </FormControl>
          <FormDescription>This is your public display name.</FormDescription>
          <FormMessage />
        </FormItem>
      )}
    />
  );
}

export function EmailField() {
  const form = useFormContext<Resume>();

  return (
    <FormField
      control={form.control}
      name="basics.email"
      render={({ field }) => (
        <FormItem>
          <FormLabel>Email</FormLabel>
          <FormControl>
            <Input placeholder="Enter your email" {...field} />
          </FormControl>
          <FormDescription>We'll use this to contact you.</FormDescription>
          <FormMessage />
        </FormItem>
      )}
    />
  );
}

export function PhoneField() {
  const form = useFormContext<Resume>();

  return (
    <FormField
      control={form.control}
      name="basics.phone"
      render={({ field }) => (
        <FormItem>
          <FormLabel>Phone Number</FormLabel>
          <FormControl>
            <Input placeholder="Enter your phone number" {...field} />
          </FormControl>
          <FormDescription>Optional, for contact purposes.</FormDescription>
          <FormMessage />
        </FormItem>
      )}
    />
  );
}

export function LocationField() {
  const form = useFormContext<Resume>();

  return (
    <FormField
      control={form.control}
      name="basics.location.address"
      render={({ field }) => (
        <FormItem>
          <FormLabel>Location</FormLabel>
          <FormControl>
            <Input placeholder="Enter your location" {...field} />
          </FormControl>
          <FormDescription>Optional, for job applications.</FormDescription>
          <FormMessage />
        </FormItem>
      )}
    />
  );
}

export function SummaryField() {
  const form = useFormContext<Resume>();

  return (
    <FormField
      control={form.control}
      name="basics.summary"
      render={({ field }) => (
        <FormItem className="col-span-2">
          <FormLabel>Summary</FormLabel>
          <FormControl>
            <Textarea
              placeholder="Write a brief summary of your professional background"
              {...field}
            />
          </FormControl>
          <FormDescription>
            A short introduction about your professional background.
          </FormDescription>
          <FormMessage />
        </FormItem>
      )}
    />
  );
}

export function WebsiteField() {
  const form = useFormContext<Resume>();

  return (
    <FormField
      control={form.control}
      name="basics.url"
      render={({ field }) => (
        <FormItem>
          <FormLabel>Website</FormLabel>
          <FormControl>
            <Input placeholder="Personal website URL" {...field} />
          </FormControl>
          <FormDescription>Optional, to showcase your work.</FormDescription>
          <FormMessage />
        </FormItem>
      )}
    />
  );
}

export function LinkedInField() {
  const form = useFormContext<Resume>();

  return (
    <FormField
      control={form.control}
      name="basics.profiles.0.url"
      render={({ field }) => (
        <FormItem>
          <FormLabel>LinkedIn Profile</FormLabel>
          <FormControl>
            <Input placeholder="Enter your LinkedIn profile URL" {...field} />
          </FormControl>
          <FormDescription>
            Optional, for professional networking.
          </FormDescription>
          <FormMessage />
        </FormItem>
      )}
    />
  );
}

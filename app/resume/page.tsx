// multi-step-form.tsx
"use client";

import { useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "@/components/ui/card";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { ChevronLeft, ChevronRight, Check } from "lucide-react";
import { StepProgress } from "./_components/form-step-progress";
import { Resume, ResumeSchema } from "@/lib/schema";
import {
  EmailField,
  LinkedInField,
  LocationField,
  NameField,
  PhoneField,
  SummaryField,
  WebsiteField,
} from "./_components/profile/fields";
import { ProfileForm } from "./_components/profile/form";

export default function ResumeGenerator() {
  return (
    <div className="max-w-2xl mx-auto p-6 space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="text-2xl font-bold text-center">
            Resume Generator
          </CardTitle>
          <CardDescription className="text-center">
            Create a professional resume in minutes
          </CardDescription>
          <StepProgress />
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="min-h-[400px]">
            <ProfileForm />
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

import { z } from "zod";
import { leadFormOptions } from "@/content/site";

const industryValues = leadFormOptions.industries;
const volumeValues = leadFormOptions.callVolumes;
const useCaseValues = leadFormOptions.useCases;

export const leadFormSchema = z.object({
  fullName: z.string().min(2, "Full name is required"),
  phone: z
    .string()
    .min(10, "Enter a valid phone number")
    .regex(/^[+\d\s()-]+$/, "Enter a valid phone number"),
  businessName: z.string().min(2, "Business name is required"),
  email: z.string().email("Enter a valid email address"),
  industry: z
    .string()
    .min(1, "Select an industry")
    .refine(
      (v) => (industryValues as readonly string[]).includes(v),
      "Select a valid industry",
    ),
  callVolume: z
    .string()
    .min(1, "Select call volume")
    .refine(
      (v) => (volumeValues as readonly string[]).includes(v),
      "Select a valid call volume",
    ),
  useCase: z
    .string()
    .min(1, "Select a use case")
    .refine(
      (v) => (useCaseValues as readonly string[]).includes(v),
      "Select a valid use case",
    ),
  message: z.string().optional(),
  consent: z.boolean().refine((v) => v === true, {
    message: "You must agree to the privacy policy",
  }),
});

export type LeadFormValues = z.infer<typeof leadFormSchema>;

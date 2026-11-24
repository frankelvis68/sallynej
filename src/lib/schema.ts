import { z } from "zod";

/**
 * Nigerian phone number regex:
 * Accepts:
 * - 080..., 090..., 070..., 081..., 091...
 * - +23480..., +23490..., 23480...
 * Total standard length after stripping spaces: 11 (starting with 0) or 13/14 (with 234/+234)
 */
const nigerianPhoneRegex = /^(?:(?:\+?234)|0)[789][01]\d{8}$/;

export const contactFormSchema = z.object({
  name: z.string().min(2, "Please enter your full name"),
  phone: z
    .string()
    .min(10, "Please enter a valid phone number")
    .refine(
      (val) => nigerianPhoneRegex.test(val.replace(/[\s\-()]/g, "")),
      "Please enter a valid Nigerian phone number (e.g. 080... or +234...)"
    ),
  email: z
    .string()
    .email("Please enter a valid email address")
    .optional()
    .or(z.literal("")),
  interest: z.enum(["buy", "rent", "short-let", "land", "other"]),
  message: z
    .string()
    .min(5, "Please describe your property requirements")
    .max(1000, "Message cannot exceed 1000 characters"),
  _gotcha: z.string().max(0, "Spam detected").optional().or(z.literal("")),
});

export type ContactFormData = z.infer<typeof contactFormSchema>;

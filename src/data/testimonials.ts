import { TestimonialItem } from "@/types";
import { SAMPLE_TESTIMONIALS } from "./sample";

/**
 * Production Testimonials Data.
 * Rule: Ships EMPTY by default in production.
 * Component renders NOTHING when array is empty.
 */
const shouldUseSample =
  process.env.NODE_ENV !== "production" ||
  process.env.NEXT_PUBLIC_USE_SAMPLE_DATA === "true";

export const TESTIMONIALS: TestimonialItem[] = shouldUseSample
  ? SAMPLE_TESTIMONIALS
  : [];

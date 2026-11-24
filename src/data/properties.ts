import { Property } from "@/types";
import { SAMPLE_PROPERTIES } from "./sample";

/**
 * Production Properties Data.
 * Rule: Ships EMPTY by default.
 * Sample data loads ONLY when:
 * 1. process.env.NODE_ENV !== "production", OR
 * 2. NEXT_PUBLIC_USE_SAMPLE_DATA === "true"
 */
const shouldUseSample =
  process.env.NODE_ENV !== "production" ||
  process.env.NEXT_PUBLIC_USE_SAMPLE_DATA === "true";

export const PROPERTIES: Property[] = shouldUseSample ? SAMPLE_PROPERTIES : [];

export const isUsingSampleProperties = shouldUseSample && PROPERTIES.length > 0;

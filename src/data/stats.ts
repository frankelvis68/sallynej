import { StatItem } from "@/types";
import { SAMPLE_STATS } from "./sample";

/**
 * Production Stats Data.
 * Rule: Ships EMPTY by default in production.
 * Component renders NOTHING when array is empty.
 */
const shouldUseSample =
  process.env.NODE_ENV !== "production" ||
  process.env.NEXT_PUBLIC_USE_SAMPLE_DATA === "true";

export const STATS: StatItem[] = shouldUseSample ? SAMPLE_STATS : [];

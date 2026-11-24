import { Property } from "@/types";
import { supabase } from "@/lib/supabase";
import { PROPERTIES as FALLBACK_PROPERTIES } from "@/data/properties";

export interface DatabaseProperty {
  id: string;
  slug: string;
  title: string;
  type: "house" | "flat" | "land" | "commercial";
  listing_type: "sale" | "rent" | "short-let";
  price: number;
  currency: string;
  price_period: "total" | "year" | "night";
  location: string;
  area: string;
  bedrooms?: number | null;
  bathrooms?: number | null;
  size_sqm?: number | null;
  description: string;
  images: { src: string; alt: string }[] | null;
  featured: boolean;
  created_at?: string;
}

/**
 * Maps database row to application Property type
 */
function mapFromDb(row: DatabaseProperty): Property {
  return {
    id: row.id,
    slug: row.slug,
    title: row.title,
    type: row.type,
    listingType: row.listing_type,
    price: Number(row.price),
    currency: "NGN",
    pricePeriod: row.price_period,
    location: row.location,
    area: row.area,
    bedrooms: row.bedrooms ?? undefined,
    bathrooms: row.bathrooms ?? undefined,
    sizeSqm: row.size_sqm ?? undefined,
    description: row.description,
    images: Array.isArray(row.images) ? row.images : [],
    featured: Boolean(row.featured),
    isSample: false,
  };
}

/**
 * Fetches properties from Supabase when configured, otherwise falls back gracefully to local data
 */
export async function getProperties(): Promise<Property[]> {
  if (!supabase) {
    return FALLBACK_PROPERTIES;
  }

  try {
    const { data, error } = await supabase
      .from("properties")
      .select("*")
      .order("created_at", { ascending: false });

    if (error || !data || data.length === 0) {
      return FALLBACK_PROPERTIES;
    }

    return (data as DatabaseProperty[]).map(mapFromDb);
  } catch (err) {
    console.error("Failed to fetch properties from Supabase:", err);
    return FALLBACK_PROPERTIES;
  }
}

/**
 * Fetches a single property by slug from Supabase, or falls back to local data
 */
export async function getPropertyBySlug(slug: string): Promise<Property | null> {
  if (!supabase) {
    return FALLBACK_PROPERTIES.find((p) => p.slug === slug) || null;
  }

  try {
    const { data, error } = await supabase
      .from("properties")
      .select("*")
      .eq("slug", slug)
      .single();

    if (error || !data) {
      return FALLBACK_PROPERTIES.find((p) => p.slug === slug) || null;
    }

    return mapFromDb(data as DatabaseProperty);
  } catch (err) {
    console.error(`Failed to fetch property ${slug} from Supabase:`, err);
    return FALLBACK_PROPERTIES.find((p) => p.slug === slug) || null;
  }
}

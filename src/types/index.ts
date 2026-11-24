export type PropertyType = "house" | "flat" | "land" | "commercial";
export type ListingType = "sale" | "rent" | "short-let";
export type PricePeriod = "total" | "year" | "night";

export interface PropertyImage {
  src: string;
  alt: string;
}

export interface Property {
  id: string;
  slug: string;
  title: string;
  type: PropertyType;
  listingType: ListingType;
  price: number;
  currency: "NGN";
  pricePeriod: PricePeriod;
  location: string;
  area: string; // slug e.g. "karu", "katampe"
  bedrooms?: number;
  bathrooms?: number;
  sizeSqm?: number;
  description: string;
  images: PropertyImage[];
  featured: boolean;
  isSample?: boolean;
}

export interface PropertyFilterParams {
  listing?: ListingType;
  type?: PropertyType;
  area?: string;
  min?: number;
  max?: number;
  beds?: number;
}

export interface StatItem {
  id: string;
  label: string;
  value: string;
  icon?: string;
}

export interface TestimonialItem {
  id: string;
  name: string;
  role: string;
  quote: string;
  rating?: number;
  avatarSrc?: string;
}

export interface ServiceItem {
  id: string;
  title: string;
  slug: string;
  shortDesc: string;
  description: string;
  iconName: string;
}

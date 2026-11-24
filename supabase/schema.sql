-- Supabase PostgreSQL Schema for Sally-Nej Dynamic Company Limited
-- Run this script in the Supabase SQL Editor (https://supabase.com/dashboard/project/_/sql)

-- 1. Create table
CREATE TABLE IF NOT EXISTS public.properties (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  slug TEXT UNIQUE NOT NULL,
  title TEXT NOT NULL,
  type TEXT NOT NULL CHECK (type IN ('house', 'flat', 'land', 'commercial')),
  listing_type TEXT NOT NULL CHECK (listing_type IN ('sale', 'rent', 'short-let')),
  price NUMERIC NOT NULL CHECK (price >= 0),
  currency TEXT DEFAULT 'NGN' NOT NULL,
  price_period TEXT DEFAULT 'total' NOT NULL CHECK (price_period IN ('total', 'year', 'night')),
  location TEXT NOT NULL,
  area TEXT NOT NULL,
  bedrooms INTEGER,
  bathrooms INTEGER,
  size_sqm NUMERIC,
  description TEXT NOT NULL,
  images JSONB DEFAULT '[]'::jsonb NOT NULL,
  featured BOOLEAN DEFAULT false NOT NULL,
  created_at TIMESTAMPTZ DEFAULT now() NOT NULL
);

-- 2. Enable Row Level Security (RLS)
ALTER TABLE public.properties ENABLE ROW LEVEL SECURITY;

-- 3. Public Read Access (Anyone can browse properties)
CREATE POLICY "Allow public read access to properties" 
  ON public.properties 
  FOR SELECT 
  TO public 
  USING (true);

-- 4. Sample Seed Data
INSERT INTO public.properties (
  slug, title, type, listing_type, price, currency, price_period, location, area, bedrooms, bathrooms, size_sqm, description, images, featured
) VALUES 
(
  '4-bedroom-terrace-duplex-karu',
  '4-Bedroom Terrace Duplex',
  'house',
  'sale',
  550000000,
  'NGN',
  'total',
  'Karu, Abuja FCT',
  'karu',
  4,
  5,
  420,
  'Contemporary stone and timber clad 4 bedroom modern terrace duplex building with paved driveway, fitted gourmet kitchen, en-suite rooms, and verified C of O.',
  '[{"src": "/images/properties/prop-1.jpg", "alt": "4-Bedroom Terrace Duplex in Karu"}]'::jsonb,
  true
),
(
  'contemporary-5-bedroom-villa-katampe',
  'Contemporary 5-Bedroom Villa with Pool',
  'house',
  'sale',
  850000000,
  'NGN',
  'total',
  'Katampe Extension, Abuja',
  'katampe',
  5,
  6,
  750,
  'Expansive ultra-modern luxury architectural duplex mansion in Katampe Extension with private infinity pool, manicured lawn, and glass terraces overlooking panoramic hills.',
  '[{"src": "/images/properties/prop-2.jpg", "alt": "5-Bedroom Villa with Pool in Katampe"}]'::jsonb,
  true
),
(
  'modern-3-bedroom-serviced-flat-lugbe',
  'Modern 3-Bedroom Serviced Flat',
  'flat',
  'rent',
  4500000,
  'NGN',
  'year',
  'Lugbe, Airport Road Corridor',
  'lugbe',
  3,
  3,
  180,
  'Chic interior living room of serviced modern apartment in Lugbe with floor to ceiling windows, 24/7 solar backup power, and dedicated facility management.',
  '[{"src": "/images/properties/prop-3.jpg", "alt": "3-Bedroom Serviced Flat in Lugbe"}]'::jsonb,
  true
),
(
  'luxury-2-bedroom-executive-shortlet-airport-road',
  'Luxury 2-Bedroom Executive Short Let',
  'flat',
  'short-let',
  155000,
  'NGN',
  'night',
  'Airport Road, Abuja',
  'airport-road',
  2,
  2,
  120,
  'High-end penthouse executive apartment with fiber Wi-Fi, chef on demand, 24/7 security and concierge services right along Airport Road.',
  '[{"src": "/images/properties/prop-4.jpg", "alt": "Luxury 2-Bedroom Short Let on Airport Road"}]'::jsonb,
  true
),
(
  'prime-residential-land-650sqm-kubwa',
  'Prime Residential Land (650sqm)',
  'land',
  'sale',
  30000000,
  'NGN',
  'total',
  'Kubwa District, Abuja',
  'kubwa',
  NULL,
  NULL,
  650,
  'Pristine surveyed elevated residential land plot in Kubwa District with perimeter boundary pegging, clean dry topography, and AGIS-verified R of O.',
  '[{"src": "/images/properties/prop-5.jpg", "alt": "Residential Land Plot in Kubwa"}]'::jsonb,
  true
),
(
  'exclusive-4-bedroom-semi-detached-galadimawa',
  'Exclusive 4-Bedroom Semi-Detached',
  'house',
  'sale',
  380000000,
  'NGN',
  'total',
  'Galadimawa, Abuja FCT',
  'galadimawa',
  4,
  4,
  380,
  'Modern geometric semi-detached duplex residential building in gated estate with asphalt access roads, perimeter security, and family-friendly community.',
  '[{"src": "/images/properties/prop-6.jpg", "alt": "4-Bedroom Semi-Detached in Galadimawa"}]'::jsonb,
  true
)
ON CONFLICT (slug) DO NOTHING;

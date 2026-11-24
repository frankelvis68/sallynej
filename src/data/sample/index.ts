import { Property, StatItem, TestimonialItem } from "@/types";

export const SAMPLE_PROPERTIES: Property[] = [
  {
    id: "sample-1",
    slug: "4-bedroom-terrace-duplex-karu",
    title: "4-Bedroom Terrace Duplex",
    type: "house",
    listingType: "sale",
    price: 550000000,
    currency: "NGN",
    pricePeriod: "total",
    location: "Karu, Abuja FCT",
    area: "karu",
    bedrooms: 4,
    bathrooms: 5,
    sizeSqm: 420,
    description: "Contemporary stone and timber clad 4 bedroom modern terrace duplex building with paved driveway, fitted gourmet kitchen, en-suite rooms, and verified C of O.",
    images: [
      { src: "/images/properties/prop-1.jpg", alt: "4-Bedroom Terrace Duplex in Karu" }
    ],
    featured: true,
    isSample: true,
  },
  {
    id: "sample-2",
    slug: "contemporary-5-bedroom-villa-katampe",
    title: "Contemporary 5-Bedroom Villa with Pool",
    type: "house",
    listingType: "sale",
    price: 850000000,
    currency: "NGN",
    pricePeriod: "total",
    location: "Katampe Extension, Abuja",
    area: "katampe",
    bedrooms: 5,
    bathrooms: 6,
    sizeSqm: 750,
    description: "Expansive ultra-modern luxury architectural duplex mansion in Katampe Extension with private infinity pool, manicured lawn, and glass terraces overlooking panoramic hills.",
    images: [
      { src: "/images/properties/prop-2.jpg", alt: "5-Bedroom Villa with Pool in Katampe" }
    ],
    featured: true,
    isSample: true,
  },
  {
    id: "sample-3",
    slug: "modern-3-bedroom-serviced-flat-lugbe",
    title: "Modern 3-Bedroom Serviced Flat",
    type: "flat",
    listingType: "rent",
    price: 4500000,
    currency: "NGN",
    pricePeriod: "year",
    location: "Lugbe, Airport Road Corridor",
    area: "lugbe",
    bedrooms: 3,
    bathrooms: 3,
    sizeSqm: 180,
    description: "Chic interior living room of serviced modern apartment in Lugbe with floor to ceiling windows, 24/7 solar backup power, and dedicated facility management.",
    images: [
      { src: "/images/properties/prop-3.jpg", alt: "3-Bedroom Serviced Flat in Lugbe" }
    ],
    featured: true,
    isSample: true,
  },
  {
    id: "sample-4",
    slug: "luxury-2-bedroom-executive-shortlet-airport-road",
    title: "Luxury 2-Bedroom Executive Short Let",
    type: "flat",
    listingType: "short-let",
    price: 155000,
    currency: "NGN",
    pricePeriod: "night",
    location: "Airport Road, Abuja",
    area: "airport-road",
    bedrooms: 2,
    bathrooms: 2,
    sizeSqm: 120,
    description: "High-end penthouse executive apartment with fiber Wi-Fi, chef on demand, 24/7 security and concierge services right along Airport Road.",
    images: [
      { src: "/images/properties/prop-4.jpg", alt: "Luxury 2-Bedroom Short Let on Airport Road" }
    ],
    featured: true,
    isSample: true,
  },
  {
    id: "sample-5",
    slug: "prime-residential-land-650sqm-kubwa",
    title: "Prime Residential Land (650sqm)",
    type: "land",
    listingType: "sale",
    price: 30000000,
    currency: "NGN",
    pricePeriod: "total",
    location: "Kubwa District, Abuja",
    area: "kubwa",
    sizeSqm: 650,
    description: "Pristine surveyed elevated residential land plot in Kubwa District with perimeter boundary pegging, clean dry topography, and AGIS-verified R of O.",
    images: [
      { src: "/images/properties/prop-5.jpg", alt: "Residential Land Plot in Kubwa" }
    ],
    featured: true,
    isSample: true,
  },
  {
    id: "sample-6",
    slug: "exclusive-4-bedroom-semi-detached-galadimawa",
    title: "Exclusive 4-Bedroom Semi-Detached",
    type: "house",
    listingType: "sale",
    price: 380000000,
    currency: "NGN",
    pricePeriod: "total",
    location: "Galadimawa, Abuja FCT",
    area: "galadimawa",
    bedrooms: 4,
    bathrooms: 4,
    sizeSqm: 380,
    description: "Modern geometric semi-detached duplex residential building in gated estate with asphalt access roads, perimeter security, and family-friendly community.",
    images: [
      { src: "/images/properties/prop-6.jpg", alt: "4-Bedroom Semi-Detached in Galadimawa" }
    ],
    featured: true,
    isSample: true,
  },
];

export const SAMPLE_STATS: StatItem[] = [
  { id: "stat-1", label: "Properties Listed", value: "450+", icon: "Building2" },
  { id: "stat-2", label: "Happy Clients", value: "1,200+", icon: "Smile" },
  { id: "stat-3", label: "Years of Experience", value: "12+", icon: "History" },
  { id: "stat-4", label: "Verified C of O & R of O", value: "100%", icon: "ShieldCheck" },
];

export const SAMPLE_TESTIMONIALS: TestimonialItem[] = [
  {
    id: "test-1",
    name: "Dr. Emmanuel Okafor",
    role: "Diaspora Investor, United Kingdom",
    quote: "Buying real estate in Nigeria while residing in London is notoriously fraught with anxiety. Sally-Nej Dynamic handled my Katampe duplex purchase with sheer professionalism, verified documentation, and weekly video logs. Flawless execution.",
    rating: 5,
  },
  {
    id: "test-2",
    name: "Hajia Amina Bello",
    role: "Homeowner, Katampe Extension",
    quote: "The architectural quality delivered in our Katampe Extension villa exceeded our expectations. From initial land search to interior handover, the team proved genuine corporate integrity exists in Abuja real estate.",
    rating: 5,
  },
  {
    id: "test-3",
    name: "Barrister Chidi Nwosu",
    role: "Corporate Tenant & Landlord",
    quote: "As a legal practitioner, I subjected their title paperwork to intense scrutiny. Their C of O and planning approvals were authentic and spotless. I currently entrust them with managing multiple executive residential properties.",
    rating: 5,
  },
];

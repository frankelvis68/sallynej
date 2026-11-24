// Single Source of Truth for all business facts
// All unconfirmed items marked with // TODO_CLIENT: confirm

export const SITE = {
  // TODO_CLIENT: confirm exact legal name spelling and hyphenation
  legalName: "Sally-Nej Dynamic Company Limited",

  // TODO_CLIENT: confirm the digits read from blurry photo
  rcNumber: "17551415",

  // TODO_CLIENT: confirm brand short name
  brandName: "Sally-Nej",

  industry: "real estate",

  base: "Abuja, Nigeria",

  // TODO_CLIENT: confirm active confirmed services
  servicesConfirmed: [
    {
      id: "property-sales",
      title: "Property Sales",
      slug: "property-sales",
      shortDesc: "Vetted residential terraces, detached duplexes, and commercial properties with verified titles.",
      description: "Our property acquisition advisory covers handpicked residential terraces, detached villas, penthouses, and commercial plots curated for high capital appreciation and genuine legal standing across prime Abuja districts.",
      iconName: "Home",
    },
    {
      id: "rentals",
      title: "Rentals",
      slug: "rentals",
      shortDesc: "Long-term residential and corporate leases in secure gated estates across Abuja.",
      description: "We provide executive leasing solutions for professionals, expatriates, and families seeking quality rental properties in secure, serviced neighborhoods across the Federal Capital Territory.",
      iconName: "Key",
    },
    {
      id: "short-lets",
      title: "Short Lets",
      slug: "short-lets",
      shortDesc: "Serviced executive accommodations tailored for business travellers and diaspora visits.",
      description: "High-spec furnished apartments and villas equipped with backup power, high-speed internet, and dedicated management for executive stays and diaspora visits to Abuja.",
      iconName: "Building2",
    },
    {
      id: "land-sales",
      title: "Land Sales",
      slug: "land-sales",
      shortDesc: "Surveyed residential and commercial plots with verified C of O and R of O documentation.",
      description: "We broker litigation-free land plots with authentic title documentation across strategic expansion corridors in Abuja, providing security and peace of mind for private developers and investors.",
      iconName: "MapPin",
    },
  ],

  // Inferred from listings; TODO_CLIENT: confirm coverage zones
  areasServed: [
    { name: "Karu", slug: "karu" },
    { name: "Kuje", slug: "kuje" },
    { name: "Kubwa", slug: "kubwa" },
    { name: "Lugbe", slug: "lugbe" },
    { name: "Katampe", slug: "katampe" },
    { name: "Galadimawa", slug: "galadimawa" },
    { name: "Airport Road", slug: "airport-road" },
  ],

  // Environment variables for dynamic contact channels
  contact: {
    get phone() {
      return process.env.NEXT_PUBLIC_PHONE || "";
    },
    get whatsapp() {
      return process.env.NEXT_PUBLIC_WHATSAPP || "";
    },
    get email() {
      return process.env.NEXT_PUBLIC_EMAIL || "";
    },
    get address() {
      return process.env.NEXT_PUBLIC_ADDRESS || "";
    },
    get facebook() {
      return process.env.NEXT_PUBLIC_FACEBOOK || "";
    },
    get instagram() {
      return process.env.NEXT_PUBLIC_INSTAGRAM || "";
    },
    get linkedin() {
      return process.env.NEXT_PUBLIC_LINKEDIN || "";
    },
    get siteUrl() {
      const url = process.env.NEXT_PUBLIC_SITE_URL || "";
      if (!url && process.env.NODE_ENV === "development") {
        return "http://localhost:3000";
      }
      return url;
    },
    get formEndpoint() {
      return process.env.NEXT_PUBLIC_FORM_ENDPOINT || "";
    },
  },
};

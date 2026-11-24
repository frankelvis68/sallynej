import { SITE } from "@/config/site";

export function generateRealEstateAgentJsonLd() {
  const jsonLd: Record<string, unknown> = {
    "@context": "https://schema.org",
    "@type": "RealEstateAgent",
    name: SITE.legalName,
    url: SITE.contact.siteUrl || "http://localhost:3000",
    areaServed: {
      "@type": "AdministrativeArea",
      name: "Abuja, Nigeria",
    },
  };

  if (SITE.contact.phone) {
    jsonLd.telephone = SITE.contact.phone;
  }
  if (SITE.contact.email) {
    jsonLd.email = SITE.contact.email;
  }
  if (SITE.contact.address) {
    jsonLd.address = {
      "@type": "PostalAddress",
      streetAddress: SITE.contact.address,
      addressLocality: "Abuja",
      addressCountry: "NG",
    };
  }

  const sameAs: string[] = [];
  if (SITE.contact.facebook) sameAs.push(SITE.contact.facebook);
  if (SITE.contact.instagram) sameAs.push(SITE.contact.instagram);
  if (SITE.contact.linkedin) sameAs.push(SITE.contact.linkedin);

  if (sameAs.length > 0) {
    jsonLd.sameAs = sameAs;
  }

  return jsonLd;
}

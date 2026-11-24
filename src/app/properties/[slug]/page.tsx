import React from "react";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import Link from "next/link";
import { PROPERTIES } from "@/data/properties";
import { SAMPLE_PROPERTIES } from "@/data/sample";
import { SITE } from "@/config/site";
import { formatCurrency } from "@/lib/currency";
import { buildTelLink, buildWhatsAppLink } from "@/lib/whatsapp";
import { Container } from "@/components/common/Container";
import { LightboxGallery } from "@/components/properties/LightboxGallery";
import { ContactForm } from "@/components/contact/ContactForm";
import { SampleBadge } from "@/components/common/SampleBadge";
import {
  MapPin,
  Bed,
  Bath,
  Maximize,
  CheckCircle2,
  Phone,
  MessageCircle,
  ArrowLeft,
} from "lucide-react";

interface PageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  // Combine all possible slugs for static pre-rendering
  const allProperties = [...PROPERTIES, ...SAMPLE_PROPERTIES];
  return allProperties.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const allProperties = [...PROPERTIES, ...SAMPLE_PROPERTIES];
  const property = allProperties.find((p) => p.slug === slug);

  if (!property) {
    return { title: "Property Not Found" };
  }

  return {
    title: `${property.title} | ${SITE.brandName}`,
    description: property.description,
    openGraph: {
      title: `${property.title} | ${SITE.brandName}`,
      description: property.description,
      images: property.images.length > 0 ? [property.images[0].src] : [],
    },
  };
}

export default async function PropertyDetailPage({ params }: PageProps) {
  const { slug } = await params;
  const allProperties = [...PROPERTIES, ...SAMPLE_PROPERTIES];
  const property = allProperties.find((p) => p.slug === slug);

  if (!property) {
    notFound();
  }

  const hasPhone = Boolean(SITE.contact.phone);
  const hasWhatsApp = Boolean(SITE.contact.whatsapp);

  return (
    <div className="py-10 sm:py-16 bg-[#f7f9fc]">
      <Container className="flex flex-col gap-8">
        {/* Breadcrumb Back Link */}
        <div>
          <Link
            href="/properties"
            className="inline-flex items-center gap-2 text-xs sm:text-sm font-semibold text-[#24389c] hover:underline"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Back to all properties</span>
          </Link>
        </div>

        {/* Gallery & Lightbox */}
        <LightboxGallery
          images={property.images}
          title={property.title}
        />

        {/* Main Content Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Left Details (8 Cols) */}
          <div className="lg:col-span-8 flex flex-col gap-8">
            <div className="bg-white p-6 sm:p-8 rounded-2xl border border-[#e2e8f0] shadow-sm flex flex-col gap-4">
              <div className="flex flex-wrap items-center gap-2">
                <span className="px-3 py-1 rounded-full bg-[#3f51b5] text-white text-xs font-semibold uppercase tracking-wider">
                  {property.listingType === "sale"
                    ? "For Sale"
                    : property.listingType === "rent"
                    ? "For Rent"
                    : "Short Let"}
                </span>
                <span className="px-3 py-1 rounded-full bg-[#f2f4f7] text-[#191c1e] text-xs font-semibold capitalize">
                  {property.type}
                </span>
                {property.isSample && <SampleBadge />}
              </div>

              <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-[#191c1e] tracking-tight">
                {property.title}
              </h1>

              <div className="flex items-center gap-1.5 text-sm text-[#454652]">
                <MapPin className="w-4 h-4 text-[#24389c]" />
                <span>{property.location}</span>
              </div>

              {/* Price Display */}
              <div className="pt-2 pb-2">
                <span className="text-3xl sm:text-4xl font-extrabold text-[#24389c]">
                  {formatCurrency(property.price, property.pricePeriod)}
                </span>
              </div>

              {/* Key Specs Bar */}
              {(property.bedrooms || property.bathrooms || property.sizeSqm) && (
                <div className="grid grid-cols-3 py-4 px-6 bg-[#f2f4f7] rounded-xl text-center divide-x divide-[#e2e8f0] my-2">
                  {property.bedrooms ? (
                    <div className="flex flex-col items-center">
                      <Bed className="w-5 h-5 text-[#24389c] mb-1" />
                      <span className="font-bold text-base text-[#191c1e]">
                        {property.bedrooms}
                      </span>
                      <span className="text-xs text-[#454652]">Bedrooms</span>
                    </div>
                  ) : null}

                  {property.bathrooms ? (
                    <div className="flex flex-col items-center">
                      <Bath className="w-5 h-5 text-[#24389c] mb-1" />
                      <span className="font-bold text-base text-[#191c1e]">
                        {property.bathrooms}
                      </span>
                      <span className="text-xs text-[#454652]">Bathrooms</span>
                    </div>
                  ) : null}

                  {property.sizeSqm ? (
                    <div className="flex flex-col items-center">
                      <Maximize className="w-5 h-5 text-[#24389c] mb-1" />
                      <span className="font-bold text-base text-[#191c1e]">
                        {property.sizeSqm} m²
                      </span>
                      <span className="text-xs text-[#454652]">Area Size</span>
                    </div>
                  ) : null}
                </div>
              )}

              {/* Description */}
              <div className="pt-4 border-t border-[#e2e8f0] flex flex-col gap-3">
                <h2 className="text-lg font-bold text-[#191c1e]">Property Overview</h2>
                <p className="text-sm sm:text-base text-[#454652] leading-relaxed whitespace-pre-line">
                  {property.description}
                </p>
              </div>

              {/* Verified Title Status */}
              <div className="bg-[#f7f9fc] p-4 rounded-xl border border-[#e2e8f0] flex items-center gap-3">
                <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0" />
                <div className="text-xs sm:text-sm text-[#191c1e]">
                  <strong>Title Documentation:</strong> Handled with legal diligence through {SITE.legalName}.
                </div>
              </div>
            </div>
          </div>

          {/* Right Action & Enquiry Column (4 Cols) */}
          <div className="lg:col-span-4 flex flex-col gap-6 sticky top-24">
            {/* Quick Action Box */}
            <div className="bg-white p-6 rounded-2xl border border-[#e2e8f0] shadow-sm flex flex-col gap-4">
              <h3 className="font-bold text-base text-[#191c1e]">
                Direct Enquiry Desk
              </h3>
              <p className="text-xs text-[#454652] leading-relaxed">
                Connect directly with our property advisors regarding this listing.
              </p>

              {hasWhatsApp && (
                <a
                  href={buildWhatsAppLink(
                    SITE.contact.whatsapp,
                    `Hello ${SITE.brandName}, I am interested in inquiring about "${property.title}" (${property.location}) listed at ${formatCurrency(property.price, property.pricePeriod)}.`
                  )}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full py-3 bg-[#059669] hover:bg-[#047857] text-white text-xs sm:text-sm font-semibold rounded-lg shadow-sm transition-colors flex items-center justify-center gap-2"
                >
                  <MessageCircle className="w-4 h-4" />
                  <span>Enquire on WhatsApp</span>
                </a>
              )}

              {hasPhone && (
                <a
                  href={buildTelLink(SITE.contact.phone)}
                  className="w-full py-3 bg-[#24389c] hover:bg-[#1b2b7b] text-white text-xs sm:text-sm font-semibold rounded-lg shadow-sm transition-colors flex items-center justify-center gap-2"
                >
                  <Phone className="w-4 h-4" />
                  <span>Request a Call Back</span>
                </a>
              )}

              {!hasWhatsApp && !hasPhone && (
                <Link
                  href="/contact"
                  className="w-full py-3 bg-[#24389c] hover:bg-[#1b2b7b] text-white text-xs sm:text-sm font-semibold rounded-lg shadow-sm transition-colors text-center"
                >
                  Contact Desk
                </Link>
              )}
            </div>

            {/* Embedded Property Enquiry Form */}
            <div className="bg-white rounded-2xl border border-[#e2e8f0] shadow-sm overflow-hidden">
              <div className="px-6 pt-5 pb-2">
                <h4 className="font-bold text-sm text-[#191c1e]">
                  Schedule an Inspection
                </h4>
              </div>
              <ContactForm
                propertyTitle={property.title}
                defaultInterest={
                  property.listingType === "sale"
                    ? "buy"
                    : property.listingType === "rent"
                    ? "rent"
                    : "short-let"
                }
              />
            </div>
          </div>
        </div>
      </Container>
    </div>
  );
}

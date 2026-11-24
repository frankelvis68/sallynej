import React from "react";
import type { Metadata } from "next";
import Link from "next/link";
import { SITE } from "@/config/site";
import { Container } from "@/components/common/Container";
import { SectionHeading } from "@/components/common/SectionHeading";
import { Home, Key, Building2, MapPin, ArrowRight } from "lucide-react";

export const metadata: Metadata = {
  title: `Our Services | ${SITE.brandName}`,
  description: `Confirmed real estate services provided by ${SITE.legalName} in ${SITE.base}.`,
};

export default function ServicesPage() {
  const getIcon = (iconName: string) => {
    switch (iconName) {
      case "Home":
        return <Home className="w-8 h-8 text-[#24389c]" />;
      case "Key":
        return <Key className="w-8 h-8 text-[#795902]" />;
      case "Building2":
        return <Building2 className="w-8 h-8 text-[#24389c]" />;
      case "MapPin":
        return <MapPin className="w-8 h-8 text-[#795902]" />;
      default:
        return <Home className="w-8 h-8 text-[#24389c]" />;
    }
  };

  return (
    <div className="py-12 sm:py-20 bg-[#f7f9fc]">
      <Container className="flex flex-col gap-12">
        <SectionHeading
          tagline="Confirmed Practice Areas"
          title="Our Real Estate Services"
          description={`Professional property brokerage and land acquisition solutions serving ${SITE.base}.`}
        />

        {/* 4 Confirmed Services Detailed Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {SITE.servicesConfirmed.map((service) => (
            <div
              key={service.id}
              className="bg-white p-8 sm:p-10 rounded-2xl border border-[#e2e8f0] shadow-sm hover:shadow-md transition-shadow flex flex-col justify-between gap-6"
            >
              <div className="flex flex-col gap-4">
                <div className="w-14 h-14 rounded-xl bg-[#f2f4f7] flex items-center justify-center">
                  {getIcon(service.iconName)}
                </div>

                <h2 className="text-xl sm:text-2xl font-bold text-[#191c1e]">
                  {service.title}
                </h2>

                <p className="text-sm sm:text-base text-[#454652] leading-relaxed">
                  {service.description}
                </p>
              </div>

              <div className="pt-4 border-t border-[#e2e8f0] flex items-center justify-between">
                <Link
                  href={`/properties?listing=${
                    service.slug === "property-sales"
                      ? "sale"
                      : service.slug === "rentals"
                      ? "rent"
                      : service.slug === "short-lets"
                      ? "short-let"
                      : "sale"
                  }`}
                  className="inline-flex items-center gap-1.5 text-xs sm:text-sm font-semibold text-[#24389c] hover:underline"
                >
                  <span>View available properties</span>
                  <ArrowRight className="w-4 h-4" />
                </Link>

                <Link
                  href="/contact"
                  className="text-xs font-semibold text-[#795902] hover:underline"
                >
                  Inquire
                </Link>
              </div>
            </div>
          ))}
        </div>
      </Container>
    </div>
  );
}

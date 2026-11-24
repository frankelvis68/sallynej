import React from "react";
import type { Metadata } from "next";
import Link from "next/link";
import { SITE } from "@/config/site";
import { Container } from "@/components/common/Container";
import { SectionHeading } from "@/components/common/SectionHeading";
import { CheckCircle2, Building2 } from "lucide-react";

export const metadata: Metadata = {
  title: `About Us | ${SITE.brandName}`,
  description: `${SITE.legalName} is a real estate company serving ${SITE.base}.`,
};

export default function AboutPage() {
  return (
    <div className="py-12 sm:py-20 bg-[#f7f9fc]">
      <Container className="flex flex-col gap-12">
        <SectionHeading
          tagline="Corporate Profile"
          title={`About ${SITE.legalName}`}
          description={`Registered real estate company operating in ${SITE.base}.`}
        />

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          <div className="lg:col-span-8 bg-white p-8 sm:p-10 rounded-2xl border border-[#e2e8f0] shadow-sm flex flex-col gap-6 text-sm sm:text-base text-[#454652] leading-relaxed">
            <h2 className="text-xl sm:text-2xl font-bold text-[#191c1e]">
              Company Overview
            </h2>

            <p>
              <strong>{SITE.legalName}</strong>{SITE.rcNumber ? ` (RC: ${SITE.rcNumber})` : ""} is a real estate company serving {SITE.base}. We facilitate the acquisition, leasing, and title documentation of quality real estate assets across the Federal Capital Territory.
            </p>

            <p>
              Our confirmed scope of operations is focused strictly on four specialized services:
            </p>

            <ul className="space-y-3 pl-2">
              {SITE.servicesConfirmed.map((service) => (
                <li key={service.id} className="flex items-start gap-3">
                  <CheckCircle2 className="w-5 h-5 text-[#24389c] shrink-0 mt-0.5" />
                  <span>
                    <strong>{service.title}:</strong> {service.shortDesc}
                  </span>
                </li>
              ))}
            </ul>

            <h3 className="text-lg font-bold text-[#191c1e] mt-4">
              Geographic Focus
            </h3>
            <p>
              Our property brokerage and land acquisition advisory actively covers key districts across Abuja, including:
            </p>
            <div className="flex flex-wrap gap-2 pt-1">
              {SITE.areasServed.map((area) => (
                <span
                  key={area.slug}
                  className="px-3.5 py-1.5 rounded-full bg-[#f2f4f7] text-[#191c1e] text-xs font-semibold border border-[#e2e8f0]"
                >
                  {area.name}
                </span>
              ))}
            </div>

            <div className="pt-6 border-t border-[#e2e8f0] flex flex-col sm:flex-row items-center justify-between gap-4">
              <p className="text-xs text-[#454652]">
                Looking to buy, rent, or invest in Abuja properties?
              </p>
              <Link
                href="/contact"
                className="bg-[#24389c] hover:bg-[#1b2b7b] text-white text-xs sm:text-sm font-semibold px-6 py-2.5 rounded-lg shadow-sm transition-colors"
              >
                Inquire Now
              </Link>
            </div>
          </div>

          {/* Right Corporate Badge Box */}
          <div className="lg:col-span-4 flex flex-col gap-6">
            <div className="bg-[#14213d] text-white p-8 rounded-2xl shadow-sm flex flex-col gap-6">
              <div className="w-12 h-12 rounded-xl bg-white/10 flex items-center justify-center">
                <Building2 className="w-6 h-6 text-[#fdd275]" />
              </div>

              <div className="flex flex-col gap-1">
                <span className="text-xs text-[#fdd275] uppercase tracking-wider font-semibold">
                  Corporate Registration
                </span>
                <span className="text-lg font-bold text-white">
                  {SITE.legalName}
                </span>
                {SITE.rcNumber && (
                  <span className="text-xs text-[#c5d2f7] mt-1 font-mono">
                    RC: {SITE.rcNumber}
                  </span>
                )}
              </div>

              <div className="border-t border-white/10 pt-4 text-xs text-[#c5d2f7] leading-relaxed">
                Operating in full accordance with Nigerian real estate statutes across the Federal Capital Territory.
              </div>
            </div>
          </div>
        </div>
      </Container>
    </div>
  );
}

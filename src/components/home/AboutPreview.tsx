import React from "react";
import Image from "next/image";
import Link from "next/link";
import { SITE } from "@/config/site";
import { SectionHeading } from "@/components/common/SectionHeading";
import { Building2, ArrowRight } from "lucide-react";

export const AboutPreview: React.FC = () => {
  return (
    <section className="w-full py-16 sm:py-24 bg-white border-b border-[#e2e8f0]">
      <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-12 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
        {/* Architectural Image Showcase */}
        <div className="relative">
          <div className="relative rounded-2xl overflow-hidden shadow-xl aspect-4/3 bg-[#eceef1]">
            <Image
              src="/images/properties/prop-2.jpg"
              alt="Architectural development in Katampe Abuja"
              fill
              sizes="(max-width: 1024px) 100vw, 50vw"
              className="object-cover object-center"
            />
          </div>

          {/* Overlaid RC Badge */}
          {SITE.rcNumber && (
            <div className="absolute -bottom-5 -right-3 sm:right-6 bg-white p-4 rounded-xl shadow-xl border border-[#e2e8f0] flex items-center gap-3.5 max-w-xs">
              <div className="w-10 h-10 rounded-lg bg-[#fdd275]/40 flex items-center justify-center shrink-0">
                <Building2 className="w-5 h-5 text-[#795902]" />
              </div>
              <div>
                <span className="font-bold text-sm text-[#191c1e] block">
                  RC: {SITE.rcNumber}
                </span>
                <span className="text-[11px] text-[#454652]">
                  Corporate Affairs Commission Registered
                </span>
              </div>
            </div>
          )}
        </div>

        {/* Confirmed neutral copy */}
        <div className="flex flex-col gap-6">
          <SectionHeading
            tagline={`About ${SITE.brandName}`}
            title="Real Estate Brokerage &amp; Advisory in Abuja"
            description=""
          />

          <div className="text-sm sm:text-base text-[#454652] leading-relaxed flex flex-col gap-4">
            <p>
              Incorporated as <strong>{SITE.legalName}</strong>{SITE.rcNumber ? ` (RC: ${SITE.rcNumber})` : ""}, we are a real estate company serving {SITE.base}.
            </p>
            <p>
              Our operations focus on verified property transactions across four core areas: <strong>Property Sales</strong>, <strong>Rentals</strong>, <strong>Short Lets</strong>, and <strong>Land Sales</strong>. We connect buyers, tenants, and investors with titled properties across strategic districts including Karu, Kuje, Kubwa, Lugbe, Katampe, Galadimawa, and Airport Road.
            </p>
          </div>

          <div className="pt-2">
            <Link
              href="/about"
              className="inline-flex items-center justify-center bg-[#3f51b5] hover:bg-[#24389c] text-white text-xs sm:text-sm font-semibold px-6 py-3 rounded-lg shadow-sm transition-colors gap-2"
            >
              <span>Learn More About Us</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};

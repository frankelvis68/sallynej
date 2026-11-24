import React from "react";
import Link from "next/link";
import { SITE } from "@/config/site";
import { SectionHeading } from "@/components/common/SectionHeading";

export const AreasCovered: React.FC = () => {
  return (
    <section className="w-full py-12 sm:py-16 bg-[#f2f4f7] border-b border-[#e2e8f0]">
      <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-12 flex flex-col gap-8">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
          <SectionHeading
            tagline="Strategic Coverage"
            title="Areas We Cover in Abuja"
            description="Verified listings and land plots across strategic growth corridors."
          />
        </div>

        {/* 7 Confirmed Areas Chips */}
        <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-7 gap-3 sm:gap-4">
          {SITE.areasServed.map((area) => (
            <Link
              key={area.slug}
              href={`/properties?area=${area.slug}`}
              className="bg-white p-3.5 sm:p-4 rounded-xl text-center shadow-sm hover:shadow-md transition-all border-b-2 border-[#24389c] flex flex-col items-center justify-center group focus:outline-none focus:ring-2 focus:ring-[#24389c]"
            >
              <span className="font-bold text-sm sm:text-base text-[#191c1e] group-hover:text-[#24389c] transition-colors">
                {area.name}
              </span>
              <span className="text-[11px] font-semibold text-[#795902] mt-0.5">
                Abuja FCT
              </span>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
};

import React from "react";
import Link from "next/link";
import { SITE } from "@/config/site";
import { SectionHeading } from "@/components/common/SectionHeading";
import { Home, Key, Building2, MapPin, ArrowRight } from "lucide-react";

export const ServicesSection: React.FC = () => {
  const getIcon = (iconName: string) => {
    switch (iconName) {
      case "Home":
        return <Home className="w-7 h-7 text-[#24389c]" />;
      case "Key":
        return <Key className="w-7 h-7 text-[#795902]" />;
      case "Building2":
        return <Building2 className="w-7 h-7 text-[#24389c]" />;
      case "MapPin":
        return <MapPin className="w-7 h-7 text-[#795902]" />;
      default:
        return <Home className="w-7 h-7 text-[#24389c]" />;
    }
  };

  return (
    <section className="w-full py-16 sm:py-24 bg-[#f7f9fc] border-b border-[#e2e8f0]">
      <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-12 flex flex-col gap-12">
        <SectionHeading
          align="center"
          tagline="What We Do"
          title="Our Confirmed Services"
          description="Verified real estate acquisition and leasing solutions across the Federal Capital Territory."
        />

        {/* 4 Confirmed Services Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {SITE.servicesConfirmed.map((service) => (
            <div
              key={service.id}
              className="bg-white p-6 sm:p-8 rounded-xl border border-[#e2e8f0] shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col justify-between gap-4 group"
            >
              <div className="w-12 h-12 rounded-xl bg-[#f2f4f7] flex items-center justify-center group-hover:bg-[#24389c]/10 transition-colors">
                {getIcon(service.iconName)}
              </div>

              <div>
                <h3 className="text-lg font-bold text-[#191c1e] mb-2 group-hover:text-[#24389c] transition-colors">
                  {service.title}
                </h3>
                <p className="text-xs sm:text-sm text-[#454652] leading-relaxed">
                  {service.shortDesc}
                </p>
              </div>

              <div className="pt-2 border-t border-[#e2e8f0]/60">
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
                  className="inline-flex items-center gap-1 text-xs font-semibold text-[#24389c] hover:underline"
                >
                  <span>Explore listings</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

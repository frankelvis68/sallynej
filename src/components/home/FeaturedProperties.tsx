"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { Property } from "@/types";
import { PropertyCard } from "@/components/properties/PropertyCard";
import { SectionHeading } from "@/components/common/SectionHeading";
import { ArrowRight } from "lucide-react";

export const FeaturedProperties: React.FC = () => {
  const [properties, setProperties] = useState<Property[]>([]);

  useEffect(() => {
    fetch("/api/admin/properties")
      .then((res) => res.json())
      .then((data) => {
        if (Array.isArray(data)) {
          setProperties(data);
        }
      })
      .catch((err) => console.error("Failed to load featured properties:", err));
  }, []);

  const featured = properties.filter((p) => p.featured).slice(0, 6);
  if (featured.length === 0) {
    return null;
  }

  return (
    <section className="w-full py-16 sm:py-24 bg-[#f2f4f7] border-b border-[#e2e8f0]">
      <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-12 flex flex-col gap-10">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
          <SectionHeading
            tagline="Curated Abuja Portfolio"
            title="Featured Properties"
            description="Handpicked verified residential & commercial properties across prime Abuja districts."
          />
          <Link
            href="/properties"
            className="inline-flex items-center gap-1.5 text-sm font-semibold text-[#24389c] hover:text-[#1b2b7b] transition-colors group shrink-0"
          >
            <span>Explore All Properties ({properties.length})</span>
            <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
          </Link>
        </div>

        {/* Grid of properties */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {featured.map((prop) => (
            <PropertyCard key={prop.id} property={prop} />
          ))}
        </div>
      </div>
    </section>
  );
};

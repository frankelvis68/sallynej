import React from "react";
import { Hero } from "@/components/home/Hero";
import { StatsStrip } from "@/components/home/StatsStrip";
import { FeaturedProperties } from "@/components/home/FeaturedProperties";
import { ServicesSection } from "@/components/home/ServicesSection";
import { AreasCovered } from "@/components/home/AreasCovered";
import { AboutPreview } from "@/components/home/AboutPreview";
import { Testimonials } from "@/components/home/Testimonials";
import { CTABanner } from "@/components/home/CTABanner";
import { ContactPreview } from "@/components/home/ContactPreview";

export default function HomePage() {
  return (
    <div className="flex flex-col w-full">
      {/* 1. Hero with integrated SearchBar */}
      <Hero />

      {/* 2. Stats Strip (Hides if empty) */}
      <StatsStrip />

      {/* 3. Featured Properties (Hides if empty) */}
      <FeaturedProperties />

      {/* 4. Confirmed Services */}
      <ServicesSection />

      {/* 5. Areas We Cover */}
      <AreasCovered />

      {/* 6. About Preview */}
      <AboutPreview />

      {/* 7. Testimonials (Hides if empty) */}
      <Testimonials />

      {/* 8. Call To Action Banner */}
      <CTABanner />

      {/* 9. Contact Preview */}
      <ContactPreview />
    </div>
  );
}

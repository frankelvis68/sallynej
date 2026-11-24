import React from "react";
import { TESTIMONIALS } from "@/data/testimonials";
import { SectionHeading } from "@/components/common/SectionHeading";
import { Star } from "lucide-react";

export const Testimonials: React.FC = () => {
  // STRICT RULE: Component renders NOTHING if array is empty in production!
  if (!TESTIMONIALS || TESTIMONIALS.length === 0) {
    return null;
  }

  return (
    <section className="w-full py-16 sm:py-24 bg-[#f7f9fc] border-b border-[#e2e8f0]">
      <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-12 flex flex-col gap-10">
        <SectionHeading
          align="center"
          tagline="Client Feedback"
          title="What Homeowners &amp; Investors Say"
          description="Read reviews from clients who have partnered with us."
        />

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {TESTIMONIALS.map((t) => (
            <div
              key={t.id}
              className="bg-white p-6 sm:p-8 rounded-xl shadow-sm border border-[#e2e8f0] flex flex-col justify-between gap-6"
            >
              <div className="flex flex-col gap-3">
                <div className="flex items-center gap-1 text-[#fdd275]">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className="w-4 h-4 fill-[#fdd275] text-[#795902]"
                    />
                  ))}
                </div>
                <p className="text-xs sm:text-sm text-[#454652] italic leading-relaxed">
                  &ldquo;{t.quote}&rdquo;
                </p>
              </div>

              <div className="flex flex-col border-t border-[#e2e8f0] pt-3">
                <span className="font-bold text-sm text-[#191c1e]">
                  {t.name}
                </span>
                <span className="text-xs text-[#24389c]">{t.role}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

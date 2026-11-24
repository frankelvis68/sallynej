import React from "react";
import Link from "next/link";
import { SITE } from "@/config/site";
import { buildTelLink, buildWhatsAppLink } from "@/lib/whatsapp";
import { Phone, MessageCircle } from "lucide-react";

export const CTABanner: React.FC = () => {
  const hasPhone = Boolean(SITE.contact.phone);
  const hasWhatsApp = Boolean(SITE.contact.whatsapp);

  return (
    <section className="w-full py-16 sm:py-20 bg-[#3f51b5] text-white relative overflow-hidden">
      {/* Subtle Grid Pattern Overlay */}
      <div className="absolute inset-0 opacity-10 pointer-events-none">
        <svg className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <pattern
              id="cta-grid"
              width="40"
              height="40"
              patternUnits="userSpaceOnUse"
            >
              <path
                d="M 40 0 L 0 0 0 40"
                fill="none"
                stroke="currentColor"
                strokeWidth="1"
              />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#cta-grid)" />
        </svg>
      </div>

      <div className="relative z-10 w-full max-w-5xl mx-auto px-4 sm:px-6 lg:px-12 text-center flex flex-col items-center gap-6">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 text-[#c5d2f7] text-xs font-semibold tracking-widest uppercase">
          <span>Advisory Desk</span>
        </div>

        <h2 className="text-2xl sm:text-4xl lg:text-5xl font-bold max-w-3xl leading-tight text-white">
          Ready to Find Your Next Property in Abuja?
        </h2>

        <p className="text-sm sm:text-base text-[#c5d2f7] max-w-2xl leading-relaxed">
          Connect directly with our team for certified title verifications, executive rental options, and off-market opportunities across Abuja.
        </p>

        <div className="flex flex-col sm:flex-row items-center gap-4 mt-2 w-full sm:w-auto">
          {hasPhone && (
            <a
              href={buildTelLink(SITE.contact.phone)}
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-white text-[#24389c] hover:bg-[#f7f9fc] text-xs sm:text-sm font-bold px-6 py-3.5 rounded-lg shadow-md transition-colors"
            >
              <Phone className="w-4 h-4" />
              <span>Call Us: {SITE.contact.phone}</span>
            </a>
          )}

          {hasWhatsApp && (
            <a
              href={buildWhatsAppLink(
                SITE.contact.whatsapp,
                `Hello ${SITE.brandName}, I am inquiring about property opportunities in Abuja.`
              )}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-[#059669] hover:bg-[#047857] text-white text-xs sm:text-sm font-bold px-6 py-3.5 rounded-lg shadow-md transition-colors"
            >
              <MessageCircle className="w-4 h-4" />
              <span>WhatsApp Instant Chat</span>
            </a>
          )}

          {!hasPhone && !hasWhatsApp && (
            <Link
              href="/contact"
              className="w-full sm:w-auto inline-flex items-center justify-center bg-white text-[#24389c] text-xs sm:text-sm font-bold px-6 py-3.5 rounded-lg shadow-md transition-colors"
            >
              Contact Our Desk
            </Link>
          )}
        </div>
      </div>
    </section>
  );
};

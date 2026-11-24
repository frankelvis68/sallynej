import React from "react";
import Link from "next/link";
import Image from "next/image";
import { SITE } from "@/config/site";
import { buildTelLink } from "@/lib/whatsapp";
import { MapPin, Phone, Mail, Globe } from "lucide-react";

export const Footer: React.FC = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="w-full bg-[#14213d] text-white pt-16 pb-10 border-t border-[#14213d]">
      <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-12 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 pb-12 border-b border-white/10">
        {/* Brand identity column */}
        <div className="flex flex-col gap-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-white flex items-center justify-center p-1 shrink-0">
              <Image
                src="/logo/logo-mark.svg"
                alt={`${SITE.legalName} mark`}
                width={36}
                height={36}
                className="w-8 h-8 object-contain"
              />
            </div>
            <div className="flex flex-col">
              <span className="font-bold text-lg text-white leading-tight">
                {SITE.brandName}
              </span>
              {SITE.rcNumber && (
                <span className="text-xs text-[#fdd275] tracking-widest uppercase font-semibold">
                  RC: {SITE.rcNumber}
                </span>
              )}
            </div>
          </div>
          <p className="text-xs sm:text-sm text-[#c5d2f7] leading-relaxed max-w-sm">
            {SITE.legalName} is a real estate company serving {SITE.base}. Providing verified property sales, executive rentals, short lets, and titled land acquisition across prime corridors.
          </p>
        </div>

        {/* Corporate Office (Env Driven) */}
        <div className="flex flex-col gap-3">
          <span className="text-sm font-semibold tracking-wider uppercase text-white">
            Abuja Operations
          </span>
          <div className="flex flex-col gap-2.5 text-xs sm:text-sm text-[#c5d2f7]">
            <div className="flex items-start gap-2">
              <MapPin className="w-4 h-4 text-[#fdd275] shrink-0 mt-0.5" />
              <span>
                {SITE.contact.address || `${SITE.base}`}
              </span>
            </div>

            {SITE.contact.phone ? (
              <div className="flex items-center gap-2">
                <Phone className="w-4 h-4 text-[#fdd275] shrink-0" />
                <a
                  href={buildTelLink(SITE.contact.phone)}
                  className="hover:text-white transition-colors"
                >
                  {SITE.contact.phone}
                </a>
              </div>
            ) : null}

            {SITE.contact.email ? (
              <div className="flex items-center gap-2">
                <Mail className="w-4 h-4 text-[#fdd275] shrink-0" />
                <a
                  href={`mailto:${SITE.contact.email}`}
                  className="hover:text-white transition-colors"
                >
                  {SITE.contact.email}
                </a>
              </div>
            ) : null}
          </div>
        </div>

        {/* Confirmed Services Links */}
        <div className="flex flex-col gap-3">
          <span className="text-sm font-semibold tracking-wider uppercase text-white">
            Confirmed Services
          </span>
          <ul className="flex flex-col gap-2 text-xs sm:text-sm text-[#c5d2f7]">
            {SITE.servicesConfirmed.map((service) => (
              <li key={service.id}>
                <Link
                  href="/services"
                  className="hover:text-white transition-colors"
                >
                  {service.title}
                </Link>
              </li>
            ))}
            <li>
              <Link
                href="/properties"
                className="hover:text-white transition-colors"
              >
                View Available Listings
              </Link>
            </li>
          </ul>
        </div>

        {/* Navigation & Legal Links */}
        <div className="flex flex-col gap-3">
          <span className="text-sm font-semibold tracking-wider uppercase text-white">
            Company &amp; Legal
          </span>
          <ul className="flex flex-col gap-2 text-xs sm:text-sm text-[#c5d2f7]">
            <li>
              <Link href="/about" className="hover:text-white transition-colors">
                About Our Company
              </Link>
            </li>
            <li>
              <Link href="/contact" className="hover:text-white transition-colors">
                Contact &amp; Advisory
              </Link>
            </li>
            <li>
              <Link href="/privacy" className="hover:text-white transition-colors">
                Privacy Notice
              </Link>
            </li>
          </ul>

          {/* Social Links (Rendered only if defined) */}
          {(SITE.contact.facebook ||
            SITE.contact.instagram ||
            SITE.contact.linkedin) && (
            <div className="flex items-center gap-2 pt-2">
              {SITE.contact.facebook && (
                <a
                  href={SITE.contact.facebook}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-8 h-8 rounded-full bg-white/10 hover:bg-[#3f51b5] flex items-center justify-center text-white transition-colors"
                  aria-label="Facebook"
                >
                  <Globe className="w-4 h-4" />
                </a>
              )}
              {SITE.contact.instagram && (
                <a
                  href={SITE.contact.instagram}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-8 h-8 rounded-full bg-white/10 hover:bg-[#3f51b5] flex items-center justify-center text-white transition-colors"
                  aria-label="Instagram"
                >
                  <Globe className="w-4 h-4" />
                </a>
              )}
              {SITE.contact.linkedin && (
                <a
                  href={SITE.contact.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-8 h-8 rounded-full bg-white/10 hover:bg-[#3f51b5] flex items-center justify-center text-white transition-colors"
                  aria-label="LinkedIn"
                >
                  <Globe className="w-4 h-4" />
                </a>
              )}
            </div>
          )}
        </div>
      </div>

      {/* Copyright Line */}
      <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-12 pt-6 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-[#c5d2f7]/80">
        <p>
          © {currentYear} {SITE.legalName}. {SITE.rcNumber ? `RC: ${SITE.rcNumber}` : ""}
        </p>
        <div className="flex items-center gap-4">
          <Link href="/privacy" className="hover:text-white transition-colors">
            Privacy Policy
          </Link>
          <Link href="/contact" className="hover:text-white transition-colors">
            Inquire
          </Link>
        </div>
      </div>
    </footer>
  );
};

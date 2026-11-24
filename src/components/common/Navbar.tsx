"use client";

import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { SITE } from "@/config/site";
import { buildTelLink } from "@/lib/whatsapp";
import { Menu, X, Phone } from "lucide-react";

export const Navbar: React.FC = () => {
  const pathname = usePathname();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navLinks = [
    { label: "Home", href: "/" },
    { label: "Properties", href: "/properties" },
    { label: "Services", href: "/services" },
    { label: "About", href: "/about" },
    { label: "Contact", href: "/contact" },
  ];

  return (
    <header className="sticky top-0 left-0 right-0 z-50 bg-white/95 backdrop-blur-md border-b border-[#e2e8f0] shadow-[0_1px_8px_rgba(0,0,0,0.03)]">
      <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-12 h-20 flex items-center justify-between gap-4">
        {/* Brand Logo & Wordmark */}
        <Link href="/" className="flex items-center gap-3 group focus:outline-none focus:ring-2 focus:ring-[#24389c] rounded-lg p-1">
          <div className="w-10 h-10 rounded-full border border-[#24389c]/20 bg-[#f7f9fc] flex items-center justify-center overflow-hidden shrink-0 shadow-sm">
            <Image
              src="/logo/logo-mark.svg"
              alt={`${SITE.legalName} mark`}
              width={36}
              height={36}
              className="w-8 h-8 object-contain"
            />
          </div>
          <div className="flex flex-col">
            <span className="font-bold text-lg sm:text-xl text-[#24389c] leading-tight tracking-tight">
              {SITE.brandName}
            </span>
            <span className="text-[10px] sm:text-[11px] text-[#454652] tracking-wider uppercase font-medium">
              Dynamic Company Limited
            </span>
          </div>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden lg:flex items-center gap-8" aria-label="Main Navigation">
          {navLinks.map((link) => {
            const isActive = pathname === link.href;
            return (
              <Link
                key={link.href}
                href={link.href}
                className={`text-sm font-semibold transition-colors duration-150 py-1 border-b-2 ${
                  isActive
                    ? "text-[#24389c] border-[#24389c]"
                    : "text-[#454652] border-transparent hover:text-[#24389c]"
                }`}
              >
                {link.label}
              </Link>
            );
          })}
        </nav>

        {/* Right Action / Contact */}
        <div className="flex items-center gap-3">
          {SITE.contact.phone ? (
            <a
              href={buildTelLink(SITE.contact.phone)}
              className="hidden md:inline-flex items-center gap-2 bg-[#f2f4f7] hover:bg-[#eceef1] text-[#191c1e] text-xs font-semibold px-3.5 py-2 rounded-full border border-[#e2e8f0] transition-colors"
            >
              <Phone className="w-3.5 h-3.5 text-[#795902]" />
              <span>{SITE.contact.phone}</span>
            </a>
          ) : null}

          <Link
            href="/contact"
            className="hidden sm:inline-flex items-center justify-center bg-[#3f51b5] hover:bg-[#24389c] text-white text-xs sm:text-sm font-semibold px-4 sm:px-5 py-2.5 rounded-lg shadow-sm transition-colors"
          >
            Contact Us
          </Link>

          {/* Mobile Menu Toggle Button */}
          <button
            type="button"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label="Toggle navigation menu"
            aria-expanded={mobileMenuOpen}
            className="lg:hidden p-2 rounded-lg text-[#191c1e] hover:bg-[#f2f4f7] focus:outline-none focus:ring-2 focus:ring-[#24389c]"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="lg:hidden border-t border-[#e2e8f0] bg-white px-4 pt-3 pb-6 flex flex-col gap-3 shadow-lg animate-in slide-in-from-top-2">
          {navLinks.map((link) => {
            const isActive = pathname === link.href;
            return (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setMobileMenuOpen(false)}
                className={`px-3 py-2.5 rounded-lg text-base font-semibold transition-colors ${
                  isActive
                    ? "bg-[#24389c]/10 text-[#24389c]"
                    : "text-[#191c1e] hover:bg-[#f2f4f7]"
                }`}
              >
                {link.label}
              </Link>
            );
          })}

          <div className="pt-2 border-t border-[#e2e8f0] flex flex-col gap-2">
            {SITE.contact.phone ? (
              <a
                href={buildTelLink(SITE.contact.phone)}
                className="flex items-center justify-center gap-2 py-2.5 rounded-lg bg-[#f2f4f7] text-[#191c1e] text-sm font-semibold"
              >
                <Phone className="w-4 h-4 text-[#795902]" />
                <span>Call {SITE.contact.phone}</span>
              </a>
            ) : null}

            <Link
              href="/contact"
              onClick={() => setMobileMenuOpen(false)}
              className="flex items-center justify-center bg-[#24389c] text-white text-sm font-semibold py-3 rounded-lg shadow-sm"
            >
              Contact Us
            </Link>
          </div>
        </div>
      )}
    </header>
  );
};

import React from "react";
import Image from "next/image";
import { SITE } from "@/config/site";
import { SearchBar } from "./SearchBar";
import { ShieldCheck } from "lucide-react";

export const Hero: React.FC = () => {
  return (
    <section className="relative w-full pt-16 pb-20 lg:pt-24 lg:pb-32 bg-[#f7f9fc] overflow-hidden">
      {/* Background with optimized local image and scrim */}
      <div className="absolute inset-0 z-0">
        <Image
          src="/images/hero.jpg"
          alt="Modern architectural real estate in Abuja"
          fill
          priority
          sizes="100vw"
          className="object-cover object-center"
        />
        {/* Architectural scrims */}
        <div className="absolute inset-0 bg-gradient-to-r from-[#14213d]/90 via-[#14213d]/75 to-[#14213d]/40" />
        <div className="absolute inset-0 bg-gradient-to-t from-[#14213d] via-transparent to-[#14213d]/40" />
      </div>

      <div className="relative z-10 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-12 flex flex-col justify-center">
        {/* Verification trust badge */}
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/15 backdrop-blur-md w-fit mb-6 border border-white/20">
          <ShieldCheck className="w-4 h-4 text-[#fdd275]" />
          <span className="text-xs sm:text-sm text-white font-semibold tracking-wider uppercase">
            Abuja Real Estate Advisory
          </span>
          {SITE.rcNumber && (
            <span className="bg-[#795902] text-white px-2 py-0.5 rounded-full text-[10px] font-bold tracking-widest ml-1">
              RC: {SITE.rcNumber}
            </span>
          )}
        </div>

        {/* Authoritative Single H1 */}
        <h1 className="text-3xl sm:text-5xl lg:text-6xl font-bold text-white max-w-3xl leading-tight tracking-tight">
          Find Your Dream Property in Abuja
        </h1>

        {/* Subtitle strictly aligned with confirmed services */}
        <p className="text-base sm:text-lg lg:text-xl text-[#f2f4f7] max-w-2xl mt-4 mb-10 leading-relaxed">
          {SITE.legalName} is your dedicated real estate partner in {SITE.base}. Facilitating verified property sales, executive leases, short lets, and titled land plots across prime districts.
        </p>

        {/* Floating Search Bar */}
        <SearchBar />
      </div>
    </section>
  );
};

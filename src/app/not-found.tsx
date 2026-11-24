import React from "react";
import Link from "next/link";
import { Container } from "@/components/common/Container";
import { Home, ArrowLeft } from "lucide-react";

export default function NotFound() {
  return (
    <div className="min-h-[60vh] flex items-center justify-center py-20 bg-[#f7f9fc]">
      <Container className="flex flex-col items-center text-center gap-4">
        <span className="text-6xl sm:text-8xl font-black text-[#24389c]/20">
          404
        </span>
        <h1 className="text-2xl sm:text-3xl font-bold text-[#191c1e]">
          Page Not Found
        </h1>
        <p className="text-sm sm:text-base text-[#454652] max-w-md">
          The property listing or page you are seeking does not exist or has been relocated.
        </p>
        <div className="flex flex-wrap items-center justify-center gap-3 pt-4">
          <Link
            href="/"
            className="inline-flex items-center gap-2 bg-[#24389c] hover:bg-[#1b2b7b] text-white text-xs sm:text-sm font-semibold px-5 py-2.5 rounded-lg shadow-sm transition-colors"
          >
            <Home className="w-4 h-4" />
            <span>Return to Home</span>
          </Link>
          <Link
            href="/properties"
            className="inline-flex items-center gap-2 bg-[#f2f4f7] hover:bg-[#eceef1] text-[#191c1e] text-xs sm:text-sm font-semibold px-5 py-2.5 rounded-lg border border-[#e2e8f0] transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Browse Properties</span>
          </Link>
        </div>
      </Container>
    </div>
  );
}

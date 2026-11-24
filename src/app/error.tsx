"use client";

import React, { useEffect } from "react";
import { Container } from "@/components/common/Container";
import { AlertCircle, RotateCcw } from "lucide-react";

export default function ErrorBoundary({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    // Log error internally
    console.error("Application error boundary triggered:", error);
  }, [error]);

  return (
    <div className="min-h-[50vh] flex items-center justify-center py-16 bg-[#f7f9fc]">
      <Container className="flex flex-col items-center text-center gap-4 max-w-lg">
        <div className="w-14 h-14 rounded-full bg-red-100 text-red-600 flex items-center justify-center">
          <AlertCircle className="w-7 h-7" />
        </div>
        <h2 className="text-xl sm:text-2xl font-bold text-[#191c1e]">
          An unexpected error occurred
        </h2>
        <p className="text-xs sm:text-sm text-[#454652]">
          We encountered an error rendering this section. Please try refreshing or contact our technical team if the issue persists.
        </p>
        <button
          type="button"
          onClick={() => reset()}
          className="inline-flex items-center gap-2 bg-[#24389c] hover:bg-[#1b2b7b] text-white text-xs sm:text-sm font-semibold px-6 py-2.5 rounded-lg shadow-sm transition-colors cursor-pointer mt-2"
        >
          <RotateCcw className="w-4 h-4" />
          <span>Try Again</span>
        </button>
      </Container>
    </div>
  );
}

import React from "react";
import Link from "next/link";
import { FolderSearch } from "lucide-react";

interface EmptyStateProps {
  title?: string;
  description?: string;
  actionText?: string;
  actionHref?: string;
}

export const EmptyState: React.FC<EmptyStateProps> = ({
  title = "Listings coming soon",
  description = "We are currently curating and verifying properties for this category in Abuja. Please contact our advisory desk directly for off-market opportunities.",
  actionText = "Contact Our Advisory Desk",
  actionHref = "/contact",
}) => {
  return (
    <div className="w-full py-16 px-4 flex flex-col items-center justify-center text-center bg-white rounded-2xl border border-[#e2e8f0] shadow-sm my-6">
      <div className="w-16 h-16 rounded-2xl bg-[#24389c]/10 text-[#24389c] flex items-center justify-center mb-4">
        <FolderSearch className="w-8 h-8" />
      </div>
      <h3 className="text-xl sm:text-2xl font-bold text-[#191c1e] mb-2">
        {title}
      </h3>
      <p className="text-sm sm:text-base text-[#454652] max-w-md mb-6 leading-relaxed">
        {description}
      </p>
      {actionHref && (
        <Link
          href={actionHref}
          className="inline-flex items-center justify-center bg-[#24389c] hover:bg-[#1b2b7b] text-white text-sm font-semibold px-6 py-3 rounded-lg shadow-sm transition-colors"
        >
          {actionText}
        </Link>
      )}
    </div>
  );
};

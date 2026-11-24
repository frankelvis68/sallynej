import React from "react";

// The top preview banner has been removed as requested.
export const SampleBanner: React.FC = () => {
  return null;
};

export const SampleBadge: React.FC<{ className?: string }> = ({ className = "" }) => {
  const isSampleActive =
    process.env.NODE_ENV !== "production" ||
    process.env.NEXT_PUBLIC_USE_SAMPLE_DATA === "true";

  if (!isSampleActive) return null;

  return (
    <span
      className={`inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[11px] font-semibold bg-[#fdd275] text-[#14213d] shadow-sm tracking-wide ${className}`}
    >
      Sample listing
    </span>
  );
};

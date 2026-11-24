import React from "react";

interface SectionHeadingProps {
  tagline?: string;
  title: string;
  description?: string;
  align?: "left" | "center" | "right";
  className?: string;
  titleLevel?: "h1" | "h2" | "h3";
}

export const SectionHeading: React.FC<SectionHeadingProps> = ({
  tagline,
  title,
  description,
  align = "left",
  className = "",
  titleLevel: TitleTag = "h2",
}) => {
  const alignmentClass =
    align === "center"
      ? "text-center mx-auto"
      : align === "right"
      ? "text-right ml-auto"
      : "text-left";

  return (
    <div className={`max-w-3xl flex flex-col gap-1.5 ${alignmentClass} ${className}`}>
      {tagline && (
        <span className="text-xs uppercase tracking-widest font-semibold text-[#795902]">
          {tagline}
        </span>
      )}
      <TitleTag className="text-2xl sm:text-3xl lg:text-4xl font-bold text-[#191c1e] tracking-tight">
        {title}
      </TitleTag>
      {description && (
        <p className="text-sm sm:text-base text-[#454652] mt-1 leading-relaxed">
          {description}
        </p>
      )}
    </div>
  );
};

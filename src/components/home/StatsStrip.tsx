import React from "react";
import { STATS } from "@/data/stats";
import { Building2, Smile, History, ShieldCheck } from "lucide-react";

export const StatsStrip: React.FC = () => {
  // STRICT RULE: Renders NOTHING if array is empty
  if (!STATS || STATS.length === 0) {
    return null;
  }

  const getIcon = (iconName?: string) => {
    switch (iconName) {
      case "Building2":
        return <Building2 className="w-7 h-7 text-[#24389c]" />;
      case "Smile":
        return <Smile className="w-7 h-7 text-[#795902]" />;
      case "History":
        return <History className="w-7 h-7 text-[#24389c]" />;
      case "ShieldCheck":
        return <ShieldCheck className="w-7 h-7 text-emerald-600" />;
      default:
        return <Building2 className="w-7 h-7 text-[#24389c]" />;
    }
  };

  return (
    <section className="w-full bg-white py-10 border-b border-[#e2e8f0] relative z-20 shadow-sm">
      <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-12 grid grid-cols-2 md:grid-cols-4 gap-6">
        {STATS.map((stat) => (
          <div key={stat.id} className="flex items-center gap-4 p-2">
            <div className="w-12 sm:w-14 h-12 sm:h-14 rounded-xl bg-[#f2f4f7] flex items-center justify-center shrink-0">
              {getIcon(stat.icon)}
            </div>
            <div className="flex flex-col">
              <span className="text-2xl sm:text-3xl font-bold text-[#191c1e]">
                {stat.value}
              </span>
              <span className="text-xs sm:text-sm text-[#454652]">
                {stat.label}
              </span>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

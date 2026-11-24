"use client";

import React from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { SITE } from "@/config/site";
import { ListingType, PropertyType } from "@/types";

export const FilterBar: React.FC = () => {
  const router = useRouter();
  const searchParams = useSearchParams();

  const currentListing = (searchParams.get("listing") as ListingType) || "";
  const currentType = (searchParams.get("type") as PropertyType) || "";
  const currentArea = searchParams.get("area") || "";
  const currentMin = searchParams.get("min") || "";
  const currentMax = searchParams.get("max") || "";
  const currentBeds = searchParams.get("beds") || "";

  const updateParam = (key: string, value: string) => {
    const params = new URLSearchParams(searchParams.toString());
    if (value) {
      params.set(key, value);
    } else {
      params.delete(key);
    }
    router.push(`/properties?${params.toString()}`);
  };

  const handleReset = () => {
    router.push("/properties");
  };

  return (
    <div className="w-full bg-white p-4 sm:p-6 rounded-xl border border-[#e2e8f0] shadow-sm flex flex-col gap-4">
      <div className="flex items-center justify-between border-b border-[#e2e8f0] pb-3">
        <h3 className="font-bold text-sm text-[#191c1e] uppercase tracking-wider">
          Filter Listings
        </h3>
        <button
          type="button"
          onClick={handleReset}
          className="text-xs font-semibold text-[#24389c] hover:underline cursor-pointer"
        >
          Reset Filters
        </button>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3">
        {/* Listing Type */}
        <div className="flex flex-col gap-1">
          <label className="text-[11px] font-semibold text-[#454652] uppercase">
            Purpose
          </label>
          <select
            value={currentListing}
            onChange={(e) => updateParam("listing", e.target.value)}
            className="h-10 px-3 rounded-lg bg-[#f2f4f7] text-xs font-semibold text-[#191c1e] focus:outline-none focus:ring-2 focus:ring-[#24389c] border border-transparent cursor-pointer"
          >
            <option value="">All Purposes</option>
            <option value="sale">For Sale</option>
            <option value="rent">For Rent</option>
            <option value="short-let">Short Let</option>
          </select>
        </div>

        {/* Property Type */}
        <div className="flex flex-col gap-1">
          <label className="text-[11px] font-semibold text-[#454652] uppercase">
            Type
          </label>
          <select
            value={currentType}
            onChange={(e) => updateParam("type", e.target.value)}
            className="h-10 px-3 rounded-lg bg-[#f2f4f7] text-xs font-semibold text-[#191c1e] focus:outline-none focus:ring-2 focus:ring-[#24389c] border border-transparent cursor-pointer"
          >
            <option value="">All Types</option>
            <option value="house">House / Duplex</option>
            <option value="flat">Apartment / Flat</option>
            <option value="land">Land Plot</option>
            <option value="commercial">Commercial</option>
          </select>
        </div>

        {/* Area */}
        <div className="flex flex-col gap-1">
          <label className="text-[11px] font-semibold text-[#454652] uppercase">
            Location
          </label>
          <select
            value={currentArea}
            onChange={(e) => updateParam("area", e.target.value)}
            className="h-10 px-3 rounded-lg bg-[#f2f4f7] text-xs font-semibold text-[#191c1e] focus:outline-none focus:ring-2 focus:ring-[#24389c] border border-transparent cursor-pointer"
          >
            <option value="">All Abuja Areas</option>
            {SITE.areasServed.map((area) => (
              <option key={area.slug} value={area.slug}>
                {area.name}
              </option>
            ))}
          </select>
        </div>

        {/* Min Price */}
        <div className="flex flex-col gap-1">
          <label className="text-[11px] font-semibold text-[#454652] uppercase">
            Min Price (₦)
          </label>
          <input
            type="number"
            placeholder="Min"
            value={currentMin}
            onChange={(e) => updateParam("min", e.target.value)}
            className="h-10 px-3 rounded-lg bg-[#f2f4f7] text-xs font-semibold text-[#191c1e] focus:outline-none focus:ring-2 focus:ring-[#24389c] border border-transparent"
          />
        </div>

        {/* Max Price */}
        <div className="flex flex-col gap-1">
          <label className="text-[11px] font-semibold text-[#454652] uppercase">
            Max Price (₦)
          </label>
          <input
            type="number"
            placeholder="Max"
            value={currentMax}
            onChange={(e) => updateParam("max", e.target.value)}
            className="h-10 px-3 rounded-lg bg-[#f2f4f7] text-xs font-semibold text-[#191c1e] focus:outline-none focus:ring-2 focus:ring-[#24389c] border border-transparent"
          />
        </div>

        {/* Bedrooms */}
        <div className="flex flex-col gap-1">
          <label className="text-[11px] font-semibold text-[#454652] uppercase">
            Min Bedrooms
          </label>
          <select
            value={currentBeds}
            onChange={(e) => updateParam("beds", e.target.value)}
            className="h-10 px-3 rounded-lg bg-[#f2f4f7] text-xs font-semibold text-[#191c1e] focus:outline-none focus:ring-2 focus:ring-[#24389c] border border-transparent cursor-pointer"
          >
            <option value="">Any Beds</option>
            <option value="1">1+ Bed</option>
            <option value="2">2+ Beds</option>
            <option value="3">3+ Beds</option>
            <option value="4">4+ Beds</option>
            <option value="5">5+ Beds</option>
          </select>
        </div>
      </div>
    </div>
  );
};

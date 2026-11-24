"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { Search } from "lucide-react";
import { SITE } from "@/config/site";

export const SearchBar: React.FC = () => {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState<"sale" | "rent" | "short-let">("sale");
  const [selectedArea, setSelectedArea] = useState<string>("");
  const [selectedType, setSelectedType] = useState<string>("");
  const [selectedBudget, setSelectedBudget] = useState<string>("");

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    const params = new URLSearchParams();
    if (activeTab) params.set("listing", activeTab);
    if (selectedArea) params.set("area", selectedArea);
    if (selectedType) params.set("type", selectedType);

    if (selectedBudget === "sub50m") {
      params.set("max", "50000000");
    } else if (selectedBudget === "50m-200m") {
      params.set("min", "50000000");
      params.set("max", "200000000");
    } else if (selectedBudget === "200m-500m") {
      params.set("min", "200000000");
      params.set("max", "500000000");
    } else if (selectedBudget === "500m+") {
      params.set("min", "500000000");
    }

    router.push(`/properties?${params.toString()}`);
  };

  return (
    <div className="w-full max-w-5xl bg-white rounded-xl shadow-xl p-4 sm:p-6 flex flex-col gap-4 border border-[#e2e8f0]">
      {/* Segmented Toggle: Buy / Rent / Short Let */}
      <div className="flex items-center gap-1 bg-[#f2f4f7] p-1 rounded-lg w-fit">
        <button
          type="button"
          onClick={() => setActiveTab("sale")}
          className={`px-4 sm:px-6 py-2 rounded-md text-xs sm:text-sm font-semibold transition-all ${
            activeTab === "sale"
              ? "bg-[#3f51b5] text-white shadow-sm"
              : "text-[#454652] hover:text-[#191c1e]"
          }`}
        >
          Buy
        </button>
        <button
          type="button"
          onClick={() => setActiveTab("rent")}
          className={`px-4 sm:px-6 py-2 rounded-md text-xs sm:text-sm font-semibold transition-all ${
            activeTab === "rent"
              ? "bg-[#3f51b5] text-white shadow-sm"
              : "text-[#454652] hover:text-[#191c1e]"
          }`}
        >
          Rent
        </button>
        <button
          type="button"
          onClick={() => setActiveTab("short-let")}
          className={`px-4 sm:px-6 py-2 rounded-md text-xs sm:text-sm font-semibold transition-all ${
            activeTab === "short-let"
              ? "bg-[#3f51b5] text-white shadow-sm"
              : "text-[#454652] hover:text-[#191c1e]"
          }`}
        >
          Short Let
        </button>
      </div>

      {/* Filter Selectors Form */}
      <form onSubmit={handleSearch} className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-3 items-center">
        {/* Location selector */}
        <div className="flex flex-col bg-[#f2f4f7] px-4 py-2.5 rounded-lg border border-transparent focus-within:border-[#24389c] focus-within:bg-white transition-all">
          <label htmlFor="search-location" className="text-[11px] font-semibold text-[#454652] uppercase tracking-wider">
            Location
          </label>
          <select
            id="search-location"
            value={selectedArea}
            onChange={(e) => setSelectedArea(e.target.value)}
            className="bg-transparent font-semibold text-sm text-[#191c1e] focus:outline-none cursor-pointer mt-0.5"
          >
            <option value="">All Locations (Abuja)</option>
            {SITE.areasServed.map((area) => (
              <option key={area.slug} value={area.slug}>
                {area.name}
              </option>
            ))}
          </select>
        </div>

        {/* Property Type selector */}
        <div className="flex flex-col bg-[#f2f4f7] px-4 py-2.5 rounded-lg border border-transparent focus-within:border-[#24389c] focus-within:bg-white transition-all">
          <label htmlFor="search-type" className="text-[11px] font-semibold text-[#454652] uppercase tracking-wider">
            Property Type
          </label>
          <select
            id="search-type"
            value={selectedType}
            onChange={(e) => setSelectedType(e.target.value)}
            className="bg-transparent font-semibold text-sm text-[#191c1e] focus:outline-none cursor-pointer mt-0.5"
          >
            <option value="">All Types</option>
            <option value="house">Terrace &amp; Detached Duplex</option>
            <option value="flat">Serviced Flat / Apartment</option>
            <option value="land">Residential / Commercial Land</option>
            <option value="commercial">Commercial Hub</option>
          </select>
        </div>

        {/* Budget selector */}
        <div className="flex flex-col bg-[#f2f4f7] px-4 py-2.5 rounded-lg border border-transparent focus-within:border-[#24389c] focus-within:bg-white transition-all">
          <label htmlFor="search-budget" className="text-[11px] font-semibold text-[#454652] uppercase tracking-wider">
            Budget Range
          </label>
          <select
            id="search-budget"
            value={selectedBudget}
            onChange={(e) => setSelectedBudget(e.target.value)}
            className="bg-transparent font-semibold text-sm text-[#191c1e] focus:outline-none cursor-pointer mt-0.5"
          >
            <option value="">Any Budget</option>
            <option value="sub50m">Under ₦50 Million</option>
            <option value="50m-200m">₦50M – ₦200 Million</option>
            <option value="200m-500m">₦200M – ₦500 Million</option>
            <option value="500m+">₦500M+ Luxury</option>
          </select>
        </div>

        {/* Submit button */}
        <button
          type="submit"
          className="h-full min-h-[52px] bg-[#3f51b5] hover:bg-[#24389c] text-white font-semibold text-sm px-6 rounded-lg shadow-md flex items-center justify-center gap-2 transition-colors group cursor-pointer"
        >
          <Search className="w-4 h-4 transition-transform group-hover:scale-110" />
          <span>Search Properties</span>
        </button>
      </form>
    </div>
  );
};

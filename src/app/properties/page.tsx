"use client";

import React, { Suspense, useMemo, useState, useEffect } from "react";
import { useSearchParams } from "next/navigation";
import { Property } from "@/types";
import { PropertyCard } from "@/components/properties/PropertyCard";
import { FilterBar } from "@/components/properties/FilterBar";
import { EmptyState } from "@/components/common/EmptyState";
import { Container } from "@/components/common/Container";
import { SectionHeading } from "@/components/common/SectionHeading";

function PropertiesCatalog() {
  const searchParams = useSearchParams();
  const [properties, setProperties] = useState<Property[]>([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 9;

  useEffect(() => {
    fetch("/api/admin/properties")
      .then((res) => res.json())
      .then((data) => {
        if (Array.isArray(data)) {
          setProperties(data);
        }
      })
      .catch((err) => console.error("Failed to load catalog:", err))
      .finally(() => setLoading(false));
  }, []);

  const listingFilter = searchParams.get("listing");
  const typeFilter = searchParams.get("type");
  const areaFilter = searchParams.get("area");
  const minFilter = searchParams.get("min");
  const maxFilter = searchParams.get("max");
  const bedsFilter = searchParams.get("beds");

  const filteredProperties = useMemo(() => {
    return properties.filter((p) => {
      if (listingFilter && p.listingType !== listingFilter) return false;
      if (typeFilter && p.type !== typeFilter) return false;
      if (areaFilter && p.area !== areaFilter) return false;
      if (minFilter && p.price < Number(minFilter)) return false;
      if (maxFilter && p.price > Number(maxFilter)) return false;
      if (bedsFilter && (!p.bedrooms || p.bedrooms < Number(bedsFilter)))
        return false;
      return true;
    });
  }, [properties, listingFilter, typeFilter, areaFilter, minFilter, maxFilter, bedsFilter]);

  const totalPages = Math.ceil(filteredProperties.length / itemsPerPage);
  const displayedProperties = filteredProperties.slice(
    0,
    currentPage * itemsPerPage
  );

  return (
    <div className="flex flex-col gap-8">
      {/* Search and Filters Bar */}
      <FilterBar />

      {/* Results Header */}
      <div className="flex items-center justify-between text-xs sm:text-sm text-[#454652] pt-2">
        <span>
          Showing <strong>{displayedProperties.length}</strong> of{" "}
          <strong>{filteredProperties.length}</strong> properties
        </span>
      </div>

      {/* Catalog Grid or Empty State */}
      {loading ? (
        <div className="py-20 text-center text-sm text-[#454652]">
          Loading verified properties...
        </div>
      ) : filteredProperties.length === 0 ? (
        <EmptyState
          title={properties.length === 0 ? "Listings coming soon" : "No matching properties found"}
          description={
            properties.length === 0
              ? "We are currently preparing and verifying property titles for our catalogue. In the meantime, contact our advisory team directly for active listings."
              : "No listings currently match your selected filters. Try broadening your criteria or reset the filters."
          }
        />
      ) : (
        <>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
            {displayedProperties.map((prop) => (
              <PropertyCard key={prop.id} property={prop} />
            ))}
          </div>

          {/* Load More Pagination */}
          {currentPage < totalPages && (
            <div className="flex justify-center pt-8">
              <button
                type="button"
                onClick={() => setCurrentPage((prev) => prev + 1)}
                className="px-8 py-3 bg-[#24389c] hover:bg-[#1b2b7b] text-white text-sm font-semibold rounded-lg shadow-sm transition-colors cursor-pointer"
              >
                Load More Properties
              </button>
            </div>
          )}
        </>
      )}
    </div>
  );
}

export default function PropertiesPage() {
  return (
    <div className="py-12 sm:py-16 bg-[#f7f9fc]">
      <Container className="flex flex-col gap-8">
        <SectionHeading
          tagline="Abuja Portfolio"
          title="Verified Real Estate Listings"
          description="Explore titled residential and commercial properties available across the Federal Capital Territory."
        />

        <Suspense
          fallback={
            <div className="py-20 text-center text-sm text-[#454652]">
              Loading verified properties...
            </div>
          }
        >
          <PropertiesCatalog />
        </Suspense>
      </Container>
    </div>
  );
}

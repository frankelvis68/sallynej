import React from "react";
import Image from "next/image";
import Link from "next/link";
import { Property } from "@/types";
import { formatCurrency } from "@/lib/currency";
import { SampleBadge } from "@/components/common/SampleBadge";
import { MapPin, Bed, Bath, ArrowRight } from "lucide-react";

interface PropertyCardProps {
  property: Property;
}

export const PropertyCard: React.FC<PropertyCardProps> = ({ property }) => {
  const primaryImage = property.images[0] || {
    src: "/images/hero.jpg",
    alt: property.title,
  };

  const getListingBadgeText = (type: Property["listingType"]) => {
    switch (type) {
      case "sale":
        return "For Sale";
      case "rent":
        return "For Rent";
      case "short-let":
        return "Short Let";
      default:
        return "Property";
    }
  };

  return (
    <article className="bg-white rounded-xl shadow-sm hover:shadow-xl border border-[#e2e8f0] transition-all duration-300 flex flex-col overflow-hidden group">
      {/* Property Image Container */}
      <div className="relative h-60 w-full overflow-hidden bg-[#eceef1]">
        <Image
          src={primaryImage.src}
          alt={primaryImage.alt || property.title}
          fill
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          className="object-cover object-center transition-transform duration-500 group-hover:scale-105"
        />

        {/* Listing Type Tag */}
        <div className="absolute top-3 left-3 flex items-center gap-1.5">
          <span className="px-3 py-1 rounded-full bg-[#3f51b5] text-white text-[11px] font-semibold tracking-wider uppercase shadow-sm">
            {getListingBadgeText(property.listingType)}
          </span>
          {property.isSample && <SampleBadge />}
        </div>
      </div>

      {/* Property Content */}
      <div className="p-5 flex flex-col flex-1 justify-between gap-4">
        <div>
          {/* Location Line */}
          <div className="flex items-center gap-1 text-[#454652] text-xs font-medium mb-1">
            <MapPin className="w-3.5 h-3.5 text-[#24389c] shrink-0" />
            <span className="truncate">{property.location}</span>
          </div>

          {/* Title */}
          <h3 className="text-lg font-bold text-[#191c1e] group-hover:text-[#24389c] transition-colors line-clamp-1">
            <Link href={`/properties/${property.slug}`}>
              {property.title}
            </Link>
          </h3>

          {/* Price */}
          <p className="text-xl font-bold text-[#24389c] mt-2">
            {formatCurrency(property.price, property.pricePeriod)}
          </p>
        </div>

        {/* Property Specs Rail (Conditionally hides undefined specs) */}
        {(property.bedrooms || property.bathrooms || property.sizeSqm) && (
          <div className="grid grid-cols-3 py-2 px-3 bg-[#f2f4f7] rounded-lg text-center text-xs divide-x divide-[#e2e8f0]">
            {property.bedrooms ? (
              <div className="flex flex-col items-center justify-center">
                <span className="font-bold text-[#191c1e] flex items-center gap-1">
                  <Bed className="w-3.5 h-3.5 text-[#454652]" />
                  {property.bedrooms}
                </span>
                <span className="text-[10px] text-[#454652]">Beds</span>
              </div>
            ) : (
              <div className="flex flex-col items-center justify-center">
                <span className="font-bold text-[#191c1e]">-</span>
                <span className="text-[10px] text-[#454652]">Beds</span>
              </div>
            )}

            {property.bathrooms ? (
              <div className="flex flex-col items-center justify-center">
                <span className="font-bold text-[#191c1e] flex items-center gap-1">
                  <Bath className="w-3.5 h-3.5 text-[#454652]" />
                  {property.bathrooms}
                </span>
                <span className="text-[10px] text-[#454652]">Baths</span>
              </div>
            ) : (
              <div className="flex flex-col items-center justify-center">
                <span className="font-bold text-[#191c1e]">-</span>
                <span className="text-[10px] text-[#454652]">Baths</span>
              </div>
            )}

            <div className="flex flex-col items-center justify-center">
              <span className="font-bold text-[#191c1e]">
                {property.sizeSqm ? `${property.sizeSqm}m²` : "Titled"}
              </span>
              <span className="text-[10px] text-[#454652]">
                {property.sizeSqm ? "Area" : "Status"}
              </span>
            </div>
          </div>
        )}

        {/* View Details CTA */}
        <Link
          href={`/properties/${property.slug}`}
          className="w-full py-2.5 bg-[#3f51b5] hover:bg-[#24389c] text-white rounded-lg text-xs sm:text-sm font-semibold transition-colors flex items-center justify-center gap-1.5 mt-auto"
        >
          <span>View Details</span>
          <ArrowRight className="w-4 h-4" />
        </Link>
      </div>
    </article>
  );
};

"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import { PropertyImage } from "@/types";
import { ChevronLeft, ChevronRight, X, Maximize2 } from "lucide-react";

interface LightboxGalleryProps {
  images: PropertyImage[];
  title: string;
}

export const LightboxGallery: React.FC<LightboxGalleryProps> = ({
  images,
  title,
}) => {
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [isOpen, setIsOpen] = useState(false);

  const activeImages =
    images.length > 0
      ? images
      : [{ src: "/images/hero.jpg", alt: title }];

  const handleNext = () => {
    setSelectedIndex((prev) => (prev + 1) % activeImages.length);
  };

  const handlePrev = () => {
    setSelectedIndex((prev) =>
      prev === 0 ? activeImages.length - 1 : prev - 1
    );
  };

  // Keyboard navigation & Escape key trapping
  useEffect(() => {
    if (!isOpen) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setIsOpen(false);
      } else if (e.key === "ArrowRight") {
        handleNext();
      } else if (e.key === "ArrowLeft") {
        handlePrev();
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, activeImages.length]);

  return (
    <div className="flex flex-col gap-3">
      {/* Primary Display Image */}
      <div className="relative h-72 sm:h-96 md:h-[480px] w-full rounded-2xl overflow-hidden bg-[#eceef1] group shadow-md border border-[#e2e8f0]">
        <Image
          src={activeImages[selectedIndex].src}
          alt={activeImages[selectedIndex].alt || title}
          fill
          priority
          sizes="(max-width: 1024px) 100vw, 70vw"
          className="object-cover object-center transition-all duration-300"
        />

        {/* Expand button */}
        <button
          type="button"
          onClick={() => setIsOpen(true)}
          aria-label="Open image in fullscreen lightbox"
          className="absolute bottom-4 right-4 bg-black/60 hover:bg-black/80 text-white p-2.5 rounded-lg backdrop-blur-md transition-colors flex items-center gap-1.5 text-xs font-semibold"
        >
          <Maximize2 className="w-4 h-4" />
          <span>View Fullscreen</span>
        </button>
      </div>

      {/* Thumbnails row (if multiple images) */}
      {activeImages.length > 1 && (
        <div className="grid grid-cols-4 sm:grid-cols-6 gap-2">
          {activeImages.map((img, idx) => (
            <button
              key={idx}
              type="button"
              onClick={() => setSelectedIndex(idx)}
              className={`relative h-20 rounded-lg overflow-hidden border-2 transition-all ${
                selectedIndex === idx
                  ? "border-[#24389c] ring-2 ring-[#24389c]/30"
                  : "border-transparent opacity-70 hover:opacity-100"
              }`}
            >
              <Image
                src={img.src}
                alt={img.alt || `${title} thumbnail ${idx + 1}`}
                fill
                sizes="120px"
                className="object-cover object-center"
              />
            </button>
          ))}
        </div>
      )}

      {/* Fullscreen Lightbox Modal */}
      {isOpen && (
        <div
          role="dialog"
          aria-modal="true"
          aria-label="Image gallery lightbox"
          className="fixed inset-0 z-[100] bg-black/95 backdrop-blur-md flex items-center justify-center p-4"
        >
          {/* Close button */}
          <button
            type="button"
            onClick={() => setIsOpen(false)}
            aria-label="Close lightbox"
            className="absolute top-5 right-5 text-white/80 hover:text-white p-2 rounded-full bg-white/10 hover:bg-white/20 transition-colors focus:outline-none focus:ring-2 focus:ring-white"
          >
            <X className="w-6 h-6" />
          </button>

          {/* Navigation Controls */}
          {activeImages.length > 1 && (
            <>
              <button
                type="button"
                onClick={handlePrev}
                aria-label="Previous image"
                className="absolute left-4 sm:left-8 text-white p-3 rounded-full bg-white/10 hover:bg-white/20 transition-colors focus:outline-none focus:ring-2 focus:ring-white"
              >
                <ChevronLeft className="w-7 h-7" />
              </button>
              <button
                type="button"
                onClick={handleNext}
                aria-label="Next image"
                className="absolute right-4 sm:right-8 text-white p-3 rounded-full bg-white/10 hover:bg-white/20 transition-colors focus:outline-none focus:ring-2 focus:ring-white"
              >
                <ChevronRight className="w-7 h-7" />
              </button>
            </>
          )}

          {/* Fullscreen Image Container */}
          <div className="relative max-w-5xl max-h-[85vh] w-full h-[75vh] flex items-center justify-center">
            <Image
              src={activeImages[selectedIndex].src}
              alt={activeImages[selectedIndex].alt || title}
              fill
              sizes="90vw"
              className="object-contain"
            />
          </div>

          {/* Image caption */}
          <div className="absolute bottom-6 left-1/2 -translate-x-1/2 text-white/90 text-sm font-medium bg-black/60 px-4 py-1.5 rounded-full backdrop-blur-md">
            {selectedIndex + 1} / {activeImages.length}
          </div>
        </div>
      )}
    </div>
  );
};

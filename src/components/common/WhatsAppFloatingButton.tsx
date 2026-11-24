"use client";

import React from "react";
import { SITE } from "@/config/site";
import { buildWhatsAppLink } from "@/lib/whatsapp";
import { MessageCircle } from "lucide-react";

export const WhatsAppFloatingButton: React.FC = () => {
  const whatsappNumber = SITE.contact.whatsapp;
  if (!whatsappNumber) return null;

  const chatLink = buildWhatsAppLink(
    whatsappNumber,
    `Hello ${SITE.brandName}, I would like to inquire about your real estate services in Abuja.`
  );

  return (
    <a
      href={chatLink}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Chat with us on WhatsApp"
      className="fixed bottom-6 right-6 z-50 flex items-center gap-2 bg-[#059669] hover:bg-[#047857] text-white px-4 py-3 rounded-full shadow-[0_12px_28px_rgba(5,150,105,0.35)] transition-all transform hover:scale-105 group focus:outline-none focus:ring-4 focus:ring-emerald-300"
    >
      <MessageCircle className="w-5 h-5 transition-transform group-hover:scale-110" />
      <span className="text-xs sm:text-sm font-semibold tracking-wide">
        WhatsApp Us
      </span>
    </a>
  );
};

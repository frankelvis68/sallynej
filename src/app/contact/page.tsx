import React from "react";
import type { Metadata } from "next";
import { SITE } from "@/config/site";
import { Container } from "@/components/common/Container";
import { SectionHeading } from "@/components/common/SectionHeading";
import { ContactForm } from "@/components/contact/ContactForm";
import { buildTelLink, buildWhatsAppLink } from "@/lib/whatsapp";
import { MapPin, Phone, Mail, MessageCircle, Building2 } from "lucide-react";

export const metadata: Metadata = {
  title: `Contact Us | ${SITE.brandName}`,
  description: `Contact ${SITE.legalName} for verified real estate inquiries and consultations in Abuja.`,
};

export default function ContactPage() {
  const hasPhone = Boolean(SITE.contact.phone);
  const hasWhatsApp = Boolean(SITE.contact.whatsapp);
  const hasEmail = Boolean(SITE.contact.email);

  return (
    <div className="py-12 sm:py-20 bg-[#f7f9fc]">
      <Container className="flex flex-col gap-12">
        <SectionHeading
          tagline="Get In Touch"
          title="Contact &amp; Real Estate Consultation"
          description="Speak with our team regarding property sales, leasing, or titled land acquisitions in Abuja."
        />

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Main Enquiry Form (7 Cols) */}
          <div className="lg:col-span-7">
            <ContactForm />
          </div>

          {/* Directory & Information (5 Cols) */}
          <div className="lg:col-span-5 flex flex-col gap-6">
            <div className="bg-white p-6 sm:p-8 rounded-2xl border border-[#e2e8f0] shadow-sm flex flex-col gap-6">
              <div className="flex items-center justify-between pb-4 border-b border-[#e2e8f0]">
                <div className="flex flex-col">
                  <span className="font-bold text-lg text-[#191c1e]">
                    Abuja Headquarters
                  </span>
                  <span className="text-xs text-[#795902] font-semibold uppercase tracking-wider">
                    {SITE.base}
                  </span>
                </div>
                {SITE.rcNumber && (
                  <span className="px-2.5 py-1 rounded-full bg-[#fdd275]/40 text-[#775800] text-xs font-bold font-mono">
                    RC: {SITE.rcNumber}
                  </span>
                )}
              </div>

              <div className="flex flex-col gap-4 text-xs sm:text-sm text-[#454652]">
                <div className="flex items-start gap-3">
                  <MapPin className="w-5 h-5 text-[#24389c] shrink-0 mt-0.5" />
                  <span>
                    {SITE.contact.address || `${SITE.base} (In-person appointments available upon request)`}
                  </span>
                </div>

                {hasPhone && (
                  <div className="flex items-center gap-3">
                    <Phone className="w-5 h-5 text-[#24389c] shrink-0" />
                    <a
                      href={buildTelLink(SITE.contact.phone)}
                      className="hover:text-[#24389c] transition-colors"
                    >
                      {SITE.contact.phone}
                    </a>
                  </div>
                )}

                {hasWhatsApp && (
                  <div className="flex items-center gap-3">
                    <MessageCircle className="w-5 h-5 text-[#059669] shrink-0" />
                    <a
                      href={buildWhatsAppLink(
                        SITE.contact.whatsapp,
                        `Hello ${SITE.brandName}, I would like to inquire about properties in Abuja.`
                      )}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="hover:text-[#059669] transition-colors"
                    >
                      Chat on WhatsApp ({SITE.contact.whatsapp})
                    </a>
                  </div>
                )}

                {hasEmail && (
                  <div className="flex items-center gap-3">
                    <Mail className="w-5 h-5 text-[#24389c] shrink-0" />
                    <a
                      href={`mailto:${SITE.contact.email}`}
                      className="hover:text-[#24389c] transition-colors"
                    >
                      {SITE.contact.email}
                    </a>
                  </div>
                )}
              </div>
            </div>

            <div className="bg-[#14213d] text-white p-6 rounded-2xl shadow-sm flex items-center gap-4">
              <div className="w-12 h-12 rounded-xl bg-white/10 flex items-center justify-center shrink-0">
                <Building2 className="w-6 h-6 text-[#fdd275]" />
              </div>
              <div className="flex flex-col text-xs sm:text-sm">
                <span className="font-bold text-white">
                  {SITE.legalName}
                </span>
                <span className="text-[#c5d2f7]">
                  Coverage: Karu, Kuje, Kubwa, Lugbe, Katampe, Galadimawa &amp; Airport Road
                </span>
              </div>
            </div>
          </div>
        </div>
      </Container>
    </div>
  );
}

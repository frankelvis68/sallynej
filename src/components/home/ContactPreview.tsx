import React from "react";
import { ContactForm } from "@/components/contact/ContactForm";
import { SectionHeading } from "@/components/common/SectionHeading";
import { SITE } from "@/config/site";
import { buildTelLink } from "@/lib/whatsapp";
import { MapPin, Phone, Mail, Building2 } from "lucide-react";

export const ContactPreview: React.FC = () => {
  return (
    <section className="w-full py-16 sm:py-24 bg-[#f7f9fc]" id="contact-inquiry">
      <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-12 flex flex-col gap-10">
        <SectionHeading
          tagline="Get In Touch"
          title="Book a Consultation"
          description="Inquire about property sales, leasing, or titled land acquisitions in Abuja."
        />

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Interactive Inquiry Form (7 Columns) */}
          <div className="lg:col-span-7">
            <ContactForm />
          </div>

          {/* Corporate Directory (5 Columns) */}
          <div className="lg:col-span-5 flex flex-col gap-6">
            <div className="bg-white p-6 sm:p-8 rounded-xl shadow-sm border border-[#e2e8f0] flex flex-col gap-6">
              <div className="flex items-center justify-between pb-4 border-b border-[#e2e8f0]">
                <div className="flex flex-col">
                  <span className="font-bold text-lg text-[#191c1e]">
                    Abuja Operations
                  </span>
                  <span className="text-xs text-[#795902] uppercase tracking-wider font-semibold">
                    {SITE.base}
                  </span>
                </div>
                {SITE.rcNumber && (
                  <span className="px-2.5 py-1 rounded-full bg-[#fdd275]/40 text-[#775800] text-xs font-bold">
                    RC: {SITE.rcNumber}
                  </span>
                )}
              </div>

              <div className="flex flex-col gap-4 text-xs sm:text-sm text-[#454652]">
                <div className="flex items-start gap-3">
                  <MapPin className="w-5 h-5 text-[#24389c] shrink-0 mt-0.5" />
                  <span>
                    {SITE.contact.address || `${SITE.base} (Physical office appointment available on request)`}
                  </span>
                </div>

                {SITE.contact.phone ? (
                  <div className="flex items-center gap-3">
                    <Phone className="w-5 h-5 text-[#24389c] shrink-0" />
                    <a
                      href={buildTelLink(SITE.contact.phone)}
                      className="hover:text-[#24389c] transition-colors"
                    >
                      {SITE.contact.phone}
                    </a>
                  </div>
                ) : null}

                {SITE.contact.email ? (
                  <div className="flex items-center gap-3">
                    <Mail className="w-5 h-5 text-[#24389c] shrink-0" />
                    <a
                      href={`mailto:${SITE.contact.email}`}
                      className="hover:text-[#24389c] transition-colors"
                    >
                      {SITE.contact.email}
                    </a>
                  </div>
                ) : null}
              </div>
            </div>

            {/* Corporate Summary Box */}
            <div className="bg-[#14213d] text-white p-6 rounded-xl shadow-sm flex items-center gap-4">
              <div className="w-12 h-12 rounded-xl bg-white/10 flex items-center justify-center shrink-0">
                <Building2 className="w-6 h-6 text-[#fdd275]" />
              </div>
              <div className="flex flex-col">
                <span className="font-bold text-sm text-white">
                  {SITE.legalName}
                </span>
                <span className="text-xs text-[#c5d2f7]">
                  Serving Karu, Kuje, Kubwa, Lugbe, Katampe, Galadimawa &amp; Airport Road
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

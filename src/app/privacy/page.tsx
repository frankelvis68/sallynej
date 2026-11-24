import React from "react";
import type { Metadata } from "next";
import { SITE } from "@/config/site";
import { Container } from "@/components/common/Container";
import { SectionHeading } from "@/components/common/SectionHeading";
import { AlertCircle } from "lucide-react";

export const metadata: Metadata = {
  title: `Privacy Notice | ${SITE.brandName}`,
  description: `Privacy and Data Protection notice for ${SITE.legalName}.`,
};

export default function PrivacyPage() {
  return (
    <div className="py-12 sm:py-20 bg-[#f7f9fc]">
      <Container className="flex flex-col gap-10">
        <SectionHeading
          tagline="Legal Notice"
          title="Privacy Notice"
          description="How we collect, utilize, and protect inquiry information."
        />

        {/* Client Review Banner */}
        <div className="bg-[#fdd275]/40 border border-[#795902]/30 p-4 sm:p-5 rounded-xl flex items-start gap-3 text-xs sm:text-sm text-[#14213d]">
          <AlertCircle className="w-5 h-5 text-[#795902] shrink-0 mt-0.5" />
          <div>
            <strong>TODO_CLIENT:</strong> Have the client or their legal counsel review this privacy notice under the Nigeria Data Protection Act (NDPA). This document serves as a operational notice and does not constitute formal legal counsel.
          </div>
        </div>

        <div className="bg-white p-8 sm:p-10 rounded-2xl border border-[#e2e8f0] shadow-sm flex flex-col gap-6 text-sm sm:text-base text-[#454652] leading-relaxed">
          <h2 className="text-xl font-bold text-[#191c1e]">
            1. Information We Collect
          </h2>
          <p>
            When you complete an inquiry or property consultation form on our website, we collect your <strong>Full Name</strong>, <strong>Phone Number</strong>, optional <strong>Email Address</strong>, preferred <strong>Area of Interest</strong>, and your inquiry details.
          </p>

          <h2 className="text-xl font-bold text-[#191c1e]">
            2. Purpose of Collection
          </h2>
          <p>
            The collected information is used solely to respond to your specific property inquiries, arrange site inspections, and provide real estate advisory services for {SITE.legalName}. We do not sell or rent your personal information to third-party marketing companies.
          </p>

          <h2 className="text-xl font-bold text-[#191c1e]">
            3. Data Retention and Security
          </h2>
          <p>
            We implement administrative and technical safeguards to preserve the confidentiality of inquiry details received through our online channels.
          </p>

          <h2 className="text-xl font-bold text-[#191c1e]">
            4. Inquiries &amp; Contact
          </h2>
          <p>
            If you have questions regarding your data or wish to request removal of your contact details, please contact {SITE.legalName} directly through our advisory channels.
          </p>
        </div>
      </Container>
    </div>
  );
}

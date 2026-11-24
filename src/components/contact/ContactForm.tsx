"use client";

import React, { useState } from "react";
import Link from "next/link";
import { contactFormSchema, ContactFormData } from "@/lib/schema";
import { SITE } from "@/config/site";
import { buildWhatsAppLink } from "@/lib/whatsapp";
import { Send, CheckCircle2, AlertCircle, Loader2 } from "lucide-react";

interface ContactFormProps {
  defaultInterest?: "buy" | "rent" | "short-let" | "land" | "other";
  propertyTitle?: string;
}

export const ContactForm: React.FC<ContactFormProps> = ({
  defaultInterest = "buy",
  propertyTitle,
}) => {
  const [formData, setFormData] = useState<ContactFormData>({
    name: "",
    phone: "",
    email: "",
    interest: defaultInterest,
    message: propertyTitle
      ? `Hello, I am interested in inquiring about the property: "${propertyTitle}". Please share more details.`
      : "",
    _gotcha: "",
  });

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [status, setStatus] = useState<"idle" | "submitting" | "success" | "error">("idle");
  const [feedbackMessage, setFeedbackMessage] = useState<string>("");

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors((prev) => {
        const copy = { ...prev };
        delete copy[name];
        return copy;
      });
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrors({});
    setStatus("submitting");

    // Honeypot check
    if (formData._gotcha && formData._gotcha.trim() !== "") {
      // Silently discard spam submission
      setStatus("success");
      setFeedbackMessage("Your enquiry has been received.");
      return;
    }

    // Zod validation
    const result = contactFormSchema.safeParse(formData);
    if (!result.success) {
      const fieldErrors: Record<string, string> = {};
      result.error.issues.forEach((issue) => {
        const key = issue.path[0] as string;
        fieldErrors[key] = issue.message;
      });
      setErrors(fieldErrors);
      setStatus("idle");
      return;
    }

    // 1. If form endpoint configured, submit via fetch POST
    const formEndpoint = SITE.contact.formEndpoint;
    if (formEndpoint) {
      try {
        const res = await fetch(formEndpoint, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
          },
          body: JSON.stringify({
            name: formData.name,
            phone: formData.phone,
            email: formData.email,
            interest: formData.interest,
            message: formData.message,
          }),
        });

        if (res.ok) {
          setStatus("success");
          setFeedbackMessage("Inquiry dispatched successfully! Our advisory team will contact you shortly.");
          setFormData({
            name: "",
            phone: "",
            email: "",
            interest: defaultInterest,
            message: "",
            _gotcha: "",
          });
          return;
        } else {
          throw new Error("Submission returned non-200");
        }
      } catch {
        // Fallback to secondary channels below
      }
    }

    // 2. Fallback to WhatsApp if configured
    if (SITE.contact.whatsapp) {
      const waMsg = `Hello ${SITE.brandName},\nMy Name: ${formData.name}\nPhone: ${formData.phone}\nInterest: ${formData.interest}\nMessage: ${formData.message}`;
      const waUrl = buildWhatsAppLink(SITE.contact.whatsapp, waMsg);
      setStatus("success");
      setFeedbackMessage("Opening WhatsApp chat with your enquiry...");
      window.open(waUrl, "_blank");
      return;
    }

    // 3. Fallback to mailto: if configured
    if (SITE.contact.email) {
      const mailtoUrl = `mailto:${SITE.contact.email}?subject=${encodeURIComponent(
        `Property Inquiry from ${formData.name}`
      )}&body=${encodeURIComponent(
        `Name: ${formData.name}\nPhone: ${formData.phone}\nInterest: ${formData.interest}\n\n${formData.message}`
      )}`;
      setStatus("success");
      setFeedbackMessage("Opening email client to send your message...");
      window.location.href = mailtoUrl;
      return;
    }

    // 4. Fallback if no online channel configured
    setStatus("error");
    setFeedbackMessage(
      "Online enquiries are not available yet; contact details coming soon. Please check back later."
    );
  };

  return (
    <div className="bg-white p-6 sm:p-8 rounded-xl shadow-sm border border-[#e2e8f0] flex flex-col gap-5">
      <form onSubmit={handleSubmit} className="flex flex-col gap-4" noValidate>
        {/* Hidden Honeypot */}
        <input
          type="text"
          name="_gotcha"
          value={formData._gotcha}
          onChange={handleChange}
          tabIndex={-1}
          autoComplete="off"
          aria-hidden="true"
          className="hidden pointer-events-none opacity-0 absolute -z-50"
        />

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {/* Full Name */}
          <div className="flex flex-col gap-1">
            <label htmlFor="name" className="text-xs font-semibold text-[#191c1e]">
              Full Name <span className="text-red-500">*</span>
            </label>
            <input
              id="name"
              name="name"
              type="text"
              required
              value={formData.name}
              onChange={handleChange}
              placeholder="e.g. Chief Babatunde Adeleke"
              className={`h-11 px-3.5 rounded-lg bg-[#f2f4f7] text-[#191c1e] text-sm focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#24389c] transition-all border ${
                errors.name ? "border-red-500" : "border-transparent"
              }`}
            />
            {errors.name && (
              <span className="text-[11px] text-red-600 font-medium">{errors.name}</span>
            )}
          </div>

          {/* Phone Number */}
          <div className="flex flex-col gap-1">
            <label htmlFor="phone" className="text-xs font-semibold text-[#191c1e]">
              Phone Number <span className="text-red-500">*</span>
            </label>
            <input
              id="phone"
              name="phone"
              type="tel"
              required
              value={formData.phone}
              onChange={handleChange}
              placeholder="e.g. 0801 234 5678"
              className={`h-11 px-3.5 rounded-lg bg-[#f2f4f7] text-[#191c1e] text-sm focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#24389c] transition-all border ${
                errors.phone ? "border-red-500" : "border-transparent"
              }`}
            />
            {errors.phone && (
              <span className="text-[11px] text-red-600 font-medium">{errors.phone}</span>
            )}
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {/* Email Address (Optional) */}
          <div className="flex flex-col gap-1">
            <label htmlFor="email" className="text-xs font-semibold text-[#191c1e]">
              Email Address <span className="text-[#454652] font-normal">(Optional)</span>
            </label>
            <input
              id="email"
              name="email"
              type="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="you@domain.com"
              className={`h-11 px-3.5 rounded-lg bg-[#f2f4f7] text-[#191c1e] text-sm focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#24389c] transition-all border ${
                errors.email ? "border-red-500" : "border-transparent"
              }`}
            />
            {errors.email && (
              <span className="text-[11px] text-red-600 font-medium">{errors.email}</span>
            )}
          </div>

          {/* Area of Interest */}
          <div className="flex flex-col gap-1">
            <label htmlFor="interest" className="text-xs font-semibold text-[#191c1e]">
              Area of Interest <span className="text-red-500">*</span>
            </label>
            <select
              id="interest"
              name="interest"
              value={formData.interest}
              onChange={handleChange}
              className="h-11 px-3.5 rounded-lg bg-[#f2f4f7] text-[#191c1e] text-sm focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#24389c] transition-all border border-transparent cursor-pointer"
            >
              <option value="buy">Property Acquisition (Buy)</option>
              <option value="rent">Executive Lease (Rent)</option>
              <option value="short-let">Luxury Short Let</option>
              <option value="land">Commercial / Residential Land</option>
              <option value="other">General Advisory</option>
            </select>
          </div>
        </div>

        {/* Message */}
        <div className="flex flex-col gap-1">
          <label htmlFor="message" className="text-xs font-semibold text-[#191c1e]">
            Specific Requirements or Message <span className="text-red-500">*</span>
          </label>
          <textarea
            id="message"
            name="message"
            rows={4}
            required
            maxLength={1000}
            value={formData.message}
            onChange={handleChange}
            placeholder="Tell us your preferred location, budget, bedroom count, or specific title requests..."
            className={`p-3.5 rounded-lg bg-[#f2f4f7] text-[#191c1e] text-sm focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#24389c] transition-all resize-none border ${
              errors.message ? "border-red-500" : "border-transparent"
            }`}
          />
          <div className="flex justify-between items-center text-[11px] text-[#454652] mt-0.5">
            {errors.message ? (
              <span className="text-red-600 font-medium">{errors.message}</span>
            ) : (
              <span />
            )}
            <span>{formData.message.length}/1000</span>
          </div>
        </div>

        {/* Consent Note */}
        <p className="text-[11px] text-[#454652] leading-relaxed">
          By submitting this form, you consent to {SITE.legalName} contacting you regarding your property inquiry. See our{" "}
          <Link href="/privacy" className="text-[#24389c] underline hover:text-[#1b2b7b]">
            Privacy Notice
          </Link>
          .
        </p>

        {/* Submit Button */}
        <button
          type="submit"
          disabled={status === "submitting"}
          className="h-12 bg-[#3f51b5] hover:bg-[#24389c] disabled:bg-gray-400 text-white font-semibold text-sm rounded-lg shadow-sm transition-colors flex items-center justify-center gap-2 cursor-pointer mt-1"
        >
          {status === "submitting" ? (
            <>
              <Loader2 className="w-4 h-4 animate-spin" />
              <span>Transmitting Enquiry...</span>
            </>
          ) : (
            <>
              <Send className="w-4 h-4" />
              <span>Send Message &amp; Request Callback</span>
            </>
          )}
        </button>

        {/* Feedback Alerts */}
        {status === "success" && (
          <div className="flex items-center gap-2 text-xs text-emerald-800 bg-emerald-50 border border-emerald-200 p-3 rounded-lg">
            <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
            <span>{feedbackMessage}</span>
          </div>
        )}

        {status === "error" && (
          <div className="flex items-center gap-2 text-xs text-amber-900 bg-amber-50 border border-amber-200 p-3 rounded-lg">
            <AlertCircle className="w-4 h-4 text-amber-700 shrink-0" />
            <span>{feedbackMessage}</span>
          </div>
        )}
      </form>
    </div>
  );
};

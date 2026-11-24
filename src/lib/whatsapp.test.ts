import { describe, it, expect } from "vitest";
import {
  normalizeNigerianPhone,
  buildWhatsAppLink,
  buildTelLink,
} from "./whatsapp";

describe("WhatsApp and Phone Normalizer", () => {
  it("normalizes standard Nigerian local format with spaces", () => {
    expect(normalizeNigerianPhone("0801 234 5678")).toBe("2348012345678");
  });

  it("normalizes international format with plus and spaces", () => {
    expect(normalizeNigerianPhone("+234 801 234 5678")).toBe("2348012345678");
  });

  it("normalizes dashes format", () => {
    expect(normalizeNigerianPhone("234-801-234-5678")).toBe("2348012345678");
  });

  it("normalizes numbers with brackets", () => {
    expect(normalizeNigerianPhone("+234 (0) 906 000 8820")).toBe("23409060008820");
  });

  it("builds correct wa.me link with encoded message", () => {
    const link = buildWhatsAppLink(
      "0801 234 5678",
      "Hello, I am interested in your property"
    );
    expect(link).toBe(
      "https://wa.me/2348012345678?text=Hello%2C%20I%20am%20interested%20in%20your%20property"
    );
  });

  it("builds correct tel: link", () => {
    const link = buildTelLink("0801 234 5678");
    expect(link).toBe("tel:+2348012345678");
  });
});

/**
 * WhatsApp & Phone number normalizer for Nigerian telephone formats.
 * Accepts formats:
 * - 0801 234 5678
 * - +234 801 234 5678
 * - 234-801-234-5678
 * Strips all spaces, brackets, dashes and +, converts leading '0' to '234'.
 */
export function normalizeNigerianPhone(input: string): string {
  if (!input) return "";

  // Strip all non-digit characters except leading +
  const digitsOnly = input.replace(/\D/g, "");

  if (digitsOnly.startsWith("0")) {
    return "234" + digitsOnly.slice(1);
  }

  return digitsOnly;
}

/**
 * Builds standard WhatsApp direct chat link:
 * https://wa.me/<digits>?text=<encodedMessage>
 */
export function buildWhatsAppLink(phone: string, message: string = ""): string {
  const normalized = normalizeNigerianPhone(phone);
  if (!normalized) return "";

  if (!message) {
    return `https://wa.me/${normalized}`;
  }

  return `https://wa.me/${normalized}?text=${encodeURIComponent(message)}`;
}

/**
 * Builds tel: link with + prefix
 */
export function buildTelLink(phone: string): string {
  const normalized = normalizeNigerianPhone(phone);
  if (!normalized) return "";
  return `tel:+${normalized}`;
}

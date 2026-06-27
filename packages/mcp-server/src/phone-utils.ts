export function formatPhone(phone: string, countryCode = "US"): string {
  const digits = phone.replace(/\D/g, "");
  switch (countryCode) {
    case "US":
    case "CA": {
      const d = digits.length === 11 && digits[0] === "1" ? digits.slice(1) : digits;
      if (d.length !== 10) return phone;
      return `(${d.slice(0, 3)}) ${d.slice(3, 6)}-${d.slice(6)}`;
    }
    case "AU": {
      const d = digits.length === 12 && digits.startsWith("61") ? digits.slice(2) : digits;
      if (d.length !== 10) return phone;
      return `${d.slice(0, 4)} ${d.slice(4, 7)} ${d.slice(7)}`;
    }
    case "UK":
    case "GB": {
      const d = digits.length === 12 && digits.startsWith("44") ? digits.slice(2) : digits;
      if (d.length !== 11) return phone;
      return `${d.slice(0, 5)} ${d.slice(5)}`;
    }
    default:
      return phone;
  }
}

export function normalizePhone(phone: string): string {
  return phone.replace(/\D/g, "");
}

export function isValidPhone(phone: string): boolean {
  const digits = normalizePhone(phone);
  return digits.length >= 7 && digits.length <= 15;
}

export function extractPhoneNumbers(text: string): string[] {
  const regex = /(?:\+?\d{1,3}[-.\s]?)?\(?\d{2,4}\)?[-.\s]?\d{3,4}[-.\s]?\d{3,4}/g;
  return (text.match(regex) || []).filter((p) => isValidPhone(p));
}

export function toE164(phone: string, countryCode = "1"): string {
  const digits = normalizePhone(phone);
  if (digits.startsWith(countryCode)) return `+${digits}`;
  return `+${countryCode}${digits}`;
}

export function maskPhone(phone: string, visibleDigits = 4): string {
  const digits = normalizePhone(phone);
  if (digits.length <= visibleDigits) return phone;
  return "*".repeat(digits.length - visibleDigits) + digits.slice(-visibleDigits);
}

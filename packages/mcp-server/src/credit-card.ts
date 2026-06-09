export function luhnCheck(number: string): boolean {
  const digits = number.replace(/\D/g, "");
  if (digits.length === 0) return false;
  let sum = 0;
  let alternate = false;
  for (let i = digits.length - 1; i >= 0; i--) {
    let n = parseInt(digits[i], 10);
    if (alternate) {
      n *= 2;
      if (n > 9) n -= 9;
    }
    sum += n;
    alternate = !alternate;
  }
  return sum % 10 === 0;
}

export function generateCheckDigit(partial: string): number {
  const digits = partial.replace(/\D/g, "");
  let sum = 0;
  let alternate = true;
  for (let i = digits.length - 1; i >= 0; i--) {
    let n = parseInt(digits[i], 10);
    if (alternate) {
      n *= 2;
      if (n > 9) n -= 9;
    }
    sum += n;
    alternate = !alternate;
  }
  return (10 - (sum % 10)) % 10;
}

export type CardNetwork = "visa" | "mastercard" | "amex" | "discover" | "diners" | "jcb" | "unknown";

export function identifyNetwork(number: string): CardNetwork {
  const digits = number.replace(/\D/g, "");

  if (/^4/.test(digits)) return "visa";
  if (/^5[1-5]/.test(digits) || /^2[2-7]/.test(digits)) return "mastercard";
  if (/^3[47]/.test(digits)) return "amex";
  if (/^6(?:011|5)/.test(digits)) return "discover";
  if (/^3(?:0[0-5]|[68])/.test(digits)) return "diners";
  if (/^35/.test(digits)) return "jcb";

  return "unknown";
}

export function isValidCardNumber(number: string): boolean {
  const digits = number.replace(/\D/g, "");
  if (digits.length < 13 || digits.length > 19) return false;
  return luhnCheck(digits);
}

export function formatCardNumber(number: string): string {
  const digits = number.replace(/\D/g, "");
  const network = identifyNetwork(digits);

  if (network === "amex") {
    return `${digits.slice(0, 4)} ${digits.slice(4, 10)} ${digits.slice(10)}`.trim();
  }

  const groups: string[] = [];
  for (let i = 0; i < digits.length; i += 4) {
    groups.push(digits.slice(i, i + 4));
  }
  return groups.join(" ");
}

export function maskCardNumber(number: string, visibleDigits = 4): string {
  const digits = number.replace(/\D/g, "");
  const masked = "*".repeat(digits.length - visibleDigits) + digits.slice(-visibleDigits);
  const groups: string[] = [];
  for (let i = 0; i < masked.length; i += 4) {
    groups.push(masked.slice(i, i + 4));
  }
  return groups.join(" ");
}

export function isValidExpiry(month: number, year: number, currentMonth = 1, currentYear = 2026): boolean {
  if (month < 1 || month > 12) return false;
  if (year < currentYear) return false;
  if (year === currentYear && month < currentMonth) return false;
  return true;
}

export function isValidCVV(cvv: string, network: CardNetwork = "visa"): boolean {
  const digits = cvv.replace(/\D/g, "");
  if (network === "amex") return digits.length === 4;
  return digits.length === 3;
}

export interface CardValidation {
  valid: boolean;
  network: CardNetwork;
  luhnValid: boolean;
  lengthValid: boolean;
  formatted: string;
}

export function validateCard(number: string): CardValidation {
  const digits = number.replace(/\D/g, "");
  const network = identifyNetwork(digits);
  const luhnValid = luhnCheck(digits);
  const lengthValid = digits.length >= 13 && digits.length <= 19;

  return {
    valid: luhnValid && lengthValid,
    network,
    luhnValid,
    lengthValid,
    formatted: formatCardNumber(digits),
  };
}

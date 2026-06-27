const IBAN_LENGTHS: Record<string, number> = {
  AL: 28, AD: 20, AT: 20, AZ: 28, BH: 22, BY: 28, BE: 16, BA: 20,
  BR: 29, BG: 22, CR: 22, HR: 21, CY: 28, CZ: 24, DK: 18, DO: 28,
  TL: 23, EE: 20, FO: 18, FI: 18, FR: 27, GE: 22, DE: 22, GI: 23,
  GR: 27, GL: 18, GT: 28, HU: 28, IS: 26, IQ: 23, IE: 22, IL: 23,
  IT: 27, JO: 30, KZ: 20, XK: 20, KW: 30, LV: 21, LB: 28, LI: 21,
  LT: 20, LU: 20, MK: 19, MT: 31, MR: 27, MU: 30, MC: 27, MD: 24,
  ME: 22, NL: 18, NO: 15, PK: 24, PS: 29, PL: 28, PT: 25, QA: 29,
  RO: 24, LC: 32, SM: 27, SA: 24, RS: 22, SC: 31, SK: 24, SI: 19,
  ES: 24, SE: 24, CH: 21, TN: 24, TR: 26, UA: 29, AE: 23, GB: 22,
  VA: 22, VG: 24, EG: 29,
};

export function normalize(iban: string): string {
  return iban.replace(/[\s-]/g, "").toUpperCase();
}

export function getCountryCode(iban: string): string {
  return normalize(iban).substring(0, 2);
}

export function getCheckDigits(iban: string): string {
  return normalize(iban).substring(2, 4);
}

export function getBBAN(iban: string): string {
  return normalize(iban).substring(4);
}

function mod97(str: string): number {
  let remainder = 0;
  for (const ch of str) {
    remainder = (remainder * 10 + parseInt(ch)) % 97;
  }
  return remainder;
}

function toDigitString(iban: string): string {
  let result = "";
  for (const ch of iban) {
    const code = ch.charCodeAt(0);
    if (code >= 48 && code <= 57) {
      result += ch;
    } else if (code >= 65 && code <= 90) {
      result += (code - 55).toString();
    }
  }
  return result;
}

export function validateChecksum(iban: string): boolean {
  const norm = normalize(iban);
  if (norm.length < 5) return false;
  const rearranged = norm.substring(4) + norm.substring(0, 4);
  const digits = toDigitString(rearranged);
  return mod97(digits) === 1;
}

export function validateLength(iban: string): boolean {
  const norm = normalize(iban);
  const country = norm.substring(0, 2);
  const expected = IBAN_LENGTHS[country];
  if (!expected) return false;
  return norm.length === expected;
}

export function validateFormat(iban: string): boolean {
  const norm = normalize(iban);
  return /^[A-Z]{2}[0-9]{2}[A-Z0-9]+$/.test(norm);
}

export interface ValidationResult {
  valid: boolean;
  errors: string[];
  country: string;
  checkDigits: string;
  bban: string;
}

export function validate(iban: string): ValidationResult {
  const norm = normalize(iban);
  const errors: string[] = [];
  const country = norm.substring(0, 2);
  const checkDigits = norm.substring(2, 4);
  const bban = norm.substring(4);

  if (!validateFormat(iban)) {
    errors.push("Invalid format");
  }

  if (!IBAN_LENGTHS[country]) {
    errors.push("Unknown country code: " + country);
  } else if (!validateLength(iban)) {
    errors.push("Invalid length for " + country + ": expected " + IBAN_LENGTHS[country] + ", got " + norm.length);
  }

  if (errors.length === 0 && !validateChecksum(iban)) {
    errors.push("Invalid check digits");
  }

  return { valid: errors.length === 0, errors, country, checkDigits, bban };
}

export function computeCheckDigits(countryCode: string, bban: string): string {
  const temp = bban + countryCode + "00";
  const digits = toDigitString(temp);
  const remainder = mod97(digits);
  const check = 98 - remainder;
  return check.toString().padStart(2, "0");
}

export function formatIBAN(iban: string): string {
  const norm = normalize(iban);
  const groups: string[] = [];
  for (let i = 0; i < norm.length; i += 4) {
    groups.push(norm.substring(i, i + 4));
  }
  return groups.join(" ");
}

export function getSupportedCountries(): string[] {
  return Object.keys(IBAN_LENGTHS).sort();
}

export function getExpectedLength(countryCode: string): number | null {
  return IBAN_LENGTHS[countryCode.toUpperCase()] ?? null;
}

export function generateExample(countryCode: string): string | null {
  const len = IBAN_LENGTHS[countryCode.toUpperCase()];
  if (!len) return null;
  const bbanLen = len - 4;
  let bban = "";
  for (let i = 0; i < bbanLen; i++) {
    bban += Math.floor(Math.random() * 10).toString();
  }
  const check = computeCheckDigits(countryCode.toUpperCase(), bban);
  return countryCode.toUpperCase() + check + bban;
}

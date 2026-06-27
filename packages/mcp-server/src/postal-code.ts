interface PostalFormat {
  regex: RegExp;
  format: string;
  example: string;
}

const POSTAL_FORMATS: Record<string, PostalFormat> = {
  US: { regex: /^\d{5}(-\d{4})?$/, format: "NNNNN or NNNNN-NNNN", example: "90210" },
  CA: { regex: /^[A-Z]\d[A-Z]\s?\d[A-Z]\d$/i, format: "A1A 1A1", example: "K1A 0B1" },
  GB: { regex: /^[A-Z]{1,2}\d[A-Z\d]?\s?\d[A-Z]{2}$/i, format: "A9 9AA / A99 9AA / AA9 9AA", example: "SW1A 1AA" },
  DE: { regex: /^\d{5}$/, format: "NNNNN", example: "10115" },
  FR: { regex: /^\d{5}$/, format: "NNNNN", example: "75001" },
  JP: { regex: /^\d{3}-?\d{4}$/, format: "NNN-NNNN", example: "100-0001" },
  AU: { regex: /^\d{4}$/, format: "NNNN", example: "2000" },
  BR: { regex: /^\d{5}-?\d{3}$/, format: "NNNNN-NNN", example: "01001-000" },
  IN: { regex: /^\d{6}$/, format: "NNNNNN", example: "110001" },
  NL: { regex: /^\d{4}\s?[A-Z]{2}$/i, format: "NNNN AA", example: "1012 AB" },
  IT: { regex: /^\d{5}$/, format: "NNNNN", example: "00100" },
  ES: { regex: /^\d{5}$/, format: "NNNNN", example: "28001" },
  CH: { regex: /^\d{4}$/, format: "NNNN", example: "8001" },
  AT: { regex: /^\d{4}$/, format: "NNNN", example: "1010" },
  BE: { regex: /^\d{4}$/, format: "NNNN", example: "1000" },
  SE: { regex: /^\d{3}\s?\d{2}$/, format: "NNN NN", example: "111 22" },
  NO: { regex: /^\d{4}$/, format: "NNNN", example: "0001" },
  DK: { regex: /^\d{4}$/, format: "NNNN", example: "1000" },
  FI: { regex: /^\d{5}$/, format: "NNNNN", example: "00100" },
  PL: { regex: /^\d{2}-?\d{3}$/, format: "NN-NNN", example: "00-001" },
  CZ: { regex: /^\d{3}\s?\d{2}$/, format: "NNN NN", example: "100 00" },
  PT: { regex: /^\d{4}-?\d{3}$/, format: "NNNN-NNN", example: "1000-001" },
  RU: { regex: /^\d{6}$/, format: "NNNNNN", example: "101000" },
  CN: { regex: /^\d{6}$/, format: "NNNNNN", example: "100000" },
  KR: { regex: /^\d{5}$/, format: "NNNNN", example: "03000" },
  MX: { regex: /^\d{5}$/, format: "NNNNN", example: "06600" },
  SG: { regex: /^\d{6}$/, format: "NNNNNN", example: "238823" },
  NZ: { regex: /^\d{4}$/, format: "NNNN", example: "6011" },
  ZA: { regex: /^\d{4}$/, format: "NNNN", example: "8000" },
  IE: { regex: /^[A-Z\d]{3}\s?[A-Z\d]{4}$/i, format: "A65 F4E2", example: "D02 AF30" },
};

export function validate(code: string, country: string): boolean {
  const fmt = POSTAL_FORMATS[country.toUpperCase()];
  if (!fmt) return false;
  return fmt.regex.test(code.trim());
}

export interface ValidationResult {
  valid: boolean;
  country: string;
  normalized: string;
  format: string | null;
}

export function validateDetailed(code: string, country: string): ValidationResult {
  const cc = country.toUpperCase();
  const fmt = POSTAL_FORMATS[cc];
  const trimmed = code.trim();

  return {
    valid: fmt ? fmt.regex.test(trimmed) : false,
    country: cc,
    normalized: trimmed.toUpperCase(),
    format: fmt ? fmt.format : null,
  };
}

export function detectCountry(code: string): string[] {
  const trimmed = code.trim();
  const matches: string[] = [];
  for (const [country, fmt] of Object.entries(POSTAL_FORMATS)) {
    if (fmt.regex.test(trimmed)) {
      matches.push(country);
    }
  }
  return matches.sort();
}

export function getFormat(country: string): PostalFormat | null {
  return POSTAL_FORMATS[country.toUpperCase()] ?? null;
}

export function getExample(country: string): string | null {
  const fmt = POSTAL_FORMATS[country.toUpperCase()];
  return fmt ? fmt.example : null;
}

export function getSupportedCountries(): string[] {
  return Object.keys(POSTAL_FORMATS).sort();
}

export function normalizeUS(code: string): string {
  const cleaned = code.replace(/\s/g, "");
  if (/^\d{9}$/.test(cleaned)) {
    return cleaned.substring(0, 5) + "-" + cleaned.substring(5);
  }
  return cleaned;
}

export function normalizeCA(code: string): string {
  const cleaned = code.replace(/\s/g, "").toUpperCase();
  if (cleaned.length === 6) {
    return cleaned.substring(0, 3) + " " + cleaned.substring(3);
  }
  return cleaned;
}

export function normalizeGB(code: string): string {
  const cleaned = code.replace(/\s/g, "").toUpperCase();
  if (cleaned.length >= 5) {
    const outward = cleaned.substring(0, cleaned.length - 3);
    const inward = cleaned.substring(cleaned.length - 3);
    return outward + " " + inward;
  }
  return cleaned;
}

export function isResidential(code: string, country: string): boolean | null {
  if (country.toUpperCase() === "US") {
    return null;
  }
  return null;
}

export function extractDigits(code: string): string {
  return code.replace(/\D/g, "");
}

export function extractLetters(code: string): string {
  return code.replace(/[^A-Za-z]/g, "");
}

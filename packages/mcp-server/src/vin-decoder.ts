const WMI_COUNTRIES: Record<string, string> = {
  "1": "United States", "2": "Canada", "3": "Mexico",
  "J": "Japan", "K": "South Korea", "L": "China",
  "S": "United Kingdom", "V": "France", "W": "Germany",
  "Y": "Sweden/Finland", "Z": "Italy",
  "9": "Brazil",
};

const TRANSLITERATION: Record<string, number> = {
  A: 1, B: 2, C: 3, D: 4, E: 5, F: 6, G: 7, H: 8,
  J: 1, K: 2, L: 3, M: 4, N: 5, P: 7, R: 9,
  S: 2, T: 3, U: 4, V: 5, W: 6, X: 7, Y: 8, Z: 9,
};

const POSITION_WEIGHTS = [8, 7, 6, 5, 4, 3, 2, 10, 0, 9, 8, 7, 6, 5, 4, 3, 2];

export interface VINInfo {
  valid: boolean;
  wmi: string;
  vds: string;
  vis: string;
  country: string | null;
  year: number | null;
  checkDigit: string;
  calculatedCheckDigit: string;
  serial: string;
}

function charToValue(ch: string): number {
  if (ch >= "0" && ch <= "9") return parseInt(ch);
  return TRANSLITERATION[ch] ?? 0;
}

export function computeCheckDigit(vin: string): string {
  let sum = 0;
  for (let i = 0; i < 17; i++) {
    if (i === 8) continue;
    sum += charToValue(vin[i]) * POSITION_WEIGHTS[i];
  }
  const remainder = sum % 11;
  return remainder === 10 ? "X" : remainder.toString();
}

export function validateCheckDigit(vin: string): boolean {
  if (vin.length !== 17) return false;
  const expected = computeCheckDigit(vin);
  return vin[8] === expected;
}

export function validateFormat(vin: string): boolean {
  if (vin.length !== 17) return false;
  return /^[A-HJ-NPR-Z0-9]{17}$/.test(vin);
}

const YEAR_CODES: Record<string, number[]> = {};
const yearChars = "ABCDEFGHJKLMNPRSTVWXY123456789";
let yearVal = 1980;
for (const ch of yearChars) {
  YEAR_CODES[ch] = YEAR_CODES[ch] || [];
  YEAR_CODES[ch].push(yearVal);
  yearVal++;
}
yearVal = 2010;
for (const ch of yearChars) {
  YEAR_CODES[ch].push(yearVal);
  yearVal++;
}

export function decodeYear(vin: string): number | null {
  if (vin.length !== 17) return null;
  const yearChar = vin[9];
  const years = YEAR_CODES[yearChar];
  if (!years) return null;
  return years[years.length - 1];
}

export function getCountry(vin: string): string | null {
  if (vin.length < 1) return null;
  const firstChar = vin[0];
  return WMI_COUNTRIES[firstChar] ?? null;
}

export function getWMI(vin: string): string {
  return vin.substring(0, 3);
}

export function getVDS(vin: string): string {
  return vin.substring(3, 9);
}

export function getVIS(vin: string): string {
  return vin.substring(9, 17);
}

export function getSerial(vin: string): string {
  return vin.substring(11, 17);
}

export function decode(vin: string): VINInfo {
  const norm = vin.toUpperCase().replace(/[\s-]/g, "");
  const formatValid = validateFormat(norm);
  const checkValid = formatValid && validateCheckDigit(norm);

  return {
    valid: formatValid && checkValid,
    wmi: norm.substring(0, 3),
    vds: norm.substring(3, 9),
    vis: norm.substring(9, 17),
    country: getCountry(norm),
    year: decodeYear(norm),
    checkDigit: norm.length >= 9 ? norm[8] : "",
    calculatedCheckDigit: formatValid ? computeCheckDigit(norm) : "",
    serial: norm.length >= 17 ? getSerial(norm) : "",
  };
}

export function isValid(vin: string): boolean {
  const norm = vin.toUpperCase().replace(/[\s-]/g, "");
  return validateFormat(norm) && validateCheckDigit(norm);
}

export function normalize(vin: string): string {
  return vin.toUpperCase().replace(/[\s-]/g, "");
}

export function hasInvalidChars(vin: string): boolean {
  return /[IOQ]/i.test(vin);
}

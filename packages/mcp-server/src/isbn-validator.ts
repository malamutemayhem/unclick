export function isValidISBN10(isbn: string): boolean {
  const cleaned = isbn.replace(/[-\s]/g, "");
  if (cleaned.length !== 10) return false;
  if (!/^[\dX]+$/i.test(cleaned)) return false;

  let sum = 0;
  for (let i = 0; i < 10; i++) {
    const ch = cleaned[i].toUpperCase();
    const val = ch === "X" ? 10 : parseInt(ch, 10);
    if (i < 9 && ch === "X") return false;
    sum += val * (10 - i);
  }
  return sum % 11 === 0;
}

export function isValidISBN13(isbn: string): boolean {
  const cleaned = isbn.replace(/[-\s]/g, "");
  if (cleaned.length !== 13) return false;
  if (!/^\d+$/.test(cleaned)) return false;

  let sum = 0;
  for (let i = 0; i < 13; i++) {
    const digit = parseInt(cleaned[i], 10);
    sum += digit * (i % 2 === 0 ? 1 : 3);
  }
  return sum % 10 === 0;
}

export function isValidISBN(isbn: string): boolean {
  const cleaned = isbn.replace(/[-\s]/g, "");
  if (cleaned.length === 10) return isValidISBN10(isbn);
  if (cleaned.length === 13) return isValidISBN13(isbn);
  return false;
}

export function isbn10to13(isbn10: string): string | null {
  if (!isValidISBN10(isbn10)) return null;
  const cleaned = isbn10.replace(/[-\s]/g, "");
  const base = "978" + cleaned.substring(0, 9);
  let sum = 0;
  for (let i = 0; i < 12; i++) {
    sum += parseInt(base[i], 10) * (i % 2 === 0 ? 1 : 3);
  }
  const check = (10 - (sum % 10)) % 10;
  return base + check;
}

export function isbn13to10(isbn13: string): string | null {
  if (!isValidISBN13(isbn13)) return null;
  const cleaned = isbn13.replace(/[-\s]/g, "");
  if (!cleaned.startsWith("978")) return null;

  const base = cleaned.substring(3, 12);
  let sum = 0;
  for (let i = 0; i < 9; i++) {
    sum += parseInt(base[i], 10) * (10 - i);
  }
  const remainder = sum % 11;
  const check = (11 - remainder) % 11;
  return base + (check === 10 ? "X" : check.toString());
}

export function formatISBN13(isbn: string): string {
  const cleaned = isbn.replace(/[-\s]/g, "");
  if (cleaned.length !== 13) return isbn;
  return `${cleaned.substring(0, 3)}-${cleaned[3]}-${cleaned.substring(4, 9)}-${cleaned.substring(9, 12)}-${cleaned[12]}`;
}

export function getISBNInfo(isbn: string): { valid: boolean; type: "ISBN-10" | "ISBN-13" | "unknown"; prefix?: string } {
  const cleaned = isbn.replace(/[-\s]/g, "");
  if (cleaned.length === 10 && isValidISBN10(isbn)) {
    return { valid: true, type: "ISBN-10" };
  }
  if (cleaned.length === 13 && isValidISBN13(isbn)) {
    return { valid: true, type: "ISBN-13", prefix: cleaned.substring(0, 3) };
  }
  return { valid: false, type: "unknown" };
}

export function generateCheckDigit10(partial: string): string {
  const cleaned = partial.replace(/[-\s]/g, "");
  if (cleaned.length !== 9) throw new Error("Need exactly 9 digits");
  let sum = 0;
  for (let i = 0; i < 9; i++) {
    sum += parseInt(cleaned[i], 10) * (10 - i);
  }
  const check = (11 - (sum % 11)) % 11;
  return check === 10 ? "X" : check.toString();
}

export function generateCheckDigit13(partial: string): number {
  const cleaned = partial.replace(/[-\s]/g, "");
  if (cleaned.length !== 12) throw new Error("Need exactly 12 digits");
  let sum = 0;
  for (let i = 0; i < 12; i++) {
    sum += parseInt(cleaned[i], 10) * (i % 2 === 0 ? 1 : 3);
  }
  return (10 - (sum % 10)) % 10;
}

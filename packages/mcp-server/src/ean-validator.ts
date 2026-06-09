export interface EANResult {
  valid: boolean;
  type: string;
  digits: string;
  checkDigit: number;
  expectedCheckDigit: number;
  country?: string;
}

const GS1_PREFIXES: [string, string][] = [
  ["000-019", "United States"],
  ["020-029", "Restricted distribution"],
  ["030-039", "United States"],
  ["040-049", "Restricted distribution"],
  ["050-059", "Coupons"],
  ["060-099", "United States"],
  ["100-139", "United States"],
  ["300-379", "France"],
  ["380", "Bulgaria"],
  ["383", "Slovenia"],
  ["385", "Croatia"],
  ["387", "Bosnia and Herzegovina"],
  ["389", "Montenegro"],
  ["400-440", "Germany"],
  ["450-459", "Japan"],
  ["460-469", "Russia"],
  ["470", "Kyrgyzstan"],
  ["471", "Taiwan"],
  ["474", "Estonia"],
  ["475", "Latvia"],
  ["476", "Azerbaijan"],
  ["477", "Lithuania"],
  ["478", "Uzbekistan"],
  ["479", "Sri Lanka"],
  ["480", "Philippines"],
  ["481", "Belarus"],
  ["482", "Ukraine"],
  ["484", "Moldova"],
  ["485", "Armenia"],
  ["486", "Georgia"],
  ["487", "Kazakhstan"],
  ["489", "Hong Kong"],
  ["490-499", "Japan"],
  ["500-509", "United Kingdom"],
  ["520-521", "Greece"],
  ["528", "Lebanon"],
  ["529", "Cyprus"],
  ["530", "Albania"],
  ["531", "North Macedonia"],
  ["535", "Malta"],
  ["539", "Ireland"],
  ["540-549", "Belgium and Luxembourg"],
  ["560", "Portugal"],
  ["569", "Iceland"],
  ["570-579", "Denmark"],
  ["590", "Poland"],
  ["594", "Romania"],
  ["599", "Hungary"],
  ["600-601", "South Africa"],
  ["608", "Bahrain"],
  ["609", "Mauritius"],
  ["611", "Morocco"],
  ["613", "Algeria"],
  ["615", "Nigeria"],
  ["616", "Kenya"],
  ["618", "Ivory Coast"],
  ["619", "Tunisia"],
  ["620", "Tanzania"],
  ["621", "Syria"],
  ["622", "Egypt"],
  ["624", "Libya"],
  ["625", "Jordan"],
  ["626", "Iran"],
  ["627", "Kuwait"],
  ["628", "Saudi Arabia"],
  ["629", "UAE"],
  ["640-649", "Finland"],
  ["690-699", "China"],
  ["700-709", "Norway"],
  ["729", "Israel"],
  ["730-739", "Sweden"],
  ["740", "Guatemala"],
  ["741", "El Salvador"],
  ["742", "Honduras"],
  ["743", "Nicaragua"],
  ["744", "Costa Rica"],
  ["745", "Panama"],
  ["746", "Dominican Republic"],
  ["750", "Mexico"],
  ["754-755", "Canada"],
  ["759", "Venezuela"],
  ["760-769", "Switzerland"],
  ["770-771", "Colombia"],
  ["773", "Uruguay"],
  ["775", "Peru"],
  ["777", "Bolivia"],
  ["778-779", "Argentina"],
  ["780", "Chile"],
  ["784", "Paraguay"],
  ["786", "Ecuador"],
  ["789-790", "Brazil"],
  ["800-839", "Italy"],
  ["840-849", "Spain"],
  ["850", "Cuba"],
  ["858", "Slovakia"],
  ["859", "Czech Republic"],
  ["860", "Serbia"],
  ["865", "Mongolia"],
  ["867", "North Korea"],
  ["868-869", "Turkey"],
  ["870-879", "Netherlands"],
  ["880", "South Korea"],
  ["884", "Cambodia"],
  ["885", "Thailand"],
  ["888", "Singapore"],
  ["890", "India"],
  ["893", "Vietnam"],
  ["896", "Pakistan"],
  ["899", "Indonesia"],
  ["900-919", "Austria"],
  ["930-939", "Australia"],
  ["940-949", "New Zealand"],
  ["950", "GS1 Global Office"],
  ["955", "Malaysia"],
  ["958", "Macau"],
];

function matchPrefix(digits: string): string | undefined {
  const d3 = digits.substring(0, 3);
  const num = parseInt(d3, 10);

  for (const [range, country] of GS1_PREFIXES) {
    if (range.includes("-")) {
      const [lo, hi] = range.split("-");
      if (num >= parseInt(lo, 10) && num <= parseInt(hi, 10)) return country;
    } else {
      if (d3 === range || d3.startsWith(range)) {
        if (range.length <= d3.length) return country;
      }
    }
  }
  return undefined;
}

export function computeCheckDigit(digits: string): number {
  const len = digits.length;
  let sum = 0;
  for (let i = 0; i < len; i++) {
    const d = parseInt(digits[i], 10);
    const fromRight = len - i;
    const weight = fromRight % 2 === 0 ? 1 : 3;
    sum += d * weight;
  }
  return (10 - (sum % 10)) % 10;
}

export function validateEAN13(code: string): EANResult {
  const digits = code.replace(/[\s-]/g, "");
  const check = parseInt(digits[12], 10);
  const expected = computeCheckDigit(digits.substring(0, 12));
  return {
    valid: digits.length === 13 && /^\d{13}$/.test(digits) && check === expected,
    type: "EAN-13",
    digits,
    checkDigit: check,
    expectedCheckDigit: expected,
    country: matchPrefix(digits),
  };
}

export function validateEAN8(code: string): EANResult {
  const digits = code.replace(/[\s-]/g, "");
  const check = parseInt(digits[7], 10);
  const expected = computeCheckDigit(digits.substring(0, 7));
  return {
    valid: digits.length === 8 && /^\d{8}$/.test(digits) && check === expected,
    type: "EAN-8",
    digits,
    checkDigit: check,
    expectedCheckDigit: expected,
  };
}

export function validateUPC(code: string): EANResult {
  const digits = code.replace(/[\s-]/g, "");
  const check = parseInt(digits[11], 10);
  const expected = computeCheckDigit(digits.substring(0, 11));
  return {
    valid: digits.length === 12 && /^\d{12}$/.test(digits) && check === expected,
    type: "UPC-A",
    digits,
    checkDigit: check,
    expectedCheckDigit: expected,
    country: matchPrefix("0" + digits),
  };
}

export function detect(code: string): EANResult {
  const digits = code.replace(/[\s-]/g, "");
  if (digits.length === 13) return validateEAN13(code);
  if (digits.length === 12) return validateUPC(code);
  if (digits.length === 8) return validateEAN8(code);
  return { valid: false, type: "unknown", digits, checkDigit: -1, expectedCheckDigit: -1 };
}

export function isValid(code: string): boolean {
  return detect(code).valid;
}

export function getCountry(code: string): string | undefined {
  const result = detect(code);
  return result.country;
}

export function upcToEAN13(upc: string): string {
  const digits = upc.replace(/[\s-]/g, "");
  if (digits.length !== 12) return "";
  const ean12 = "0" + digits.substring(0, 11);
  const check = computeCheckDigit(ean12);
  return ean12 + check;
}

export function generateCheckDigit(partialCode: string): number {
  const digits = partialCode.replace(/[\s-]/g, "");
  return computeCheckDigit(digits);
}

export function formatEAN13(digits: string): string {
  const d = digits.replace(/[\s-]/g, "");
  if (d.length !== 13) return d;
  return `${d[0]} ${d.substring(1, 7)} ${d.substring(7, 13)}`;
}

export function formatUPC(digits: string): string {
  const d = digits.replace(/[\s-]/g, "");
  if (d.length !== 12) return d;
  return `${d[0]} ${d.substring(1, 6)} ${d.substring(6, 11)} ${d[11]}`;
}

export function getType(code: string): string {
  return detect(code).type;
}

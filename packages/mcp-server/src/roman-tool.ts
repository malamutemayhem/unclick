import { stampMeta } from "./connector-meta.js";

const ROMAN_MAP: [number, string][] = [
  [1000, "M"], [900, "CM"], [500, "D"], [400, "CD"],
  [100, "C"], [90, "XC"], [50, "L"], [40, "XL"],
  [10, "X"], [9, "IX"], [5, "V"], [4, "IV"], [1, "I"],
];

function toRoman(num: number): string {
  let result = "";
  for (const [value, symbol] of ROMAN_MAP) {
    while (num >= value) {
      result += symbol;
      num -= value;
    }
  }
  return result;
}

function fromRoman(s: string): number {
  const map: Record<string, number> = { I: 1, V: 5, X: 10, L: 50, C: 100, D: 500, M: 1000 };
  let total = 0;
  for (let i = 0; i < s.length; i++) {
    const curr = map[s[i]];
    const next = map[s[i + 1]] || 0;
    if (!curr) return -1;
    total += curr < next ? -curr : curr;
  }
  return total;
}

export async function romanConvert(args: Record<string, unknown>) {
  const input = args.value;
  if (input === undefined || input === null || input === "") {
    return { error: "value is required (integer 1-3999 or Roman numeral string)" };
  }
  const asNum = Number(input);
  if (!isNaN(asNum) && Number.isInteger(asNum) && asNum >= 1 && asNum <= 3999) {
    const roman = toRoman(asNum);
    return stampMeta({ input: asNum, roman, decimal: asNum, direction: "decimal_to_roman" }, {
      source: "local Roman numeral converter",
      fetched_at: new Date().toISOString(),
      next_steps: ["valid range is 1-3999", "pass a Roman numeral string to convert the other way"],
    });
  }
  const str = String(input).toUpperCase().trim();
  if (/^[IVXLCDM]+$/.test(str)) {
    const decimal = fromRoman(str);
    if (decimal < 1 || decimal > 3999) return { error: "Invalid Roman numeral" };
    const roundTrip = toRoman(decimal);
    return stampMeta({
      input: str, roman: roundTrip, decimal,
      direction: "roman_to_decimal",
      canonical: roundTrip === str,
    }, {
      source: "local Roman numeral converter",
      fetched_at: new Date().toISOString(),
      next_steps: ["canonical shows if input is the standard form", "valid range is I-MMMCMXCIX"],
    });
  }
  return { error: "value must be an integer 1-3999 or a Roman numeral string" };
}

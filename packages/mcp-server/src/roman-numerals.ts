const TO_ROMAN: [number, string][] = [
  [1000, "M"], [900, "CM"], [500, "D"], [400, "CD"],
  [100, "C"], [90, "XC"], [50, "L"], [40, "XL"],
  [10, "X"], [9, "IX"], [5, "V"], [4, "IV"], [1, "I"],
];

const FROM_ROMAN: Record<string, number> = {
  I: 1, V: 5, X: 10, L: 50, C: 100, D: 500, M: 1000,
};

export function toRoman(num: number): string {
  if (num <= 0 || num > 3999) throw new RangeError("Number must be 1-3999");
  let result = "";
  let remaining = num;
  for (const [value, symbol] of TO_ROMAN) {
    while (remaining >= value) {
      result += symbol;
      remaining -= value;
    }
  }
  return result;
}

export function fromRoman(roman: string): number {
  let result = 0;
  const upper = roman.toUpperCase();
  for (let i = 0; i < upper.length; i++) {
    const current = FROM_ROMAN[upper[i]];
    const next = FROM_ROMAN[upper[i + 1]];
    if (current === undefined) throw new Error(`Invalid Roman numeral: ${upper[i]}`);
    if (next && current < next) {
      result -= current;
    } else {
      result += current;
    }
  }
  return result;
}

export function isValidRoman(roman: string): boolean {
  try {
    const num = fromRoman(roman);
    return toRoman(num) === roman.toUpperCase();
  } catch {
    return false;
  }
}

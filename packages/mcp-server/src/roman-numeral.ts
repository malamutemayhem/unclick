export class RomanNumeral {
  private static readonly VALUES: [string, number][] = [
    ["M", 1000], ["CM", 900], ["D", 500], ["CD", 400],
    ["C", 100], ["XC", 90], ["L", 50], ["XL", 40],
    ["X", 10], ["IX", 9], ["V", 5], ["IV", 4], ["I", 1],
  ];

  static toRoman(num: number): string {
    if (num <= 0 || num > 3999 || !Number.isInteger(num)) {
      throw new Error("Number must be an integer between 1 and 3999");
    }
    let result = "";
    let remaining = num;
    for (const [symbol, value] of RomanNumeral.VALUES) {
      while (remaining >= value) {
        result += symbol;
        remaining -= value;
      }
    }
    return result;
  }

  static fromRoman(roman: string): number {
    const upper = roman.toUpperCase().trim();
    if (upper.length === 0) throw new Error("Empty roman numeral string");

    const map: Record<string, number> = {
      I: 1, V: 5, X: 10, L: 50, C: 100, D: 500, M: 1000,
    };

    let total = 0;
    for (let i = 0; i < upper.length; i++) {
      const current = map[upper[i]];
      if (current === undefined) throw new Error(`Invalid roman numeral character: ${upper[i]}`);
      const next = i + 1 < upper.length ? map[upper[i + 1]] : 0;
      if (next > current) {
        total -= current;
      } else {
        total += current;
      }
    }
    return total;
  }

  static isValid(roman: string): boolean {
    try {
      const value = RomanNumeral.fromRoman(roman);
      return RomanNumeral.toRoman(value) === roman.toUpperCase().trim();
    } catch {
      return false;
    }
  }

  static compare(a: string, b: string): number {
    const va = RomanNumeral.fromRoman(a);
    const vb = RomanNumeral.fromRoman(b);
    return va - vb;
  }

  static add(a: string, b: string): string {
    return RomanNumeral.toRoman(RomanNumeral.fromRoman(a) + RomanNumeral.fromRoman(b));
  }

  static subtract(a: string, b: string): string {
    const result = RomanNumeral.fromRoman(a) - RomanNumeral.fromRoman(b);
    if (result <= 0) throw new Error("Result must be positive");
    return RomanNumeral.toRoman(result);
  }

  static range(start: number, end: number): string[] {
    const result: string[] = [];
    for (let i = start; i <= end; i++) {
      result.push(RomanNumeral.toRoman(i));
    }
    return result;
  }

  static toOrdinal(num: number): string {
    const roman = RomanNumeral.toRoman(num);
    return roman.toLowerCase();
  }
}

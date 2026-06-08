const DIGITS = "0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz+/";

export class BaseConverter {
  static toBase(num: number, base: number): string {
    if (base < 2 || base > 64) throw new Error("Base must be between 2 and 64");
    if (num === 0) return "0";

    const negative = num < 0;
    let n = Math.abs(Math.floor(num));
    let result = "";

    while (n > 0) {
      result = DIGITS[n % base] + result;
      n = Math.floor(n / base);
    }

    return negative ? "-" + result : result;
  }

  static fromBase(str: string, base: number): number {
    if (base < 2 || base > 64) throw new Error("Base must be between 2 and 64");
    const negative = str.startsWith("-");
    const digits = negative ? str.slice(1) : str;
    let result = 0;

    for (const ch of digits) {
      const value = DIGITS.indexOf(ch);
      if (value < 0 || value >= base) throw new Error(`Invalid digit '${ch}' for base ${base}`);
      result = result * base + value;
    }

    return negative ? -result : result;
  }

  static convert(value: string, fromBase: number, toBase: number): string {
    const decimal = BaseConverter.fromBase(value, fromBase);
    return BaseConverter.toBase(decimal, toBase);
  }

  static toBinary(num: number): string {
    return BaseConverter.toBase(num, 2);
  }

  static toOctal(num: number): string {
    return BaseConverter.toBase(num, 8);
  }

  static toHex(num: number): string {
    return BaseConverter.toBase(num, 16);
  }

  static fromBinary(str: string): number {
    return BaseConverter.fromBase(str, 2);
  }

  static fromOctal(str: string): number {
    return BaseConverter.fromBase(str, 8);
  }

  static fromHex(str: string): number {
    return BaseConverter.fromBase(str, 16);
  }

  static toBase36(num: number): string {
    return BaseConverter.toBase(num, 36);
  }

  static fromBase36(str: string): number {
    return BaseConverter.fromBase(str, 36);
  }

  static bitCount(num: number): number {
    const binary = BaseConverter.toBinary(Math.abs(num));
    return binary.split("").filter((b) => b === "1").length;
  }

  static isPowerOfTwo(num: number): boolean {
    if (num <= 0) return false;
    return (num & (num - 1)) === 0;
  }

  static nextPowerOfTwo(num: number): number {
    if (num <= 0) return 1;
    let n = num - 1;
    n |= n >> 1;
    n |= n >> 2;
    n |= n >> 4;
    n |= n >> 8;
    n |= n >> 16;
    return n + 1;
  }
}

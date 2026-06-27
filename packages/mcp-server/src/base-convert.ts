const DIGITS = "0123456789abcdefghijklmnopqrstuvwxyz";

export function toBase(num: number, base: number): string {
  if (base < 2 || base > 36) throw new Error("Base must be 2-36");
  if (num === 0) return "0";
  const negative = num < 0;
  num = Math.abs(num);
  let result = "";
  while (num > 0) {
    result = DIGITS[num % base] + result;
    num = Math.floor(num / base);
  }
  return negative ? "-" + result : result;
}

export function fromBase(str: string, base: number): number {
  if (base < 2 || base > 36) throw new Error("Base must be 2-36");
  const negative = str.startsWith("-");
  if (negative) str = str.slice(1);
  let result = 0;
  for (const ch of str.toLowerCase()) {
    const digit = DIGITS.indexOf(ch);
    if (digit === -1 || digit >= base) throw new Error("Invalid digit: " + ch);
    result = result * base + digit;
  }
  return negative ? -result : result;
}

export function convertBase(value: string, fromB: number, toB: number): string {
  return toBase(fromBase(value, fromB), toB);
}

export function toBinary(num: number): string {
  return toBase(num, 2);
}

export function toOctal(num: number): string {
  return toBase(num, 8);
}

export function toHex(num: number): string {
  return toBase(num, 16);
}

export function fromBinary(str: string): number {
  return fromBase(str, 2);
}

export function fromOctal(str: string): number {
  return fromBase(str, 8);
}

export function fromHex(str: string): number {
  return fromBase(str, 16);
}

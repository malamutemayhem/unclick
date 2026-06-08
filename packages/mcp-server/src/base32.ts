const ALPHABET = "ABCDEFGHIJKLMNOPQRSTUVWXYZ234567";
const PAD = "=";

export function encode(input: Uint8Array | string): string {
  const bytes = typeof input === "string"
    ? new TextEncoder().encode(input)
    : input;
  let result = "";
  let bits = 0;
  let value = 0;
  for (const byte of bytes) {
    value = (value << 8) | byte;
    bits += 8;
    while (bits >= 5) {
      bits -= 5;
      result += ALPHABET[(value >>> bits) & 0x1f];
    }
  }
  if (bits > 0) {
    result += ALPHABET[(value << (5 - bits)) & 0x1f];
  }
  while (result.length % 8 !== 0) {
    result += PAD;
  }
  return result;
}

export function decode(input: string): Uint8Array {
  const cleaned = input.replace(/=+$/, "").toUpperCase();
  const output: number[] = [];
  let bits = 0;
  let value = 0;
  for (const char of cleaned) {
    const idx = ALPHABET.indexOf(char);
    if (idx === -1) throw new Error(`Invalid base32 character: ${char}`);
    value = (value << 5) | idx;
    bits += 5;
    if (bits >= 8) {
      bits -= 8;
      output.push((value >>> bits) & 0xff);
    }
  }
  return new Uint8Array(output);
}

export function decodeToString(input: string): string {
  return new TextDecoder().decode(decode(input));
}

export function isValid(input: string): boolean {
  return /^[A-Z2-7]+=*$/.test(input.toUpperCase()) && input.length % 8 === 0;
}

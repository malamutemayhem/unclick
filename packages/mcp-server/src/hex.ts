export function encode(input: Uint8Array | string): string {
  const bytes = typeof input === "string"
    ? new TextEncoder().encode(input)
    : input;
  let result = "";
  for (const byte of bytes) {
    result += byte.toString(16).padStart(2, "0");
  }
  return result;
}

export function decode(hex: string): Uint8Array {
  if (hex.length % 2 !== 0) throw new Error("Hex string must have even length");
  const bytes = new Uint8Array(hex.length / 2);
  for (let i = 0; i < hex.length; i += 2) {
    const byte = parseInt(hex.slice(i, i + 2), 16);
    if (Number.isNaN(byte)) throw new Error(`Invalid hex at position ${i}`);
    bytes[i / 2] = byte;
  }
  return bytes;
}

export function decodeToString(hex: string): string {
  return new TextDecoder().decode(decode(hex));
}

export function isValid(hex: string): boolean {
  return hex.length % 2 === 0 && /^[0-9a-fA-F]*$/.test(hex);
}

export function toUpperCase(hex: string): string {
  return hex.toUpperCase();
}

export function toLowerCase(hex: string): string {
  return hex.toLowerCase();
}

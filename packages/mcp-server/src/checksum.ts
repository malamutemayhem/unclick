export function crc32(input: string): number {
  let crc = 0xFFFFFFFF;
  for (let i = 0; i < input.length; i++) {
    crc ^= input.charCodeAt(i);
    for (let j = 0; j < 8; j++) {
      crc = (crc >>> 1) ^ (crc & 1 ? 0xEDB88320 : 0);
    }
  }
  return (crc ^ 0xFFFFFFFF) >>> 0;
}

export function crc32Hex(input: string): string {
  return crc32(input).toString(16).padStart(8, "0");
}

export function adler32(input: string): number {
  let a = 1;
  let b = 0;
  for (let i = 0; i < input.length; i++) {
    a = (a + input.charCodeAt(i)) % 65521;
    b = (b + a) % 65521;
  }
  return ((b << 16) | a) >>> 0;
}

export function fletcher16(input: string): number {
  let sum1 = 0;
  let sum2 = 0;
  for (let i = 0; i < input.length; i++) {
    sum1 = (sum1 + input.charCodeAt(i)) % 255;
    sum2 = (sum2 + sum1) % 255;
  }
  return (sum2 << 8) | sum1;
}

export function djb2(input: string): number {
  let hash = 5381;
  for (let i = 0; i < input.length; i++) {
    hash = ((hash << 5) + hash + input.charCodeAt(i)) >>> 0;
  }
  return hash;
}

export function fnv1a(input: string): number {
  let hash = 0x811c9dc5;
  for (let i = 0; i < input.length; i++) {
    hash ^= input.charCodeAt(i);
    hash = Math.imul(hash, 0x01000193) >>> 0;
  }
  return hash;
}

export function verifyChecksum(input: string, expected: number, algo: "crc32" | "adler32" | "fletcher16" | "djb2" | "fnv1a" = "crc32"): boolean {
  const fns: Record<string, (s: string) => number> = { crc32, adler32, fletcher16, djb2, fnv1a };
  return fns[algo](input) === expected;
}

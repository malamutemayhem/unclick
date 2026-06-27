const TABLE = new Uint32Array(256);

for (let i = 0; i < 256; i++) {
  let crc = i;
  for (let j = 0; j < 8; j++) {
    crc = crc & 1 ? (crc >>> 1) ^ 0xEDB88320 : crc >>> 1;
  }
  TABLE[i] = crc;
}

export function crc32(input: string | Uint8Array): number {
  let crc = 0xFFFFFFFF;
  if (typeof input === "string") {
    for (let i = 0; i < input.length; i++) {
      crc = (crc >>> 8) ^ TABLE[(crc ^ input.charCodeAt(i)) & 0xFF];
    }
  } else {
    for (let i = 0; i < input.length; i++) {
      crc = (crc >>> 8) ^ TABLE[(crc ^ input[i]) & 0xFF];
    }
  }
  return (crc ^ 0xFFFFFFFF) >>> 0;
}

export function crc32Hex(input: string | Uint8Array): string {
  return crc32(input).toString(16).padStart(8, "0");
}

export function verify(input: string | Uint8Array, expected: number): boolean {
  return crc32(input) === expected;
}

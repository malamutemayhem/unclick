import { stampMeta, ConnectorMeta } from "./connector-meta.js";

const CRC_TABLE: number[] = [];
for (let n = 0; n < 256; n++) {
  let c = n;
  for (let k = 0; k < 8; k++) {
    c = c & 1 ? 0xedb88320 ^ (c >>> 1) : c >>> 1;
  }
  CRC_TABLE[n] = c;
}

function crc32(str: string): number {
  let crc = 0xffffffff;
  for (let i = 0; i < str.length; i++) {
    crc = CRC_TABLE[(crc ^ str.charCodeAt(i)) & 0xff] ^ (crc >>> 8);
  }
  return (crc ^ 0xffffffff) >>> 0;
}

export async function crc32Calculate(args: Record<string, unknown>) {
  const text = typeof args.text === "string" ? args.text : "";
  if (!text) return { error: "text is required" };

  const checksum = crc32(text);
  const hex = checksum.toString(16).toUpperCase().padStart(8, "0");

  const meta: ConnectorMeta = {
    source: "local-computation",
    fetched_at: new Date().toISOString(),
    next_steps: ["Use for data integrity verification"],
  };
  return stampMeta({ input_length: text.length, crc32: checksum, hex }, meta);
}

import { randomBytes } from "crypto";
import { stampMeta } from "./connector-meta.js";

function generateUUIDv4(): string {
  const bytes = randomBytes(16);
  bytes[6] = (bytes[6] & 0x0f) | 0x40;
  bytes[8] = (bytes[8] & 0x3f) | 0x80;
  const hex = bytes.toString("hex");
  return [
    hex.slice(0, 8), hex.slice(8, 12), hex.slice(12, 16),
    hex.slice(16, 20), hex.slice(20, 32),
  ].join("-");
}

export async function uuidGenerate(args: Record<string, unknown>) {
  const count = Math.min(Math.max(Number(args.count) || 1, 1), 100);
  const uppercase = args.uppercase === true;
  const uuids = Array.from({ length: count }, () => {
    const id = generateUUIDv4();
    return uppercase ? id.toUpperCase() : id;
  });
  return stampMeta({
    uuids,
    count: uuids.length,
    version: 4,
  }, {
    source: "local crypto.randomBytes UUID v4",
    fetched_at: new Date().toISOString(),
    next_steps: ["use count to generate multiple UUIDs at once", "set uppercase: true for uppercase format"],
  });
}

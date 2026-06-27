export function v4(): string {
  const bytes = new Uint8Array(16);
  for (let i = 0; i < 16; i++) bytes[i] = Math.floor(Math.random() * 256);
  bytes[6] = (bytes[6] & 0x0f) | 0x40;
  bytes[8] = (bytes[8] & 0x3f) | 0x80;
  return formatUUID(bytes);
}

export function validate(uuid: string): boolean {
  return /^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i.test(uuid);
}

export function version(uuid: string): number | null {
  if (!validate(uuid)) return null;
  return parseInt(uuid.charAt(14), 16);
}

export function parse(uuid: string): Uint8Array {
  if (!validate(uuid)) throw new Error("Invalid UUID");
  const hex = uuid.replace(/-/g, "");
  const bytes = new Uint8Array(16);
  for (let i = 0; i < 16; i++) {
    bytes[i] = parseInt(hex.slice(i * 2, i * 2 + 2), 16);
  }
  return bytes;
}

export function stringify(bytes: Uint8Array): string {
  if (bytes.length !== 16) throw new Error("UUID must be 16 bytes");
  return formatUUID(bytes);
}

export function nil(): string {
  return "00000000-0000-0000-0000-000000000000";
}

export function isNil(uuid: string): boolean {
  return uuid === nil();
}

function formatUUID(bytes: Uint8Array): string {
  const hex: string[] = [];
  for (const b of bytes) hex.push(b.toString(16).padStart(2, "0"));
  return [
    hex.slice(0, 4).join(""),
    hex.slice(4, 6).join(""),
    hex.slice(6, 8).join(""),
    hex.slice(8, 10).join(""),
    hex.slice(10, 16).join(""),
  ].join("-");
}

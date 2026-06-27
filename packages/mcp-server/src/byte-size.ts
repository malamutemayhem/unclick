const UNITS = ["B", "KB", "MB", "GB", "TB", "PB", "EB"];
const BINARY_UNITS = ["B", "KiB", "MiB", "GiB", "TiB", "PiB", "EiB"];

export function format(bytes: number, binary = false): string {
  const base = binary ? 1024 : 1000;
  const units = binary ? BINARY_UNITS : UNITS;
  if (bytes === 0) return "0 B";
  const abs = Math.abs(bytes);
  const exp = Math.min(Math.floor(Math.log(abs) / Math.log(base)), units.length - 1);
  const value = abs / Math.pow(base, exp);
  const sign = bytes < 0 ? "-" : "";
  return `${sign}${value.toFixed(exp === 0 ? 0 : 1)} ${units[exp]}`;
}

export function parse(input: string): number {
  const match = input.trim().match(/^(-?\d+(?:\.\d+)?)\s*(B|KiB|MiB|GiB|TiB|PiB|EiB|KB|MB|GB|TB|PB|EB)?$/i);
  if (!match) throw new Error("Invalid byte size");
  const value = parseFloat(match[1]);
  const unit = (match[2] || "B").toUpperCase();
  const binaryMap: Record<string, number> = { B: 0, KIB: 1, MIB: 2, GIB: 3, TIB: 4, PIB: 5, EIB: 6 };
  const decimalMap: Record<string, number> = { B: 0, KB: 1, MB: 2, GB: 3, TB: 4, PB: 5, EB: 6 };
  if (unit in binaryMap) return value * Math.pow(1024, binaryMap[unit]);
  if (unit in decimalMap) return value * Math.pow(1000, decimalMap[unit]);
  throw new Error(`Unknown unit: ${unit}`);
}

export function toKB(bytes: number): number { return bytes / 1000; }
export function toMB(bytes: number): number { return bytes / 1000000; }
export function toGB(bytes: number): number { return bytes / 1000000000; }
export function toKiB(bytes: number): number { return bytes / 1024; }
export function toMiB(bytes: number): number { return bytes / (1024 * 1024); }
export function toGiB(bytes: number): number { return bytes / (1024 * 1024 * 1024); }

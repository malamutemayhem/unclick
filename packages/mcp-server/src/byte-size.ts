const UNITS = ["B", "KB", "MB", "GB", "TB", "PB"] as const;
const IEC_UNITS = ["B", "KiB", "MiB", "GiB", "TiB", "PiB"] as const;

export function formatBytes(bytes: number, decimals = 2): string {
  if (bytes === 0) return "0 B";
  const negative = bytes < 0;
  bytes = Math.abs(bytes);
  const k = 1000;
  const i = Math.min(Math.floor(Math.log(bytes) / Math.log(k)), UNITS.length - 1);
  const value = bytes / Math.pow(k, i);
  return `${negative ? "-" : ""}${value.toFixed(decimals)} ${UNITS[i]}`;
}

export function formatBytesIEC(bytes: number, decimals = 2): string {
  if (bytes === 0) return "0 B";
  const negative = bytes < 0;
  bytes = Math.abs(bytes);
  const k = 1024;
  const i = Math.min(Math.floor(Math.log(bytes) / Math.log(k)), IEC_UNITS.length - 1);
  const value = bytes / Math.pow(k, i);
  return `${negative ? "-" : ""}${value.toFixed(decimals)} ${IEC_UNITS[i]}`;
}

export function parseBytes(str: string): number {
  const match = str.trim().match(/^(-?\d+(?:\.\d+)?)\s*(B|KB|MB|GB|TB|PB|KiB|MiB|GiB|TiB|PiB)?$/i);
  if (!match) throw new Error(`Cannot parse byte string: ${str}`);
  const value = parseFloat(match[1]);
  const unit = (match[2] || "B").toUpperCase();
  const multipliers: Record<string, number> = {
    B: 1,
    KB: 1000, MB: 1e6, GB: 1e9, TB: 1e12, PB: 1e15,
    KIB: 1024, MIB: 1024 ** 2, GIB: 1024 ** 3, TIB: 1024 ** 4, PIB: 1024 ** 5,
  };
  const mult = multipliers[unit];
  if (mult === undefined) throw new Error(`Unknown unit: ${unit}`);
  return Math.round(value * mult);
}

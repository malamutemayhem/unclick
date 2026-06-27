const UNITS = ["B", "KB", "MB", "GB", "TB", "PB", "EB"];
const SI_UNITS = ["B", "kB", "MB", "GB", "TB", "PB", "EB"];

export function formatBytes(bytes: number, decimals = 2): string {
  if (bytes === 0) return "0 B";
  const sign = bytes < 0 ? "-" : "";
  const abs = Math.abs(bytes);
  const k = 1024;
  const i = Math.floor(Math.log(abs) / Math.log(k));
  const idx = Math.min(i, UNITS.length - 1);
  return `${sign}${(abs / Math.pow(k, idx)).toFixed(decimals)} ${UNITS[idx]}`;
}

export function formatBytesSI(bytes: number, decimals = 2): string {
  if (bytes === 0) return "0 B";
  const sign = bytes < 0 ? "-" : "";
  const abs = Math.abs(bytes);
  const k = 1000;
  const i = Math.floor(Math.log(abs) / Math.log(k));
  const idx = Math.min(i, SI_UNITS.length - 1);
  return `${sign}${(abs / Math.pow(k, idx)).toFixed(decimals)} ${SI_UNITS[idx]}`;
}

export function parseBytes(str: string): number {
  const match = str.trim().match(/^(-?\d+(?:\.\d+)?)\s*(B|KB|MB|GB|TB|PB|EB|kB)?$/i);
  if (!match) throw new Error(`Cannot parse bytes: ${str}`);
  const value = parseFloat(match[1]);
  const unit = (match[2] || "B").toUpperCase();

  const multipliers: Record<string, number> = {
    B: 1, KB: 1024, MB: 1024 ** 2, GB: 1024 ** 3,
    TB: 1024 ** 4, PB: 1024 ** 5, EB: 1024 ** 6,
  };

  return Math.round(value * (multipliers[unit] || 1));
}

export function formatBits(bits: number, decimals = 2): string {
  return formatBytes(bits / 8, decimals).replace(/B$/, "b").replace(/ b$/, " b");
}

export function formatTransferRate(bytesPerSecond: number, decimals = 2): string {
  return formatBytes(bytesPerSecond, decimals) + "/s";
}

export function formatNumber(n: number, options?: {
  decimals?: number;
  thousandsSep?: string;
  decimalSep?: string;
}): string {
  const { decimals = 0, thousandsSep = ",", decimalSep = "." } = options || {};
  const fixed = n.toFixed(decimals);
  const [intPart, fracPart] = fixed.split(".");
  const formatted = intPart.replace(/\B(?=(\d{3})+(?!\d))/g, thousandsSep);
  return fracPart ? `${formatted}${decimalSep}${fracPart}` : formatted;
}

export function formatBytes(bytes: number, decimals = 2): string {
  if (bytes === 0) return "0 B";
  const k = 1024;
  const sizes = ["B", "KB", "MB", "GB", "TB", "PB"];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  return `${parseFloat((bytes / Math.pow(k, i)).toFixed(decimals))} ${sizes[i]}`;
}

export function formatPercent(value: number, decimals = 1): string {
  return `${(value * 100).toFixed(decimals)}%`;
}

export function formatOrdinal(n: number): string {
  const s = ["th", "st", "nd", "rd"];
  const v = n % 100;
  return n + (s[(v - 20) % 10] || s[v] || s[0]);
}

export function formatCompact(n: number): string {
  if (Math.abs(n) < 1000) return String(n);
  const units = [
    { value: 1e12, suffix: "T" },
    { value: 1e9, suffix: "B" },
    { value: 1e6, suffix: "M" },
    { value: 1e3, suffix: "K" },
  ];
  for (const { value, suffix } of units) {
    if (Math.abs(n) >= value) {
      const formatted = (n / value).toFixed(1).replace(/\.0$/, "");
      return `${formatted}${suffix}`;
    }
  }
  return String(n);
}

export function padNumber(n: number, width: number, char = "0"): string {
  const str = String(Math.abs(n));
  const padded = str.length >= width ? str : char.repeat(width - str.length) + str;
  return n < 0 ? `-${padded}` : padded;
}

export function clamp(value: number, min: number, max: number): number {
  return Math.min(Math.max(value, min), max);
}

export function lerp(a: number, b: number, t: number): number {
  return a + (b - a) * t;
}

export function inverseLerp(a: number, b: number, value: number): number {
  if (a === b) return 0;
  return (value - a) / (b - a);
}

export function remap(value: number, inMin: number, inMax: number, outMin: number, outMax: number): number {
  return lerp(outMin, outMax, inverseLerp(inMin, inMax, value));
}

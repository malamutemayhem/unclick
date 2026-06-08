const UNITS: Record<string, number> = {
  ms: 1,
  millisecond: 1,
  milliseconds: 1,
  s: 1000,
  sec: 1000,
  second: 1000,
  seconds: 1000,
  m: 60_000,
  min: 60_000,
  minute: 60_000,
  minutes: 60_000,
  h: 3_600_000,
  hr: 3_600_000,
  hour: 3_600_000,
  hours: 3_600_000,
  d: 86_400_000,
  day: 86_400_000,
  days: 86_400_000,
  w: 604_800_000,
  week: 604_800_000,
  weeks: 604_800_000,
  y: 31_536_000_000,
  year: 31_536_000_000,
  years: 31_536_000_000,
};

export function parseDuration(input: string): number {
  const str = input.trim().toLowerCase();

  const match = str.match(/^(\d+(?:\.\d+)?)\s*([a-z]+)$/);
  if (match) {
    const value = parseFloat(match[1]);
    const unit = UNITS[match[2]];
    if (unit === undefined) throw new Error(`Unknown duration unit: ${match[2]}`);
    return Math.round(value * unit);
  }

  let total = 0;
  const pattern = /(\d+(?:\.\d+)?)\s*([a-z]+)/g;
  let found = false;
  let m;
  while ((m = pattern.exec(str)) !== null) {
    found = true;
    const value = parseFloat(m[1]);
    const unit = UNITS[m[2]];
    if (unit === undefined) throw new Error(`Unknown duration unit: ${m[2]}`);
    total += value * unit;
  }
  if (!found) throw new Error(`Invalid duration: ${input}`);
  return Math.round(total);
}

export interface DurationParts {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
  milliseconds: number;
}

export function decompose(ms: number): DurationParts {
  let remaining = Math.abs(ms);
  const days = Math.floor(remaining / 86_400_000);
  remaining %= 86_400_000;
  const hours = Math.floor(remaining / 3_600_000);
  remaining %= 3_600_000;
  const minutes = Math.floor(remaining / 60_000);
  remaining %= 60_000;
  const seconds = Math.floor(remaining / 1000);
  const milliseconds = remaining % 1000;
  return { days, hours, minutes, seconds, milliseconds };
}

export function formatDuration(ms: number, compact = false): string {
  const parts = decompose(ms);
  const segments: string[] = [];

  if (compact) {
    if (parts.days > 0) segments.push(`${parts.days}d`);
    if (parts.hours > 0) segments.push(`${parts.hours}h`);
    if (parts.minutes > 0) segments.push(`${parts.minutes}m`);
    if (parts.seconds > 0) segments.push(`${parts.seconds}s`);
    if (parts.milliseconds > 0 && segments.length === 0) segments.push(`${parts.milliseconds}ms`);
  } else {
    if (parts.days > 0) segments.push(`${parts.days} day${parts.days !== 1 ? "s" : ""}`);
    if (parts.hours > 0) segments.push(`${parts.hours} hour${parts.hours !== 1 ? "s" : ""}`);
    if (parts.minutes > 0) segments.push(`${parts.minutes} minute${parts.minutes !== 1 ? "s" : ""}`);
    if (parts.seconds > 0) segments.push(`${parts.seconds} second${parts.seconds !== 1 ? "s" : ""}`);
    if (parts.milliseconds > 0 && segments.length === 0) segments.push(`${parts.milliseconds} milliseconds`);
  }

  return segments.length > 0 ? segments.join(compact ? "" : ", ") : compact ? "0ms" : "0 milliseconds";
}

export function humanize(ms: number): string {
  const abs = Math.abs(ms);
  if (abs < 1000) return `${abs}ms`;
  if (abs < 60_000) return `${(abs / 1000).toFixed(1)}s`;
  if (abs < 3_600_000) return `${(abs / 60_000).toFixed(1)}m`;
  if (abs < 86_400_000) return `${(abs / 3_600_000).toFixed(1)}h`;
  return `${(abs / 86_400_000).toFixed(1)}d`;
}

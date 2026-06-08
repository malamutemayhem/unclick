export interface Duration {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
  milliseconds: number;
}

export function fromMs(ms: number): Duration {
  const abs = Math.abs(ms);
  return {
    days: Math.floor(abs / 86400000),
    hours: Math.floor((abs % 86400000) / 3600000),
    minutes: Math.floor((abs % 3600000) / 60000),
    seconds: Math.floor((abs % 60000) / 1000),
    milliseconds: abs % 1000,
  };
}

export function toMs(d: Partial<Duration>): number {
  return (d.days ?? 0) * 86400000
    + (d.hours ?? 0) * 3600000
    + (d.minutes ?? 0) * 60000
    + (d.seconds ?? 0) * 1000
    + (d.milliseconds ?? 0);
}

export function format(ms: number): string {
  const d = fromMs(ms);
  const parts: string[] = [];
  if (d.days > 0) parts.push(`${d.days}d`);
  if (d.hours > 0) parts.push(`${d.hours}h`);
  if (d.minutes > 0) parts.push(`${d.minutes}m`);
  if (d.seconds > 0 || parts.length === 0) parts.push(`${d.seconds}s`);
  return parts.join(" ");
}

export function formatCompact(ms: number): string {
  if (ms < 1000) return `${ms}ms`;
  if (ms < 60000) return `${(ms / 1000).toFixed(1)}s`;
  if (ms < 3600000) return `${(ms / 60000).toFixed(1)}m`;
  if (ms < 86400000) return `${(ms / 3600000).toFixed(1)}h`;
  return `${(ms / 86400000).toFixed(1)}d`;
}

export function parse(input: string): number {
  let total = 0;
  const pattern = /(\d+(?:\.\d+)?)\s*(ms|milliseconds?|s|seconds?|m|minutes?|h|hours?|d|days?)/gi;
  let match = pattern.exec(input);
  while (match) {
    const value = parseFloat(match[1]);
    const unit = match[2].toLowerCase();
    if (unit.startsWith("ms") || unit.startsWith("millisecond")) total += value;
    else if (unit.startsWith("s")) total += value * 1000;
    else if (unit.startsWith("m") && !unit.startsWith("ms")) total += value * 60000;
    else if (unit.startsWith("h")) total += value * 3600000;
    else if (unit.startsWith("d")) total += value * 86400000;
    match = pattern.exec(input);
  }
  return total;
}

export function add(a: number, b: number): number { return a + b; }
export function subtract(a: number, b: number): number { return a - b; }

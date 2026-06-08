export interface Duration {
  days?: number;
  hours?: number;
  minutes?: number;
  seconds?: number;
  milliseconds?: number;
}

export function toMilliseconds(d: Duration): number {
  return (d.days || 0) * 86400000
    + (d.hours || 0) * 3600000
    + (d.minutes || 0) * 60000
    + (d.seconds || 0) * 1000
    + (d.milliseconds || 0);
}

export function fromMilliseconds(ms: number): Duration {
  const abs = Math.abs(ms);
  const days = Math.floor(abs / 86400000);
  const hours = Math.floor((abs % 86400000) / 3600000);
  const minutes = Math.floor((abs % 3600000) / 60000);
  const seconds = Math.floor((abs % 60000) / 1000);
  const milliseconds = abs % 1000;
  return { days, hours, minutes, seconds, milliseconds };
}

export function addDurations(a: Duration, b: Duration): Duration {
  return fromMilliseconds(toMilliseconds(a) + toMilliseconds(b));
}

export function subtractDurations(a: Duration, b: Duration): Duration {
  return fromMilliseconds(toMilliseconds(a) - toMilliseconds(b));
}

export function multiplyDuration(d: Duration, factor: number): Duration {
  return fromMilliseconds(toMilliseconds(d) * factor);
}

export function formatDuration(d: Duration): string {
  const parts: string[] = [];
  if (d.days) parts.push(`${d.days}d`);
  if (d.hours) parts.push(`${d.hours}h`);
  if (d.minutes) parts.push(`${d.minutes}m`);
  if (d.seconds) parts.push(`${d.seconds}s`);
  if (d.milliseconds) parts.push(`${d.milliseconds}ms`);
  return parts.length > 0 ? parts.join(" ") : "0ms";
}

export function formatDurationLong(d: Duration): string {
  const parts: string[] = [];
  if (d.days) parts.push(`${d.days} day${d.days > 1 ? "s" : ""}`);
  if (d.hours) parts.push(`${d.hours} hour${d.hours > 1 ? "s" : ""}`);
  if (d.minutes) parts.push(`${d.minutes} minute${d.minutes > 1 ? "s" : ""}`);
  if (d.seconds) parts.push(`${d.seconds} second${d.seconds > 1 ? "s" : ""}`);
  if (d.milliseconds) parts.push(`${d.milliseconds}ms`);
  return parts.length > 0 ? parts.join(", ") : "0ms";
}

export function parseDuration(str: string): Duration {
  const result: Duration = {};
  const pattern = /(\d+(?:\.\d+)?)\s*(ms|milliseconds?|d|days?|h|hours?|m|min|mins|minutes?|s|sec|secs|seconds?)/gi;
  let match: RegExpExecArray | null;
  while ((match = pattern.exec(str)) !== null) {
    const value = parseFloat(match[1]);
    const unit = match[2].toLowerCase();
    if (unit.startsWith("ms") || unit.startsWith("millis")) result.milliseconds = (result.milliseconds || 0) + value;
    else if (unit.startsWith("s")) result.seconds = (result.seconds || 0) + value;
    else if (unit.startsWith("m") && !unit.startsWith("ms") && !unit.startsWith("millis")) result.minutes = (result.minutes || 0) + value;
    else if (unit.startsWith("h")) result.hours = (result.hours || 0) + value;
    else if (unit.startsWith("d")) result.days = (result.days || 0) + value;
  }
  return result;
}

export function compareDurations(a: Duration, b: Duration): number {
  return toMilliseconds(a) - toMilliseconds(b);
}

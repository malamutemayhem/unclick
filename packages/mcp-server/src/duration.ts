export interface Duration {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
  milliseconds: number;
}

export function parseDuration(ms: number): Duration {
  const abs = Math.abs(ms);
  return {
    days: Math.floor(abs / 86400000),
    hours: Math.floor((abs % 86400000) / 3600000),
    minutes: Math.floor((abs % 3600000) / 60000),
    seconds: Math.floor((abs % 60000) / 1000),
    milliseconds: abs % 1000,
  };
}

export function toMs(duration: Partial<Duration>): number {
  return (duration.days || 0) * 86400000 +
    (duration.hours || 0) * 3600000 +
    (duration.minutes || 0) * 60000 +
    (duration.seconds || 0) * 1000 +
    (duration.milliseconds || 0);
}

export function formatDuration(ms: number, options?: { short?: boolean }): string {
  const d = parseDuration(ms);
  const short = options?.short ?? false;
  const parts: string[] = [];

  if (d.days > 0) parts.push(short ? `${d.days}d` : `${d.days} day${d.days !== 1 ? "s" : ""}`);
  if (d.hours > 0) parts.push(short ? `${d.hours}h` : `${d.hours} hour${d.hours !== 1 ? "s" : ""}`);
  if (d.minutes > 0) parts.push(short ? `${d.minutes}m` : `${d.minutes} minute${d.minutes !== 1 ? "s" : ""}`);
  if (d.seconds > 0) parts.push(short ? `${d.seconds}s` : `${d.seconds} second${d.seconds !== 1 ? "s" : ""}`);
  if (parts.length === 0) parts.push(short ? "0s" : "0 seconds");

  return parts.join(short ? " " : ", ");
}

export function parseTimeString(input: string): number {
  let total = 0;
  const regex = /(\d+(?:\.\d+)?)\s*(ms|milliseconds?|d|h|m|s|days?|hours?|minutes?|seconds?)/gi;
  let match;
  while ((match = regex.exec(input)) !== null) {
    const value = parseFloat(match[1]);
    const raw = match[2].toLowerCase();
    const unit = raw === "s" || raw === "ms" ? raw : raw.replace(/s$/, "");
    switch (unit) {
      case "d": case "day": total += value * 86400000; break;
      case "h": case "hour": total += value * 3600000; break;
      case "m": case "minute": total += value * 60000; break;
      case "s": case "second": total += value * 1000; break;
      case "ms": case "millisecond": total += value; break;
    }
  }
  return total;
}

export function humanize(ms: number): string {
  if (ms < 1000) return `${ms}ms`;
  if (ms < 60000) return `${(ms / 1000).toFixed(1)}s`;
  if (ms < 3600000) return `${(ms / 60000).toFixed(1)}m`;
  if (ms < 86400000) return `${(ms / 3600000).toFixed(1)}h`;
  return `${(ms / 86400000).toFixed(1)}d`;
}

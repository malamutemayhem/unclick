export interface Duration {
  days?: number;
  hours?: number;
  minutes?: number;
  seconds?: number;
  milliseconds?: number;
}

export function toMs(d: Duration): number {
  return (d.days ?? 0) * 86400000
    + (d.hours ?? 0) * 3600000
    + (d.minutes ?? 0) * 60000
    + (d.seconds ?? 0) * 1000
    + (d.milliseconds ?? 0);
}

export function fromMs(ms: number): Duration {
  const abs = Math.abs(ms);
  const days = Math.floor(abs / 86400000);
  const hours = Math.floor((abs % 86400000) / 3600000);
  const minutes = Math.floor((abs % 3600000) / 60000);
  const seconds = Math.floor((abs % 60000) / 1000);
  const milliseconds = abs % 1000;
  return { days, hours, minutes, seconds, milliseconds };
}

export function format(d: Duration): string {
  const parts: string[] = [];
  if (d.days) parts.push(`${d.days}d`);
  if (d.hours) parts.push(`${d.hours}h`);
  if (d.minutes) parts.push(`${d.minutes}m`);
  if (d.seconds) parts.push(`${d.seconds}s`);
  if (d.milliseconds) parts.push(`${d.milliseconds}ms`);
  return parts.length > 0 ? parts.join(" ") : "0ms";
}

export function parse(input: string): Duration {
  const d: Duration = {};
  const regex = /(\d+)\s*(d|h|m(?!s)|s|ms)/gi;
  let match: RegExpExecArray | null;
  while ((match = regex.exec(input)) !== null) {
    const val = parseInt(match[1], 10);
    const unit = match[2].toLowerCase();
    switch (unit) {
      case "d": d.days = (d.days ?? 0) + val; break;
      case "h": d.hours = (d.hours ?? 0) + val; break;
      case "m": d.minutes = (d.minutes ?? 0) + val; break;
      case "s": d.seconds = (d.seconds ?? 0) + val; break;
      case "ms": d.milliseconds = (d.milliseconds ?? 0) + val; break;
    }
  }
  return d;
}

export function humanize(ms: number): string {
  if (ms < 1000) return `${ms}ms`;
  if (ms < 60000) return `${(ms / 1000).toFixed(1)}s`;
  if (ms < 3600000) return `${(ms / 60000).toFixed(1)}m`;
  if (ms < 86400000) return `${(ms / 3600000).toFixed(1)}h`;
  return `${(ms / 86400000).toFixed(1)}d`;
}

export function add(a: Duration, b: Duration): Duration {
  return fromMs(toMs(a) + toMs(b));
}

export function subtract(a: Duration, b: Duration): Duration {
  return fromMs(toMs(a) - toMs(b));
}

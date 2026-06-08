// Human-readable duration formatting and parsing.
// Converts milliseconds to "2m 30s" and back.

export function formatDuration(ms: number): string {
  if (ms < 0) ms = 0;

  if (ms < 1000) return `${ms}ms`;

  const seconds = Math.floor(ms / 1000);
  const minutes = Math.floor(seconds / 60);
  const hours = Math.floor(minutes / 60);
  const days = Math.floor(hours / 24);

  if (days > 0) {
    const h = hours % 24;
    return h > 0 ? `${days}d ${h}h` : `${days}d`;
  }
  if (hours > 0) {
    const m = minutes % 60;
    return m > 0 ? `${hours}h ${m}m` : `${hours}h`;
  }
  if (minutes > 0) {
    const s = seconds % 60;
    return s > 0 ? `${minutes}m ${s}s` : `${minutes}m`;
  }
  return `${seconds}s`;
}

const UNITS: Record<string, number> = {
  ms: 1,
  s: 1000,
  sec: 1000,
  m: 60_000,
  min: 60_000,
  h: 3_600_000,
  hr: 3_600_000,
  d: 86_400_000,
  day: 86_400_000,
};

export function parseDuration(input: string): number | undefined {
  const trimmed = input.trim().toLowerCase();

  const match = trimmed.match(/^(\d+(?:\.\d+)?)\s*(ms|sec|min|hr|day|[smhd])$/);
  if (!match) return undefined;

  const value = parseFloat(match[1]);
  const unit = UNITS[match[2]];
  if (unit === undefined) return undefined;

  return Math.round(value * unit);
}

export function durationBetween(start: Date, end: Date): string {
  return formatDuration(Math.abs(end.getTime() - start.getTime()));
}

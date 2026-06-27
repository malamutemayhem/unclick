export function formatDuration(ms: number): string {
  if (ms < 0) return `-${formatDuration(-ms)}`;
  if (ms < 1000) return `${ms}ms`;
  if (ms < 60000) return `${(ms / 1000).toFixed(1)}s`;
  if (ms < 3600000) {
    const m = Math.floor(ms / 60000);
    const s = Math.round((ms % 60000) / 1000);
    return s > 0 ? `${m}m ${s}s` : `${m}m`;
  }
  const h = Math.floor(ms / 3600000);
  const m = Math.round((ms % 3600000) / 60000);
  return m > 0 ? `${h}h ${m}m` : `${h}h`;
}

export function parseDuration(str: string): number {
  const units: Record<string, number> = {
    ms: 1,
    s: 1000,
    sec: 1000,
    m: 60000,
    min: 60000,
    h: 3600000,
    hr: 3600000,
    d: 86400000,
    day: 86400000,
    w: 604800000,
    week: 604800000,
  };
  let total = 0;
  const pattern = /(-?\d+(?:\.\d+)?)\s*(ms|sec|min|hr|day|week|[smhdw])/gi;
  let match: RegExpExecArray | null;
  while ((match = pattern.exec(str)) !== null) {
    const value = parseFloat(match[1]);
    const unit = match[2].toLowerCase();
    const mult = units[unit];
    if (mult === undefined) throw new Error(`Unknown unit: ${unit}`);
    total += value * mult;
  }
  if (total === 0 && str.trim()) {
    const n = parseFloat(str);
    if (!isNaN(n)) return n;
  }
  return total;
}

export function humanize(ms: number): string {
  if (ms < 1000) return "just now";
  if (ms < 60000) return `${Math.floor(ms / 1000)} seconds ago`;
  if (ms < 3600000) return `${Math.floor(ms / 60000)} minutes ago`;
  if (ms < 86400000) return `${Math.floor(ms / 3600000)} hours ago`;
  return `${Math.floor(ms / 86400000)} days ago`;
}

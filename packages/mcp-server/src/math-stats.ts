export function mean(values: number[]): number {
  if (values.length === 0) return 0;
  return sum(values) / values.length;
}

export function median(values: number[]): number {
  if (values.length === 0) return 0;
  const sorted = [...values].sort((a: number, b: number) => a - b);
  const mid = Math.floor(sorted.length / 2);
  return sorted.length % 2 === 0 ? (sorted[mid - 1] + sorted[mid]) / 2 : sorted[mid];
}

export function mode(values: number[]): number[] {
  if (values.length === 0) return [];
  const counts = new Map<number, number>();
  let maxCount = 0;
  for (const v of values) {
    const c = (counts.get(v) ?? 0) + 1;
    counts.set(v, c);
    if (c > maxCount) maxCount = c;
  }
  const result: number[] = [];
  for (const [v, c] of counts) {
    if (c === maxCount) result.push(v);
  }
  return result.sort((a: number, b: number) => a - b);
}

export function variance(values: number[]): number {
  if (values.length < 2) return 0;
  const m = mean(values);
  return values.reduce((acc: number, v: number) => acc + (v - m) ** 2, 0) / (values.length - 1);
}

export function stddev(values: number[]): number {
  return Math.sqrt(variance(values));
}

export function percentile(values: number[], p: number): number {
  if (values.length === 0) return 0;
  const sorted = [...values].sort((a: number, b: number) => a - b);
  const idx = (p / 100) * (sorted.length - 1);
  const lower = Math.floor(idx);
  const upper = Math.ceil(idx);
  if (lower === upper) return sorted[lower];
  return sorted[lower] + (sorted[upper] - sorted[lower]) * (idx - lower);
}

export function sum(values: number[]): number {
  return values.reduce((a: number, b: number) => a + b, 0);
}

export function min(values: number[]): number {
  if (values.length === 0) return Infinity;
  return Math.min(...values);
}

export function max(values: number[]): number {
  if (values.length === 0) return -Infinity;
  return Math.max(...values);
}

export function range(values: number[]): number {
  return max(values) - min(values);
}

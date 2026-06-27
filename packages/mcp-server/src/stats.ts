export function mean(values: number[]): number {
  if (values.length === 0) throw new Error("Empty array");
  return values.reduce((a, b) => a + b, 0) / values.length;
}

export function median(values: number[]): number {
  if (values.length === 0) throw new Error("Empty array");
  const sorted = [...values].sort((a, b) => a - b);
  const mid = Math.floor(sorted.length / 2);
  return sorted.length % 2 !== 0 ? sorted[mid] : (sorted[mid - 1] + sorted[mid]) / 2;
}

export function mode(values: number[]): number[] {
  if (values.length === 0) throw new Error("Empty array");
  const counts = new Map<number, number>();
  let maxCount = 0;
  for (const v of values) {
    const c = (counts.get(v) ?? 0) + 1;
    counts.set(v, c);
    if (c > maxCount) maxCount = c;
  }
  return [...counts.entries()].filter(([, c]) => c === maxCount).map(([v]) => v);
}

export function variance(values: number[]): number {
  const m = mean(values);
  return mean(values.map((v) => (v - m) ** 2));
}

export function stddev(values: number[]): number {
  return Math.sqrt(variance(values));
}

export function percentile(values: number[], p: number): number {
  if (values.length === 0) throw new Error("Empty array");
  const sorted = [...values].sort((a, b) => a - b);
  const idx = (p / 100) * (sorted.length - 1);
  const lo = Math.floor(idx);
  const hi = Math.ceil(idx);
  if (lo === hi) return sorted[lo];
  return sorted[lo] + (sorted[hi] - sorted[lo]) * (idx - lo);
}

export function sum(values: number[]): number {
  return values.reduce((a, b) => a + b, 0);
}

export function min(values: number[]): number {
  if (values.length === 0) throw new Error("Empty array");
  return Math.min(...values);
}

export function max(values: number[]): number {
  if (values.length === 0) throw new Error("Empty array");
  return Math.max(...values);
}

export function range(values: number[]): number {
  return max(values) - min(values);
}

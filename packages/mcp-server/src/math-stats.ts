export function sum(values: number[]): number {
  return values.reduce((a, b) => a + b, 0);
}

export function mean(values: number[]): number {
  if (values.length === 0) return 0;
  return sum(values) / values.length;
}

export function median(values: number[]): number {
  if (values.length === 0) return 0;
  const sorted = [...values].sort((a, b) => a - b);
  const mid = Math.floor(sorted.length / 2);
  return sorted.length % 2 === 0 ? (sorted[mid - 1] + sorted[mid]) / 2 : sorted[mid];
}

export function mode(values: number[]): number[] {
  if (values.length === 0) return [];
  const counts = new Map<number, number>();
  let maxCount = 0;
  for (const v of values) {
    const c = (counts.get(v) || 0) + 1;
    counts.set(v, c);
    if (c > maxCount) maxCount = c;
  }
  const modes: number[] = [];
  for (const [v, c] of counts) {
    if (c === maxCount) modes.push(v);
  }
  return modes.sort((a, b) => a - b);
}

export function variance(values: number[], population = true): number {
  if (values.length === 0) return 0;
  const avg = mean(values);
  const squaredDiffs = values.map((v) => (v - avg) ** 2);
  const divisor = population ? values.length : values.length - 1;
  return sum(squaredDiffs) / divisor;
}

export function standardDeviation(values: number[], population = true): number {
  return Math.sqrt(variance(values, population));
}

export function percentile(values: number[], p: number): number {
  if (values.length === 0) return 0;
  const sorted = [...values].sort((a, b) => a - b);
  const idx = (p / 100) * (sorted.length - 1);
  const lower = Math.floor(idx);
  const upper = Math.ceil(idx);
  if (lower === upper) return sorted[lower];
  return sorted[lower] + (sorted[upper] - sorted[lower]) * (idx - lower);
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

export function covariance(x: number[], y: number[]): number {
  const n = Math.min(x.length, y.length);
  if (n === 0) return 0;
  const xMean = mean(x.slice(0, n));
  const yMean = mean(y.slice(0, n));
  let cov = 0;
  for (let i = 0; i < n; i++) {
    cov += (x[i] - xMean) * (y[i] - yMean);
  }
  return cov / n;
}

export function correlation(x: number[], y: number[]): number {
  const sx = standardDeviation(x);
  const sy = standardDeviation(y);
  if (sx === 0 || sy === 0) return 0;
  return covariance(x, y) / (sx * sy);
}

export function zScore(value: number, values: number[]): number {
  const sd = standardDeviation(values);
  if (sd === 0) return 0;
  return (value - mean(values)) / sd;
}

export function histogram(values: number[], bins: number): { min: number; max: number; count: number }[] {
  if (values.length === 0 || bins <= 0) return [];
  const lo = min(values);
  const hi = max(values);
  const binWidth = (hi - lo) / bins || 1;
  const result = Array.from({ length: bins }, (_, i) => ({
    min: lo + i * binWidth,
    max: lo + (i + 1) * binWidth,
    count: 0,
  }));
  for (const v of values) {
    let idx = Math.floor((v - lo) / binWidth);
    if (idx >= bins) idx = bins - 1;
    if (idx < 0) idx = 0;
    result[idx].count++;
  }
  return result;
}

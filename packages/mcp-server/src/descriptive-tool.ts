import { stampMeta, ConnectorMeta } from "./connector-meta.js";

export async function descriptiveStats(args: Record<string, unknown>) {
  const data = args.data as number[];
  if (!Array.isArray(data) || data.length === 0) {
    throw new Error("data must be a non-empty array of numbers.");
  }
  if (data.length > 100000) throw new Error("data must have 100000 elements or fewer.");

  const n = data.length;
  const sorted = [...data].sort((a, b) => a - b);
  const sum = data.reduce((s, v) => s + v, 0);
  const mean = sum / n;

  const variance = data.reduce((s, v) => s + (v - mean) ** 2, 0) / n;
  const std = Math.sqrt(variance);
  const sampleVariance = n > 1 ? data.reduce((s, v) => s + (v - mean) ** 2, 0) / (n - 1) : 0;
  const sampleStd = Math.sqrt(sampleVariance);

  const min = sorted[0];
  const max = sorted[n - 1];
  const range = max - min;

  const median = n % 2 === 0
    ? (sorted[n / 2 - 1] + sorted[n / 2]) / 2
    : sorted[Math.floor(n / 2)];

  const q1Idx = Math.floor(n / 4);
  const q3Idx = Math.floor(3 * n / 4);
  const q1 = sorted[q1Idx];
  const q3 = sorted[q3Idx];
  const iqr = q3 - q1;

  const freqMap = new Map<number, number>();
  for (const v of data) freqMap.set(v, (freqMap.get(v) ?? 0) + 1);
  let maxFreq = 0;
  const modes: number[] = [];
  for (const [val, freq] of freqMap) {
    if (freq > maxFreq) { maxFreq = freq; modes.length = 0; modes.push(val); }
    else if (freq === maxFreq) modes.push(val);
  }
  modes.sort((a, b) => a - b);

  const skewness = n >= 3 && std > 0
    ? (n / ((n - 1) * (n - 2))) * data.reduce((s, v) => s + ((v - mean) / std) ** 3, 0)
    : 0;

  const kurtosis = n >= 4 && std > 0
    ? ((n * (n + 1)) / ((n - 1) * (n - 2) * (n - 3))) *
      data.reduce((s, v) => s + ((v - mean) / std) ** 4, 0) -
      (3 * (n - 1) ** 2) / ((n - 2) * (n - 3))
    : 0;

  const meta: ConnectorMeta = {
    source: "local-computation",
    fetched_at: new Date().toISOString(),
    next_steps: [
      "Use sample_std for inference about a population",
      "IQR helps identify outliers (below Q1-1.5*IQR or above Q3+1.5*IQR)",
    ],
  };
  return stampMeta({
    n,
    mean: Math.round(mean * 1e8) / 1e8,
    median,
    mode: modes.length === n ? null : modes,
    min,
    max,
    range,
    sum: Math.round(sum * 1e8) / 1e8,
    variance: Math.round(variance * 1e8) / 1e8,
    std: Math.round(std * 1e8) / 1e8,
    sample_variance: Math.round(sampleVariance * 1e8) / 1e8,
    sample_std: Math.round(sampleStd * 1e8) / 1e8,
    q1,
    q3,
    iqr,
    skewness: Math.round(skewness * 1e8) / 1e8,
    kurtosis: Math.round(kurtosis * 1e8) / 1e8,
  }, meta);
}

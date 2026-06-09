import { stampMeta, ConnectorMeta } from "./connector-meta.js";

export async function varianceCalc(args: Record<string, unknown>) {
  const values = Array.isArray(args.values) ? args.values.filter((v) => typeof v === "number") as number[] : [];
  if (values.length < 2) return { error: "values is required (array with at least 2 numbers)" };

  const n = values.length;
  const mean = values.reduce((a, b) => a + b, 0) / n;
  const popVariance = values.reduce((s, v) => s + (v - mean) ** 2, 0) / n;
  const sampleVariance = values.reduce((s, v) => s + (v - mean) ** 2, 0) / (n - 1);
  const popStddev = Math.sqrt(popVariance);
  const sampleStddev = Math.sqrt(sampleVariance);

  const sorted = [...values].sort((a, b) => a - b);
  const median = n % 2 === 0 ? (sorted[n / 2 - 1] + sorted[n / 2]) / 2 : sorted[Math.floor(n / 2)];
  const range = sorted[n - 1] - sorted[0];
  const cv = mean !== 0 ? (sampleStddev / Math.abs(mean)) * 100 : NaN;

  const meta: ConnectorMeta = {
    source: "local-computation",
    fetched_at: new Date().toISOString(),
    next_steps: ["Use sample variance (n-1) for estimating from a sample", "CV (coefficient of variation) is useful for comparing spread across datasets"],
  };
  return stampMeta({
    count: n,
    mean: +mean.toFixed(8),
    median: +median.toFixed(8),
    range: +range.toFixed(8),
    population_variance: +popVariance.toFixed(8),
    sample_variance: +sampleVariance.toFixed(8),
    population_stddev: +popStddev.toFixed(8),
    sample_stddev: +sampleStddev.toFixed(8),
    coefficient_of_variation: isNaN(cv) ? "N/A" : +cv.toFixed(4),
  }, meta);
}

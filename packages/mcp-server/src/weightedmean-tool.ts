import { stampMeta, ConnectorMeta } from "./connector-meta.js";

export async function weightedMean(args: Record<string, unknown>) {
  const values = Array.isArray(args.values) ? args.values.filter((v) => typeof v === "number") as number[] : [];
  const weights = Array.isArray(args.weights) ? args.weights.filter((v) => typeof v === "number") as number[] : [];
  if (values.length === 0) return { error: "values is required (array of numbers)" };

  if (weights.length > 0 && weights.length !== values.length) {
    return { error: "weights must have the same length as values" };
  }

  const w = weights.length > 0 ? weights : values.map(() => 1);
  const totalWeight = w.reduce((a, b) => a + b, 0);
  if (totalWeight === 0) return { error: "Total weight must not be zero" };

  const wMean = values.reduce((s, v, i) => s + v * w[i], 0) / totalWeight;
  const arithmeticMean = values.reduce((a, b) => a + b, 0) / values.length;

  const positiveValues = values.filter((v) => v > 0);
  const geometricMean = positiveValues.length === values.length
    ? Math.exp(values.reduce((s, v) => s + Math.log(v), 0) / values.length) : NaN;
  const harmonicMean = values.every((v) => v !== 0)
    ? values.length / values.reduce((s, v) => s + 1 / v, 0) : NaN;

  const meta: ConnectorMeta = {
    source: "local-computation",
    fetched_at: new Date().toISOString(),
    next_steps: ["Weighted mean accounts for varying importance", "Geometric mean suits growth rates; harmonic mean suits rates/ratios"],
  };
  return stampMeta({
    count: values.length,
    weighted_mean: +wMean.toFixed(8),
    arithmetic_mean: +arithmeticMean.toFixed(8),
    geometric_mean: isNaN(geometricMean) ? "N/A (requires all positive)" : +geometricMean.toFixed(8),
    harmonic_mean: isNaN(harmonicMean) ? "N/A (requires all non-zero)" : +harmonicMean.toFixed(8),
    total_weight: +totalWeight.toFixed(8),
  }, meta);
}

import { stampMeta, ConnectorMeta } from "./connector-meta.js";

export async function zscoreCalculate(args: Record<string, unknown>) {
  const value = typeof args.value === "number" ? args.value : NaN;
  const mean = typeof args.mean === "number" ? args.mean : NaN;
  const stddev = typeof args.stddev === "number" ? args.stddev : NaN;
  if (isNaN(value) || isNaN(mean) || isNaN(stddev)) return { error: "value, mean, and stddev are required (numbers)" };
  if (stddev <= 0) return { error: "stddev must be positive" };

  const z = (value - mean) / stddev;

  const t = 1 / (1 + 0.2316419 * Math.abs(z));
  const d = 0.3989422804014327;
  const p = d * Math.exp(-z * z / 2) * (t * (0.319381530 + t * (-0.356563782 + t * (1.781477937 + t * (-1.821255978 + t * 1.330274429)))));
  const cumulative = z > 0 ? 1 - p : p;

  const percentile = +(cumulative * 100).toFixed(4);

  const meta: ConnectorMeta = {
    source: "local-computation",
    fetched_at: new Date().toISOString(),
    next_steps: ["|z| > 1.96 is significant at 95%", "|z| > 2.576 is significant at 99%"],
  };
  return stampMeta({
    value,
    mean,
    stddev,
    z_score: +z.toFixed(6),
    cumulative_probability: +cumulative.toFixed(6),
    percentile,
    is_significant_95: Math.abs(z) > 1.96,
    is_significant_99: Math.abs(z) > 2.576,
  }, meta);
}

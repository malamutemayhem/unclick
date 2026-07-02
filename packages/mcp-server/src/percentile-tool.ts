import { stampMeta, ConnectorMeta } from "./connector-meta.js";

export async function percentileCalc(args: Record<string, unknown>) {
  const data = args.data as number[];
  if (!Array.isArray(data) || data.length === 0) {
    throw new Error("data must be a non-empty array of numbers.");
  }
  if (data.length > 100000) throw new Error("data must have 100000 elements or fewer.");

  const sorted = [...data].sort((a, b) => a - b);
  const n = sorted.length;

  const getPercentile = (p: number): number => {
    if (p <= 0) return sorted[0];
    if (p >= 100) return sorted[n - 1];
    const rank = (p / 100) * (n - 1);
    const lower = Math.floor(rank);
    const upper = Math.ceil(rank);
    if (lower === upper) return sorted[lower];
    return sorted[lower] + (rank - lower) * (sorted[upper] - sorted[lower]);
  };

  const percentiles = args.percentiles as number[] | undefined;
  const defaultPercentiles = [5, 10, 25, 50, 75, 90, 95, 99];
  const targets = Array.isArray(percentiles) && percentiles.length > 0
    ? percentiles.filter((p) => p >= 0 && p <= 100)
    : defaultPercentiles;

  const results: Record<string, number> = {};
  for (const p of targets) {
    results[`p${p}`] = Math.round(getPercentile(p) * 1e8) / 1e8;
  }

  const value = args.value !== undefined ? Number(args.value) : null;
  let valuePercentile: number | null = null;
  if (value !== null && Number.isFinite(value)) {
    const belowCount = sorted.filter((v) => v < value).length;
    const equalCount = sorted.filter((v) => v === value).length;
    valuePercentile = Math.round(((belowCount + equalCount / 2) / n) * 100 * 1e4) / 1e4;
  }

  const meta: ConnectorMeta = {
    source: "local-computation",
    fetched_at: new Date().toISOString(),
    next_steps: [
      "p50 is the median",
      "p25 and p75 define the interquartile range",
      "Provide a value to find its percentile rank",
    ],
  };
  return stampMeta({
    n,
    percentiles: results,
    value_percentile: valuePercentile !== null ? { value, percentile: valuePercentile } : null,
    min: sorted[0],
    max: sorted[n - 1],
  }, meta);
}

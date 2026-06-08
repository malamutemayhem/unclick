import { stampMeta, ConnectorMeta } from "./connector-meta.js";

export async function histogramCreate(args: Record<string, unknown>) {
  const values = Array.isArray(args.values) ? args.values.filter((v) => typeof v === "number") as number[] : [];
  if (values.length === 0) return { error: "values is required (array of numbers)" };

  const bins = typeof args.bins === "number" && args.bins >= 2 ? Math.floor(args.bins) : 10;
  const min = Math.min(...values);
  const max = Math.max(...values);
  const range = max - min || 1;
  const binWidth = range / bins;

  const buckets: { from: number; to: number; count: number }[] = [];
  const counts = Array(bins).fill(0) as number[];

  for (const v of values) {
    let idx = Math.floor((v - min) / binWidth);
    if (idx >= bins) idx = bins - 1;
    counts[idx]++;
  }

  for (let i = 0; i < bins; i++) {
    buckets.push({
      from: +(min + i * binWidth).toFixed(4),
      to: +(min + (i + 1) * binWidth).toFixed(4),
      count: counts[i],
    });
  }

  const maxCount = Math.max(...counts);
  const ascii = buckets.map((b) => {
    const bar = "#".repeat(Math.round((b.count / maxCount) * 30));
    return `${b.from.toFixed(1).padStart(8)} | ${bar} (${b.count})`;
  }).join("\n");

  const meta: ConnectorMeta = {
    source: "local-computation",
    fetched_at: new Date().toISOString(),
    next_steps: ["Adjust bins parameter for finer/coarser granularity"],
  };
  return stampMeta({
    count: values.length,
    min,
    max,
    bin_width: +binWidth.toFixed(4),
    buckets,
    ascii,
  }, meta);
}

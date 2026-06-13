import { stampMeta, ConnectorMeta } from "./connector-meta.js";

function normalPdf(x: number, mean: number, stddev: number): number {
  const z = (x - mean) / stddev;
  return Math.exp(-0.5 * z * z) / (stddev * Math.sqrt(2 * Math.PI));
}

function normalCdf(x: number, mean: number, stddev: number): number {
  const z = (x - mean) / stddev;
  const t = 1 / (1 + 0.2316419 * Math.abs(z));
  const d = 0.3989422804014327;
  const p = d * Math.exp(-z * z / 2) * (t * (0.319381530 + t * (-0.356563782 + t * (1.781477937 + t * (-1.821255978 + t * 1.330274429)))));
  return z > 0 ? 1 - p : p;
}

export async function normalDistribution(args: Record<string, unknown>) {
  const x = typeof args.x === "number" ? args.x : NaN;
  const mean = typeof args.mean === "number" ? args.mean : 0;
  const stddev = typeof args.stddev === "number" ? args.stddev : 1;
  if (isNaN(x)) return { error: "x is required (number)" };
  if (stddev <= 0) return { error: "stddev must be positive" };

  const pdf = normalPdf(x, mean, stddev);
  const cdf = normalCdf(x, mean, stddev);

  const meta: ConnectorMeta = {
    source: "local-computation",
    fetched_at: new Date().toISOString(),
    next_steps: ["CDF gives P(X <= x)", "For P(a < X < b), compute CDF(b) - CDF(a)"],
  };
  return stampMeta({
    x,
    mean,
    stddev,
    pdf: +pdf.toFixed(10),
    cdf: +cdf.toFixed(10),
    survival: +(1 - cdf).toFixed(10),
    percentile: +(cdf * 100).toFixed(4),
  }, meta);
}

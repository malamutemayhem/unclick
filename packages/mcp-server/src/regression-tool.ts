import { stampMeta, ConnectorMeta } from "./connector-meta.js";

export async function regressionFit(args: Record<string, unknown>) {
  const x = Array.isArray(args.x) ? args.x.filter((v) => typeof v === "number") as number[] : [];
  const y = Array.isArray(args.y) ? args.y.filter((v) => typeof v === "number") as number[] : [];
  if (x.length < 2 || y.length < 2) return { error: "x and y arrays required (at least 2 points each)" };
  if (x.length !== y.length) return { error: "x and y must have the same length" };

  const n = x.length;
  const sumX = x.reduce((a, b) => a + b, 0);
  const sumY = y.reduce((a, b) => a + b, 0);
  const sumXY = x.reduce((a, xi, i) => a + xi * y[i], 0);
  const sumX2 = x.reduce((a, xi) => a + xi * xi, 0);
  const sumY2 = y.reduce((a, yi) => a + yi * yi, 0);

  const slope = (n * sumXY - sumX * sumY) / (n * sumX2 - sumX * sumX);
  const intercept = (sumY - slope * sumX) / n;

  const ssRes = x.reduce((a, xi, i) => {
    const pred = slope * xi + intercept;
    return a + (y[i] - pred) ** 2;
  }, 0);
  const meanY = sumY / n;
  const ssTot = y.reduce((a, yi) => a + (yi - meanY) ** 2, 0);
  const rSquared = ssTot > 0 ? 1 - ssRes / ssTot : 1;

  const r = (n * sumXY - sumX * sumY) /
    Math.sqrt((n * sumX2 - sumX * sumX) * (n * sumY2 - sumY * sumY));

  const meta: ConnectorMeta = {
    source: "local-computation",
    fetched_at: new Date().toISOString(),
    next_steps: ["R-squared closer to 1 means better fit", "Use equation: y = slope * x + intercept"],
  };
  return stampMeta({
    slope: +slope.toFixed(6),
    intercept: +intercept.toFixed(6),
    r_squared: +rSquared.toFixed(6),
    correlation: +r.toFixed(6),
    equation: `y = ${slope.toFixed(4)}x + ${intercept.toFixed(4)}`,
    n,
  }, meta);
}

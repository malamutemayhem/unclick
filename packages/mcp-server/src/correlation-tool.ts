import { stampMeta, ConnectorMeta } from "./connector-meta.js";

export async function correlationCalc(args: Record<string, unknown>) {
  const x = args.x as number[];
  const y = args.y as number[];
  if (!Array.isArray(x) || !Array.isArray(y)) {
    throw new Error("x and y must be arrays of numbers.");
  }
  if (x.length !== y.length || x.length < 2) {
    throw new Error("x and y must have the same length (at least 2).");
  }
  if (x.length > 100000) throw new Error("Arrays must have 100000 elements or fewer.");

  const n = x.length;
  const meanX = x.reduce((s, v) => s + v, 0) / n;
  const meanY = y.reduce((s, v) => s + v, 0) / n;

  let sumXY = 0;
  let sumX2 = 0;
  let sumY2 = 0;
  for (let i = 0; i < n; i++) {
    const dx = x[i] - meanX;
    const dy = y[i] - meanY;
    sumXY += dx * dy;
    sumX2 += dx * dx;
    sumY2 += dy * dy;
  }

  const denom = Math.sqrt(sumX2 * sumY2);
  const pearson = denom === 0 ? 0 : sumXY / denom;
  const r2 = pearson * pearson;

  const covariance = sumXY / n;
  const stdX = Math.sqrt(sumX2 / n);
  const stdY = Math.sqrt(sumY2 / n);

  const slope = sumX2 === 0 ? 0 : sumXY / sumX2;
  const intercept = meanY - slope * meanX;

  let strength: string;
  const absR = Math.abs(pearson);
  if (absR >= 0.8) strength = "strong";
  else if (absR >= 0.5) strength = "moderate";
  else if (absR >= 0.3) strength = "weak";
  else strength = "negligible";

  const direction = pearson > 0 ? "positive" : pearson < 0 ? "negative" : "none";

  const meta: ConnectorMeta = {
    source: "local-computation",
    fetched_at: new Date().toISOString(),
    next_steps: [
      "r-squared indicates proportion of variance explained",
      "Use regression_fit for detailed regression analysis",
    ],
  };
  return stampMeta({
    n,
    pearson_r: Math.round(pearson * 1e8) / 1e8,
    r_squared: Math.round(r2 * 1e8) / 1e8,
    covariance: Math.round(covariance * 1e8) / 1e8,
    mean_x: Math.round(meanX * 1e8) / 1e8,
    mean_y: Math.round(meanY * 1e8) / 1e8,
    std_x: Math.round(stdX * 1e8) / 1e8,
    std_y: Math.round(stdY * 1e8) / 1e8,
    strength,
    direction,
    regression_slope: Math.round(slope * 1e8) / 1e8,
    regression_intercept: Math.round(intercept * 1e8) / 1e8,
  }, meta);
}

import { stampMeta, ConnectorMeta } from "./connector-meta.js";

function lnFactorial(n: number): number {
  let s = 0;
  for (let i = 2; i <= n; i++) s += Math.log(i);
  return s;
}

export async function poissonProbability(args: Record<string, unknown>) {
  const k = typeof args.k === "number" ? Math.floor(args.k) : NaN;
  const lambda = typeof args.lambda === "number" ? args.lambda : NaN;
  if (isNaN(k) || k < 0) return { error: "k is required (non-negative integer)" };
  if (isNaN(lambda) || lambda <= 0) return { error: "lambda is required (positive number)" };
  if (k > 170) return { error: "k must be <= 170" };

  const pmf = Math.exp(k * Math.log(lambda) - lambda - lnFactorial(k));

  let cdfLe = 0;
  for (let i = 0; i <= k; i++) {
    cdfLe += Math.exp(i * Math.log(lambda) - lambda - lnFactorial(i));
  }

  const meta: ConnectorMeta = {
    source: "local-computation",
    fetched_at: new Date().toISOString(),
    next_steps: ["Lambda is both the mean and variance", "Useful for modeling rare events over a fixed interval"],
  };
  return stampMeta({
    k,
    lambda,
    pmf: +pmf.toFixed(10),
    cdf_at_most_k: +cdfLe.toFixed(10),
    cdf_more_than_k: +(1 - cdfLe).toFixed(10),
    mean: lambda,
    variance: lambda,
    stddev: +Math.sqrt(lambda).toFixed(6),
  }, meta);
}

import { stampMeta, ConnectorMeta } from "./connector-meta.js";

function lnFactorial(n: number): number {
  let s = 0;
  for (let i = 2; i <= n; i++) s += Math.log(i);
  return s;
}

function binomPmf(k: number, n: number, p: number): number {
  const lnCoeff = lnFactorial(n) - lnFactorial(k) - lnFactorial(n - k);
  return Math.exp(lnCoeff + k * Math.log(p) + (n - k) * Math.log(1 - p));
}

export async function binomialProbability(args: Record<string, unknown>) {
  const n = typeof args.n === "number" ? Math.floor(args.n) : NaN;
  const k = typeof args.k === "number" ? Math.floor(args.k) : NaN;
  const p = typeof args.p === "number" ? args.p : NaN;
  if (isNaN(n) || n < 0 || n > 1000) return { error: "n is required (integer 0-1000)" };
  if (isNaN(k) || k < 0 || k > n) return { error: "k is required (integer 0 to n)" };
  if (isNaN(p) || p < 0 || p > 1) return { error: "p is required (number 0 to 1)" };

  const pmf = binomPmf(k, n, p);

  let cdfLe = 0;
  for (let i = 0; i <= k; i++) cdfLe += binomPmf(i, n, p);
  const cdfLt = cdfLe - pmf;
  const cdfGe = 1 - cdfLt;
  const cdfGt = 1 - cdfLe;

  const mean = n * p;
  const variance = n * p * (1 - p);
  const stddev = Math.sqrt(variance);

  const meta: ConnectorMeta = {
    source: "local-computation",
    fetched_at: new Date().toISOString(),
    next_steps: ["P(X=k) is the exact probability", "P(X<=k) is cumulative for at-most-k successes"],
  };
  return stampMeta({
    n,
    k,
    p,
    pmf_exact: +pmf.toFixed(10),
    cdf_at_most_k: +cdfLe.toFixed(10),
    cdf_less_than_k: +cdfLt.toFixed(10),
    cdf_at_least_k: +cdfGe.toFixed(10),
    cdf_more_than_k: +cdfGt.toFixed(10),
    mean: +mean.toFixed(6),
    variance: +variance.toFixed(6),
    stddev: +stddev.toFixed(6),
  }, meta);
}

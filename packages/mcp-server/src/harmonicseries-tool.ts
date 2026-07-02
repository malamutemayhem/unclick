import { stampMeta, ConnectorMeta } from "./connector-meta.js";

export async function harmonicSeries(args: Record<string, unknown>) {
  const n = typeof args.n === "number" ? Math.floor(args.n) : NaN;
  if (isNaN(n) || n < 1 || n > 100000) return { error: "n is required (integer 1-100000)" };

  let sum = 0;
  for (let i = 1; i <= n; i++) sum += 1 / i;

  let alternatingSum = 0;
  for (let i = 1; i <= n; i++) alternatingSum += (i % 2 === 1 ? 1 : -1) / i;

  const eulerMascheroni = 0.5772156649015329;
  const approx = Math.log(n) + eulerMascheroni;

  const meta: ConnectorMeta = {
    source: "local-computation",
    fetched_at: new Date().toISOString(),
    next_steps: ["Harmonic series diverges (grows without bound)", "H(n) is approximately ln(n) + gamma"],
  };
  return stampMeta({
    n,
    harmonic_sum: +sum.toFixed(10),
    alternating_sum: +alternatingSum.toFixed(10),
    ln_approximation: +approx.toFixed(10),
    error_from_approx: +Math.abs(sum - approx).toFixed(10),
    ln_2_limit: +Math.LN2.toFixed(10),
  }, meta);
}

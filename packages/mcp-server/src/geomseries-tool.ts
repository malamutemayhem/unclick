import { stampMeta, ConnectorMeta } from "./connector-meta.js";

export async function geometricSeries(args: Record<string, unknown>) {
  const a = typeof args.a === "number" ? args.a : NaN;
  const r = typeof args.r === "number" ? args.r : NaN;
  const n = typeof args.n === "number" ? Math.floor(args.n) : NaN;
  if (isNaN(a) || isNaN(r)) return { error: "a (first term) and r (common ratio) are required" };
  if (isNaN(n) || n < 1 || n > 1000) return { error: "n (number of terms) is required (1-1000)" };

  const finiteSum = r === 1 ? a * n : a * (1 - Math.pow(r, n)) / (1 - r);
  const nthTerm = a * Math.pow(r, n - 1);
  const hasInfiniteSum = Math.abs(r) < 1;
  const infiniteSum = hasInfiniteSum ? a / (1 - r) : NaN;

  const terms: number[] = [];
  for (let i = 0; i < Math.min(n, 10); i++) {
    terms.push(+(a * Math.pow(r, i)).toFixed(8));
  }

  const meta: ConnectorMeta = {
    source: "local-computation",
    fetched_at: new Date().toISOString(),
    next_steps: ["Infinite sum converges only when |r| < 1", "Each term = previous term * r"],
  };
  const result: Record<string, unknown> = {
    first_term: a, common_ratio: r, num_terms: n,
    nth_term: +nthTerm.toFixed(8),
    finite_sum: +finiteSum.toFixed(8),
    first_terms: terms,
    converges: hasInfiniteSum,
  };
  if (hasInfiniteSum) result.infinite_sum = +infiniteSum.toFixed(8);
  return stampMeta(result, meta);
}

import { stampMeta, ConnectorMeta } from "./connector-meta.js";

function factorial(n: number): number {
  if (n <= 1) return 1;
  let result = 1;
  for (let i = 2; i <= n; i++) result *= i;
  return result;
}

export async function combinationCalc(args: Record<string, unknown>) {
  const n = typeof args.n === "number" ? Math.floor(args.n) : -1;
  const r = typeof args.r === "number" ? Math.floor(args.r) : -1;
  if (n < 0) return { error: "n (total items) is required and must be non-negative" };
  if (r < 0 || r > n) return { error: "r must be between 0 and n" };

  const result = factorial(n) / (factorial(r) * factorial(n - r));

  const meta: ConnectorMeta = {
    source: "local-computation",
    fetched_at: new Date().toISOString(),
    next_steps: ["C(n,r) = n! / (r! * (n-r)!)", "Order does not matter in combinations"],
  };
  return stampMeta({ n, r, combinations: result, formula: `C(${n},${r}) = ${n}! / (${r}! * ${n - r}!)` }, meta);
}

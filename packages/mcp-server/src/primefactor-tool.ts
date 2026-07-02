import { stampMeta, ConnectorMeta } from "./connector-meta.js";

export async function primeFactor(args: Record<string, unknown>) {
  const n = typeof args.n === "number" ? Math.floor(args.n) : NaN;
  if (isNaN(n) || n < 2) return { error: "n is required (integer >= 2)" };
  if (n > 1e12) return { error: "n must be <= 1,000,000,000,000" };

  const factors: number[] = [];
  let remaining = n;

  for (let d = 2; d * d <= remaining; d++) {
    while (remaining % d === 0) {
      factors.push(d);
      remaining /= d;
    }
  }
  if (remaining > 1) factors.push(remaining);

  const unique = [...new Set(factors)];
  const grouped: Record<number, number> = {};
  for (const f of factors) {
    grouped[f] = (grouped[f] || 0) + 1;
  }

  const expression = unique.map((p) => grouped[p] > 1 ? `${p}^${grouped[p]}` : `${p}`).join(" x ");

  const meta: ConnectorMeta = {
    source: "local-computation",
    fetched_at: new Date().toISOString(),
    next_steps: ["Use factors to find GCD/LCM with other numbers", "A single-factor result means the number is prime"],
  };
  return stampMeta({
    n,
    factors,
    unique_primes: unique,
    exponents: grouped,
    expression,
    is_prime: factors.length === 1,
  }, meta);
}

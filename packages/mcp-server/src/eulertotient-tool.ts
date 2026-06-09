import { stampMeta, ConnectorMeta } from "./connector-meta.js";

export async function eulerTotient(args: Record<string, unknown>) {
  const n = Number(args.number);
  if (!Number.isInteger(n) || n < 1) {
    throw new Error("number must be a positive integer");
  }
  if (n > 1_000_000_000) {
    throw new Error("number must be at most 1,000,000,000");
  }

  let result = n;
  let temp = n;
  const factors: number[] = [];

  for (let p = 2; p * p <= temp; p++) {
    if (temp % p === 0) {
      factors.push(p);
      while (temp % p === 0) temp = Math.floor(temp / p);
      result -= Math.floor(result / p);
    }
  }
  if (temp > 1) {
    factors.push(temp);
    result -= Math.floor(result / temp);
  }

  const meta: ConnectorMeta = {
    source: "local-computation",
    fetched_at: new Date().toISOString(),
    next_steps: ["Use Euler's totient for RSA, modular arithmetic, and counting coprimes"],
  };

  return stampMeta(
    {
      number: n,
      totient: result,
      prime_factors: factors,
      is_prime: factors.length === 1 && factors[0] === n,
      ratio: +(result / n).toFixed(6),
    },
    meta,
  );
}

import { stampMeta, ConnectorMeta } from "./connector-meta.js";

export async function moebiusFunction(args: Record<string, unknown>) {
  const n = args.n as number;

  if (!Number.isInteger(n) || n < 1 || n > 10_000_000) {
    throw new Error("n must be a positive integer (max 10,000,000)");
  }

  const mu = new Int8Array(n + 1);
  const primes: number[] = [];
  const isComposite = new Uint8Array(n + 1);
  mu[1] = 1;

  for (let i = 2; i <= n; i++) {
    if (!isComposite[i]) {
      primes.push(i);
      mu[i] = -1;
    }
    for (const p of primes) {
      if (i * p > n) break;
      isComposite[i * p] = 1;
      if (i % p === 0) {
        mu[i * p] = 0;
        break;
      }
      mu[i * p] = -mu[i] as -1 | 0 | 1;
    }
  }

  let mertens = 0;
  const mertensValues: number[] = [];
  let zeroCount = 0;
  let plusCount = 0;
  let minusCount = 0;

  for (let i = 1; i <= n; i++) {
    mertens += mu[i];
    if (mu[i] === 0) zeroCount++;
    else if (mu[i] === 1) plusCount++;
    else minusCount++;
  }

  const meta: ConnectorMeta = {
    source: "local-computation",
    fetched_at: new Date().toISOString(),
    next_steps: [
      "mu(n)=0 if n has squared prime factor, else (-1)^k where k is number of prime factors",
      "Mertens function M(n) = sum of mu(1..n); related to Riemann hypothesis",
    ],
  };

  const result: Record<string, unknown> = {
    n,
    mu_n: mu[n],
    mertens_n: mertens,
    counts: { zero: zeroCount, plus_one: plusCount, minus_one: minusCount },
  };

  if (n <= 100) {
    result.mu_values = Array.from(mu.slice(1, n + 1));
  }

  return stampMeta(result, meta);
}

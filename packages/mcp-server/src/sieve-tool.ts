import { stampMeta, ConnectorMeta } from "./connector-meta.js";

export async function sieveOfEratosthenes(args: Record<string, unknown>) {
  const n = Number(args.n);
  if (!Number.isInteger(n) || n < 2) {
    throw new Error("n must be an integer >= 2");
  }
  if (n > 10_000_000) {
    throw new Error("n must be <= 10,000,000");
  }

  const isPrime = new Uint8Array(n + 1);
  isPrime.fill(1);
  isPrime[0] = 0;
  isPrime[1] = 0;

  for (let i = 2; i * i <= n; i++) {
    if (isPrime[i]) {
      for (let j = i * i; j <= n; j += i) {
        isPrime[j] = 0;
      }
    }
  }

  const primes: number[] = [];
  for (let i = 2; i <= n; i++) {
    if (isPrime[i]) primes.push(i);
  }

  const meta: ConnectorMeta = {
    source: "local-computation",
    fetched_at: new Date().toISOString(),
    next_steps: ["Use primes for factorization or cryptographic tasks"],
  };

  return stampMeta({ n, prime_count: primes.length, primes }, meta);
}

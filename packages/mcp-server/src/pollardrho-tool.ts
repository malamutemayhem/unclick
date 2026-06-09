import { stampMeta, ConnectorMeta } from "./connector-meta.js";

function mulmod(a: bigint, b: bigint, m: bigint): bigint {
  return (a * b) % m;
}

function powmod(base: bigint, exp: bigint, m: bigint): bigint {
  let result = 1n;
  base %= m;
  while (exp > 0n) {
    if (exp & 1n) result = mulmod(result, base, m);
    exp >>= 1n;
    base = mulmod(base, base, m);
  }
  return result;
}

function millerRabin(n: bigint): boolean {
  if (n < 2n) return false;
  if (n < 4n) return true;
  if (n % 2n === 0n) return false;

  let d = n - 1n;
  let r = 0;
  while (d % 2n === 0n) {
    d >>= 1n;
    r++;
  }

  const witnesses = [2n, 3n, 5n, 7n, 11n, 13n, 17n, 19n, 23n, 29n, 31n, 37n];
  for (const a of witnesses) {
    if (a >= n) continue;
    let x = powmod(a, d, n);
    if (x === 1n || x === n - 1n) continue;
    let composite = true;
    for (let i = 0; i < r - 1; i++) {
      x = mulmod(x, x, n);
      if (x === n - 1n) {
        composite = false;
        break;
      }
    }
    if (composite) return false;
  }
  return true;
}

function gcd(a: bigint, b: bigint): bigint {
  a = a < 0n ? -a : a;
  b = b < 0n ? -b : b;
  while (b > 0n) {
    [a, b] = [b, a % b];
  }
  return a;
}

function pollardRhoFactor(n: bigint): bigint {
  if (n % 2n === 0n) return 2n;
  if (n % 3n === 0n) return 3n;

  for (let c = 1n; ; c++) {
    let x = 2n;
    let y = 2n;
    let d = 1n;

    const f = (v: bigint) => (mulmod(v, v, n) + c) % n;

    while (d === 1n) {
      x = f(x);
      y = f(f(y));
      d = gcd(x > y ? x - y : y - x, n);
    }

    if (d !== n) return d;
  }
}

function factorize(n: bigint): bigint[] {
  if (n <= 1n) return [];
  if (millerRabin(n)) return [n];

  const d = pollardRhoFactor(n);
  return [...factorize(d), ...factorize(n / d)].sort((a, b) =>
    a < b ? -1 : a > b ? 1 : 0
  );
}

export async function pollardRho(args: Record<string, unknown>) {
  const value = args.value as number;

  if (typeof value !== "number" || !Number.isInteger(value) || value < 2) {
    throw new Error("value must be an integer >= 2");
  }
  if (value > Number.MAX_SAFE_INTEGER) {
    throw new Error("value must be at most 2^53 - 1");
  }

  const n = BigInt(value);
  const factors = factorize(n);

  const factorCounts: Record<string, number> = {};
  for (const f of factors) {
    const key = f.toString();
    factorCounts[key] = (factorCounts[key] || 0) + 1;
  }

  const uniqueFactors = [...new Set(factors)].map(Number);
  const isPrime = factors.length === 1;
  const divisorCount = Object.values(factorCounts).reduce(
    (acc, e) => acc * (e + 1),
    1
  );

  const meta: ConnectorMeta = {
    source: "local-computation",
    fetched_at: new Date().toISOString(),
    next_steps: [
      "Use prime factorization for number theory computations",
      "Compute Euler totient, divisor sums, or multiplicative functions from factors",
    ],
  };

  return stampMeta(
    {
      value,
      is_prime: isPrime,
      prime_factors: factors.map(Number),
      unique_prime_factors: uniqueFactors,
      factor_exponents: factorCounts,
      divisor_count: divisorCount,
    },
    meta,
  );
}

import { stampMeta, ConnectorMeta } from "./connector-meta.js";

function modPow(base: bigint, exp: bigint, mod: bigint): bigint {
  let result = 1n;
  base = base % mod;
  while (exp > 0n) {
    if (exp % 2n === 1n) {
      result = (result * base) % mod;
    }
    exp = exp / 2n;
    base = (base * base) % mod;
  }
  return result;
}

function millerTest(d: bigint, n: bigint, a: bigint): boolean {
  let x = modPow(a, d, n);
  if (x === 1n || x === n - 1n) return true;

  let dd = d;
  while (dd !== n - 1n) {
    x = (x * x) % n;
    dd = dd * 2n;
    if (x === 1n) return false;
    if (x === n - 1n) return true;
  }
  return false;
}

export async function millerRabinTest(args: Record<string, unknown>) {
  const nVal = args.number;
  let n: bigint;
  try {
    n = BigInt(nVal as string | number);
  } catch {
    throw new Error("number must be a valid integer");
  }

  if (n < 2n) {
    throw new Error("number must be >= 2");
  }
  if (n > 10n ** 18n) {
    throw new Error("number must be at most 10^18");
  }

  if (n === 2n || n === 3n) {
    const meta: ConnectorMeta = {
      source: "local-computation",
      fetched_at: new Date().toISOString(),
      next_steps: ["Use Miller-Rabin for fast probabilistic primality testing"],
    };
    return stampMeta(
      { number: Number(n), is_probably_prime: true, is_deterministic: true, witnesses_tested: 0 },
      meta,
    );
  }

  if (n % 2n === 0n) {
    const meta: ConnectorMeta = {
      source: "local-computation",
      fetched_at: new Date().toISOString(),
      next_steps: ["Use Miller-Rabin for fast probabilistic primality testing"],
    };
    return stampMeta(
      { number: Number(n), is_probably_prime: false, is_deterministic: true, witnesses_tested: 0, reason: "even number" },
      meta,
    );
  }

  let d = n - 1n;
  let r = 0;
  while (d % 2n === 0n) {
    d = d / 2n;
    r++;
  }

  const witnesses = [2n, 3n, 5n, 7n, 11n, 13n, 17n, 19n, 23n, 29n, 31n, 37n];
  const usedWitnesses: number[] = [];
  let isPrime = true;

  for (const a of witnesses) {
    if (a >= n) continue;
    usedWitnesses.push(Number(a));
    if (!millerTest(d, n, a)) {
      isPrime = false;
      break;
    }
  }

  const isDeterministic = n < 3_317_044_064_679_887_385_961_981n;

  const meta: ConnectorMeta = {
    source: "local-computation",
    fetched_at: new Date().toISOString(),
    next_steps: ["Use Miller-Rabin for fast probabilistic primality testing"],
  };

  return stampMeta(
    {
      number: Number(n),
      is_probably_prime: isPrime,
      is_deterministic: isDeterministic,
      witnesses_tested: usedWitnesses.length,
      witnesses_used: usedWitnesses,
      decomposition: { d: Number(d), r },
    },
    meta,
  );
}

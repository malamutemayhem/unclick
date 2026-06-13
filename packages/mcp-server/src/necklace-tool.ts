import { stampMeta, ConnectorMeta } from "./connector-meta.js";

/**
 * Greatest common divisor (Euclidean algorithm).
 */
function gcd(a: number, b: number): number {
  while (b !== 0) {
    const t = b;
    b = a % b;
    a = t;
  }
  return a;
}

/**
 * Compute (base^exp) mod m using modular exponentiation with BigInt,
 * then return as a regular number (or BigInt string if too large).
 * For exact counting we use BigInt throughout.
 */
function bigPow(base: bigint, exp: bigint): bigint {
  let result = 1n;
  let b = base;
  let e = exp;
  while (e > 0n) {
    if (e & 1n) result *= b;
    b *= b;
    e >>= 1n;
  }
  return result;
}

/**
 * Euler's totient function for a positive integer.
 */
function eulerTotient(n: number): number {
  let result = n;
  let x = n;
  for (let p = 2; p * p <= x; p++) {
    if (x % p === 0) {
      while (x % p === 0) x /= p;
      result -= result / p;
    }
  }
  if (x > 1) result -= result / x;
  return result;
}

/**
 * All divisors of n.
 */
function divisors(n: number): number[] {
  const divs: number[] = [];
  for (let i = 1; i * i <= n; i++) {
    if (n % i === 0) {
      divs.push(i);
      if (i !== n / i) divs.push(n / i);
    }
  }
  return divs.sort((a, b) => a - b);
}

export async function necklaceCount(args: Record<string, unknown>) {
  const n = Number(args.n);
  const k = Number(args.k);

  if (!Number.isFinite(n) || !Number.isInteger(n) || n < 1) {
    throw new Error("n must be a positive integer.");
  }
  if (n > 1000) {
    throw new Error("n must be 1000 or less.");
  }
  if (!Number.isFinite(k) || !Number.isInteger(k) || k < 1) {
    throw new Error("k must be a positive integer.");
  }
  if (k > 1000) {
    throw new Error("k must be 1000 or less.");
  }

  const bigN = BigInt(n);
  const bigK = BigInt(k);

  // Burnside's lemma for necklaces (cyclic group C_n):
  // necklace_count = (1/n) * sum_{d | n} euler_totient(n/d) * k^d
  let necklaceSum = 0n;
  const divs = divisors(n);
  for (const d of divs) {
    const phi = BigInt(eulerTotient(n / d));
    necklaceSum += phi * bigPow(bigK, BigInt(d));
  }
  const necklaceCountVal = necklaceSum / bigN;

  // Burnside's lemma for bracelets (dihedral group D_n):
  // bracelet_count = necklace_count/2 + correction for reflections
  // For n even: correction = (k^(n/2+1) + k^(n/2)) / (2*2)... let me be precise.
  //
  // Dihedral group has 2n elements: n rotations + n reflections.
  // bracelet_count = (1/(2n)) * [sum_rotations + sum_reflections]
  // sum_rotations = n * necklace_count (already computed as necklaceSum/1, we have necklaceSum)
  // Actually, sum_rotations = necklaceSum (already the sum over rotations).
  //
  // For reflections:
  //   If n is odd: all n reflections fix k^((n+1)/2) colorings each.
  //     sum_reflections = n * k^((n+1)/2)
  //   If n is even: n/2 reflections through two beads fix k^(n/2+1) each,
  //                 n/2 reflections through two edges fix k^(n/2) each.
  //     sum_reflections = (n/2) * k^(n/2+1) + (n/2) * k^(n/2)

  let reflectionSum: bigint;
  if (n % 2 === 1) {
    reflectionSum = bigN * bigPow(bigK, BigInt((n + 1) / 2));
  } else {
    const half = BigInt(n / 2);
    reflectionSum =
      half * bigPow(bigK, BigInt(n / 2 + 1)) +
      half * bigPow(bigK, BigInt(n / 2));
  }

  const braceletCountVal = (necklaceSum + reflectionSum) / (2n * bigN);

  // Convert BigInt results to number if safe, otherwise to string
  function toOutput(val: bigint): number | string {
    if (val <= BigInt(Number.MAX_SAFE_INTEGER)) return Number(val);
    return val.toString();
  }

  const meta: ConnectorMeta = {
    source: "local-computation",
    fetched_at: new Date().toISOString(),
    next_steps: [
      "Necklaces count equivalence classes under rotation (cyclic symmetry)",
      "Bracelets also factor out reflection (dihedral symmetry)",
    ],
  };

  return stampMeta(
    {
      n,
      k,
      necklace_count: toOutput(necklaceCountVal),
      bracelet_count: toOutput(braceletCountVal),
    },
    meta,
  );
}

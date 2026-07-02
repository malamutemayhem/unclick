import { stampMeta, ConnectorMeta } from "./connector-meta.js";

/**
 * Compute the factorial of n. For n > 20 we exceed safe integer range,
 * so we cap input size at n <= 20.
 */
function factorial(n: number): number {
  let f = 1;
  for (let i = 2; i <= n; i++) f *= i;
  return f;
}

/**
 * Given a permutation of [0..n-1], compute its Lehmer code.
 * lehmer[i] = number of elements to the right of permutation[i] that are smaller.
 */
function permutationToLehmer(perm: number[]): number[] {
  const n = perm.length;
  const lehmer: number[] = new Array(n);
  for (let i = 0; i < n; i++) {
    let count = 0;
    for (let j = i + 1; j < n; j++) {
      if (perm[j] < perm[i]) count++;
    }
    lehmer[i] = count;
  }
  return lehmer;
}

/**
 * Convert a Lehmer code to the rank in lexicographic order.
 */
function lehmerToRank(lehmer: number[]): number {
  const n = lehmer.length;
  let rank = 0;
  for (let i = 0; i < n; i++) {
    rank += lehmer[i] * factorial(n - 1 - i);
  }
  return rank;
}

/**
 * Unrank: given a rank and n, produce the permutation of [0..n-1].
 */
function rankToPermutation(rank: number, n: number): number[] {
  const available: number[] = [];
  for (let i = 0; i < n; i++) available.push(i);

  const perm: number[] = [];
  const lehmer: number[] = [];
  let remaining = rank;

  for (let i = 0; i < n; i++) {
    const f = factorial(n - 1 - i);
    const idx = Math.floor(remaining / f);
    lehmer.push(idx);
    perm.push(available[idx]);
    available.splice(idx, 1);
    remaining = remaining % f;
  }

  return perm;
}

export async function lehmerCode(args: Record<string, unknown>) {
  const hasPerm = Array.isArray(args.permutation);
  const hasRank = typeof args.rank === "number";
  const hasN = typeof args.n === "number";

  if (!hasPerm && !(hasRank && hasN)) {
    throw new Error("Provide either permutation (array) or both rank (number) and n (number).");
  }

  if (hasPerm) {
    const perm = args.permutation as number[];
    const n = perm.length;

    if (n === 0) throw new Error("permutation must not be empty.");
    if (n > 20) throw new Error("permutation length must be 20 or fewer (factorial overflow).");

    // Validate that it is a valid permutation of [0..n-1]
    const seen = new Set<number>();
    for (let i = 0; i < n; i++) {
      const v = perm[i];
      if (typeof v !== "number" || !Number.isInteger(v) || v < 0 || v >= n) {
        throw new Error(`permutation must contain integers 0 to ${n - 1}. Found ${v} at index ${i}.`);
      }
      if (seen.has(v)) {
        throw new Error(`Duplicate value ${v} in permutation.`);
      }
      seen.add(v);
    }

    const lehmer = permutationToLehmer(perm);
    const rank = lehmerToRank(lehmer);

    const meta: ConnectorMeta = {
      source: "local-computation",
      fetched_at: new Date().toISOString(),
      next_steps: [
        "Use rank to reconstruct the permutation later",
        "Lehmer codes map bijectively to factoradic number representations",
      ],
    };

    return stampMeta({ permutation: perm, lehmer_code: lehmer, rank, n }, meta);
  }

  // Unrank mode
  const rank = args.rank as number;
  const n = args.n as number;

  if (!Number.isInteger(n) || n < 1 || n > 20) {
    throw new Error("n must be an integer between 1 and 20.");
  }
  if (!Number.isInteger(rank) || rank < 0) {
    throw new Error("rank must be a non-negative integer.");
  }
  const maxRank = factorial(n) - 1;
  if (rank > maxRank) {
    throw new Error(`rank must be at most ${maxRank} for n=${n}.`);
  }

  const perm = rankToPermutation(rank, n);
  const lehmer = permutationToLehmer(perm);

  const meta: ConnectorMeta = {
    source: "local-computation",
    fetched_at: new Date().toISOString(),
    next_steps: [
      "Use the permutation array directly or convert back via rank",
      "Lehmer codes map bijectively to factoradic number representations",
    ],
  };

  return stampMeta({ rank, n, permutation: perm, lehmer_code: lehmer }, meta);
}

import { stampMeta, ConnectorMeta } from "./connector-meta.js";

/**
 * Count and optionally enumerate derangements (permutations with no fixed points).
 * D(n) = (n-1) * (D(n-1) + D(n-2)), with D(0)=1, D(1)=0.
 */
export async function derangementCalc(args: Record<string, unknown>) {
  const n = args.n as number;
  if (!Number.isInteger(n) || n < 1 || n > 20) {
    throw new Error("n must be an integer between 1 and 20");
  }

  const enumerate = args.enumerate === true;

  // Compute subfactorial D(n) via recurrence
  const d: number[] = [1, 0];
  for (let i = 2; i <= n; i++) {
    d[i] = (i - 1) * (d[i - 1] + d[i - 2]);
  }

  const count = d[n];

  const result: Record<string, unknown> = {
    n,
    count,
  };

  if (enumerate) {
    if (n > 8) {
      throw new Error("enumerate is only supported for n <= 8");
    }
    const derangements: number[][] = [];
    // Generate all permutations and filter for derangements
    const perm = Array.from({ length: n }, (_, i) => i);
    const generate = (start: number) => {
      if (start === n) {
        // Check no fixed points
        if (perm.every((v, i) => v !== i)) {
          derangements.push([...perm]);
        }
        return;
      }
      for (let i = start; i < n; i++) {
        [perm[start], perm[i]] = [perm[i], perm[start]];
        generate(start + 1);
        [perm[start], perm[i]] = [perm[i], perm[start]];
      }
    };
    generate(0);
    result.enumerate = true;
    result.derangements = derangements;
  }

  const meta: ConnectorMeta = {
    source: "local-computation",
    fetched_at: new Date().toISOString(),
    next_steps: [
      "D(n)/n! approaches 1/e as n grows",
      "Related to inclusion-exclusion principle and hat-check problem",
    ],
  };

  return stampMeta(result, meta);
}

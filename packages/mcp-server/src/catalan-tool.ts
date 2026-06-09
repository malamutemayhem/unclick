import { stampMeta, ConnectorMeta } from "./connector-meta.js";

export async function catalanCalc(args: Record<string, unknown>) {
  const n = typeof args.n === "number" ? args.n : null;
  if (n === null || !Number.isInteger(n) || n < 0) {
    throw new Error("n must be a non-negative integer.");
  }
  if (n > 500) throw new Error("n must be 500 or fewer.");

  const catalan: number[] = [1];
  for (let i = 1; i <= n; i++) {
    catalan.push(catalan[i - 1] * 2 * (2 * i - 1) / (i + 1));
  }

  const sequence = args.sequence === true;
  const count = typeof args.count === "number" ? Math.min(args.count as number, n + 1) : n + 1;

  const interpretations = [
    `Number of distinct binary trees with ${n} nodes`,
    `Number of ways to triangulate a polygon with ${n + 2} sides`,
    `Number of valid arrangements of ${n} pairs of parentheses`,
    `Number of monotonic lattice paths from (0,0) to (${n},${n}) that stay below the diagonal`,
  ];

  const meta: ConnectorMeta = {
    source: "local-computation",
    fetched_at: new Date().toISOString(),
    next_steps: [
      "Catalan numbers grow approximately as 4^n / (n^(3/2) * sqrt(pi))",
      "Related to Ballot problem, Dyck paths, and non-crossing partitions",
    ],
  };

  const result: Record<string, unknown> = {
    n,
    catalan_n: n <= 30 ? catalan[n] : catalan[n].toExponential(6),
    interpretations,
  };

  if (sequence) {
    result.sequence = catalan.slice(0, count).map((v, i) => ({
      index: i,
      value: i <= 30 ? v : Number(v.toExponential(6)),
    }));
  }

  return stampMeta(result, meta);
}

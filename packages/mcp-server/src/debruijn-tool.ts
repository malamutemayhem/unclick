import { stampMeta, ConnectorMeta } from "./connector-meta.js";

export async function deBruijn(args: Record<string, unknown>) {
  const k = args.k as number;
  const n = args.n as number;

  if (!Number.isInteger(k) || k < 2 || k > 10) {
    throw new Error("k must be an integer between 2 and 10");
  }
  if (!Number.isInteger(n) || n < 1 || n > 10) {
    throw new Error("n must be an integer between 1 and 10");
  }
  if (Math.pow(k, n) > 1_000_000) {
    throw new Error("k^n must not exceed 1,000,000");
  }

  // Martin's algorithm for de Bruijn sequences
  const alphabet = Array.from({ length: k }, (_, i) => String(i));
  const seqLen = Math.pow(k, n);

  const a: number[] = new Array(k * n).fill(0);
  const sequence: number[] = [];

  function db(t: number, p: number): void {
    if (t > n) {
      if (n % p === 0) {
        for (let j = 1; j <= p; j++) {
          sequence.push(a[j]);
        }
      }
    } else {
      a[t] = a[t - p];
      db(t + 1, p);
      for (let j = a[t - p] + 1; j < k; j++) {
        a[t] = j;
        db(t + 1, t);
      }
    }
  }

  db(1, 1);

  const seqStr = sequence.map((v) => alphabet[v]).join("");

  const meta: ConnectorMeta = {
    source: "local-computation",
    fetched_at: new Date().toISOString(),
    next_steps: [
      "The sequence is cyclic; wrap around to check the last n-1 substrings",
      "Use for combinatorial testing or LFSR sequence generation",
    ],
  };

  return stampMeta(
    {
      sequence: seqStr,
      k,
      n,
      length: seqLen,
      alphabet: alphabet.join(""),
    },
    meta,
  );
}

import { stampMeta, ConnectorMeta } from "./connector-meta.js";

export async function zFunction(args: Record<string, unknown>) {
  const text = args.text as string;
  const pattern = args.pattern as string | undefined;

  if (typeof text !== "string" || text.length === 0 || text.length > 100_000) {
    throw new Error("text must be a non-empty string (max 100,000 characters)");
  }
  if (pattern !== undefined && (typeof pattern !== "string" || pattern.length === 0)) {
    throw new Error("pattern must be a non-empty string if provided");
  }

  function computeZ(s: string): number[] {
    const n = s.length;
    const z = new Array(n).fill(0);
    z[0] = n;
    let l = 0;
    let r = 0;
    for (let i = 1; i < n; i++) {
      if (i < r) {
        z[i] = Math.min(r - i, z[i - l]);
      }
      while (i + z[i] < n && s[z[i]] === s[i + z[i]]) {
        z[i]++;
      }
      if (i + z[i] > r) {
        l = i;
        r = i + z[i];
      }
    }
    return z;
  }

  if (pattern) {
    const combined = pattern + "$" + text;
    const z = computeZ(combined);
    const pLen = pattern.length;
    const matches: number[] = [];
    for (let i = pLen + 1; i < combined.length; i++) {
      if (z[i] === pLen) {
        matches.push(i - pLen - 1);
      }
    }

    const meta: ConnectorMeta = {
      source: "local-computation",
      fetched_at: new Date().toISOString(),
      next_steps: [
        "Positions are 0-indexed in the original text",
        "Z-function pattern matching runs in O(n + m) time",
      ],
    };

    return stampMeta(
      {
        pattern_length: pLen,
        text_length: text.length,
        match_count: matches.length,
        match_positions: matches,
      },
      meta,
    );
  }

  const z = computeZ(text);

  const meta: ConnectorMeta = {
    source: "local-computation",
    fetched_at: new Date().toISOString(),
    next_steps: [
      "z[i] = length of longest substring starting at i that matches a prefix of the string",
      "Useful for pattern matching, string periodicity, and competitive programming",
    ],
  };

  return stampMeta(
    {
      text_length: text.length,
      z_array: text.length <= 1000 ? z : z.slice(0, 100),
      max_z: Math.max(...z.slice(1)),
    },
    meta,
  );
}

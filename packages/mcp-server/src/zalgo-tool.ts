import { stampMeta, ConnectorMeta } from "./connector-meta.js";

export async function zAlgorithm(args: Record<string, unknown>) {
  const text = String(args.text ?? "");
  if (text.length === 0) throw new Error("text must be non-empty");

  const pattern = args.pattern != null ? String(args.pattern) : null;

  const s = pattern != null ? pattern + "$" + text : text;
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

  if (pattern != null) {
    const pLen = pattern.length;
    const matches: number[] = [];
    for (let i = pLen + 1; i < n; i++) {
      if (z[i] === pLen) {
        matches.push(i - pLen - 1);
      }
    }

    const meta: ConnectorMeta = {
      source: "local-computation",
      fetched_at: new Date().toISOString(),
      next_steps: ["Use Z-algorithm for linear-time pattern matching"],
    };

    return stampMeta(
      {
        text_length: text.length,
        pattern_length: pLen,
        match_count: matches.length,
        matches,
      },
      meta,
    );
  }

  const meta: ConnectorMeta = {
    source: "local-computation",
    fetched_at: new Date().toISOString(),
    next_steps: ["Use the Z-array for string analysis or pattern matching"],
  };

  return stampMeta(
    {
      length: text.length,
      z_array: z.length <= 1000 ? z : z.slice(0, 1000),
      truncated: z.length > 1000,
    },
    meta,
  );
}

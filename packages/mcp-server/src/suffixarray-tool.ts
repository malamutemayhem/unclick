import { stampMeta, ConnectorMeta } from "./connector-meta.js";

export async function suffixArrayBuild(args: Record<string, unknown>) {
  const text = String(args.text ?? "");
  if (text.length === 0) {
    throw new Error("text must be non-empty");
  }
  if (text.length > 100_000) {
    throw new Error("text must be <= 100,000 characters");
  }

  const n = text.length;
  const sa = Array.from({ length: n }, (_, i) => i);
  sa.sort((a, b) => {
    for (let k = 0; k < n - Math.max(a, b); k++) {
      if (text.charCodeAt(a + k) !== text.charCodeAt(b + k)) {
        return text.charCodeAt(a + k) - text.charCodeAt(b + k);
      }
    }
    return (n - a) - (n - b);
  });

  const lcp: number[] = [];
  if (args.lcp) {
    const rank = new Array(n);
    for (let i = 0; i < n; i++) rank[sa[i]] = i;
    let h = 0;
    for (let i = 0; i < n; i++) {
      if (rank[i] > 0) {
        const j = sa[rank[i] - 1];
        while (i + h < n && j + h < n && text[i + h] === text[j + h]) h++;
        lcp.push(h);
        if (h > 0) h--;
      } else {
        lcp.push(0);
      }
    }
  }

  const preview = sa.slice(0, 50).map((i) => ({
    index: i,
    suffix: text.slice(i, i + 40) + (text.length - i > 40 ? "..." : ""),
  }));

  const result: Record<string, unknown> = {
    length: n,
    suffix_array: sa.length <= 1000 ? sa : sa.slice(0, 1000),
    truncated: sa.length > 1000,
    preview,
  };
  if (args.lcp) {
    result.lcp_array = lcp.length <= 1000 ? lcp : lcp.slice(0, 1000);
  }

  const meta: ConnectorMeta = {
    source: "local-computation",
    fetched_at: new Date().toISOString(),
    next_steps: ["Use suffix array for substring search or string analysis"],
  };

  return stampMeta(result, meta);
}

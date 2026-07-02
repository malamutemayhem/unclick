import { stampMeta, ConnectorMeta } from "./connector-meta.js";

function damerauLevenshtein(a: string, b: string): number {
  const la = a.length;
  const lb = b.length;
  const d: number[][] = Array.from({ length: la + 1 }, () => Array(lb + 1).fill(0));

  for (let i = 0; i <= la; i++) d[i][0] = i;
  for (let j = 0; j <= lb; j++) d[0][j] = j;

  for (let i = 1; i <= la; i++) {
    for (let j = 1; j <= lb; j++) {
      const cost = a[i - 1] === b[j - 1] ? 0 : 1;
      d[i][j] = Math.min(
        d[i - 1][j] + 1,
        d[i][j - 1] + 1,
        d[i - 1][j - 1] + cost,
      );
      if (i > 1 && j > 1 && a[i - 1] === b[j - 2] && a[i - 2] === b[j - 1]) {
        d[i][j] = Math.min(d[i][j], d[i - 2][j - 2] + cost);
      }
    }
  }
  return d[la][lb];
}

export async function damerauDistance(args: Record<string, unknown>) {
  const textA = typeof args.text_a === "string" ? args.text_a : "";
  const textB = typeof args.text_b === "string" ? args.text_b : "";
  if (!textA || !textB) return { error: "Both text_a and text_b are required" };

  const dist = damerauLevenshtein(textA, textB);
  const maxLen = Math.max(textA.length, textB.length);
  const similarity = maxLen > 0 ? 1 - dist / maxLen : 1;

  const meta: ConnectorMeta = {
    source: "local-computation",
    fetched_at: new Date().toISOString(),
    next_steps: ["Like Levenshtein but also counts transpositions as single edits"],
  };
  return stampMeta({
    distance: dist,
    similarity: +similarity.toFixed(4),
    length_a: textA.length,
    length_b: textB.length,
  }, meta);
}

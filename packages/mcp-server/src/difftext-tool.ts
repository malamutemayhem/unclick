import { stampMeta } from "./connector-meta.js";

export async function diffText(args: Record<string, unknown>) {
  const a = String(args.text_a ?? "");
  const b = String(args.text_b ?? "");
  if (!a && !b) return { error: "text_a and text_b are required" };
  const linesA = a.split("\n");
  const linesB = b.split("\n");
  const added: { line: number; text: string }[] = [];
  const removed: { line: number; text: string }[] = [];
  const maxLen = Math.max(linesA.length, linesB.length);
  for (let i = 0; i < maxLen; i++) {
    if (i >= linesA.length) {
      added.push({ line: i + 1, text: linesB[i] });
    } else if (i >= linesB.length) {
      removed.push({ line: i + 1, text: linesA[i] });
    } else if (linesA[i] !== linesB[i]) {
      removed.push({ line: i + 1, text: linesA[i] });
      added.push({ line: i + 1, text: linesB[i] });
    }
  }
  return stampMeta({
    identical: added.length === 0 && removed.length === 0,
    lines_added: added.length,
    lines_removed: removed.length,
    added,
    removed,
    total_lines_a: linesA.length,
    total_lines_b: linesB.length,
  }, {
    source: "local line diff",
    fetched_at: new Date().toISOString(),
    next_steps: ["check identical for quick comparison", "review added/removed arrays for changes"],
  });
}

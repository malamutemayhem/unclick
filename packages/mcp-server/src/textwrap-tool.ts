import { stampMeta } from "./connector-meta.js";

export async function textWrap(args: Record<string, unknown>) {
  const text = String(args.text ?? "").trim();
  if (!text) return { error: "text is required" };
  const width = Math.min(Math.max(Number(args.width) || 80, 10), 200);
  const words = text.split(/\s+/);
  const lines: string[] = [];
  let currentLine = "";
  for (const word of words) {
    if (currentLine.length + word.length + (currentLine ? 1 : 0) > width) {
      if (currentLine) lines.push(currentLine);
      currentLine = word.length > width ? word.slice(0, width) : word;
    } else {
      currentLine = currentLine ? currentLine + " " + word : word;
    }
  }
  if (currentLine) lines.push(currentLine);
  return stampMeta({
    wrapped: lines.join("\n"),
    width,
    line_count: lines.length,
    original_length: text.length,
    longest_line: Math.max(...lines.map(l => l.length)),
  }, {
    source: "local text wrapper",
    fetched_at: new Date().toISOString(),
    next_steps: ["set width for column width (10-200, default 80)", "longest_line shows if any line exceeds width"],
  });
}

import { stampMeta } from "./connector-meta.js";

export async function sortLines(args: Record<string, unknown>) {
  const text = String(args.text ?? "").trim();
  if (!text) return { error: "text is required" };
  const lines = text.split("\n");
  const reverse = args.reverse === true;
  const deduplicate = args.deduplicate === true;
  const numeric = args.numeric === true;
  const caseInsensitive = args.case_insensitive === true;
  let result = [...lines];
  if (deduplicate) {
    const seen = new Set<string>();
    result = result.filter(line => {
      const key = caseInsensitive ? line.toLowerCase() : line;
      if (seen.has(key)) return false;
      seen.add(key);
      return true;
    });
  }
  result.sort((a, b) => {
    if (numeric) {
      const na = parseFloat(a) || 0;
      const nb = parseFloat(b) || 0;
      return na - nb;
    }
    const ca = caseInsensitive ? a.toLowerCase() : a;
    const cb = caseInsensitive ? b.toLowerCase() : b;
    return ca.localeCompare(cb);
  });
  if (reverse) result.reverse();
  const duplicatesRemoved = lines.length - result.length;
  return stampMeta({
    sorted: result.join("\n"),
    line_count: result.length,
    original_line_count: lines.length,
    duplicates_removed: deduplicate ? duplicatesRemoved : 0,
    options: { reverse, deduplicate, numeric, case_insensitive: caseInsensitive },
  }, {
    source: "local line sorter",
    fetched_at: new Date().toISOString(),
    next_steps: ["set reverse: true for descending", "set deduplicate: true to remove duplicate lines"],
  });
}

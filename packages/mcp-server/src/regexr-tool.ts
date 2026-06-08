import { stampMeta } from "./connector-meta.js";

export async function regexTest(args: Record<string, unknown>) {
  const pattern = String(args.pattern ?? "").trim();
  const text = String(args.text ?? "").trim();
  const flags = String(args.flags ?? "g");
  if (!pattern) return { error: "pattern (regex) is required" };
  if (!text) return { error: "text to test against is required" };
  try {
    const re = new RegExp(pattern, flags);
    const matches: { match: string; index: number; groups?: Record<string, string> }[] = [];
    let m: RegExpExecArray | null;
    const safeLimit = 1000;
    let i = 0;
    while ((m = re.exec(text)) !== null && i < safeLimit) {
      matches.push({
        match: m[0],
        index: m.index,
        ...(m.groups ? { groups: m.groups } : {}),
      });
      if (!re.global) break;
      i++;
    }
    return stampMeta({ pattern, flags, matchCount: matches.length, matches, fullMatch: matches.length > 0 }, {
      source: "local regex engine",
      fetched_at: new Date().toISOString(),
      next_steps: ["check matches array for positions", "adjust flags: g (global), i (case-insensitive), m (multiline)"],
    });
  } catch (e) {
    return { error: `Invalid regex: ${(e as Error).message}` };
  }
}

import { stampMeta } from "./connector-meta.js";

export async function jsoncrackFormat(args: Record<string, unknown>) {
  const json = String(args.json ?? "").trim();
  if (!json) return { error: "json string is required" };
  try {
    const parsed = JSON.parse(json);
    const pretty = JSON.stringify(parsed, null, 2);
    const stats = {
      keys: 0,
      arrays: 0,
      objects: 0,
      strings: 0,
      numbers: 0,
      booleans: 0,
      nulls: 0,
    };
    function walk(v: unknown) {
      if (v === null) { stats.nulls++; return; }
      if (Array.isArray(v)) { stats.arrays++; v.forEach(walk); return; }
      if (typeof v === "object") { stats.objects++; for (const k of Object.keys(v as Record<string, unknown>)) { stats.keys++; walk((v as Record<string, unknown>)[k]); } return; }
      if (typeof v === "string") stats.strings++;
      else if (typeof v === "number") stats.numbers++;
      else if (typeof v === "boolean") stats.booleans++;
    }
    walk(parsed);
    return stampMeta({ formatted: pretty, stats, valid: true }, {
      source: "local JSON parser",
      fetched_at: new Date().toISOString(),
      next_steps: ["use stats to understand JSON structure", "formatted output is pretty-printed"],
    });
  } catch (e) {
    return { error: `Invalid JSON: ${(e as Error).message}`, valid: false };
  }
}

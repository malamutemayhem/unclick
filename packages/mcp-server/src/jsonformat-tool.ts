import { stampMeta } from "./connector-meta.js";

export async function jsonFormat(args: Record<string, unknown>) {
  const input = String(args.json ?? "").trim();
  if (!input) return { error: "json is required" };
  const indent = Number(args.indent) || 2;
  const minify = args.minify === true;
  try {
    const parsed = JSON.parse(input);
    const output = minify ? JSON.stringify(parsed) : JSON.stringify(parsed, null, indent);
    const keys = typeof parsed === "object" && parsed !== null ? Object.keys(parsed).length : 0;
    const isArray = Array.isArray(parsed);
    return stampMeta({
      formatted: output,
      minified: minify,
      type: isArray ? "array" : typeof parsed,
      top_level_keys: isArray ? parsed.length : keys,
      original_length: input.length,
      formatted_length: output.length,
    }, {
      source: "local JSON formatter",
      fetched_at: new Date().toISOString(),
      next_steps: ["use minify: true for compact output", "check top_level_keys for structure overview"],
    });
  } catch (e: unknown) {
    const msg = e instanceof Error ? e.message : String(e);
    return { error: `Invalid JSON: ${msg}` };
  }
}

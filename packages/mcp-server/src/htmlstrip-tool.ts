import { stampMeta } from "./connector-meta.js";

export async function htmlStrip(args: Record<string, unknown>) {
  const html = String(args.html ?? "").trim();
  if (!html) return { error: "html is required" };
  const preserveLineBreaks = args.preserve_line_breaks !== false;
  let text = html;
  if (preserveLineBreaks) {
    text = text.replace(/<br\s*\/?>/gi, "\n");
    text = text.replace(/<\/(p|div|h[1-6]|li|tr|blockquote)>/gi, "\n");
  }
  text = text.replace(/<[^>]*>/g, "");
  text = text.replace(/&amp;/g, "&").replace(/&lt;/g, "<").replace(/&gt;/g, ">");
  text = text.replace(/&quot;/g, '"').replace(/&#39;/g, "'").replace(/&nbsp;/g, " ");
  if (preserveLineBreaks) {
    text = text.replace(/\n{3,}/g, "\n\n");
  }
  text = text.trim();
  return stampMeta({
    text,
    original_length: html.length,
    stripped_length: text.length,
    reduction_percent: html.length > 0 ? +((1 - text.length / html.length) * 100).toFixed(1) : 0,
  }, {
    source: "local HTML stripper",
    fetched_at: new Date().toISOString(),
    next_steps: ["use preserve_line_breaks: false for single-line output", "check reduction_percent for HTML density"],
  });
}

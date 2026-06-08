import { stampMeta } from "./connector-meta.js";

export async function slugify(args: Record<string, unknown>) {
  const text = String(args.text ?? "").trim();
  if (!text) return { error: "text is required" };
  const separator = String(args.separator ?? "-");
  const slug = text
    .normalize("NFD")
    .replace(/[̀-ͯ]/g, "")
    .toLowerCase()
    .replace(/[^a-z0-9\s-]/g, "")
    .replace(/[\s-]+/g, separator)
    .replace(new RegExp(`^${separator.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")}+|${separator.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")}+$`, "g"), "");
  return stampMeta({ slug, original: text, separator, length: slug.length }, {
    source: "local slugifier",
    fetched_at: new Date().toISOString(),
    next_steps: ["use as URL-safe identifier", "change separator to _ for snake_case"],
  });
}

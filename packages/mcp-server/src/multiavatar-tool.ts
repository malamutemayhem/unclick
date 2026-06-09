import { stampMeta } from "./connector-meta.js";

export async function multiavatarGenerate(args: Record<string, unknown>) {
  const name = String(args.name || "default");
  const url = `https://api.multiavatar.com/${encodeURIComponent(name)}.svg`;
  const png = `https://api.multiavatar.com/${encodeURIComponent(name)}.png`;
  return stampMeta(
    { svg_url: url, png_url: png, name },
    { source: "multiavatar.com", fetched_at: new Date().toISOString(), next_steps: ["Any string generates a unique, deterministic avatar.", "SVG and PNG formats available. Same name always produces the same avatar."] },
  );
}

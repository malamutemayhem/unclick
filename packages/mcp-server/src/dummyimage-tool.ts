import { stampMeta } from "./connector-meta.js";

export async function dummyImageUrl(args: Record<string, unknown>) {
  const width = Number(args.width) || 600;
  const height = Number(args.height) || 400;
  const bg = String(args.bg_color ?? "cccccc").replace(/^#/, "");
  const fg = String(args.fg_color ?? "000000").replace(/^#/, "");
  const text = String(args.text ?? "").trim();
  let url = `https://dummyimage.com/${width}x${height}/${bg}/${fg}`;
  if (text) url += `&text=${encodeURIComponent(text)}`;
  return stampMeta(
    { url, width, height },
    { source: "dummyimage.com", fetched_at: new Date().toISOString(), next_steps: ["Adjust width, height, colors, and text as needed."] },
  );
}

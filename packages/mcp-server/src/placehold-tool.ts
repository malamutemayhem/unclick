import { stampMeta } from "./connector-meta.js";

export async function placeholdImage(args: Record<string, unknown>) {
  const width = Math.min(Math.max(Number(args.width) || 300, 1), 4000);
  const height = Math.min(Math.max(Number(args.height) || width, 1), 4000);
  const bg = String(args.background || "CCCCCC").replace(/^#/, "");
  const fg = String(args.foreground || "333333").replace(/^#/, "");
  const text = args.text ? `?text=${encodeURIComponent(String(args.text))}` : "";
  const font = args.font ? `${text ? "&" : "?"}font=${encodeURIComponent(String(args.font))}` : "";
  const url = `https://placehold.co/${width}x${height}/${bg}/${fg}${text}${font}`;
  return stampMeta(
    { image_url: url, width, height, background: bg, foreground: fg },
    { source: "placehold.co", fetched_at: new Date().toISOString(), next_steps: ["Returns a placeholder image URL with custom size, colors, and text.", "Supports custom fonts: roboto, lato, open-sans, montserrat, playfair-display, source-sans-pro."] },
  );
}

// Placeholder Images - generates placeholder image URLs.
// No API key required, no fetch needed - just URL construction.
// Sources: placehold.co, placekitten.com

import { stampMeta } from "./connector-meta.js";

const META = { source: "placehold.co" };

export async function placeholderImage(args: Record<string, unknown>): Promise<unknown> {
  const width = Number(args.width ?? 600);
  const height = Number(args.height ?? 400);
  const text = args.text ? String(args.text) : "";
  const bg = args.bg ? String(args.bg) : "EEEEEE";
  const fg = args.fg ? String(args.fg) : "333333";
  let url = `https://placehold.co/${width}x${height}/${bg}/${fg}`;
  if (text) url += `?text=${encodeURIComponent(text)}`;
  return stampMeta({
    url,
    width,
    height,
    formats: {
      png: url.replace("placehold.co/", "placehold.co/") + (text ? "&" : "?") + "format=png",
      svg: url.replace("placehold.co/", "placehold.co/") + (text ? "&" : "?") + "format=svg",
    },
  }, { ...META, fetched_at: new Date().toISOString(), next_steps: ["Customize with text, bg (background hex), and fg (text hex) params."] });
}

export async function placekittenImage(args: Record<string, unknown>): Promise<unknown> {
  const width = Number(args.width ?? 600);
  const height = Number(args.height ?? 400);
  const grayscale = args.grayscale === true;
  const base = grayscale ? "https://placekitten.com/g" : "https://placekitten.com";
  const url = `${base}/${width}/${height}`;
  return stampMeta({ url, width, height, grayscale }, { source: "placekitten.com", fetched_at: new Date().toISOString(), next_steps: ["Use placeholder_image for text-based placeholders.", "Set grayscale=true for grayscale kitten images."] });
}

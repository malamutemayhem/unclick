import { stampMeta } from "./connector-meta.js";

function hexToRgb(hex: string): [number, number, number] | null {
  const clean = hex.replace(/^#/, "");
  const full = clean.length === 3
    ? clean.split("").map(c => c + c).join("")
    : clean;
  if (full.length !== 6) return null;
  const n = parseInt(full, 16);
  if (isNaN(n)) return null;
  return [(n >> 16) & 0xff, (n >> 8) & 0xff, n & 0xff];
}

function rgbToHex(r: number, g: number, b: number): string {
  return "#" + [r, g, b].map(c => Math.round(c).toString(16).padStart(2, "0")).join("").toUpperCase();
}

export async function colorBlend(args: Record<string, unknown>) {
  const color1 = String(args.color1 ?? "").trim();
  const color2 = String(args.color2 ?? "").trim();
  if (!color1 || !color2) return { error: "color1 and color2 are required (hex colors)" };
  const rgb1 = hexToRgb(color1);
  const rgb2 = hexToRgb(color2);
  if (!rgb1) return { error: `Invalid hex color: ${color1}` };
  if (!rgb2) return { error: `Invalid hex color: ${color2}` };
  const weight = Math.min(Math.max(Number(args.weight) || 0.5, 0), 1);
  const steps = Math.min(Math.max(Number(args.steps) || 1, 1), 20);
  const blends: string[] = [];
  for (let i = 0; i < steps; i++) {
    const t = steps === 1 ? weight : i / (steps - 1);
    const r = rgb1[0] + (rgb2[0] - rgb1[0]) * t;
    const g = rgb1[1] + (rgb2[1] - rgb1[1]) * t;
    const b = rgb1[2] + (rgb2[2] - rgb1[2]) * t;
    blends.push(rgbToHex(r, g, b));
  }
  return stampMeta({
    color1, color2, weight,
    blend: blends.length === 1 ? blends[0] : blends[Math.floor(blends.length / 2)],
    gradient: blends,
    steps,
  }, {
    source: "local color blender",
    fetched_at: new Date().toISOString(),
    next_steps: ["set weight 0-1 to bias toward color1 or color2", "set steps > 1 for a gradient palette"],
  });
}

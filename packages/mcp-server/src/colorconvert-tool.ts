import { stampMeta } from "./connector-meta.js";

function hexToRgb(hex: string): [number, number, number] | null {
  const m = hex.replace("#", "").match(/^([0-9a-f]{2})([0-9a-f]{2})([0-9a-f]{2})$/i);
  if (!m) return null;
  return [parseInt(m[1], 16), parseInt(m[2], 16), parseInt(m[3], 16)];
}

function rgbToHsl(r: number, g: number, b: number): [number, number, number] {
  r /= 255; g /= 255; b /= 255;
  const max = Math.max(r, g, b), min = Math.min(r, g, b);
  const l = (max + min) / 2;
  if (max === min) return [0, 0, Math.round(l * 100)];
  const d = max - min;
  const s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
  let h = 0;
  if (max === r) h = ((g - b) / d + (g < b ? 6 : 0)) / 6;
  else if (max === g) h = ((b - r) / d + 2) / 6;
  else h = ((r - g) / d + 4) / 6;
  return [Math.round(h * 360), Math.round(s * 100), Math.round(l * 100)];
}

export async function colorHexConvert(args: Record<string, unknown>) {
  const hex = String(args.hex ?? "").trim();
  if (!hex) return { error: "hex color code is required" };
  const rgb = hexToRgb(hex);
  if (!rgb) return { error: "Invalid hex color. Use format: #RRGGBB or RRGGBB" };
  const [h, s, l] = rgbToHsl(rgb[0], rgb[1], rgb[2]);
  return stampMeta({
    hex: `#${hex.replace("#", "").toUpperCase()}`,
    rgb: { r: rgb[0], g: rgb[1], b: rgb[2] },
    rgb_string: `rgb(${rgb[0]}, ${rgb[1]}, ${rgb[2]})`,
    hsl: { h, s, l },
    hsl_string: `hsl(${h}, ${s}%, ${l}%)`,
  }, {
    source: "local color converter",
    fetched_at: new Date().toISOString(),
    next_steps: ["use rgb or hsl values in CSS", "try color_info for more details"],
  });
}

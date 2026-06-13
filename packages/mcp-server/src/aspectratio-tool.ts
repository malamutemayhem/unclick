import { stampMeta } from "./connector-meta.js";

function gcd(a: number, b: number): number {
  a = Math.abs(a);
  b = Math.abs(b);
  while (b) { [a, b] = [b, a % b]; }
  return a;
}

export async function aspectRatio(args: Record<string, unknown>) {
  const width = Number(args.width);
  const height = Number(args.height);
  if (!width || !height || width <= 0 || height <= 0) {
    return { error: "width and height are required (positive numbers)" };
  }
  const d = gcd(width, height);
  const ratioW = width / d;
  const ratioH = height / d;
  const decimal = +(width / height).toFixed(4);
  const common: Record<string, string> = {
    "16:9": "Widescreen (HD, 4K)", "4:3": "Standard TV", "21:9": "Ultra-wide",
    "1:1": "Square", "3:2": "35mm film / DSLR", "9:16": "Vertical video",
    "16:10": "MacBook / WUXGA",
  };
  const ratioStr = `${ratioW}:${ratioH}`;
  const name = common[ratioStr] || null;
  return stampMeta({
    width, height,
    ratio: ratioStr,
    decimal,
    name,
    is_landscape: width > height,
    is_portrait: height > width,
    is_square: width === height,
  }, {
    source: "local aspect ratio calculator",
    fetched_at: new Date().toISOString(),
    next_steps: ["ratio gives simplified form", "decimal is width/height as a number"],
  });
}

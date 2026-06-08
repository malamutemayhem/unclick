interface RGB { r: number; g: number; b: number; }
interface HSL { h: number; s: number; l: number; }

function hslToRgb(h: number, s: number, l: number): RGB {
  s /= 100;
  l /= 100;
  const c = (1 - Math.abs(2 * l - 1)) * s;
  const x = c * (1 - Math.abs(((h / 60) % 2) - 1));
  const m = l - c / 2;
  let r = 0, g = 0, b = 0;
  if (h < 60) { r = c; g = x; }
  else if (h < 120) { r = x; g = c; }
  else if (h < 180) { g = c; b = x; }
  else if (h < 240) { g = x; b = c; }
  else if (h < 300) { r = x; b = c; }
  else { r = c; b = x; }
  return {
    r: Math.round((r + m) * 255),
    g: Math.round((g + m) * 255),
    b: Math.round((b + m) * 255),
  };
}

function rgbToHex(r: number, g: number, b: number): string {
  return "#" + [r, g, b].map((v) => v.toString(16).padStart(2, "0")).join("");
}

export function analogous(hex: string, count = 5): string[] {
  const { h, s, l } = hexToHsl(hex);
  const step = 30;
  const result: string[] = [];
  const startH = h - step * Math.floor(count / 2);
  for (let i = 0; i < count; i++) {
    const nh = ((startH + step * i) % 360 + 360) % 360;
    const { r, g, b } = hslToRgb(nh, s, l);
    result.push(rgbToHex(r, g, b));
  }
  return result;
}

export function complementary(hex: string): string {
  const { h, s, l } = hexToHsl(hex);
  const { r, g, b } = hslToRgb((h + 180) % 360, s, l);
  return rgbToHex(r, g, b);
}

export function triadic(hex: string): [string, string, string] {
  const { h, s, l } = hexToHsl(hex);
  return [hex, toHex(h + 120, s, l), toHex(h + 240, s, l)];
}

export function shades(hex: string, count = 5): string[] {
  const { h, s, l } = hexToHsl(hex);
  const result: string[] = [];
  for (let i = 0; i < count; i++) {
    const nl = l * (1 - i / count);
    const { r, g, b } = hslToRgb(h, s, nl);
    result.push(rgbToHex(r, g, b));
  }
  return result;
}

export function tints(hex: string, count = 5): string[] {
  const { h, s, l } = hexToHsl(hex);
  const result: string[] = [];
  for (let i = 0; i < count; i++) {
    const nl = l + (100 - l) * (i / (count - 1 || 1));
    const { r, g, b } = hslToRgb(h, s, nl);
    result.push(rgbToHex(r, g, b));
  }
  return result;
}

function toHex(h: number, s: number, l: number): string {
  const nh = ((h % 360) + 360) % 360;
  const { r, g, b } = hslToRgb(nh, s, l);
  return rgbToHex(r, g, b);
}

function hexToHsl(hex: string): HSL {
  hex = hex.replace("#", "");
  const r = parseInt(hex.slice(0, 2), 16) / 255;
  const g = parseInt(hex.slice(2, 4), 16) / 255;
  const b = parseInt(hex.slice(4, 6), 16) / 255;
  const max = Math.max(r, g, b), min = Math.min(r, g, b);
  let h = 0;
  const l = ((max + min) / 2) * 100;
  const d = max - min;
  const s = d === 0 ? 0 : (d / (1 - Math.abs(2 * (l / 100) - 1))) * 100;
  if (d !== 0) {
    if (max === r) h = ((g - b) / d) % 6;
    else if (max === g) h = (b - r) / d + 2;
    else h = (r - g) / d + 4;
    h = ((h * 60) + 360) % 360;
  }
  return { h, s, l };
}

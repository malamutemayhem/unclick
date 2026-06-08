export interface HSL { h: number; s: number; l: number; }

function hslToHex(hsl: HSL): string {
  const s = hsl.s / 100;
  const l = hsl.l / 100;
  if (s === 0) {
    const v = Math.round(l * 255);
    return toHex(v, v, v);
  }
  const hue2rgb = (p: number, q: number, t: number): number => {
    if (t < 0) t += 1;
    if (t > 1) t -= 1;
    if (t < 1 / 6) return p + (q - p) * 6 * t;
    if (t < 1 / 2) return q;
    if (t < 2 / 3) return p + (q - p) * (2 / 3 - t) * 6;
    return p;
  };
  const q = l < 0.5 ? l * (1 + s) : l + s - l * s;
  const p = 2 * l - q;
  const h = hsl.h / 360;
  return toHex(
    Math.round(hue2rgb(p, q, h + 1 / 3) * 255),
    Math.round(hue2rgb(p, q, h) * 255),
    Math.round(hue2rgb(p, q, h - 1 / 3) * 255),
  );
}

function toHex(r: number, g: number, b: number): string {
  const hex = (n: number): string => Math.max(0, Math.min(255, n)).toString(16).padStart(2, "0");
  return `#${hex(r)}${hex(g)}${hex(b)}`;
}

function hexToHsl(hex: string): HSL {
  const clean = hex.replace(/^#/, "");
  const full = clean.length === 3 ? clean.split("").map((c: string) => c + c).join("") : clean;
  const num = parseInt(full, 16);
  const r = ((num >> 16) & 255) / 255;
  const g = ((num >> 8) & 255) / 255;
  const b = (num & 255) / 255;
  const max = Math.max(r, g, b);
  const min = Math.min(r, g, b);
  const l = (max + min) / 2;
  if (max === min) return { h: 0, s: 0, l: Math.round(l * 100) };
  const d = max - min;
  const s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
  let h = 0;
  if (max === r) h = ((g - b) / d + (g < b ? 6 : 0)) / 6;
  else if (max === g) h = ((b - r) / d + 2) / 6;
  else h = ((r - g) / d + 4) / 6;
  return { h: Math.round(h * 360), s: Math.round(s * 100), l: Math.round(l * 100) };
}

function wrapHue(h: number): number {
  return ((h % 360) + 360) % 360;
}

export function complementary(hex: string): string[] {
  const hsl = hexToHsl(hex);
  return [hex, hslToHex({ ...hsl, h: wrapHue(hsl.h + 180) })];
}

export function analogous(hex: string, angle: number = 30): string[] {
  const hsl = hexToHsl(hex);
  return [
    hslToHex({ ...hsl, h: wrapHue(hsl.h - angle) }),
    hex,
    hslToHex({ ...hsl, h: wrapHue(hsl.h + angle) }),
  ];
}

export function triadic(hex: string): string[] {
  const hsl = hexToHsl(hex);
  return [
    hex,
    hslToHex({ ...hsl, h: wrapHue(hsl.h + 120) }),
    hslToHex({ ...hsl, h: wrapHue(hsl.h + 240) }),
  ];
}

export function tetradic(hex: string): string[] {
  const hsl = hexToHsl(hex);
  return [
    hex,
    hslToHex({ ...hsl, h: wrapHue(hsl.h + 90) }),
    hslToHex({ ...hsl, h: wrapHue(hsl.h + 180) }),
    hslToHex({ ...hsl, h: wrapHue(hsl.h + 270) }),
  ];
}

export function monochromatic(hex: string, count: number = 5): string[] {
  const hsl = hexToHsl(hex);
  const step = 100 / (count + 1);
  const result: string[] = [];
  for (let i = 1; i <= count; i++) {
    result.push(hslToHex({ ...hsl, l: Math.round(step * i) }));
  }
  return result;
}

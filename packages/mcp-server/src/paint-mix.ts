export interface PaintColor {
  cyan: number;
  magenta: number;
  yellow: number;
  key: number;
}

export interface RGBColor {
  r: number;
  g: number;
  b: number;
}

export interface MixResult {
  color: PaintColor;
  parts: { color: PaintColor; ratio: number }[];
}

export function createCMYK(c: number, m: number, y: number, k: number): PaintColor {
  return { cyan: c, magenta: m, yellow: y, key: k };
}

export function cmykToRgb(cmyk: PaintColor): RGBColor {
  const { cyan, magenta, yellow, key } = cmyk;
  const r = Math.round(255 * (1 - cyan / 100) * (1 - key / 100));
  const g = Math.round(255 * (1 - magenta / 100) * (1 - key / 100));
  const b = Math.round(255 * (1 - yellow / 100) * (1 - key / 100));
  return { r, g, b };
}

export function rgbToCmyk(rgb: RGBColor): PaintColor {
  const r = rgb.r / 255;
  const g = rgb.g / 255;
  const b = rgb.b / 255;
  const k = 1 - Math.max(r, g, b);
  if (k >= 1) return { cyan: 0, magenta: 0, yellow: 0, key: 100 };
  const c = (1 - r - k) / (1 - k);
  const m = (1 - g - k) / (1 - k);
  const y = (1 - b - k) / (1 - k);
  return {
    cyan: Math.round(c * 100),
    magenta: Math.round(m * 100),
    yellow: Math.round(y * 100),
    key: Math.round(k * 100),
  };
}

export function mixSubtractive(colors: PaintColor[], ratios?: number[]): PaintColor {
  const n = colors.length;
  if (n === 0) return createCMYK(0, 0, 0, 0);
  const weights = ratios ?? Array(n).fill(1);
  const totalWeight = weights.reduce((a, b) => a + b, 0);

  let c = 0, m = 0, y = 0, k = 0;
  for (let i = 0; i < n; i++) {
    const w = weights[i] / totalWeight;
    c += colors[i].cyan * w;
    m += colors[i].magenta * w;
    y += colors[i].yellow * w;
    k += colors[i].key * w;
  }
  return {
    cyan: Math.round(c),
    magenta: Math.round(m),
    yellow: Math.round(y),
    key: Math.round(k),
  };
}

export function tint(color: PaintColor, amount: number): PaintColor {
  const factor = 1 - amount;
  return {
    cyan: Math.round(color.cyan * factor),
    magenta: Math.round(color.magenta * factor),
    yellow: Math.round(color.yellow * factor),
    key: Math.round(color.key * factor),
  };
}

export function shade(color: PaintColor, amount: number): PaintColor {
  const addedKey = (100 - color.key) * amount;
  return {
    cyan: color.cyan,
    magenta: color.magenta,
    yellow: color.yellow,
    key: Math.min(100, Math.round(color.key + addedKey)),
  };
}

export function tone(color: PaintColor, amount: number): PaintColor {
  const tinted = tint(color, amount / 2);
  return shade(tinted, amount / 2);
}

export function complementary(color: PaintColor): PaintColor {
  const rgb = cmykToRgb(color);
  const compRgb = { r: 255 - rgb.r, g: 255 - rgb.g, b: 255 - rgb.b };
  return rgbToCmyk(compRgb);
}

export function colorDistance(a: PaintColor, b: PaintColor): number {
  const rgbA = cmykToRgb(a);
  const rgbB = cmykToRgb(b);
  const dr = rgbA.r - rgbB.r;
  const dg = rgbA.g - rgbB.g;
  const db = rgbA.b - rgbB.b;
  return Math.sqrt(dr * dr + dg * dg + db * db);
}

export function coverage(liters: number, coats: number, spreadRate = 10): number {
  return (liters * spreadRate) / coats;
}

export function paintsNeeded(areaSqm: number, coats: number, spreadRate = 10): number {
  return Math.ceil((areaSqm * coats) / spreadRate * 10) / 10;
}

export function dryingTime(tempC: number, humidity: number, baseHours = 4): number {
  let factor = 1;
  if (tempC < 10) factor *= 2;
  else if (tempC < 20) factor *= 1.3;
  else if (tempC > 35) factor *= 1.2;
  if (humidity > 70) factor *= 1.5;
  else if (humidity > 50) factor *= 1.2;
  return Math.round(baseHours * factor * 10) / 10;
}

export const PRESET_COLORS: Record<string, PaintColor> = {
  white: createCMYK(0, 0, 0, 0),
  black: createCMYK(0, 0, 0, 100),
  red: createCMYK(0, 100, 100, 0),
  blue: createCMYK(100, 100, 0, 0),
  yellow: createCMYK(0, 0, 100, 0),
  green: createCMYK(100, 0, 100, 0),
  orange: createCMYK(0, 50, 100, 0),
  purple: createCMYK(50, 100, 0, 0),
  brown: createCMYK(0, 50, 80, 40),
  pink: createCMYK(0, 40, 20, 0),
};

export function getPreset(name: string): PaintColor | null {
  return PRESET_COLORS[name.toLowerCase()] ?? null;
}

export function formatCMYK(color: PaintColor): string {
  return `C:${color.cyan} M:${color.magenta} Y:${color.yellow} K:${color.key}`;
}

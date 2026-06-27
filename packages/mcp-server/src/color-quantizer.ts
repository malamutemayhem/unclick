export interface RGB {
  r: number;
  g: number;
  b: number;
}

interface ColorBox {
  colors: RGB[];
  rMin: number; rMax: number;
  gMin: number; gMax: number;
  bMin: number; bMax: number;
}

function computeBox(colors: RGB[]): ColorBox {
  let rMin = 255, rMax = 0, gMin = 255, gMax = 0, bMin = 255, bMax = 0;
  for (const c of colors) {
    if (c.r < rMin) rMin = c.r;
    if (c.r > rMax) rMax = c.r;
    if (c.g < gMin) gMin = c.g;
    if (c.g > gMax) gMax = c.g;
    if (c.b < bMin) bMin = c.b;
    if (c.b > bMax) bMax = c.b;
  }
  return { colors, rMin, rMax, gMin, gMax, bMin, bMax };
}

function splitBox(box: ColorBox): [ColorBox, ColorBox] {
  const rRange = box.rMax - box.rMin;
  const gRange = box.gMax - box.gMin;
  const bRange = box.bMax - box.bMin;

  let channel: "r" | "g" | "b";
  if (rRange >= gRange && rRange >= bRange) channel = "r";
  else if (gRange >= bRange) channel = "g";
  else channel = "b";

  const sorted = [...box.colors].sort((a, b) => a[channel] - b[channel]);
  const mid = Math.floor(sorted.length / 2);
  return [
    computeBox(sorted.slice(0, mid)),
    computeBox(sorted.slice(mid)),
  ];
}

function averageColor(box: ColorBox): RGB {
  let r = 0, g = 0, b = 0;
  for (const c of box.colors) {
    r += c.r;
    g += c.g;
    b += c.b;
  }
  const n = box.colors.length;
  return {
    r: Math.round(r / n),
    g: Math.round(g / n),
    b: Math.round(b / n),
  };
}

export function medianCut(colors: RGB[], numColors: number): RGB[] {
  if (colors.length === 0) return [];
  if (numColors <= 1) return [averageColor(computeBox(colors))];

  let boxes: ColorBox[] = [computeBox(colors)];

  while (boxes.length < numColors) {
    let maxRange = -1;
    let maxIdx = 0;
    for (let i = 0; i < boxes.length; i++) {
      const b = boxes[i];
      if (b.colors.length < 2) continue;
      const range = Math.max(b.rMax - b.rMin, b.gMax - b.gMin, b.bMax - b.bMin);
      if (range > maxRange) {
        maxRange = range;
        maxIdx = i;
      }
    }
    if (maxRange <= 0) break;
    const [a, b] = splitBox(boxes[maxIdx]);
    boxes.splice(maxIdx, 1, a, b);
  }

  return boxes.map(averageColor);
}

export function colorDistance(a: RGB, b: RGB): number {
  const dr = a.r - b.r;
  const dg = a.g - b.g;
  const db = a.b - b.b;
  return Math.sqrt(dr * dr + dg * dg + db * db);
}

export function nearestColor(color: RGB, palette: RGB[]): RGB {
  let best = palette[0];
  let bestDist = colorDistance(color, best);
  for (let i = 1; i < palette.length; i++) {
    const d = colorDistance(color, palette[i]);
    if (d < bestDist) {
      bestDist = d;
      best = palette[i];
    }
  }
  return best;
}

export function quantize(colors: RGB[], numColors: number): RGB[] {
  const palette = medianCut(colors, numColors);
  return colors.map((c) => nearestColor(c, palette));
}

export function rgbToHex(color: RGB): string {
  const r = color.r.toString(16).padStart(2, "0");
  const g = color.g.toString(16).padStart(2, "0");
  const b = color.b.toString(16).padStart(2, "0");
  return `#${r}${g}${b}`;
}

export function hexToRgb(hex: string): RGB {
  const h = hex.startsWith("#") ? hex.slice(1) : hex;
  return {
    r: parseInt(h.slice(0, 2), 16),
    g: parseInt(h.slice(2, 4), 16),
    b: parseInt(h.slice(4, 6), 16),
  };
}

export interface RGB {
  r: number;
  g: number;
  b: number;
}

export type CVDType = "protanopia" | "deuteranopia" | "tritanopia" | "protanomaly" | "deuteranomaly" | "tritanomaly" | "achromatopsia";

function clamp(v: number): number {
  return Math.max(0, Math.min(255, Math.round(v)));
}

function linearize(srgb: number): number {
  const c = srgb / 255;
  return c <= 0.04045 ? c / 12.92 : Math.pow((c + 0.055) / 1.055, 2.4);
}

function delinearize(linear: number): number {
  const c = linear <= 0.0031308 ? 12.92 * linear : 1.055 * Math.pow(linear, 1 / 2.4) - 0.055;
  return clamp(c * 255);
}

function toLinear(rgb: RGB): [number, number, number] {
  return [linearize(rgb.r), linearize(rgb.g), linearize(rgb.b)];
}

function fromLinear(r: number, g: number, b: number): RGB {
  return { r: delinearize(r), g: delinearize(g), b: delinearize(b) };
}

const MATRICES: Record<string, number[][]> = {
  protanopia: [
    [0.567, 0.433, 0],
    [0.558, 0.442, 0],
    [0, 0.242, 0.758],
  ],
  deuteranopia: [
    [0.625, 0.375, 0],
    [0.7, 0.3, 0],
    [0, 0.3, 0.7],
  ],
  tritanopia: [
    [0.95, 0.05, 0],
    [0, 0.433, 0.567],
    [0, 0.475, 0.525],
  ],
  achromatopsia: [
    [0.299, 0.587, 0.114],
    [0.299, 0.587, 0.114],
    [0.299, 0.587, 0.114],
  ],
};

function interpolateMatrix(full: number[][], severity: number): number[][] {
  const identity = [[1, 0, 0], [0, 1, 0], [0, 0, 1]];
  return full.map((row, i) =>
    row.map((val, j) => identity[i][j] + (val - identity[i][j]) * severity)
  );
}

export function simulate(rgb: RGB, type: CVDType, severity = 1): RGB {
  const [r, g, b] = toLinear(rgb);

  let baseType: string;
  let sev = severity;

  switch (type) {
    case "protanomaly": baseType = "protanopia"; sev *= 0.6; break;
    case "deuteranomaly": baseType = "deuteranopia"; sev *= 0.6; break;
    case "tritanomaly": baseType = "tritanopia"; sev *= 0.6; break;
    default: baseType = type;
  }

  const matrix = interpolateMatrix(MATRICES[baseType], sev);

  const nr = matrix[0][0] * r + matrix[0][1] * g + matrix[0][2] * b;
  const ng = matrix[1][0] * r + matrix[1][1] * g + matrix[1][2] * b;
  const nb = matrix[2][0] * r + matrix[2][1] * g + matrix[2][2] * b;

  return fromLinear(nr, ng, nb);
}

export function simulateAll(rgb: RGB): Record<CVDType, RGB> {
  const types: CVDType[] = ["protanopia", "deuteranopia", "tritanopia", "protanomaly", "deuteranomaly", "tritanomaly", "achromatopsia"];
  const result = {} as Record<CVDType, RGB>;
  for (const type of types) {
    result[type] = simulate(rgb, type);
  }
  return result;
}

export function colorDifference(a: RGB, b: RGB): number {
  const dr = a.r - b.r;
  const dg = a.g - b.g;
  const db = a.b - b.b;
  return Math.sqrt(dr * dr + dg * dg + db * db);
}

export function isDistinguishable(color1: RGB, color2: RGB, type: CVDType, threshold = 30): boolean {
  const sim1 = simulate(color1, type);
  const sim2 = simulate(color2, type);
  return colorDifference(sim1, sim2) >= threshold;
}

export function safeColorPalette(): RGB[] {
  return [
    { r: 0, g: 0, b: 0 },
    { r: 230, g: 159, b: 0 },
    { r: 86, g: 180, b: 233 },
    { r: 0, g: 158, b: 115 },
    { r: 240, g: 228, b: 66 },
    { r: 0, g: 114, b: 178 },
    { r: 213, g: 94, b: 0 },
    { r: 204, g: 121, b: 167 },
  ];
}

export function checkPaletteAccessibility(colors: RGB[], type: CVDType, threshold = 30): { accessible: boolean; conflicts: [number, number][] } {
  const conflicts: [number, number][] = [];
  for (let i = 0; i < colors.length; i++) {
    for (let j = i + 1; j < colors.length; j++) {
      if (!isDistinguishable(colors[i], colors[j], type, threshold)) {
        conflicts.push([i, j]);
      }
    }
  }
  return { accessible: conflicts.length === 0, conflicts };
}

export function luminance(rgb: RGB): number {
  const [r, g, b] = toLinear(rgb);
  return 0.2126 * r + 0.7152 * g + 0.0722 * b;
}

export function contrastRatio(color1: RGB, color2: RGB): number {
  const l1 = luminance(color1);
  const l2 = luminance(color2);
  const lighter = Math.max(l1, l2);
  const darker = Math.min(l1, l2);
  return (lighter + 0.05) / (darker + 0.05);
}

export function rgbToHex(rgb: RGB): string {
  return `#${rgb.r.toString(16).padStart(2, "0")}${rgb.g.toString(16).padStart(2, "0")}${rgb.b.toString(16).padStart(2, "0")}`;
}

export function hexToRgb(hex: string): RGB {
  const h = hex.replace("#", "");
  return {
    r: parseInt(h.substring(0, 2), 16),
    g: parseInt(h.substring(2, 4), 16),
    b: parseInt(h.substring(4, 6), 16),
  };
}

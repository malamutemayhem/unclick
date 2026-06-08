export interface RGB { r: number; g: number; b: number }

export function hexToRgb(hex: string): RGB {
  const h = hex.replace(/^#/, "");
  return {
    r: parseInt(h.slice(0, 2), 16),
    g: parseInt(h.slice(2, 4), 16),
    b: parseInt(h.slice(4, 6), 16),
  };
}

export function rgbToHex(rgb: RGB): string {
  return "#" + [rgb.r, rgb.g, rgb.b].map((c) => Math.round(c).toString(16).padStart(2, "0")).join("");
}

export function interpolateColor(c1: RGB, c2: RGB, t: number): RGB {
  return {
    r: c1.r + (c2.r - c1.r) * t,
    g: c1.g + (c2.g - c1.g) * t,
    b: c1.b + (c2.b - c1.b) * t,
  };
}

export function createScale(colors: string[], steps: number): string[] {
  if (colors.length < 2) throw new Error("Need at least 2 colors");
  const rgbColors = colors.map(hexToRgb);
  const result: string[] = [];
  const segments = rgbColors.length - 1;
  const stepsPerSegment = Math.max(1, Math.floor((steps - 1) / segments));

  for (let seg = 0; seg < segments; seg++) {
    const segSteps = seg === segments - 1 ? steps - result.length : stepsPerSegment;
    for (let i = 0; i < segSteps; i++) {
      const t = segSteps === 1 ? 0 : i / (segSteps - 1);
      result.push(rgbToHex(interpolateColor(rgbColors[seg], rgbColors[seg + 1], t)));
    }
  }

  while (result.length < steps) {
    result.push(colors[colors.length - 1]);
  }
  return result.slice(0, steps);
}

export function heatmapColor(value: number, min = 0, max = 1): string {
  const t = Math.max(0, Math.min(1, (value - min) / (max - min)));
  const colors = [hexToRgb("#0000ff"), hexToRgb("#00ff00"), hexToRgb("#ffff00"), hexToRgb("#ff0000")];
  const segment = Math.min(Math.floor(t * (colors.length - 1)), colors.length - 2);
  const segT = t * (colors.length - 1) - segment;
  return rgbToHex(interpolateColor(colors[segment], colors[segment + 1], segT));
}

export function adjustBrightness(hex: string, factor: number): string {
  const rgb = hexToRgb(hex);
  return rgbToHex({
    r: Math.min(255, Math.max(0, rgb.r * factor)),
    g: Math.min(255, Math.max(0, rgb.g * factor)),
    b: Math.min(255, Math.max(0, rgb.b * factor)),
  });
}

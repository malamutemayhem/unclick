export type GnomonStyle = "vertical" | "polar" | "horizontal" | "analemmatic" | "equatorial";

export function shadowLengthRatio(altitudeDeg: number): number {
  if (altitudeDeg <= 0) return Infinity;
  return Math.round(1 / Math.tan(altitudeDeg * Math.PI / 180) * 100) / 100;
}

export function gnomonHeightCm(style: GnomonStyle): number {
  const heights: Record<GnomonStyle, number> = {
    vertical: 30, polar: 25, horizontal: 20, analemmatic: 0, equatorial: 15,
  };
  return heights[style];
}

export function hourLineAngle(hourFromNoon: number, latitudeDeg: number): number {
  return Math.round(Math.atan(Math.tan(hourFromNoon * 15 * Math.PI / 180) * Math.sin(latitudeDeg * Math.PI / 180)) * 180 / Math.PI * 100) / 100;
}

export function accuracyMinutes(style: GnomonStyle): number {
  const acc: Record<GnomonStyle, number> = {
    vertical: 5, polar: 2, horizontal: 5, analemmatic: 10, equatorial: 3,
  };
  return acc[style];
}

export function seasonalCorrection(): boolean {
  return true;
}

export function equationOfTimeMinutes(dayOfYear: number): number {
  const b = (360 / 365) * (dayOfYear - 81) * Math.PI / 180;
  return Math.round((9.87 * Math.sin(2 * b) - 7.53 * Math.cos(b) - 1.5 * Math.sin(b)) * 10) / 10;
}

export function materialRecommendation(style: GnomonStyle): string {
  const materials: Record<GnomonStyle, string> = {
    vertical: "stone", polar: "brass", horizontal: "slate", analemmatic: "paving_stones", equatorial: "bronze",
  };
  return materials[style];
}

export function portability(style: GnomonStyle): boolean {
  return style === "equatorial" || style === "polar";
}

export function costEstimate(style: GnomonStyle): number {
  const costs: Record<GnomonStyle, number> = {
    vertical: 50, polar: 80, horizontal: 40, analemmatic: 200, equatorial: 100,
  };
  return costs[style];
}

export function gnomonStyles(): GnomonStyle[] {
  return ["vertical", "polar", "horizontal", "analemmatic", "equatorial"];
}

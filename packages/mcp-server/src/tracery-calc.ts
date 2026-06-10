export type TraceryStyle = "plate" | "bar" | "flowing" | "flamboyant" | "perpendicular";

export function mullionCount(windowWidthCm: number, panelWidthCm: number): number {
  if (panelWidthCm <= 0) return 0;
  return Math.max(0, Math.ceil(windowWidthCm / panelWidthCm) - 1);
}

export function archCount(mullionCount: number): number {
  return mullionCount + 1;
}

export function stoneBarWidthCm(style: TraceryStyle): number {
  const widths: Record<TraceryStyle, number> = {
    plate: 15, bar: 8, flowing: 6, flamboyant: 5, perpendicular: 7,
  };
  return widths[style];
}

export function curvatureRadius(archWidthCm: number, style: TraceryStyle): number {
  const factors: Record<TraceryStyle, number> = {
    plate: 0.5, bar: 0.5, flowing: 0.7, flamboyant: 0.9, perpendicular: 0.5,
  };
  return parseFloat((archWidthCm * factors[style]).toFixed(1));
}

export function glassPanelCount(archCount: number, subdivisions: number): number {
  return archCount * (subdivisions + 1);
}

export function leadCameWeightKg(totalBarLengthCm: number): number {
  return parseFloat((totalBarLengthCm / 100 * 0.4).toFixed(1));
}

export function windLoadCapacity(barWidthCm: number, barDepthCm: number): number {
  return parseFloat((barWidthCm * barDepthCm * 0.05).toFixed(2));
}

export function carvingComplexity(style: TraceryStyle): number {
  const scores: Record<TraceryStyle, number> = {
    plate: 2, bar: 4, flowing: 7, flamboyant: 9, perpendicular: 5,
  };
  return scores[style];
}

export function carvingHoursPerM(style: TraceryStyle): number {
  const hours: Record<TraceryStyle, number> = {
    plate: 3, bar: 8, flowing: 15, flamboyant: 25, perpendicular: 10,
  };
  return hours[style];
}

export function restorationDifficulty(style: TraceryStyle, ageYears: number): number {
  const base = carvingComplexity(style);
  return parseFloat((base + Math.log10(ageYears + 1) * 2).toFixed(1));
}

export function traceryStyles(): TraceryStyle[] {
  return ["plate", "bar", "flowing", "flamboyant", "perpendicular"];
}

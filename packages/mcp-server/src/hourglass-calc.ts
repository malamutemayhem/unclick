export type HourglassDuration = "1min" | "5min" | "15min" | "30min" | "60min";

export function sandWeightG(durationMinutes: number): number {
  return parseFloat((durationMinutes * 8.5).toFixed(1));
}

export function neckDiameterMm(durationMinutes: number): number {
  return parseFloat((3 + durationMinutes * 0.05).toFixed(1));
}

export function bulbDiameterCm(sandWeightG: number): number {
  return parseFloat((Math.cbrt(sandWeightG / 1.5) * 2).toFixed(1));
}

export function bulbHeightCm(bulbDiameterCm: number): number {
  return parseFloat((bulbDiameterCm * 1.4).toFixed(1));
}

export function totalHeightCm(bulbHeightCm: number): number {
  return parseFloat((bulbHeightCm * 2 + 2).toFixed(1));
}

export function frameWidthCm(bulbDiameterCm: number): number {
  return parseFloat((bulbDiameterCm + 2).toFixed(1));
}

export function glassThicknessMm(bulbDiameterCm: number): number {
  return parseFloat((bulbDiameterCm * 0.15 + 1).toFixed(1));
}

export function accuracyVariancePercent(sandGrain: "fine" | "medium" | "coarse"): number {
  const variance: Record<string, number> = { fine: 1, medium: 3, coarse: 7 };
  return variance[sandGrain];
}

export function sandGrainSizeMm(grain: "fine" | "medium" | "coarse"): number {
  const sizes: Record<string, number> = { fine: 0.1, medium: 0.3, coarse: 0.8 };
  return sizes[grain];
}

export function costEstimate(material: "glass" | "crystal" | "brass_frame", baseCost: number): number {
  const mult: Record<string, number> = { glass: 1.0, crystal: 3.0, brass_frame: 2.0 };
  return parseFloat((baseCost * mult[material]).toFixed(2));
}

export function hourglassDurations(): HourglassDuration[] {
  return ["1min", "5min", "15min", "30min", "60min"];
}

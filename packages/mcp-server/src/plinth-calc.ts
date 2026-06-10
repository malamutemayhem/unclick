export type PlinthStyle = "attic" | "tuscan" | "corinthian" | "composite" | "modern";

export function heightCm(columnHeightCm: number): number {
  return parseFloat((columnHeightCm * 0.1).toFixed(1));
}

export function widthCm(columnDiameterCm: number): number {
  return parseFloat((columnDiameterCm * 1.5).toFixed(1));
}

export function volumeCm3(widthCm: number, depthCm: number, heightCm: number): number {
  return parseFloat((widthCm * depthCm * heightCm).toFixed(0));
}

export function weightKg(volumeCm3: number, densityGPerCm3: number): number {
  return parseFloat((volumeCm3 * densityGPerCm3 / 1000).toFixed(1));
}

export function bearingPressureKpa(loadKg: number, areaM2: number): number {
  if (areaM2 <= 0) return 0;
  return parseFloat((loadKg * 9.81 / 1000 / areaM2).toFixed(2));
}

export function moldingSteps(style: PlinthStyle): number {
  const steps: Record<PlinthStyle, number> = {
    attic: 3, tuscan: 2, corinthian: 5, composite: 6, modern: 1,
  };
  return steps[style];
}

export function carvingHours(surfaceAreaCm2: number, detailLevel: number): number {
  return parseFloat((surfaceAreaCm2 / 1000 * detailLevel).toFixed(1));
}

export function shimThicknessMm(unevennessMm: number, safetyMargin: number): number {
  return parseFloat((unevennessMm * safetyMargin).toFixed(1));
}

export function moistureBarrierLayers(groundContact: boolean, humidity: number): number {
  if (!groundContact) return 0;
  if (humidity > 70) return 3;
  if (humidity > 40) return 2;
  return 1;
}

export function repairCost(damagedPercent: number, replacementCostPerUnit: number): number {
  return parseFloat((damagedPercent / 100 * replacementCostPerUnit * 1.3).toFixed(2));
}

export function plinthStyles(): PlinthStyle[] {
  return ["attic", "tuscan", "corinthian", "composite", "modern"];
}

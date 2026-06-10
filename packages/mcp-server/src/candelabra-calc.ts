export type CandleMetal = "brass" | "silver" | "pewter" | "iron" | "bronze";

export function armCount(branches: number): number {
  return branches * 2 + 1;
}

export function totalHeight(baseHeight: number, stemHeight: number, cupHeight: number): number {
  return parseFloat((baseHeight + stemHeight + cupHeight).toFixed(0));
}

export function baseWeight(baseDiameterCm: number, metal: CandleMetal): number {
  const density: Record<CandleMetal, number> = { brass: 8.5, silver: 10.5, pewter: 7.3, iron: 7.9, bronze: 8.8 };
  return parseFloat((Math.PI * Math.pow(baseDiameterCm / 2, 2) * 0.5 * density[metal] / 1000).toFixed(2));
}

export function candleCapacity(armCount: number, cupDiameterCm: number): number {
  return parseFloat((armCount * Math.PI * Math.pow(cupDiameterCm / 2, 2)).toFixed(1));
}

export function lightOutput(candleCount: number, candleLumens: number): number {
  return candleCount * candleLumens;
}

export function burnDuration(candleHeightCm: number, burnRateCmPerHour: number): number {
  if (burnRateCmPerHour <= 0) return 0;
  return parseFloat((candleHeightCm / burnRateCmPerHour).toFixed(1));
}

export function dripCatcherArea(cupDiameterCm: number): number {
  return parseFloat((Math.PI * Math.pow(cupDiameterCm / 2 + 1, 2)).toFixed(1));
}

export function polishFrequencyDays(metal: CandleMetal): number {
  const days: Record<CandleMetal, number> = { brass: 14, silver: 7, pewter: 30, iron: 60, bronze: 21 };
  return days[metal];
}

export function symmetryAngle(branches: number): number {
  if (branches <= 0) return 0;
  return parseFloat((360 / branches).toFixed(1));
}

export function costEstimate(metal: CandleMetal, weightKg: number): number {
  const pricePerKg: Record<CandleMetal, number> = { brass: 15, silver: 800, pewter: 25, iron: 5, bronze: 20 };
  return parseFloat((pricePerKg[metal] * weightKg).toFixed(2));
}

export function candleMetals(): CandleMetal[] {
  return ["brass", "silver", "pewter", "iron", "bronze"];
}

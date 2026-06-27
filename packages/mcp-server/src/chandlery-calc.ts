export type WickType = "cotton" | "paper" | "wood" | "hemp" | "zinc_core";

export function waxWeight(diameterCm: number, heightCm: number, density: number): number {
  const volumeCc = Math.PI * Math.pow(diameterCm / 2, 2) * heightCm;
  return parseFloat((volumeCc * density).toFixed(0));
}

export function wickSize(diameterCm: number): string {
  if (diameterCm < 5) return "small";
  if (diameterCm < 8) return "medium";
  return "large";
}

export function burnTimeHours(waxWeightG: number, burnRateGPerHr: number): number {
  if (burnRateGPerHr <= 0) return 0;
  return parseFloat((waxWeightG / burnRateGPerHr).toFixed(1));
}

export function meltPool(diameterCm: number): number {
  return parseFloat((Math.PI * Math.pow(diameterCm / 2, 2)).toFixed(1));
}

export function fragranceLoad(waxWeightG: number, percentLoad: number): number {
  return parseFloat((waxWeightG * percentLoad / 100).toFixed(1));
}

export function dyeAmount(waxWeightG: number, intensityPct: number): number {
  return parseFloat((waxWeightG * intensityPct / 100).toFixed(1));
}

export function pourTemperature(waxType: string): number {
  const temps: Record<string, number> = {
    soy: 55, paraffin: 65, beeswax: 70, coconut: 50, palm: 60,
  };
  return temps[waxType] || 60;
}

export function cureTimeDays(waxType: string): number {
  const days: Record<string, number> = {
    soy: 14, paraffin: 3, beeswax: 7, coconut: 10, palm: 5,
  };
  return days[waxType] || 7;
}

export function containerVolumeMl(diameterCm: number, heightCm: number): number {
  return parseFloat((Math.PI * Math.pow(diameterCm / 2, 2) * heightCm).toFixed(0));
}

export function wickTypes(): WickType[] {
  return ["cotton", "paper", "wood", "hemp", "zinc_core"];
}

export type WaxType = "soy" | "paraffin" | "beeswax" | "coconut" | "palm" | "rapeseed";
export type WickType = "cotton" | "wood" | "hemp" | "zinc_core" | "paper_core";

export function waxWeight(containerMl: number, densityGPerMl: number = 0.86): number {
  return parseFloat((containerMl * densityGPerMl).toFixed(0));
}

export function meltTemp(type: WaxType): number {
  const temps: Record<WaxType, number> = {
    soy: 76, paraffin: 65, beeswax: 62, coconut: 36, palm: 55, rapeseed: 58,
  };
  return temps[type];
}

export function pourTemp(type: WaxType): number {
  const temps: Record<WaxType, number> = {
    soy: 60, paraffin: 82, beeswax: 71, coconut: 40, palm: 60, rapeseed: 62,
  };
  return temps[type];
}

export function fragranceLoad(waxWeightG: number, percentLoad: number = 10): number {
  return parseFloat((waxWeightG * percentLoad / 100).toFixed(1));
}

export function dyeAmount(waxWeightG: number, blocksPerKg: number = 2): number {
  return parseFloat((waxWeightG / 1000 * blocksPerKg).toFixed(2));
}

export function wickSize(containerDiameterCm: number): string {
  if (containerDiameterCm <= 5) return "small";
  if (containerDiameterCm <= 8) return "medium";
  if (containerDiameterCm <= 12) return "large";
  return "extra-large (consider double wick)";
}

export function burnTime(waxWeightG: number, burnRateGPerHour: number = 7): number {
  return parseFloat((waxWeightG / burnRateGPerHour).toFixed(1));
}

export function cureTimeDays(type: WaxType): number {
  const days: Record<WaxType, number> = {
    soy: 14, paraffin: 3, beeswax: 7, coconut: 14, palm: 5, rapeseed: 10,
  };
  return days[type];
}

export function hotThrow(type: WaxType): string {
  const ratings: Record<WaxType, string> = {
    soy: "moderate", paraffin: "excellent", beeswax: "mild", coconut: "good", palm: "good", rapeseed: "moderate",
  };
  return ratings[type];
}

export function coldThrow(type: WaxType): string {
  const ratings: Record<WaxType, string> = {
    soy: "good", paraffin: "excellent", beeswax: "mild", coconut: "good", palm: "moderate", rapeseed: "moderate",
  };
  return ratings[type];
}

export function costPerCandle(waxCostPerKg: number, waxWeightG: number, fragranceG: number, fragranceCostPerKg: number, containerCost: number): number {
  const wax = waxWeightG / 1000 * waxCostPerKg;
  const frag = fragranceG / 1000 * fragranceCostPerKg;
  return parseFloat((wax + frag + containerCost).toFixed(2));
}

export function batchSize(totalCandles: number, containerMl: number): number {
  return parseFloat((totalCandles * containerMl / 1000).toFixed(1));
}

export function waxTypes(): WaxType[] {
  return ["soy", "paraffin", "beeswax", "coconut", "palm", "rapeseed"];
}

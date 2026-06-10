export type BrazierFuel = "charcoal" | "wood" | "coal" | "peat" | "dung";

export function bowlDiameterCm(heatOutput: string): number {
  const diameters: Record<string, number> = { low: 30, medium: 50, high: 70, industrial: 100 };
  return diameters[heatOutput] || 50;
}

export function fuelCapacityKg(diameterCm: number, depthCm: number): number {
  return parseFloat((Math.PI * Math.pow(diameterCm / 2, 2) * depthCm * 0.0004).toFixed(1));
}

export function burnDurationHours(fuelKg: number, fuel: BrazierFuel): number {
  const rates: Record<BrazierFuel, number> = { charcoal: 3, wood: 1.5, coal: 4, peat: 2, dung: 1 };
  return parseFloat((fuelKg * rates[fuel]).toFixed(1));
}

export function heatOutputBtu(fuelKg: number, fuel: BrazierFuel): number {
  const btu: Record<BrazierFuel, number> = { charcoal: 12000, wood: 8000, coal: 14000, peat: 6000, dung: 4000 };
  return parseFloat((fuelKg * btu[fuel]).toFixed(0));
}

export function ventGapCm(bowlDiameterCm: number): number {
  return parseFloat((bowlDiameterCm * 0.15).toFixed(1));
}

export function sparkScreenMesh(fuel: BrazierFuel): number {
  const mesh: Record<BrazierFuel, number> = { charcoal: 8, wood: 4, coal: 6, peat: 10, dung: 12 };
  return mesh[fuel];
}

export function standHeightCm(purpose: string): number {
  const heights: Record<string, number> = { floor: 30, table: 15, hanging: 0, cooking: 50 };
  return heights[purpose] || 30;
}

export function safeDistanceM(heatOutputBtu: number): number {
  return parseFloat((Math.sqrt(heatOutputBtu / 5000) + 0.5).toFixed(1));
}

export function ashCleanupKg(fuelKg: number, fuel: BrazierFuel): number {
  const ashPercent: Record<BrazierFuel, number> = { charcoal: 3, wood: 5, coal: 10, peat: 8, dung: 15 };
  return parseFloat((fuelKg * ashPercent[fuel] / 100).toFixed(2));
}

export function metalWeightKg(diameterCm: number, wallThicknessMm: number): number {
  const circumference = Math.PI * diameterCm;
  return parseFloat((circumference * wallThicknessMm / 10 * 7.8 / 1000 * diameterCm * 0.5).toFixed(1));
}

export function brazierFuels(): BrazierFuel[] {
  return ["charcoal", "wood", "coal", "peat", "dung"];
}

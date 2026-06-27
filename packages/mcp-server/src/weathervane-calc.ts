export type VaneDesign = "arrow" | "rooster" | "banner" | "ship" | "horse";

export function tailArea(vaneLengthCm: number, vaneWidthCm: number): number {
  return parseFloat((vaneLengthCm * vaneWidthCm * 0.7).toFixed(1));
}

export function counterbalanceWeight(tailAreaCm2: number, materialDensity: number): number {
  return parseFloat((tailAreaCm2 * materialDensity * 0.002).toFixed(1));
}

export function bearingFriction(totalWeightKg: number): number {
  return parseFloat((totalWeightKg * 0.02).toFixed(3));
}

export function responseWindSpeed(totalWeightKg: number, tailAreaCm2: number): number {
  if (tailAreaCm2 <= 0) return 0;
  return parseFloat((totalWeightKg * 100 / tailAreaCm2 + 2).toFixed(1));
}

export function mountingHeight(buildingHeightM: number): number {
  return parseFloat((buildingHeightM + 1.5).toFixed(1));
}

export function cardinalAccuracy(bearingQuality: string): number {
  const accuracy: Record<string, number> = { basic: 22.5, good: 11.25, precision: 5, observatory: 1 };
  return accuracy[bearingQuality] || 11.25;
}

export function lightningRodRequired(heightM: number): boolean {
  return heightM > 10;
}

export function gildingArea(vaneLengthCm: number, vaneWidthCm: number, design: VaneDesign): number {
  const coverage: Record<VaneDesign, number> = { arrow: 0.3, rooster: 0.6, banner: 0.8, ship: 0.5, horse: 0.7 };
  return parseFloat((vaneLengthCm * vaneWidthCm * coverage[design]).toFixed(1));
}

export function windResistanceN(windSpeedMs: number, areaM2: number): number {
  return parseFloat((0.5 * 1.225 * windSpeedMs * windSpeedMs * areaM2 * 1.2).toFixed(1));
}

export function maintenanceYears(material: string): number {
  const years: Record<string, number> = { copper: 30, steel: 10, aluminum: 20, wood: 5 };
  return years[material] || 10;
}

export function vaneDesigns(): VaneDesign[] {
  return ["arrow", "rooster", "banner", "ship", "horse"];
}

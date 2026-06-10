export type CrucibleMaterial = "graphite" | "clay" | "silicon_carbide" | "zirconia" | "alumina";

export function volumeMl(diameterCm: number, heightCm: number): number {
  return parseFloat((Math.PI * Math.pow(diameterCm / 2, 2) * heightCm).toFixed(0));
}

export function meltCapacityKg(volumeMl: number, metalDensity: number): number {
  return parseFloat((volumeMl * metalDensity / 1000 * 0.85).toFixed(1));
}

export function maxTemp(material: CrucibleMaterial): number {
  const temps: Record<CrucibleMaterial, number> = { graphite: 3000, clay: 1400, silicon_carbide: 1650, zirconia: 2500, alumina: 1800 };
  return temps[material];
}

export function heatUpTimeMin(volumeMl: number, targetTemp: number, powerKw: number): number {
  if (powerKw <= 0) return 0;
  return parseFloat((volumeMl * targetTemp * 0.0001 / powerKw).toFixed(0));
}

export function thermalShockRisk(heatingRate: number, material: CrucibleMaterial): string {
  const tolerance: Record<CrucibleMaterial, number> = { graphite: 100, clay: 30, silicon_carbide: 60, zirconia: 40, alumina: 50 };
  if (heatingRate > tolerance[material]) return "high";
  if (heatingRate > tolerance[material] * 0.5) return "moderate";
  return "low";
}

export function fluxAmountG(metalKg: number, metalType: string): number {
  const ratio: Record<string, number> = { gold: 0.5, silver: 1, copper: 2, bronze: 1.5, steel: 3 };
  return parseFloat((metalKg * 1000 * (ratio[metalType] || 2) / 100).toFixed(0));
}

export function pouringTemp(meltingPoint: number): number {
  return parseFloat((meltingPoint * 1.1).toFixed(0));
}

export function lifetimePours(material: CrucibleMaterial): number {
  const pours: Record<CrucibleMaterial, number> = { graphite: 50, clay: 5, silicon_carbide: 80, zirconia: 100, alumina: 60 };
  return pours[material];
}

export function slagVolumeMl(metalKg: number, purityPercent: number): number {
  return parseFloat((metalKg * 1000 * (100 - purityPercent) / 100 / 3).toFixed(0));
}

export function crucibleMaterials(): CrucibleMaterial[] {
  return ["graphite", "clay", "silicon_carbide", "zirconia", "alumina"];
}

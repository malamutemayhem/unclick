export type RoofMaterial = "tile" | "metal" | "slate" | "thatch" | "concrete";

export function catchmentAreaM2(roofLengthM: number, roofWidthM: number): number {
  return parseFloat((roofLengthM * roofWidthM).toFixed(1));
}

export function annualYieldLiters(catchmentM2: number, rainfallMm: number, runoffCoeff: number): number {
  return parseFloat((catchmentM2 * rainfallMm * runoffCoeff / 1000 * 1000).toFixed(0));
}

export function runoffCoefficient(material: RoofMaterial): number {
  const coeff: Record<RoofMaterial, number> = { tile: 0.85, metal: 0.95, slate: 0.9, thatch: 0.35, concrete: 0.8 };
  return coeff[material];
}

export function firstFlushLiters(catchmentM2: number): number {
  return parseFloat((catchmentM2 * 0.5).toFixed(0));
}

export function gutterSizeMm(catchmentM2: number, maxRainfallMmH: number): number {
  const flow = catchmentM2 * maxRainfallMmH / 3600;
  return parseFloat((Math.sqrt(flow) * 50 + 75).toFixed(0));
}

export function downpipeCount(gutterLengthM: number): number {
  return Math.ceil(gutterLengthM / 12);
}

export function filterMeshMm(useType: string): number {
  const mesh: Record<string, number> = { irrigation: 2, washing: 0.5, drinking: 0.1, toilet: 1 };
  return mesh[useType] || 1;
}

export function tankSizeLiters(dailyUseLiters: number, dryDays: number): number {
  return parseFloat((dailyUseLiters * dryDays * 1.2).toFixed(0));
}

export function pumpWatts(headM: number, flowLpm: number): number {
  return parseFloat((headM * flowLpm * 9.81 / 60 / 0.6).toFixed(0));
}

export function paybackYears(systemCost: number, waterSavedLitersPerYear: number, waterPricePerLiter: number): number {
  const savings = waterSavedLitersPerYear * waterPricePerLiter;
  if (savings <= 0) return 0;
  return parseFloat((systemCost / savings).toFixed(1));
}

export function roofMaterials(): RoofMaterial[] {
  return ["tile", "metal", "slate", "thatch", "concrete"];
}

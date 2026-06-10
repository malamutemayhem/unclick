export type FillMaterial = "stone" | "gravel" | "recycled_concrete" | "brick" | "cobble";

export function basketVolume(lengthM: number, widthM: number, heightM: number): number {
  return parseFloat((lengthM * widthM * heightM).toFixed(2));
}

export function basketCount(wallLengthM: number, wallHeightM: number, basketLengthM: number, basketHeightM: number): number {
  if (basketLengthM <= 0 || basketHeightM <= 0) return 0;
  return Math.ceil(wallLengthM / basketLengthM) * Math.ceil(wallHeightM / basketHeightM);
}

export function fillWeightKg(volumeM3: number, material: FillMaterial): number {
  const densities: Record<FillMaterial, number> = { stone: 1600, gravel: 1500, recycled_concrete: 1400, brick: 1300, cobble: 1700 };
  return parseFloat((volumeM3 * densities[material]).toFixed(0));
}

export function wireMeshM2(basketCount: number, surfacePerBasket: number): number {
  return parseFloat((basketCount * surfacePerBasket).toFixed(1));
}

export function retainingForceKn(wallHeightM: number, wallWidthM: number, soilDensity: number): number {
  return parseFloat((0.5 * soilDensity * 9.81 * Math.pow(wallHeightM, 2) * wallWidthM / 1000).toFixed(1));
}

export function drainageRate(voidPercent: number, crossSectionM2: number): number {
  return parseFloat((voidPercent / 100 * crossSectionM2 * 3600).toFixed(1));
}

export function wireDiameterMm(loadKn: number): number {
  return parseFloat((2 + loadKn * 0.02).toFixed(1));
}

export function erosionProtectionYears(coatingType: string): number {
  const years: Record<string, number> = { galvanized: 50, pvc_coated: 80, galfan: 70, uncoated: 15 };
  return years[coatingType] || 50;
}

export function installTimeHours(basketCount: number): number {
  return parseFloat((basketCount * 0.5 + 2).toFixed(1));
}

export function costPerM(fillMaterial: FillMaterial, wallHeightM: number): number {
  const base: Record<FillMaterial, number> = { stone: 80, gravel: 50, recycled_concrete: 40, brick: 60, cobble: 90 };
  return parseFloat((base[fillMaterial] * wallHeightM).toFixed(0));
}

export function fillMaterials(): FillMaterial[] {
  return ["stone", "gravel", "recycled_concrete", "brick", "cobble"];
}

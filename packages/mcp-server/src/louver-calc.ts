export type LouverMaterial = "wood" | "aluminum" | "steel" | "glass" | "composite";

export function bladeCount(openingHeightCm: number, bladeSpacingCm: number): number {
  if (bladeSpacingCm <= 0) return 0;
  return Math.floor(openingHeightCm / bladeSpacingCm);
}

export function freeAreaPercent(bladeAngleDeg: number, bladeSpacingCm: number, bladeWidthCm: number): number {
  if (bladeWidthCm <= 0) return 0;
  const rad = bladeAngleDeg * Math.PI / 180;
  const effectiveGap = bladeSpacingCm - bladeWidthCm * Math.cos(rad);
  return parseFloat((Math.max(0, effectiveGap) / bladeSpacingCm * 100).toFixed(1));
}

export function airflowCfm(freeAreaM2: number, velocityMps: number): number {
  return parseFloat((freeAreaM2 * velocityMps * 35.3 * 60).toFixed(0));
}

export function rainPenetrationAngle(bladeAngleDeg: number, bladeOverlap: number): number {
  return parseFloat((bladeAngleDeg + bladeOverlap * 5).toFixed(1));
}

export function pressureDropPa(velocityMps: number, freeAreaPercent: number): number {
  if (freeAreaPercent <= 0) return 0;
  const lossFactor = (100 / freeAreaPercent) ** 2;
  return parseFloat((0.5 * 1.225 * velocityMps * velocityMps * lossFactor).toFixed(1));
}

export function noiseReductionDb(bladeCount: number, material: LouverMaterial): number {
  const baseDb: Record<LouverMaterial, number> = {
    wood: 8, aluminum: 5, steel: 6, glass: 10, composite: 7,
  };
  return parseFloat((baseDb[material] + Math.log2(bladeCount + 1) * 2).toFixed(1));
}

export function weightKg(bladeCount: number, bladeLengthCm: number, material: LouverMaterial): number {
  const kgPerCm: Record<LouverMaterial, number> = {
    wood: 0.02, aluminum: 0.015, steel: 0.04, glass: 0.03, composite: 0.012,
  };
  return parseFloat((bladeCount * bladeLengthCm * kgPerCm[material]).toFixed(1));
}

export function motorSizeWatts(bladeCount: number, bladeLengthCm: number): number {
  return Math.ceil(bladeCount * bladeLengthCm * 0.1);
}

export function cleaningIntervalDays(material: LouverMaterial, dusty: boolean): number {
  const base: Record<LouverMaterial, number> = {
    wood: 60, aluminum: 90, steel: 120, glass: 30, composite: 90,
  };
  return dusty ? Math.floor(base[material] / 2) : base[material];
}

export function louverMaterials(): LouverMaterial[] {
  return ["wood", "aluminum", "steel", "glass", "composite"];
}

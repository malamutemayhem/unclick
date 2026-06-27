export type CrystalType = "sugar" | "salt" | "alum" | "borax" | "copper_sulfate" | "bismuth";
export type GrowthMethod = "evaporation" | "cooling" | "seed_crystal" | "gel";

export function solubility(type: CrystalType, tempC: number): number {
  const base: Record<CrystalType, number> = {
    sugar: 200, salt: 36, alum: 14, borax: 5, copper_sulfate: 32, bismuth: 0,
  };
  const tempFactor = 1 + (tempC - 20) * 0.02;
  return parseFloat((base[type] * tempFactor).toFixed(1));
}

export function solutionAmount(waterMl: number, solubilityGPer100ml: number): number {
  return parseFloat((waterMl * solubilityGPer100ml / 100).toFixed(0));
}

export function growthDays(type: CrystalType, method: GrowthMethod): number {
  const base: Record<CrystalType, number> = {
    sugar: 7, salt: 3, alum: 5, borax: 14, copper_sulfate: 7, bismuth: 1,
  };
  const factor: Record<GrowthMethod, number> = {
    evaporation: 1, cooling: 0.5, seed_crystal: 2, gel: 3,
  };
  return Math.ceil(base[type] * factor[method]);
}

export function seedCrystalSize(targetSizeCm: number): number {
  return parseFloat((targetSizeCm * 0.1).toFixed(2));
}

export function temperatureDrop(startC: number, targetC: number, hours: number): number {
  if (hours <= 0) return 0;
  return parseFloat(((startC - targetC) / hours).toFixed(1));
}

export function supersaturation(dissolvedG: number, solubilityG: number): number {
  if (solubilityG <= 0) return 0;
  return parseFloat(((dissolvedG - solubilityG) / solubilityG * 100).toFixed(1));
}

export function containerVolume(crystalTargetCm: number): number {
  return parseFloat((crystalTargetCm * crystalTargetCm * crystalTargetCm * 10).toFixed(0));
}

export function dyeAmount(solutionMl: number): number {
  return parseFloat((solutionMl * 0.005).toFixed(2));
}

export function safetyLevel(type: CrystalType): string {
  if (type === "copper_sulfate") return "toxic - gloves and goggles required";
  if (type === "bismuth") return "molten metal - extreme caution";
  if (type === "alum") return "low hazard - skin irritant";
  return "food safe";
}

export function preserveMethod(type: CrystalType): string {
  if (type === "sugar") return "clear nail polish coating";
  if (type === "salt" || type === "borax") return "store in dry container";
  return "acrylic spray sealant";
}

export function expectedYield(solutionMl: number, solubilityChange: number): number {
  return parseFloat((solutionMl * solubilityChange / 100).toFixed(1));
}

export function crystalTypes(): CrystalType[] {
  return ["sugar", "salt", "alum", "borax", "copper_sulfate", "bismuth"];
}

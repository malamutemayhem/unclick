export type OreType = "gold" | "silver" | "copper" | "iron" | "tin";

export function gradeGPerTonne(oreType: OreType): number {
  const grades: Record<OreType, number> = {
    gold: 5, silver: 150, copper: 5000, iron: 300000, tin: 3000,
  };
  return grades[oreType];
}

export function stripRatio(overburdenM: number, oreThicknessM: number): number {
  if (oreThicknessM <= 0) return 0;
  return parseFloat((overburdenM / oreThicknessM).toFixed(2));
}

export function recoveryPercent(oreType: OreType): number {
  const recovery: Record<OreType, number> = {
    gold: 92, silver: 85, copper: 88, iron: 95, tin: 75,
  };
  return recovery[oreType];
}

export function metalContentKg(tonnageT: number, gradeGPerT: number, recoveryPct: number): number {
  return parseFloat((tonnageT * gradeGPerT * recoveryPct / 100 / 1000).toFixed(2));
}

export function concentrateRatio(oreType: OreType): number {
  const ratios: Record<OreType, number> = {
    gold: 100000, silver: 500, copper: 20, iron: 3, tin: 50,
  };
  return ratios[oreType];
}

export function crushingStagePasses(hardness: "soft" | "medium" | "hard"): number {
  const passes: Record<string, number> = { soft: 1, medium: 2, hard: 3 };
  return passes[hardness];
}

export function grindingEnergyKwhPerT(hardness: "soft" | "medium" | "hard"): number {
  const energy: Record<string, number> = { soft: 8, medium: 15, hard: 25 };
  return energy[hardness];
}

export function tailingsDensityKgPerM3(oreType: OreType): number {
  const densities: Record<OreType, number> = {
    gold: 1400, silver: 1350, copper: 1500, iron: 1800, tin: 1450,
  };
  return densities[oreType];
}

export function cutoffGrade(oreType: OreType, metalPricePerKg: number, miningCostPerT: number): number {
  if (metalPricePerKg <= 0) return 0;
  return parseFloat((miningCostPerT / metalPricePerKg * 1000).toFixed(2));
}

export function oreTypes(): OreType[] {
  return ["gold", "silver", "copper", "iron", "tin"];
}

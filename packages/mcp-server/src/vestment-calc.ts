export type VestmentFabric = "silk" | "brocade" | "linen" | "wool" | "velvet";

export function fabricMeters(garmentType: string, sizeMultiplier: number): number {
  const base: Record<string, number> = { chasuble: 4, dalmatic: 3.5, cope: 5, stole: 1.5, maniple: 0.5 };
  return parseFloat(((base[garmentType] || 3) * sizeMultiplier).toFixed(1));
}

export function embroideryHours(areaCm2: number, density: string): number {
  const factor: Record<string, number> = { sparse: 0.05, moderate: 0.1, dense: 0.2, goldwork: 0.4 };
  return parseFloat((areaCm2 * (factor[density] || 0.1)).toFixed(1));
}

export function goldThreadMeters(embroideryAreaCm2: number, coverage: number): number {
  return parseFloat((embroideryAreaCm2 * coverage * 0.5).toFixed(1));
}

export function liningFabricM(outerFabricM: number): number {
  return parseFloat((outerFabricM * 0.9).toFixed(1));
}

export function gemstoneCount(ornamentLevel: string): number {
  const counts: Record<string, number> = { plain: 0, modest: 5, ornate: 20, cathedral: 50 };
  return counts[ornamentLevel] || 0;
}

export function fabricCostPerM(fabric: VestmentFabric): number {
  const prices: Record<VestmentFabric, number> = { silk: 80, brocade: 120, linen: 25, wool: 40, velvet: 90 };
  return prices[fabric];
}

export function sewingTimeHours(fabricM: number, complexity: string): number {
  const factor: Record<string, number> = { simple: 3, moderate: 5, complex: 8, master: 12 };
  return parseFloat((fabricM * (factor[complexity] || 5)).toFixed(0));
}

export function maintenanceCostPerYear(fabric: VestmentFabric, age: number): number {
  const base: Record<VestmentFabric, number> = { silk: 50, brocade: 70, linen: 20, wool: 30, velvet: 60 };
  return parseFloat((base[fabric] * (1 + age * 0.05)).toFixed(0));
}

export function storageRequirements(garmentCount: number): { hangingRodM: number; drawers: number } {
  return {
    hangingRodM: parseFloat((garmentCount * 0.15).toFixed(1)),
    drawers: Math.ceil(garmentCount * 0.3),
  };
}

export function vestmentFabrics(): VestmentFabric[] {
  return ["silk", "brocade", "linen", "wool", "velvet"];
}

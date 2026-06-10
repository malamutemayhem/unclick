export type BedMaterial = "cedar" | "stone" | "galvanized_steel" | "concrete_block" | "recycled_plastic";

export function soilVolumeLiters(lengthM: number, widthM: number, depthCm: number): number {
  return Math.round(lengthM * widthM * depthCm * 10);
}

export function compostPercent(depthCm: number): number {
  if (depthCm <= 15) return 40;
  if (depthCm <= 30) return 30;
  return 25;
}

export function lifespanYears(material: BedMaterial): number {
  const years: Record<BedMaterial, number> = {
    cedar: 15, stone: 50, galvanized_steel: 20, concrete_block: 30, recycled_plastic: 25,
  };
  return years[material];
}

export function maxDepthCm(material: BedMaterial): number {
  const depth: Record<BedMaterial, number> = {
    cedar: 45, stone: 60, galvanized_steel: 30, concrete_block: 90, recycled_plastic: 40,
  };
  return depth[material];
}

export function drainageRequired(material: BedMaterial): boolean {
  return material === "concrete_block" || material === "galvanized_steel";
}

export function warmingSoilBonus(material: BedMaterial): number {
  const bonus: Record<BedMaterial, number> = {
    cedar: 1, stone: 3, galvanized_steel: 4, concrete_block: 2, recycled_plastic: 2,
  };
  return bonus[material];
}

export function aestheticRating(material: BedMaterial): number {
  const rating: Record<BedMaterial, number> = {
    cedar: 5, stone: 5, galvanized_steel: 3, concrete_block: 2, recycled_plastic: 3,
  };
  return rating[material];
}

export function weightKgPerMeter(material: BedMaterial): number {
  const weight: Record<BedMaterial, number> = {
    cedar: 5, stone: 80, galvanized_steel: 8, concrete_block: 40, recycled_plastic: 4,
  };
  return weight[material];
}

export function costPerMeter(material: BedMaterial): number {
  const costs: Record<BedMaterial, number> = {
    cedar: 25, stone: 80, galvanized_steel: 35, concrete_block: 20, recycled_plastic: 30,
  };
  return costs[material];
}

export function bedMaterials(): BedMaterial[] {
  return ["cedar", "stone", "galvanized_steel", "concrete_block", "recycled_plastic"];
}

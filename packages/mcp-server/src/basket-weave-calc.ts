export type BasketMaterial = "willow" | "rattan" | "reed" | "bamboo" | "sweetgrass";

export function stakeLengthCm(basketHeightCm: number): number {
  return Math.round(basketHeightCm * 2.5 + 10);
}

export function weaverLengthCm(basketCircumferenceCm: number, rows: number): number {
  return Math.round(basketCircumferenceCm * rows * 1.1);
}

export function soakTimeMinutes(material: BasketMaterial): number {
  const times: Record<BasketMaterial, number> = {
    willow: 30, rattan: 15, reed: 20, bamboo: 60, sweetgrass: 5,
  };
  return times[material];
}

export function stakeSpacingMm(material: BasketMaterial): number {
  const spacing: Record<BasketMaterial, number> = {
    willow: 20, rattan: 15, reed: 18, bamboo: 25, sweetgrass: 10,
  };
  return spacing[material];
}

export function weavingTimeHours(material: BasketMaterial, volumeLiters: number): number {
  const factor: Record<BasketMaterial, number> = {
    willow: 0.5, rattan: 0.4, reed: 0.45, bamboo: 0.6, sweetgrass: 0.8,
  };
  return parseFloat((volumeLiters * factor[material]).toFixed(1));
}

export function durabilityYears(material: BasketMaterial): number {
  const years: Record<BasketMaterial, number> = {
    willow: 15, rattan: 20, reed: 8, bamboo: 25, sweetgrass: 5,
  };
  return years[material];
}

export function weightEmptyG(volumeLiters: number, material: BasketMaterial): number {
  const density: Record<BasketMaterial, number> = {
    willow: 30, rattan: 25, reed: 20, bamboo: 35, sweetgrass: 15,
  };
  return Math.round(volumeLiters * density[material]);
}

export function flexibilityRating(material: BasketMaterial): number {
  const ratings: Record<BasketMaterial, number> = {
    willow: 5, rattan: 4, reed: 3, bamboo: 2, sweetgrass: 5,
  };
  return ratings[material];
}

export function costPerKg(material: BasketMaterial): number {
  const costs: Record<BasketMaterial, number> = {
    willow: 8, rattan: 12, reed: 6, bamboo: 5, sweetgrass: 25,
  };
  return costs[material];
}

export function basketMaterials(): BasketMaterial[] {
  return ["willow", "rattan", "reed", "bamboo", "sweetgrass"];
}

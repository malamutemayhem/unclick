export type AppleType = "bittersweet" | "bittersharp" | "sharp" | "sweet" | "dessert";

export function juiceYieldPercent(apple: AppleType): number {
  const yields: Record<AppleType, number> = {
    bittersweet: 65, bittersharp: 60, sharp: 70, sweet: 75, dessert: 72,
  };
  return yields[apple];
}

export function tanninLevel(apple: AppleType): number {
  const levels: Record<AppleType, number> = {
    bittersweet: 5, bittersharp: 4, sharp: 1, sweet: 2, dessert: 1,
  };
  return levels[apple];
}

export function acidityPercent(apple: AppleType): number {
  const acidity: Record<AppleType, number> = {
    bittersweet: 0.2, bittersharp: 0.6, sharp: 0.7, sweet: 0.15, dessert: 0.3,
  };
  return acidity[apple];
}

export function specificGravity(apple: AppleType): number {
  const sg: Record<AppleType, number> = {
    bittersweet: 1.055, bittersharp: 1.050, sharp: 1.048, sweet: 1.060, dessert: 1.052,
  };
  return sg[apple];
}

export function fermentationTempCelsius(): number {
  return 12;
}

export function fermentationWeeks(): number {
  return 6;
}

export function rackingCount(): number {
  return 2;
}

export function estimatedAbv(apple: AppleType): number {
  const abv: Record<AppleType, number> = {
    bittersweet: 6.5, bittersharp: 6.0, sharp: 5.5, sweet: 7.0, dessert: 6.0,
  };
  return abv[apple];
}

export function costPerLiter(apple: AppleType): number {
  const costs: Record<AppleType, number> = {
    bittersweet: 3, bittersharp: 4, sharp: 2, sweet: 2, dessert: 3,
  };
  return costs[apple];
}

export function appleTypes(): AppleType[] {
  return ["bittersweet", "bittersharp", "sharp", "sweet", "dessert"];
}

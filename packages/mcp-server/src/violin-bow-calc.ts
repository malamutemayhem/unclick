export type BowWood = "pernambuco" | "brazilwood" | "carbon_fiber" | "snakewood" | "ipe";

export function stickLengthCm(bowWood: BowWood): number {
  const lengths: Record<BowWood, number> = {
    pernambuco: 74.5, brazilwood: 74, carbon_fiber: 74.5, snakewood: 73, ipe: 74,
  };
  return lengths[bowWood];
}

export function weightGrams(bowWood: BowWood): number {
  const weights: Record<BowWood, number> = {
    pernambuco: 60, brazilwood: 63, carbon_fiber: 58, snakewood: 65, ipe: 62,
  };
  return weights[bowWood];
}

export function hairCount(): number {
  return 180;
}

export function camberDepthMm(bowWood: BowWood): number {
  const depths: Record<BowWood, number> = {
    pernambuco: 15, brazilwood: 14, carbon_fiber: 15, snakewood: 13, ipe: 14,
  };
  return depths[bowWood];
}

export function balancePointCm(bowWood: BowWood): number {
  const points: Record<BowWood, number> = {
    pernambuco: 27, brazilwood: 26, carbon_fiber: 27.5, snakewood: 25, ipe: 26,
  };
  return points[bowWood];
}

export function rehairIntervalMonths(): number {
  return 6;
}

export function stiffnessRating(bowWood: BowWood): number {
  const ratings: Record<BowWood, number> = {
    pernambuco: 5, brazilwood: 3, carbon_fiber: 4, snakewood: 5, ipe: 4,
  };
  return ratings[bowWood];
}

export function responseRating(bowWood: BowWood): number {
  const ratings: Record<BowWood, number> = {
    pernambuco: 5, brazilwood: 3, carbon_fiber: 4, snakewood: 4, ipe: 3,
  };
  return ratings[bowWood];
}

export function costEstimate(bowWood: BowWood): number {
  const costs: Record<BowWood, number> = {
    pernambuco: 5000, brazilwood: 200, carbon_fiber: 500, snakewood: 3000, ipe: 300,
  };
  return costs[bowWood];
}

export function bowWoods(): BowWood[] {
  return ["pernambuco", "brazilwood", "carbon_fiber", "snakewood", "ipe"];
}

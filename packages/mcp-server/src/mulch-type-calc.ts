export type MulchType = "wood_chip" | "straw" | "leaf_mold" | "gravel" | "living_mulch";

export function moistureRetention(mulch: MulchType): number {
  const m: Record<MulchType, number> = {
    wood_chip: 8, straw: 7, leaf_mold: 9, gravel: 3, living_mulch: 6,
  };
  return m[mulch];
}

export function decompositionMonths(mulch: MulchType): number {
  const m: Record<MulchType, number> = {
    wood_chip: 24, straw: 6, leaf_mold: 12, gravel: 999, living_mulch: 0,
  };
  return m[mulch];
}

export function weedSuppression(mulch: MulchType): number {
  const m: Record<MulchType, number> = {
    wood_chip: 8, straw: 6, leaf_mold: 5, gravel: 7, living_mulch: 8,
  };
  return m[mulch];
}

export function soilEnrichment(mulch: MulchType): number {
  const m: Record<MulchType, number> = {
    wood_chip: 6, straw: 7, leaf_mold: 9, gravel: 0, living_mulch: 8,
  };
  return m[mulch];
}

export function applicationDepthCm(mulch: MulchType): number {
  const m: Record<MulchType, number> = {
    wood_chip: 8, straw: 10, leaf_mold: 5, gravel: 5, living_mulch: 0,
  };
  return m[mulch];
}

export function organic(mulch: MulchType): boolean {
  const m: Record<MulchType, boolean> = {
    wood_chip: true, straw: true, leaf_mold: true, gravel: false, living_mulch: true,
  };
  return m[mulch];
}

export function yearRound(mulch: MulchType): boolean {
  const m: Record<MulchType, boolean> = {
    wood_chip: true, straw: false, leaf_mold: true, gravel: true, living_mulch: false,
  };
  return m[mulch];
}

export function bestGardenType(mulch: MulchType): string {
  const m: Record<MulchType, string> = {
    wood_chip: "perennial_beds", straw: "vegetable_garden", leaf_mold: "woodland_garden",
    gravel: "rock_garden", living_mulch: "orchard",
  };
  return m[mulch];
}

export function costPerM3(mulch: MulchType): number {
  const m: Record<MulchType, number> = {
    wood_chip: 40, straw: 25, leaf_mold: 15, gravel: 60, living_mulch: 10,
  };
  return m[mulch];
}

export function mulchTypes(): MulchType[] {
  return ["wood_chip", "straw", "leaf_mold", "gravel", "living_mulch"];
}

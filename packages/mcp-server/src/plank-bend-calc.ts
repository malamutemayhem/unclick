export type BendMethod = "steam" | "hot_water" | "laminate" | "kerf" | "green_wood";

export function minimumRadiusMm(thicknessMm: number, method: BendMethod): number {
  const multiplier: Record<BendMethod, number> = {
    steam: 8, hot_water: 12, laminate: 5, kerf: 3, green_wood: 10,
  };
  return Math.round(thicknessMm * multiplier[method]);
}

export function steamTimeMinutesPerCm(thicknessCm: number): number {
  return Math.round(thicknessCm * 60);
}

export function springbackPercent(method: BendMethod): number {
  const springback: Record<BendMethod, number> = {
    steam: 5, hot_water: 8, laminate: 1, kerf: 2, green_wood: 12,
  };
  return springback[method];
}

export function overBendDeg(targetDeg: number, springbackPercent: number): number {
  return parseFloat((targetDeg * (1 + springbackPercent / 100)).toFixed(1));
}

export function clampCount(bendLengthCm: number): number {
  return Math.max(2, Math.ceil(bendLengthCm / 10));
}

export function dryingTimeHours(method: BendMethod): number {
  const hours: Record<BendMethod, number> = {
    steam: 48, hot_water: 72, laminate: 24, kerf: 4, green_wood: 168,
  };
  return hours[method];
}

export function bestWoodSpecies(method: BendMethod): string {
  const species: Record<BendMethod, string> = {
    steam: "white_oak", hot_water: "ash", laminate: "birch", kerf: "plywood", green_wood: "willow",
  };
  return species[method];
}

export function breakageRiskPercent(method: BendMethod): number {
  const risk: Record<BendMethod, number> = {
    steam: 5, hot_water: 10, laminate: 1, kerf: 3, green_wood: 15,
  };
  return risk[method];
}

export function costRating(method: BendMethod): number {
  const costs: Record<BendMethod, number> = {
    steam: 3, hot_water: 2, laminate: 4, kerf: 2, green_wood: 1,
  };
  return costs[method];
}

export function bendMethods(): BendMethod[] {
  return ["steam", "hot_water", "laminate", "kerf", "green_wood"];
}

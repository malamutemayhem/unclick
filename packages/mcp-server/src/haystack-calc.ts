export type HayType = "timothy" | "alfalfa" | "clover" | "ryegrass" | "meadow_mix";

export function baleWeightKg(format: "small_square" | "round" | "large_square"): number {
  const weights: Record<string, number> = {
    small_square: 20, round: 350, large_square: 500,
  };
  return weights[format];
}

export function moistureTargetPercent(hayType: HayType): number {
  const targets: Record<HayType, number> = {
    timothy: 15, alfalfa: 14, clover: 13, ryegrass: 16, meadow_mix: 15,
  };
  return targets[hayType];
}

export function curingDays(hayType: HayType): number {
  const days: Record<HayType, number> = {
    timothy: 3, alfalfa: 2, clover: 4, ryegrass: 3, meadow_mix: 3,
  };
  return days[hayType];
}

export function yieldKgPerHectare(hayType: HayType): number {
  const yields: Record<HayType, number> = {
    timothy: 6000, alfalfa: 10000, clover: 5000, ryegrass: 7000, meadow_mix: 5500,
  };
  return yields[hayType];
}

export function proteinPercent(hayType: HayType): number {
  const protein: Record<HayType, number> = {
    timothy: 8, alfalfa: 18, clover: 15, ryegrass: 10, meadow_mix: 9,
  };
  return protein[hayType];
}

export function stackHeightBales(format: "small_square" | "round" | "large_square"): number {
  const heights: Record<string, number> = {
    small_square: 8, round: 2, large_square: 3,
  };
  return heights[format];
}

export function storageM2PerTonne(format: "small_square" | "round" | "large_square"): number {
  const area: Record<string, number> = {
    small_square: 3, round: 4, large_square: 2.5,
  };
  return area[format];
}

export function combustionRiskTemp(): number {
  return 70;
}

export function costPerTonne(hayType: HayType): number {
  const costs: Record<HayType, number> = {
    timothy: 180, alfalfa: 250, clover: 200, ryegrass: 160, meadow_mix: 150,
  };
  return costs[hayType];
}

export function hayTypes(): HayType[] {
  return ["timothy", "alfalfa", "clover", "ryegrass", "meadow_mix"];
}

export type SeedType = "wildflower" | "herb" | "vegetable" | "grass" | "tree" | "pollinator_mix";
export type ClayType = "red_clay" | "bentonite" | "kaolin";

export function seedsPerBomb(seedType: SeedType): number {
  const counts: Record<SeedType, number> = {
    wildflower: 20, herb: 15, vegetable: 8, grass: 50, tree: 3, pollinator_mix: 25,
  };
  return counts[seedType];
}

export function clayRatio(): number {
  return 5;
}

export function compostRatio(): number {
  return 3;
}

export function waterMl(bombCount: number): number {
  return parseFloat((bombCount * 10).toFixed(0));
}

export function dryingDays(humidityPercent: number): number {
  if (humidityPercent >= 80) return 5;
  if (humidityPercent >= 50) return 3;
  return 2;
}

export function bombDiameterCm(weightG: number): number {
  const volumeCc = weightG / 1.8;
  const radiusCm = Math.pow(3 * volumeCc / (4 * Math.PI), 1 / 3);
  return parseFloat((radiusCm * 2).toFixed(1));
}

export function batchWeight(bombs: number, weightPerBombG: number): number {
  return parseFloat((bombs * weightPerBombG / 1000).toFixed(2));
}

export function germinationDays(seedType: SeedType): number {
  const days: Record<SeedType, number> = {
    wildflower: 14, herb: 10, vegetable: 7, grass: 10, tree: 30, pollinator_mix: 14,
  };
  return days[seedType];
}

export function bestSeason(seedType: SeedType): string {
  if (seedType === "grass") return "fall";
  if (seedType === "tree") return "fall";
  return "spring";
}

export function coverageM2(bombCount: number): number {
  return parseFloat((bombCount * 0.5).toFixed(1));
}

export function survivalRate(seedType: SeedType): number {
  const rate: Record<SeedType, number> = {
    wildflower: 0.6, herb: 0.5, vegetable: 0.7, grass: 0.8, tree: 0.3, pollinator_mix: 0.55,
  };
  return rate[seedType];
}

export function expectedPlants(bombCount: number, seedType: SeedType): number {
  return Math.floor(bombCount * seedsPerBomb(seedType) * survivalRate(seedType));
}

export function seedTypes(): SeedType[] {
  return ["wildflower", "herb", "vegetable", "grass", "tree", "pollinator_mix"];
}

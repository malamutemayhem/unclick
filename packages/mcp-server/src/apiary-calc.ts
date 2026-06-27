export type HiveType = "langstroth" | "top_bar" | "warre" | "flow" | "skep";

export function frameCount(type: HiveType): number {
  const frames: Record<HiveType, number> = {
    langstroth: 10, top_bar: 28, warre: 8, flow: 7, skep: 0,
  };
  return frames[type];
}

export function honeyYieldKg(frames: number, fillPercent: number): number {
  if (fillPercent <= 0) return 0;
  return parseFloat((frames * 2.5 * (fillPercent / 100)).toFixed(1));
}

export function broodArea(frames: number, cellsPerSide: number): number {
  return frames * cellsPerSide * 2;
}

export function beePopulation(frames: number): number {
  return frames * 2500;
}

export function smokerFuel(inspectionMin: number): number {
  return parseFloat((inspectionMin * 0.3).toFixed(1));
}

export function feedSyrupLiters(colonyWeight: number, targetWeight: number): number {
  if (colonyWeight >= targetWeight) return 0;
  return parseFloat(((targetWeight - colonyWeight) * 0.6).toFixed(1));
}

export function swarmRisk(population: number, queenAge: number): number {
  const popFactor = Math.min(population / 60000, 1);
  const ageFactor = Math.max(0, 1 - queenAge / 3);
  return parseFloat((popFactor * (1 - ageFactor) * 100).toFixed(0));
}

export function waxYieldG(honeyKg: number): number {
  return parseFloat((honeyKg * 10).toFixed(0));
}

export function pollinationRadius(colonyStrength: number): number {
  return parseFloat((Math.sqrt(colonyStrength / 10000) * 3).toFixed(1));
}

export function winterSurvival(stores: number, insulation: boolean): number {
  const base = Math.min(stores / 20, 1) * 80;
  return parseFloat((insulation ? base + 10 : base).toFixed(0));
}

export function hiveTypes(): HiveType[] {
  return ["langstroth", "top_bar", "warre", "flow", "skep"];
}

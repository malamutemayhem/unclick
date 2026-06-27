export type RockType = "agate" | "jasper" | "quartz" | "obsidian" | "granite" | "limestone";
export type GritStage = "coarse" | "medium" | "fine" | "polish";

const MOHS: Record<RockType, number> = {
  agate: 7, jasper: 7, quartz: 7, obsidian: 5.5, granite: 6.5, limestone: 3,
};

export function mohsHardness(rock: RockType): number {
  return MOHS[rock];
}

export function barrelCapacity(barrelOz: number): number {
  return parseFloat((barrelOz * 0.67).toFixed(0));
}

export function mediaAmount(rockOz: number): number {
  return parseFloat((rockOz * 0.5).toFixed(0));
}

export function waterLevel(rockOz: number): number {
  return parseFloat((rockOz * 0.3).toFixed(0));
}

export function gritAmount(rockOz: number, stage: GritStage): number {
  const tbspPerOz: Record<GritStage, number> = {
    coarse: 0.25, medium: 0.25, fine: 0.2, polish: 0.15,
  };
  return parseFloat((rockOz * tbspPerOz[stage]).toFixed(1));
}

export function stageDuration(stage: GritStage, hardness: number): number {
  const baseDays: Record<GritStage, number> = {
    coarse: 7, medium: 7, fine: 7, polish: 7,
  };
  const factor = hardness > 6 ? 1.5 : 1;
  return Math.round(baseDays[stage] * factor);
}

export function totalDays(hardness: number): number {
  return stageDuration("coarse", hardness) +
    stageDuration("medium", hardness) +
    stageDuration("fine", hardness) +
    stageDuration("polish", hardness);
}

export function electricityCost(watts: number, days: number, costPerKwh: number): number {
  return parseFloat((watts / 1000 * days * 24 * costPerKwh).toFixed(2));
}

export function rpmRecommended(barrelDiameterInch: number): number {
  return Math.round(200 / Math.sqrt(barrelDiameterInch));
}

export function shrinkagePercent(stage: GritStage): number {
  const loss: Record<GritStage, number> = {
    coarse: 15, medium: 5, fine: 2, polish: 0.5,
  };
  return loss[stage];
}

export function totalShrinkage(): number {
  return 15 + 5 + 2 + 0.5;
}

export function batchCost(gritCost: number, mediaCost: number, electricityCostVal: number): number {
  return parseFloat((gritCost + mediaCost + electricityCostVal).toFixed(2));
}

export function costPerRock(batchCostVal: number, rockCount: number): number {
  if (rockCount === 0) return 0;
  return parseFloat((batchCostVal / rockCount).toFixed(2));
}

export function rockTypes(): RockType[] {
  return ["agate", "jasper", "quartz", "obsidian", "granite", "limestone"];
}

export function gritStages(): GritStage[] {
  return ["coarse", "medium", "fine", "polish"];
}

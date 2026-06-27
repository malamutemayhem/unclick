export type ProcessStage = "harvest" | "crush" | "ball" | "couching" | "dissolve";

export function harvestKgPerM2(): number {
  return 0.8;
}

export function crushTimeMinutes(batchKg: number): number {
  return Math.round(batchKg * 15);
}

export function ballDiameterCm(batchKg: number): number {
  return parseFloat((Math.pow(batchKg * 750 / Math.PI * 6, 1 / 3) / 10).toFixed(1));
}

export function couchingWeeks(): number {
  return 9;
}

export function couchingTempCelsius(): number {
  return 55;
}

export function turnsPerDay(): number {
  return 3;
}

export function dyeYieldGPerKgLeaf(): number {
  return 3;
}

export function dipsNeeded(depthOfColor: number): number {
  return Math.max(1, Math.round(depthOfColor * 3));
}

export function costPerKgPigment(): number {
  return 200;
}

export function processStages(): ProcessStage[] {
  return ["harvest", "crush", "ball", "couching", "dissolve"];
}

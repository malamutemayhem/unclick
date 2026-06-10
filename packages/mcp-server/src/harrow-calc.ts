export type HarrowType = "spike" | "disc" | "chain" | "spring_tine" | "power";

export function workingWidthM(type: HarrowType): number {
  const widths: Record<HarrowType, number> = {
    spike: 2.0, disc: 3.0, chain: 4.0, spring_tine: 2.5, power: 3.5,
  };
  return widths[type];
}

export function depthCm(type: HarrowType): number {
  const depths: Record<HarrowType, number> = {
    spike: 8, disc: 15, chain: 3, spring_tine: 10, power: 20,
  };
  return depths[type];
}

export function tineCount(workingWidthM: number, spacingCm: number): number {
  if (spacingCm <= 0) return 0;
  return Math.ceil(workingWidthM * 100 / spacingCm);
}

export function draftForceKn(type: HarrowType, workingWidthM: number): number {
  const forcePerM: Record<HarrowType, number> = {
    spike: 0.3, disc: 0.8, chain: 0.15, spring_tine: 0.5, power: 1.2,
  };
  return parseFloat((forcePerM[type] * workingWidthM).toFixed(1));
}

export function areaPerHourHectares(workingWidthM: number, speedKph: number): number {
  return parseFloat((workingWidthM * speedKph / 10).toFixed(2));
}

export function passesNeeded(type: HarrowType): number {
  const passes: Record<HarrowType, number> = {
    spike: 3, disc: 2, chain: 4, spring_tine: 2, power: 1,
  };
  return passes[type];
}

export function weightKg(type: HarrowType): number {
  const weights: Record<HarrowType, number> = {
    spike: 80, disc: 300, chain: 50, spring_tine: 150, power: 500,
  };
  return weights[type];
}

export function soilBreakupRating(type: HarrowType): number {
  const ratings: Record<HarrowType, number> = {
    spike: 5, disc: 8, chain: 3, spring_tine: 6, power: 9,
  };
  return ratings[type];
}

export function weedControlRating(type: HarrowType): number {
  const ratings: Record<HarrowType, number> = {
    spike: 6, disc: 7, chain: 8, spring_tine: 7, power: 9,
  };
  return ratings[type];
}

export function costEstimate(type: HarrowType, baseCost: number): number {
  const multipliers: Record<HarrowType, number> = {
    spike: 0.5, disc: 1.5, chain: 0.3, spring_tine: 1.0, power: 2.5,
  };
  return parseFloat((baseCost * multipliers[type]).toFixed(2));
}

export function harrowTypes(): HarrowType[] {
  return ["spike", "disc", "chain", "spring_tine", "power"];
}

export type WoodDecay = "fresh" | "one_year" | "two_year" | "punky" | "charcoal";

export function moundHeightM(woodVolumeCubicM: number): number {
  return Math.round(woodVolumeCubicM * 0.8 * 10) / 10;
}

export function waterRetentionRating(decay: WoodDecay): number {
  const retention: Record<WoodDecay, number> = {
    fresh: 1, one_year: 3, two_year: 4, punky: 5, charcoal: 2,
  };
  return retention[decay];
}

export function nitrogenRobYears(decay: WoodDecay): number {
  const years: Record<WoodDecay, number> = {
    fresh: 3, one_year: 2, two_year: 1, punky: 0, charcoal: 0,
  };
  return years[decay];
}

export function soilCapM3(moundHeightM: number, lengthM: number): number {
  return Math.round(moundHeightM * lengthM * 0.6 * 10) / 10;
}

export function settlementPercent(decay: WoodDecay): number {
  const settle: Record<WoodDecay, number> = {
    fresh: 40, one_year: 30, two_year: 20, punky: 10, charcoal: 5,
  };
  return settle[decay];
}

export function productiveYears(decay: WoodDecay): number {
  const years: Record<WoodDecay, number> = {
    fresh: 20, one_year: 15, two_year: 12, punky: 8, charcoal: 25,
  };
  return years[decay];
}

export function heatGenerationRating(decay: WoodDecay): number {
  const heat: Record<WoodDecay, number> = {
    fresh: 2, one_year: 4, two_year: 5, punky: 3, charcoal: 1,
  };
  return heat[decay];
}

export function compostLayerCm(): number {
  return 5;
}

export function costPerMeter(decay: WoodDecay): number {
  const costs: Record<WoodDecay, number> = {
    fresh: 10, one_year: 5, two_year: 3, punky: 0, charcoal: 8,
  };
  return costs[decay];
}

export function woodDecayStages(): WoodDecay[] {
  return ["fresh", "one_year", "two_year", "punky", "charcoal"];
}

export type TongJaw = "flat" | "bolt" | "scrolling" | "pickup" | "wolf_jaw";

export function reignLengthCm(jawType: TongJaw): number {
  const lengths: Record<TongJaw, number> = {
    flat: 40, bolt: 35, scrolling: 45, pickup: 30, wolf_jaw: 38,
  };
  return lengths[jawType];
}

export function jawWidthMm(stockSizeMm: number): number {
  return parseFloat((stockSizeMm + 3).toFixed(0));
}

export function jawThicknessMm(jawType: TongJaw): number {
  const thicknesses: Record<TongJaw, number> = {
    flat: 6, bolt: 8, scrolling: 5, pickup: 7, wolf_jaw: 10,
  };
  return thicknesses[jawType];
}

export function rivetDiameterMm(jawThicknessMm: number): number {
  return parseFloat((jawThicknessMm * 0.8).toFixed(1));
}

export function gripForceNewtons(leverageCm: number, handForceN: number): number {
  return parseFloat((handForceN * leverageCm / 5).toFixed(0));
}

export function stockSizeRangeMm(jawType: TongJaw): { min: number; max: number } {
  const ranges: Record<TongJaw, { min: number; max: number }> = {
    flat: { min: 3, max: 25 }, bolt: { min: 6, max: 19 },
    scrolling: { min: 3, max: 12 }, pickup: { min: 3, max: 50 },
    wolf_jaw: { min: 10, max: 40 },
  };
  return ranges[jawType];
}

export function materialWeightG(jawType: TongJaw): number {
  const weights: Record<TongJaw, number> = {
    flat: 800, bolt: 900, scrolling: 700, pickup: 600, wolf_jaw: 1100,
  };
  return weights[jawType];
}

export function forgingHeats(jawType: TongJaw): number {
  const heats: Record<TongJaw, number> = {
    flat: 4, bolt: 5, scrolling: 6, pickup: 3, wolf_jaw: 7,
  };
  return heats[jawType];
}

export function constructionTimeMinutes(jawType: TongJaw): number {
  const mins: Record<TongJaw, number> = {
    flat: 45, bolt: 60, scrolling: 75, pickup: 30, wolf_jaw: 90,
  };
  return mins[jawType];
}

export function tongJaws(): TongJaw[] {
  return ["flat", "bolt", "scrolling", "pickup", "wolf_jaw"];
}

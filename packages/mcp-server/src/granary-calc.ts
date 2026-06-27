export type GrainType = "wheat" | "barley" | "oats" | "rye" | "millet";

export function storageVolumeM3(lengthM: number, widthM: number, heightM: number): number {
  return parseFloat((lengthM * widthM * heightM).toFixed(1));
}

export function capacityKg(volumeM3: number, grain: GrainType): number {
  const densities: Record<GrainType, number> = {
    wheat: 770, barley: 620, oats: 430, rye: 720, millet: 760,
  };
  return parseFloat((volumeM3 * densities[grain]).toFixed(1));
}

export function wallPressureKpa(grainHeightM: number, grain: GrainType): number {
  const densities: Record<GrainType, number> = {
    wheat: 770, barley: 620, oats: 430, rye: 720, millet: 760,
  };
  return parseFloat((densities[grain] * 9.81 * grainHeightM / 1000 * 0.4).toFixed(2));
}

export function ventilationOpenings(floorAreaM2: number): number {
  return Math.max(2, Math.ceil(floorAreaM2 / 5));
}

export function moistureCheckIntervalDays(grain: GrainType): number {
  const intervals: Record<GrainType, number> = {
    wheat: 14, barley: 10, oats: 7, rye: 14, millet: 21,
  };
  return intervals[grain];
}

export function ratGuardCount(perimeterM: number): number {
  return Math.max(2, Math.ceil(perimeterM / 3));
}

export function dryingDays(moisturePercent: number, targetPercent: number): number {
  if (moisturePercent <= targetPercent) return 0;
  return Math.ceil((moisturePercent - targetPercent) * 2);
}

export function spoilageLossPercent(storageDays: number, ventilationQuality: number): number {
  const baseLoss = storageDays * 0.01;
  const reduction = ventilationQuality * 0.1;
  return parseFloat(Math.max(0, baseLoss - reduction).toFixed(2));
}

export function turnoverIntervalDays(grain: GrainType): number {
  const intervals: Record<GrainType, number> = {
    wheat: 30, barley: 21, oats: 14, rye: 30, millet: 45,
  };
  return intervals[grain];
}

export function constructionCost(floorAreaM2: number, baseCostPerM2: number): number {
  return parseFloat((floorAreaM2 * baseCostPerM2 * 1.3).toFixed(2));
}

export function grainTypes(): GrainType[] {
  return ["wheat", "barley", "oats", "rye", "millet"];
}

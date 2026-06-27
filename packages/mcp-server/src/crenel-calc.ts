export type CrenelProfile = "rectangular" | "rounded" | "stepped" | "beveled" | "loophole";

export function openingWidth(wallThicknessCm: number): number {
  return parseFloat((wallThicknessCm * 0.4).toFixed(1));
}

export function openingHeight(merlonHeightCm: number): number {
  return parseFloat((merlonHeightCm * 0.7).toFixed(1));
}

export function sillHeight(wallHeightCm: number): number {
  return parseFloat((wallHeightCm * 0.65).toFixed(1));
}

export function fieldOfFireDeg(openingWidthCm: number, wallThicknessCm: number): number {
  if (wallThicknessCm <= 0) return 0;
  return parseFloat((2 * Math.atan(openingWidthCm / (2 * wallThicknessCm)) * 180 / Math.PI).toFixed(1));
}

export function ventilationArea(widthCm: number, heightCm: number, count: number): number {
  return parseFloat((widthCm * heightCm * count / 10000).toFixed(2));
}

export function coverPercent(merlonWidthCm: number, crenelWidthCm: number): number {
  const total = merlonWidthCm + crenelWidthCm;
  if (total <= 0) return 0;
  return parseFloat((merlonWidthCm / total * 100).toFixed(1));
}

export function defenseRating(wallThicknessCm: number, profile: CrenelProfile): number {
  const multipliers: Record<CrenelProfile, number> = {
    rectangular: 1.0, rounded: 0.9, stepped: 1.3, beveled: 1.1, loophole: 1.5,
  };
  return parseFloat((wallThicknessCm * multipliers[profile] / 10).toFixed(1));
}

export function shutterArea(widthCm: number, heightCm: number): number {
  return parseFloat((widthCm * heightCm / 10000).toFixed(3));
}

export function weatheringDepthMm(ageYears: number, exposureRating: number): number {
  return parseFloat((Math.sqrt(ageYears) * exposureRating * 0.3).toFixed(1));
}

export function repairStonesNeeded(damagedCount: number, avgBlockVolumeCm3: number): number {
  return Math.ceil(damagedCount * 1.15);
}

export function crenelProfiles(): CrenelProfile[] {
  return ["rectangular", "rounded", "stepped", "beveled", "loophole"];
}

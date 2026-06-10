export type MoatType = "wet" | "dry" | "tidal" | "double" | "partial";

export function widthM(wallHeightM: number): number {
  return parseFloat((wallHeightM * 1.5).toFixed(2));
}

export function depthM(widthM: number): number {
  return parseFloat((widthM * 0.4).toFixed(2));
}

export function crossSectionAreaM2(widthM: number, depthM: number): number {
  return parseFloat((widthM * depthM * 0.8).toFixed(2));
}

export function perimeterLengthM(curtainLengthM: number): number {
  return parseFloat((curtainLengthM + 20).toFixed(1));
}

export function volumeM3(crossSectionAreaM2: number, perimeterLengthM: number): number {
  return parseFloat((crossSectionAreaM2 * perimeterLengthM).toFixed(1));
}

export function waterSourceFlowLps(volumeM3: number, fillDays: number): number {
  if (fillDays <= 0) return 0;
  return parseFloat((volumeM3 / (fillDays * 86400) * 1000).toFixed(2));
}

export function excavationDays(volumeM3: number, workersCount: number): number {
  if (workersCount <= 0) return 0;
  return Math.ceil(volumeM3 / (workersCount * 2));
}

export function retainingWallLengthM(perimeterLengthM: number, sides: number): number {
  return parseFloat((perimeterLengthM * sides).toFixed(1));
}

export function defenseRating(moatType: MoatType): number {
  const ratings: Record<MoatType, number> = {
    wet: 8, dry: 5, tidal: 7, double: 10, partial: 4,
  };
  return ratings[moatType];
}

export function maintenanceCostPerYear(volumeM3: number, moatType: MoatType, baseCost: number): number {
  const multipliers: Record<MoatType, number> = {
    wet: 1.5, dry: 0.5, tidal: 2.0, double: 2.5, partial: 0.8,
  };
  return parseFloat((volumeM3 * baseCost * multipliers[moatType] / 1000).toFixed(2));
}

export function moatTypes(): MoatType[] {
  return ["wet", "dry", "tidal", "double", "partial"];
}

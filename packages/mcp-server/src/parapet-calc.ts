export type ParapetType = "solid" | "perforated" | "balustraded" | "crenellated" | "stepped";

export function heightCm(buildingHeightM: number): number {
  return parseFloat((Math.max(90, buildingHeightM * 100 * 0.02 + 90)).toFixed(0));
}

export function thicknessCm(wallThicknessCm: number): number {
  return parseFloat((wallThicknessCm * 0.6).toFixed(1));
}

export function lengthM(perimeterM: number, openingsM: number): number {
  return parseFloat((perimeterM - openingsM).toFixed(1));
}

export function volumeM3(lengthM: number, heightCm: number, thicknessCm: number): number {
  return parseFloat((lengthM * heightCm / 100 * thicknessCm / 100).toFixed(2));
}

export function weightKg(volumeM3: number, densityKgPerM3: number): number {
  return parseFloat((volumeM3 * densityKgPerM3).toFixed(0));
}

export function copingLengthM(parapetLengthM: number, overlapPercent: number): number {
  return parseFloat((parapetLengthM * (1 + overlapPercent / 100)).toFixed(1));
}

export function drainageSlope(lengthM: number): number {
  return parseFloat((lengthM * 0.02).toFixed(3));
}

export function windLoadKpa(heightM: number, windSpeedMps: number): number {
  return parseFloat((0.5 * 1.225 * windSpeedMps * windSpeedMps * 1.3 / 1000).toFixed(3));
}

export function flashingLengthM(parapetLengthM: number): number {
  return parseFloat((parapetLengthM * 2.2).toFixed(1));
}

export function maintenanceCostPerYear(type: ParapetType, lengthM: number): number {
  const costPerM: Record<ParapetType, number> = {
    solid: 5, perforated: 8, balustraded: 15, crenellated: 12, stepped: 7,
  };
  return parseFloat((costPerM[type] * lengthM).toFixed(2));
}

export function parapetTypes(): ParapetType[] {
  return ["solid", "perforated", "balustraded", "crenellated", "stepped"];
}

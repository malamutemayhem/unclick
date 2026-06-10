export type ImpostProfile = "chamfered" | "molded" | "cushion" | "splayed" | "carved";

export function widthCm(archSpanCm: number): number {
  return parseFloat((archSpanCm * 0.08).toFixed(1));
}

export function heightCm(widthCm: number): number {
  return parseFloat((widthCm * 1.5).toFixed(1));
}

export function projectionCm(wallThicknessCm: number): number {
  return parseFloat((wallThicknessCm * 0.12).toFixed(1));
}

export function bearingAreaCm2(widthCm: number, depthCm: number): number {
  return parseFloat((widthCm * depthCm).toFixed(1));
}

export function loadCapacityKn(bearingAreaCm2: number, stoneMpa: number): number {
  return parseFloat((bearingAreaCm2 / 10000 * stoneMpa * 1000).toFixed(1));
}

export function moldingLayers(profile: ImpostProfile): number {
  const layers: Record<ImpostProfile, number> = {
    chamfered: 1, molded: 3, cushion: 2, splayed: 1, carved: 4,
  };
  return layers[profile];
}

export function carvingHours(profile: ImpostProfile, lengthCm: number): number {
  const rates: Record<ImpostProfile, number> = {
    chamfered: 0.5, molded: 1.2, cushion: 0.8, splayed: 0.4, carved: 2.0,
  };
  return parseFloat((rates[profile] * lengthCm / 10).toFixed(1));
}

export function springLineHeightM(columnHeightM: number): number {
  return parseFloat((columnHeightM * 0.95).toFixed(2));
}

export function weightKg(widthCm: number, heightCm: number, depthCm: number, densityGPerCm3: number): number {
  return parseFloat((widthCm * heightCm * depthCm * densityGPerCm3 / 1000).toFixed(1));
}

export function restorationCostPerUnit(profile: ImpostProfile, costPerHour: number): number {
  const hours: Record<ImpostProfile, number> = {
    chamfered: 3, molded: 8, cushion: 5, splayed: 3, carved: 14,
  };
  return parseFloat((hours[profile] * costPerHour).toFixed(2));
}

export function impostProfiles(): ImpostProfile[] {
  return ["chamfered", "molded", "cushion", "splayed", "carved"];
}

export type SailType = "mainsail" | "jib" | "genoa" | "spinnaker" | "storm_jib";
export type PointOfSail = "close_hauled" | "beam_reach" | "broad_reach" | "running" | "close_reach";

export function sailArea(luffM: number, footM: number): number {
  return parseFloat((0.5 * luffM * footM).toFixed(1));
}

export function hullSpeed(waterlineLengthFt: number): number {
  return parseFloat((1.34 * Math.sqrt(waterlineLengthFt)).toFixed(1));
}

export function displacement(lengthM: number, beamM: number, draftM: number, blockCoeff: number = 0.5): number {
  return parseFloat((lengthM * beamM * draftM * blockCoeff * 1025).toFixed(0));
}

export function stabilityRatio(ballastKg: number, displacementKg: number): number {
  return parseFloat((ballastKg / displacementKg * 100).toFixed(1));
}

export function heelAngle(windSpeedKnots: number, sailAreaM2: number, displacementKg: number): number {
  const force = 0.5 * 1.225 * (windSpeedKnots * 0.5144) ** 2 * sailAreaM2;
  const angleDeg = Math.atan(force / (displacementKg * 9.81 * 0.3)) * 180 / Math.PI;
  return parseFloat(Math.min(angleDeg, 45).toFixed(1));
}

export function vmg(boatSpeedKnots: number, angleToWindDeg: number): number {
  const rad = angleToWindDeg * Math.PI / 180;
  return parseFloat((boatSpeedKnots * Math.cos(rad)).toFixed(1));
}

export function apparentWind(trueWindKnots: number, boatSpeedKnots: number, angleDeg: number): number {
  const rad = angleDeg * Math.PI / 180;
  const wx = trueWindKnots * Math.cos(rad) - boatSpeedKnots;
  const wy = trueWindKnots * Math.sin(rad);
  return parseFloat(Math.sqrt(wx ** 2 + wy ** 2).toFixed(1));
}

export function reefPoint(windSpeedKnots: number): number {
  if (windSpeedKnots < 15) return 0;
  if (windSpeedKnots < 25) return 1;
  if (windSpeedKnots < 35) return 2;
  return 3;
}

export function anchorScope(depthM: number, conditions: "calm" | "moderate" | "storm"): number {
  const ratio: Record<string, number> = { calm: 5, moderate: 7, storm: 10 };
  return parseFloat((depthM * ratio[conditions]).toFixed(0));
}

export function chainWeight(lengthM: number, sizeMm: number): number {
  return parseFloat((lengthM * sizeMm ** 2 * 0.0218).toFixed(1));
}

export function fuelConsumption(engineHp: number, loadPercent: number = 0.75): number {
  return parseFloat((engineHp * loadPercent * 0.25).toFixed(1));
}

export function watermaker(crewSize: number, daysAtSea: number): number {
  return Math.ceil(crewSize * 3 * daysAtSea);
}

export function etaHours(distanceNm: number, avgSpeedKnots: number): number {
  return parseFloat((distanceNm / avgSpeedKnots).toFixed(1));
}

export function sailTypes(): SailType[] {
  return ["mainsail", "jib", "genoa", "spinnaker", "storm_jib"];
}

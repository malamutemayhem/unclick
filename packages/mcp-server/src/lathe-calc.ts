export type LatheOperation = "roughing" | "finishing" | "parting" | "boring" | "threading";

export function spindleSpeedRpm(diameterMm: number, cuttingSpeedMPerMin: number): number {
  if (diameterMm <= 0) return 0;
  return Math.round((cuttingSpeedMPerMin * 1000) / (Math.PI * diameterMm));
}

export function feedRateMmPerRev(operation: LatheOperation): number {
  const rates: Record<LatheOperation, number> = {
    roughing: 0.3, finishing: 0.05, parting: 0.1, boring: 0.15, threading: 0.0,
  };
  return rates[operation];
}

export function depthOfCutMm(operation: LatheOperation): number {
  const depths: Record<LatheOperation, number> = {
    roughing: 2.5, finishing: 0.2, parting: 0, boring: 1.0, threading: 0.5,
  };
  return depths[operation];
}

export function materialRemovalRateCm3PerMin(spindleSpeedRpm: number, feedMmPerRev: number, depthOfCutMm: number, diameterMm: number): number {
  return parseFloat((Math.PI * diameterMm * depthOfCutMm * feedMmPerRev * spindleSpeedRpm / 1000000).toFixed(3));
}

export function machiningTimeMinutes(lengthMm: number, feedMmPerRev: number, spindleSpeedRpm: number): number {
  if (feedMmPerRev <= 0 || spindleSpeedRpm <= 0) return 0;
  return parseFloat((lengthMm / (feedMmPerRev * spindleSpeedRpm)).toFixed(2));
}

export function tailstockRequired(lengthToRatio: number): boolean {
  return lengthToRatio > 3;
}

export function steadyRestRequired(lengthToRatio: number): boolean {
  return lengthToRatio > 8;
}

export function chuckJawCount(workpieceShape: "round" | "hex" | "square"): number {
  const jaws: Record<string, number> = { round: 3, hex: 6, square: 4 };
  return jaws[workpieceShape];
}

export function surfaceFinishRa(feedMmPerRev: number, noseRadiusMm: number): number {
  if (noseRadiusMm <= 0) return 0;
  return parseFloat(((feedMmPerRev * feedMmPerRev * 1000) / (8 * noseRadiusMm)).toFixed(3));
}

export function toolLifeMinutes(cuttingSpeedMPerMin: number): number {
  return Math.round(10000 / (cuttingSpeedMPerMin * 0.5));
}

export function latheOperations(): LatheOperation[] {
  return ["roughing", "finishing", "parting", "boring", "threading"];
}

export type BilgePumpType = "hand" | "windmill" | "chain" | "diaphragm" | "centrifugal";

export function volumeLiters(hullLengthM: number, hullBeamM: number, depthCm: number): number {
  return parseFloat((hullLengthM * hullBeamM * depthCm / 100 * 0.3 * 1000).toFixed(1));
}

export function pumpRateLpm(pumpType: BilgePumpType): number {
  const rates: Record<BilgePumpType, number> = {
    hand: 30, windmill: 60, chain: 45, diaphragm: 50, centrifugal: 120,
  };
  return rates[pumpType];
}

export function pumpTimeMinutes(volumeLiters: number, pumpRateLpm: number): number {
  if (pumpRateLpm <= 0) return 0;
  return parseFloat((volumeLiters / pumpRateLpm).toFixed(1));
}

export function leakRateLph(hullCondition: "good" | "fair" | "poor"): number {
  const rates: Record<string, number> = {
    good: 5, fair: 20, poor: 80,
  };
  return rates[hullCondition];
}

export function strumBoxSizeCm(pipesDiameterCm: number): number {
  return parseFloat((pipesDiameterCm * 3).toFixed(1));
}

export function hoseInternalDiameterCm(pumpRateLpm: number): number {
  return parseFloat((Math.sqrt(pumpRateLpm / 10) + 2).toFixed(1));
}

export function limberHoleCount(frameCount: number): number {
  return frameCount;
}

export function alarmLevelCm(maxDepthCm: number): number {
  return parseFloat((maxDepthCm * 0.3).toFixed(1));
}

export function maintenanceIntervalDays(pumpType: BilgePumpType): number {
  const days: Record<BilgePumpType, number> = {
    hand: 30, windmill: 14, chain: 21, diaphragm: 60, centrifugal: 90,
  };
  return days[pumpType];
}

export function installCost(pumpType: BilgePumpType, baseCost: number): number {
  const multipliers: Record<BilgePumpType, number> = {
    hand: 1.0, windmill: 2.5, chain: 1.5, diaphragm: 2.0, centrifugal: 3.0,
  };
  return parseFloat((baseCost * multipliers[pumpType]).toFixed(2));
}

export function bilgePumpTypes(): BilgePumpType[] {
  return ["hand", "windmill", "chain", "diaphragm", "centrifugal"];
}

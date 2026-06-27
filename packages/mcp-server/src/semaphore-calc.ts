export type SemaphoreSystem = "flag" | "shutter" | "arm" | "light";

export function armPositions(): number {
  return 8;
}

export function signalCombinations(positions: number, arms: number): number {
  return Math.pow(positions, arms);
}

export function maxRangeKm(armLengthM: number, visibility: string): number {
  const factors: Record<string, number> = { clear: 1, hazy: 0.5, foggy: 0.15, rain: 0.3 };
  const f = factors[visibility] || 1;
  return parseFloat((armLengthM * 0.8 * f).toFixed(1));
}

export function signalRatePerMin(operatorSkill: string): number {
  const rates: Record<string, number> = { novice: 2, trained: 5, expert: 8 };
  return rates[operatorSkill] || 5;
}

export function towerSpacingKm(armLengthM: number): number {
  return parseFloat((armLengthM * 0.6).toFixed(1));
}

export function towerCount(routeKm: number, spacingKm: number): number {
  if (spacingKm <= 0) return 0;
  return Math.ceil(routeKm / spacingKm) + 1;
}

export function messageTimeMin(characters: number, ratePerMin: number, towers: number): number {
  if (ratePerMin <= 0) return 0;
  return parseFloat((characters / ratePerMin * towers * 0.3).toFixed(1));
}

export function errorRate(visibility: string, distance: number): number {
  const base: Record<string, number> = { clear: 0.01, hazy: 0.05, foggy: 0.2, rain: 0.1 };
  const b = base[visibility] || 0.05;
  return parseFloat(Math.min(1, b * (1 + distance / 10)).toFixed(3));
}

export function flagAngle(position: number): number {
  return (position % 8) * 45;
}

export function crewPerTower(system: SemaphoreSystem): number {
  const crew: Record<SemaphoreSystem, number> = { flag: 2, shutter: 1, arm: 2, light: 1 };
  return crew[system];
}

export function semaphoreSystems(): SemaphoreSystem[] {
  return ["flag", "shutter", "arm", "light"];
}

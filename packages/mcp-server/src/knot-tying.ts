export type KnotCategory = "stopper" | "bend" | "hitch" | "loop" | "binding" | "decorative";
export type RopeType = "nylon" | "polyester" | "hemp" | "manila" | "paracord" | "dyneema";

export function knotStrength(category: KnotCategory): number {
  const pct: Record<KnotCategory, number> = {
    stopper: 65, bend: 55, hitch: 60, loop: 70, binding: 50, decorative: 40,
  };
  return pct[category];
}

export function breakingLoad(ropeBreakingKg: number, knotStrengthPct: number): number {
  return parseFloat((ropeBreakingKg * knotStrengthPct / 100).toFixed(0));
}

export function ropeDiameter(loadKg: number, safetyFactor: number = 10): number {
  const breakingNeeded = loadKg * safetyFactor;
  return parseFloat(Math.sqrt(breakingNeeded / 800).toFixed(1));
}

export function knotVolume(ropeDiameterMm: number, category: KnotCategory): number {
  const factor: Record<KnotCategory, number> = {
    stopper: 3, bend: 5, hitch: 4, loop: 6, binding: 4, decorative: 8,
  };
  const r = ropeDiameterMm / 2;
  return parseFloat((factor[category] * Math.PI * r * r).toFixed(1));
}

export function cordNeeded(knotCount: number, ropeDiameterMm: number, category: KnotCategory): number {
  const multiplier: Record<KnotCategory, number> = {
    stopper: 5, bend: 10, hitch: 8, loop: 12, binding: 6, decorative: 20,
  };
  return parseFloat((knotCount * ropeDiameterMm * multiplier[category] / 10).toFixed(1));
}

export function difficulty(category: KnotCategory): number {
  const levels: Record<KnotCategory, number> = {
    stopper: 1, hitch: 2, loop: 3, bend: 3, binding: 4, decorative: 5,
  };
  return levels[category];
}

export function tyingTime(difficulty: number): number {
  return Math.round(10 + difficulty * 15);
}

export function ropeStrength(type: RopeType, diameterMm: number): number {
  const strengthPerMm2: Record<RopeType, number> = {
    nylon: 8, polyester: 7, hemp: 3, manila: 2.5, paracord: 6, dyneema: 20,
  };
  const area = Math.PI * (diameterMm / 2) ** 2;
  return parseFloat((area * strengthPerMm2[type]).toFixed(0));
}

export function spliceStrength(ropeStrengthKg: number): number {
  return parseFloat((ropeStrengthKg * 0.9).toFixed(0));
}

export function whippingLength(ropeDiameterMm: number): number {
  return parseFloat((ropeDiameterMm * 1.5).toFixed(1));
}

export function fuseMelting(type: RopeType): boolean {
  return type === "nylon" || type === "polyester" || type === "paracord" || type === "dyneema";
}

export function knotCategories(): KnotCategory[] {
  return ["stopper", "bend", "hitch", "loop", "binding", "decorative"];
}

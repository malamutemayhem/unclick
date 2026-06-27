export type ArmorSteel = "mild" | "hardened" | "spring" | "case_hardened" | "stainless";

export function shoulderCoverage(shoulderWidthCm: number): number {
  return parseFloat((shoulderWidthCm * 1.3).toFixed(1));
}

export function plateCount(articulationLevel: string): number {
  const counts: Record<string, number> = { rigid: 1, light: 3, medium: 5, full: 8 };
  return counts[articulationLevel] || 5;
}

export function weightKg(shoulderWidthCm: number, thicknessMm: number, steel: ArmorSteel): number {
  const density: Record<ArmorSteel, number> = { mild: 7.85, hardened: 7.8, spring: 7.8, case_hardened: 7.85, stainless: 7.75 };
  const area = shoulderWidthCm * shoulderWidthCm * 0.5;
  return parseFloat((area * thicknessMm / 10 * density[steel] / 1000).toFixed(2));
}

export function rivets(plateCount: number, rivetsPerJoint: number): number {
  return (plateCount - 1) * rivetsPerJoint;
}

export function mobilityPercent(plateCount: number): number {
  return parseFloat(Math.min(95, 50 + plateCount * 6).toFixed(0));
}

export function deflectionAngle(thicknessMm: number, curvatureRadius: number): number {
  if (curvatureRadius <= 0) return 0;
  return parseFloat((45 + thicknessMm * 5 + 100 / curvatureRadius).toFixed(1));
}

export function paddingThicknessCm(armorWeightKg: number): number {
  return parseFloat((0.5 + armorWeightKg * 0.15).toFixed(1));
}

export function strapLength(shoulderCircumferenceCm: number): number {
  return parseFloat((shoulderCircumferenceCm * 0.8 + 10).toFixed(0));
}

export function forgingHeats(thicknessMm: number, steel: ArmorSteel): number {
  const base: Record<ArmorSteel, number> = { mild: 2, hardened: 4, spring: 3, case_hardened: 5, stainless: 3 };
  return Math.ceil(base[steel] + thicknessMm * 0.5);
}

export function armorSteels(): ArmorSteel[] {
  return ["mild", "hardened", "spring", "case_hardened", "stainless"];
}

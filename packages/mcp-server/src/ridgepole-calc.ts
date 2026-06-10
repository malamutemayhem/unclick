export type RidgeJoint = "butt" | "scarf" | "lap" | "mortise" | "bolted";

export function lengthM(buildingLengthM: number, overhangM: number): number {
  return parseFloat((buildingLengthM + 2 * overhangM).toFixed(2));
}

export function sectionSizeCm(spanM: number, loadKgPerM: number): number {
  return parseFloat((Math.sqrt(spanM * loadKgPerM / 10) * 2).toFixed(1));
}

export function weightKg(lengthM: number, sectionCm: number, densityKgPerM3: number): number {
  const sideM = sectionCm / 100;
  return parseFloat((lengthM * sideM * sideM * densityKgPerM3).toFixed(1));
}

export function jointCount(lengthM: number, maxTimberLengthM: number): number {
  if (maxTimberLengthM <= 0) return 0;
  return Math.max(0, Math.ceil(lengthM / maxTimberLengthM) - 1);
}

export function jointStrengthPercent(joint: RidgeJoint): number {
  const pct: Record<RidgeJoint, number> = {
    butt: 30, scarf: 70, lap: 60, mortise: 80, bolted: 90,
  };
  return pct[joint];
}

export function rafterBirdsmouthDepthCm(rafterDepthCm: number): number {
  return parseFloat((rafterDepthCm * 0.3).toFixed(1));
}

export function sagMm(lengthM: number, loadKgPerM: number, eI: number): number {
  if (eI <= 0) return 0;
  return parseFloat((5 * loadKgPerM * 9.81 * Math.pow(lengthM, 4) / (384 * eI) * 1000).toFixed(1));
}

export function camberMm(spanM: number): number {
  return parseFloat((spanM * 1000 / 200).toFixed(1));
}

export function purglinCount(spanM: number, spacingM: number): number {
  if (spacingM <= 0) return 0;
  return Math.ceil(spanM / spacingM) - 1;
}

export function installCrewSize(lengthM: number, weightKg: number): number {
  if (weightKg <= 50) return 2;
  if (weightKg <= 200) return 4;
  return Math.ceil(weightKg / 50);
}

export function ridgeJoints(): RidgeJoint[] {
  return ["butt", "scarf", "lap", "mortise", "bolted"];
}

export type QuoinPattern = "alternating" | "stacked" | "rusticated" | "chamfered" | "vermiculated";

export function blockCount(cornerHeightCm: number, courseHeightCm: number): number {
  if (courseHeightCm <= 0) return 0;
  return Math.ceil(cornerHeightCm / courseHeightCm);
}

export function projectionCm(wallThicknessCm: number): number {
  return parseFloat((wallThicknessCm * 0.08).toFixed(1));
}

export function blockVolumeCm3(widthCm: number, heightCm: number, depthCm: number): number {
  return parseFloat((widthCm * heightCm * depthCm).toFixed(0));
}

export function weightKg(volumeCm3: number, densityGPerCm3: number): number {
  return parseFloat((volumeCm3 * densityGPerCm3 / 1000).toFixed(1));
}

export function mortarJointMm(pattern: QuoinPattern): number {
  const joints: Record<QuoinPattern, number> = {
    alternating: 10, stacked: 8, rusticated: 15, chamfered: 6, vermiculated: 12,
  };
  return joints[pattern];
}

export function cornerStrength(blockCount: number, projectionCm: number): number {
  return parseFloat((blockCount * projectionCm * 0.5).toFixed(1));
}

export function carvingHoursPerBlock(pattern: QuoinPattern): number {
  const hours: Record<QuoinPattern, number> = {
    alternating: 0.5, stacked: 0.3, rusticated: 2, chamfered: 1, vermiculated: 4,
  };
  return hours[pattern];
}

export function totalCarvingHours(blockCount: number, pattern: QuoinPattern): number {
  return parseFloat((blockCount * carvingHoursPerBlock(pattern)).toFixed(1));
}

export function weatheringDepthMm(ageYears: number, exposure: number): number {
  return parseFloat((Math.sqrt(ageYears) * exposure * 0.25).toFixed(1));
}

export function repairCostPerBlock(volumeCm3: number, stonePricePerCm3: number, laborHours: number, laborRate: number): number {
  return parseFloat((volumeCm3 * stonePricePerCm3 + laborHours * laborRate).toFixed(2));
}

export function quoinPatterns(): QuoinPattern[] {
  return ["alternating", "stacked", "rusticated", "chamfered", "vermiculated"];
}

export type HullMaterial = "willow" | "hazel" | "ash" | "bamboo";

export function frameDiameter(paddlerCount: number): number {
  return parseFloat((80 + paddlerCount * 30).toFixed(0));
}

export function skinArea(diameterCm: number, depthCm: number): number {
  const radius = diameterCm / 2;
  return parseFloat((Math.PI * radius * (radius + depthCm)).toFixed(0));
}

export function ribCount(diameterCm: number, spacingCm: number): number {
  if (spacingCm <= 0) return 0;
  return Math.ceil((Math.PI * diameterCm) / spacingCm);
}

export function buoyancyKg(volumeLiters: number): number {
  return parseFloat((volumeLiters * 1).toFixed(1));
}

export function displacement(diameterCm: number, depthCm: number): number {
  const radiusM = diameterCm / 200;
  const depthM = depthCm / 100;
  return parseFloat((Math.PI * radiusM * radiusM * depthM * 1000).toFixed(1));
}

export function paddleLength(paddlerHeightCm: number): number {
  return parseFloat((paddlerHeightCm * 0.7).toFixed(0));
}

export function hideWeight(areaCm2: number): number {
  return parseFloat((areaCm2 * 0.004).toFixed(0));
}

export function tarCoats(waterCondition: string): number {
  const coats: Record<string, number> = {
    calm: 2, moderate: 3, rough: 5,
  };
  return coats[waterCondition] || 3;
}

export function stabilityRating(diameterCm: number, depthCm: number): string {
  const ratio = diameterCm / depthCm;
  if (ratio > 4) return "stable";
  if (ratio > 2.5) return "moderate";
  return "tippy";
}

export function hullMaterials(): HullMaterial[] {
  return ["willow", "hazel", "ash", "bamboo"];
}

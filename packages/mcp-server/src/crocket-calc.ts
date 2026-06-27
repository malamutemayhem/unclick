export type CrocketForm = "leaf" | "bud" | "flower" | "animal" | "abstract";

export function spacingCm(edgeLengthCm: number, count: number): number {
  if (count <= 1) return edgeLengthCm;
  return parseFloat((edgeLengthCm / (count - 1)).toFixed(1));
}

export function projectionCm(edgeWidthCm: number): number {
  return parseFloat((edgeWidthCm * 1.5).toFixed(1));
}

export function heightCm(projectionCm: number): number {
  return parseFloat((projectionCm * 0.8).toFixed(1));
}

export function countPerEdge(edgeLengthCm: number, spacingCm: number): number {
  if (spacingCm <= 0) return 0;
  return Math.floor(edgeLengthCm / spacingCm) + 1;
}

export function totalCount(edgeCount: number, perEdge: number): number {
  return edgeCount * perEdge;
}

export function weightPerCrocketKg(projectionCm: number, heightCm: number, densityGPerCm3: number): number {
  const volumeCm3 = projectionCm * projectionCm * heightCm * 0.3;
  return parseFloat((volumeCm3 * densityGPerCm3 / 1000).toFixed(2));
}

export function carvingHoursEach(form: CrocketForm): number {
  const hours: Record<CrocketForm, number> = {
    leaf: 2, bud: 1.5, flower: 3, animal: 5, abstract: 1,
  };
  return hours[form];
}

export function totalCarvingHours(count: number, form: CrocketForm): number {
  return parseFloat((count * carvingHoursEach(form)).toFixed(1));
}

export function windExposureRating(heightAboveGroundM: number): number {
  return parseFloat((1 + Math.log10(heightAboveGroundM + 1)).toFixed(2));
}

export function repairCostEach(form: CrocketForm, materialCostPerKg: number, weightKg: number): number {
  const laborMultiplier = carvingHoursEach(form) * 50;
  return parseFloat((materialCostPerKg * weightKg + laborMultiplier).toFixed(2));
}

export function crocketForms(): CrocketForm[] {
  return ["leaf", "bud", "flower", "animal", "abstract"];
}

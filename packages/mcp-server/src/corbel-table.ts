export type CorbelProfile = "simple" | "scrolled" | "modillion" | "trefoil" | "grotesque";

export function corbelSpacingCm(wallLengthCm: number, count: number): number {
  if (count <= 1) return wallLengthCm;
  return parseFloat((wallLengthCm / (count - 1)).toFixed(1));
}

export function corbelCount(wallLengthCm: number, spacingCm: number): number {
  if (spacingCm <= 0) return 0;
  return Math.floor(wallLengthCm / spacingCm) + 1;
}

export function projectionCm(wallThicknessCm: number): number {
  return parseFloat((wallThicknessCm * 0.25).toFixed(1));
}

export function heightCm(projectionCm: number, profile: CorbelProfile): number {
  const ratios: Record<CorbelProfile, number> = {
    simple: 1.5, scrolled: 2.0, modillion: 1.8, trefoil: 2.2, grotesque: 2.5,
  };
  return parseFloat((projectionCm * ratios[profile]).toFixed(1));
}

export function loadCapacityKn(projectionCm: number, depthCm: number, stoneMpa: number): number {
  return parseFloat((projectionCm * depthCm / 10000 * stoneMpa * 100).toFixed(1));
}

export function archletSpan(spacingCm: number, corbelWidthCm: number): number {
  return parseFloat((spacingCm - corbelWidthCm).toFixed(1));
}

export function totalWeightKg(count: number, volumePerCorbelCm3: number, densityGPerCm3: number): number {
  return parseFloat((count * volumePerCorbelCm3 * densityGPerCm3 / 1000).toFixed(1));
}

export function carvingHoursEach(profile: CorbelProfile): number {
  const hours: Record<CorbelProfile, number> = {
    simple: 2, scrolled: 6, modillion: 4, trefoil: 8, grotesque: 12,
  };
  return hours[profile];
}

export function shadowAngle(projectionCm: number, sunAngleDeg: number): number {
  if (sunAngleDeg <= 0) return 0;
  const rad = sunAngleDeg * Math.PI / 180;
  return parseFloat((projectionCm / Math.tan(rad)).toFixed(1));
}

export function repairCostTotal(count: number, profile: CorbelProfile, costPerHour: number): number {
  return parseFloat((count * carvingHoursEach(profile) * costPerHour).toFixed(2));
}

export function corbelProfiles(): CorbelProfile[] {
  return ["simple", "scrolled", "modillion", "trefoil", "grotesque"];
}

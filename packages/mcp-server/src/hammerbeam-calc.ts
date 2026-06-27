export type RoofTimber = "oak" | "chestnut" | "elm" | "pine" | "cedar";

export function beamProjectionM(spanM: number): number {
  return parseFloat((spanM * 0.2).toFixed(2));
}

export function hammerPostHeight(spanM: number): number {
  return parseFloat((spanM * 0.35).toFixed(2));
}

export function archBraceLength(projectionM: number, postHeightM: number): number {
  return parseFloat(Math.sqrt(projectionM ** 2 + postHeightM ** 2).toFixed(2));
}

export function trussCount(buildingLengthM: number, spacingM: number): number {
  if (spacingM <= 0) return 0;
  return Math.ceil(buildingLengthM / spacingM) + 1;
}

export function timberVolumeM3(beamLengthM: number, widthCm: number, depthCm: number, count: number): number {
  return parseFloat((beamLengthM * widthCm / 100 * depthCm / 100 * count).toFixed(2));
}

export function angelFigureCount(trussCount: number): number {
  return trussCount * 2;
}

export function spanCapabilityM(timber: RoofTimber): number {
  const maxSpan: Record<RoofTimber, number> = {
    oak: 18, chestnut: 15, elm: 12, pine: 10, cedar: 11,
  };
  return maxSpan[timber];
}

export function roofWeightKgPerM2(timber: RoofTimber): number {
  const kgPerM2: Record<RoofTimber, number> = {
    oak: 45, chestnut: 38, elm: 42, pine: 30, cedar: 28,
  };
  return kgPerM2[timber];
}

export function carvingHoursPerTruss(decorationLevel: number): number {
  return parseFloat((decorationLevel * 12).toFixed(0));
}

export function structuralCheckInterval(ageYears: number): number {
  if (ageYears < 50) return 10;
  if (ageYears < 200) return 5;
  return 2;
}

export function roofTimbers(): RoofTimber[] {
  return ["oak", "chestnut", "elm", "pine", "cedar"];
}

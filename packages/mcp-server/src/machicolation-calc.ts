export type MachicolationType = "stone" | "timber" | "brick" | "corbelled" | "boxed";

export function openingWidthCm(wallThicknessCm: number): number {
  return parseFloat((wallThicknessCm * 0.3).toFixed(1));
}

export function openingLengthCm(spacingCm: number, supportWidthCm: number): number {
  return parseFloat((spacingCm - supportWidthCm).toFixed(1));
}

export function projectionCm(wallThicknessCm: number): number {
  return parseFloat((wallThicknessCm * 0.6).toFixed(1));
}

export function openingCount(wallLengthCm: number, spacingCm: number): number {
  if (spacingCm <= 0) return 0;
  return Math.floor(wallLengthCm / spacingCm);
}

export function corbelCount(openingCount: number, corbelsPerOpening: number): number {
  return openingCount * corbelsPerOpening;
}

export function dropHeight(wallHeightM: number, groundSlopePercent: number): number {
  return parseFloat((wallHeightM * (1 + groundSlopePercent / 100)).toFixed(1));
}

export function parapetheightCm(type: MachicolationType): number {
  const heights: Record<MachicolationType, number> = {
    stone: 120, timber: 100, brick: 110, corbelled: 130, boxed: 90,
  };
  return heights[type];
}

export function weightPerMeterKg(type: MachicolationType): number {
  const kgPerM: Record<MachicolationType, number> = {
    stone: 800, timber: 200, brick: 600, corbelled: 900, boxed: 250,
  };
  return kgPerM[type];
}

export function coverageAngleDeg(projectionCm: number, openingWidthCm: number): number {
  if (projectionCm <= 0) return 0;
  return parseFloat((Math.atan(openingWidthCm / projectionCm) * 180 / Math.PI).toFixed(1));
}

export function constructionDays(wallLengthM: number, type: MachicolationType): number {
  const daysPerM: Record<MachicolationType, number> = {
    stone: 2, timber: 0.5, brick: 1.5, corbelled: 2.5, boxed: 0.8,
  };
  return Math.ceil(wallLengthM * daysPerM[type]);
}

export function machicolationTypes(): MachicolationType[] {
  return ["stone", "timber", "brick", "corbelled", "boxed"];
}

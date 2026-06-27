export type CordType = "cotton" | "jute" | "hemp" | "nylon" | "polyester";
export type KnotType = "square" | "spiral" | "half_hitch" | "lark_head" | "gathering" | "berry";

export function cordLength(finishedLengthCm: number, knotType: KnotType): number {
  const multipliers: Record<KnotType, number> = {
    square: 4,
    spiral: 5,
    half_hitch: 3.5,
    lark_head: 2,
    gathering: 3,
    berry: 6,
  };
  return parseFloat((finishedLengthCm * multipliers[knotType]).toFixed(0));
}

export function cordCount(widthCm: number, cordDiameterMm: number, pattern: "dense" | "open" | "sparse"): number {
  const spacingMultiplier: Record<string, number> = { dense: 1.5, open: 3, sparse: 5 };
  const spacingMm = cordDiameterMm * spacingMultiplier[pattern];
  return Math.ceil((widthCm * 10) / spacingMm) * 2;
}

export function totalCord(cordLengthCm: number, cordCount: number): number {
  return parseFloat((cordLengthCm * cordCount / 100).toFixed(1));
}

export function cordWeight(totalMeters: number, diameterMm: number, type: CordType): number {
  const densityGPerMPerMm: Record<CordType, number> = {
    cotton: 3.5,
    jute: 4.0,
    hemp: 4.5,
    nylon: 2.5,
    polyester: 2.8,
  };
  return Math.round(totalMeters * diameterMm * densityGPerMPerMm[type]);
}

export function dowelLength(widthCm: number, overhangCm: number = 5): number {
  return widthCm + overhangCm * 2;
}

export function knotsPerRow(widthCm: number, knotWidthCm: number): number {
  return Math.floor(widthCm / knotWidthCm);
}

export function rowsNeeded(lengthCm: number, knotHeightCm: number): number {
  return Math.ceil(lengthCm / knotHeightCm);
}

export function fringeLength(totalLengthCm: number, fringePercent: number = 15): number {
  return parseFloat((totalLengthCm * fringePercent / 100).toFixed(1));
}

export function beadCount(rows: number, beadsPerRow: number = 1): number {
  return rows * beadsPerRow;
}

export function estimateTime(knotCount: number, minutesPerKnot: number = 0.5): number {
  return parseFloat((knotCount * minutesPerKnot / 60).toFixed(1));
}

export function projectDimensions(widthCm: number, lengthCm: number, fringeCm: number): { totalWidth: number; totalLength: number } {
  return {
    totalWidth: widthCm,
    totalLength: parseFloat((lengthCm + fringeCm).toFixed(1)),
  };
}

export function cordCost(totalMeters: number, pricePerMeter: number): number {
  return parseFloat((totalMeters * pricePerMeter).toFixed(2));
}

export function knotDensity(knotsPerCm2: number): string {
  if (knotsPerCm2 < 0.5) return "loose";
  if (knotsPerCm2 < 1.5) return "medium";
  return "tight";
}

export function hangingWeight(cordWeightG: number, dowelWeightG: number, beadWeightG: number = 0): number {
  return cordWeightG + dowelWeightG + beadWeightG;
}

export function cordTypes(): CordType[] {
  return ["cotton", "jute", "hemp", "nylon", "polyester"];
}

export function knotTypes(): KnotType[] {
  return ["square", "spiral", "half_hitch", "lark_head", "gathering", "berry"];
}

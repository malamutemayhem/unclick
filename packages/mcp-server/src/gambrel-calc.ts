export type RoofCovering = "shingle" | "slate" | "metal" | "thatch" | "tile";

export function upperSlope(totalRise: number, upperRatio: number): number {
  return parseFloat((Math.atan(upperRatio) * 180 / Math.PI).toFixed(1));
}

export function lowerSlope(totalRise: number, lowerRatio: number): number {
  return parseFloat((Math.atan(lowerRatio) * 180 / Math.PI).toFixed(1));
}

export function loftArea(spanM: number, lengthM: number, usablePercent: number): number {
  return parseFloat((spanM * lengthM * usablePercent / 100).toFixed(1));
}

export function rafterLength(rise: number, run: number): number {
  return parseFloat(Math.sqrt(rise * rise + run * run).toFixed(1));
}

export function totalRoofArea(spanM: number, lengthM: number, slopeFactor: number): number {
  return parseFloat((spanM * lengthM * slopeFactor).toFixed(1));
}

export function trussCount(lengthM: number, spacingCm: number): number {
  if (spacingCm <= 0) return 0;
  return Math.ceil(lengthM * 100 / spacingCm) + 1;
}

export function kneeWallHeight(totalRise: number, lowerSlopePercent: number): number {
  return parseFloat((totalRise * lowerSlopePercent / 100).toFixed(1));
}

export function coveringWeight(areaCm2: number, covering: RoofCovering): number {
  const kgPerM2: Record<RoofCovering, number> = { shingle: 15, slate: 55, metal: 5, thatch: 35, tile: 45 };
  return parseFloat((areaCm2 / 10000 * kgPerM2[covering]).toFixed(1));
}

export function ventilationArea(loftAreaM2: number): number {
  return parseFloat((loftAreaM2 / 150).toFixed(2));
}

export function snowLoad(areaCm2: number, snowDepthCm: number): number {
  return parseFloat((areaCm2 / 10000 * snowDepthCm * 1.5).toFixed(1));
}

export function roofCoverings(): RoofCovering[] {
  return ["shingle", "slate", "metal", "thatch", "tile"];
}

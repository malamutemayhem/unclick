export type CompassPoint = "cardinal" | "intercardinal" | "secondary" | "tertiary";

export function pointCount(resolution: CompassPoint): number {
  const counts: Record<CompassPoint, number> = {
    cardinal: 4, intercardinal: 8, secondary: 16, tertiary: 32,
  };
  return counts[resolution];
}

export function degreesPerPoint(resolution: CompassPoint): number {
  return 360 / pointCount(resolution);
}

export function bearingToDeg(bearingStr: "N" | "NE" | "E" | "SE" | "S" | "SW" | "W" | "NW"): number {
  const bearings: Record<string, number> = {
    N: 0, NE: 45, E: 90, SE: 135, S: 180, SW: 225, W: 270, NW: 315,
  };
  return bearings[bearingStr];
}

export function magneticDeclinationCorrection(trueBearing: number, declination: number): number {
  return ((trueBearing + declination) % 360 + 360) % 360;
}

export function roseDiameterCm(pointCount: number): number {
  return parseFloat((pointCount * 0.8 + 5).toFixed(1));
}

export function engravingHours(pointCount: number, detail: "simple" | "ornate"): number {
  const base = pointCount * 0.5;
  return detail === "ornate" ? base * 3 : base;
}

export function fleurDeLisHeightCm(roseDiameterCm: number): number {
  return parseFloat((roseDiameterCm * 0.15).toFixed(1));
}

export function lubberLineWidthMm(roseDiameterCm: number): number {
  return parseFloat((roseDiameterCm * 0.02 * 10).toFixed(1));
}

export function gimbalRingCount(marineGrade: boolean): number {
  return marineGrade ? 2 : 0;
}

export function materialCost(material: "brass" | "bronze" | "steel" | "wood", baseCost: number): number {
  const mult: Record<string, number> = { brass: 2.0, bronze: 2.5, steel: 1.5, wood: 1.0 };
  return parseFloat((baseCost * mult[material]).toFixed(2));
}

export function compassPoints(): CompassPoint[] {
  return ["cardinal", "intercardinal", "secondary", "tertiary"];
}

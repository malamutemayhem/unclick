export type EmbrasureType = "arrow_loop" | "cross_slit" | "gun_port" | "keyhole" | "oriel";

export function openingWidthCm(type: EmbrasureType): number {
  const widths: Record<EmbrasureType, number> = { arrow_loop: 8, cross_slit: 10, gun_port: 25, keyhole: 15, oriel: 60 };
  return widths[type];
}

export function openingHeightCm(type: EmbrasureType): number {
  const heights: Record<EmbrasureType, number> = { arrow_loop: 100, cross_slit: 120, gun_port: 20, keyhole: 80, oriel: 120 };
  return heights[type];
}

export function splayAngle(wallThicknessCm: number, innerWidthCm: number, outerWidthCm: number): number {
  if (wallThicknessCm <= 0) return 0;
  return parseFloat((Math.atan((innerWidthCm - outerWidthCm) / (2 * wallThicknessCm)) * 180 / Math.PI).toFixed(1));
}

export function fieldOfFire(splayAngle: number): number {
  return parseFloat((splayAngle * 2).toFixed(1));
}

export function coverageAngle(embrasureCount: number, wallLengthM: number): number {
  if (wallLengthM <= 0) return 0;
  return parseFloat(Math.min(360, embrasureCount * 30).toFixed(0));
}

export function lintelLoad(wallThicknessCm: number, openingWidthCm: number, stoneWeight: number): number {
  return parseFloat((wallThicknessCm * openingWidthCm * stoneWeight * 0.001).toFixed(1));
}

export function ventilationCfm(openingAreaCm2: number, windSpeed: number): number {
  return parseFloat((openingAreaCm2 * windSpeed * 0.0006).toFixed(1));
}

export function lightTransmission(openingAreaCm2: number, roomAreaM2: number): number {
  if (roomAreaM2 <= 0) return 0;
  return parseFloat(Math.min(100, openingAreaCm2 / (roomAreaM2 * 100) * 100).toFixed(1));
}

export function shutter(type: EmbrasureType): boolean {
  return type === "gun_port" || type === "oriel";
}

export function embrasureTypes(): EmbrasureType[] {
  return ["arrow_loop", "cross_slit", "gun_port", "keyhole", "oriel"];
}

export type MirrorType = "flat" | "prism" | "front_surface" | "polished_metal";

export function tubeLength(heightAboveWaterM: number): number {
  return parseFloat((heightAboveWaterM + 0.5).toFixed(2));
}

export function mirrorAngle(): number {
  return 45;
}

export function imageInversion(mirrors: number): boolean {
  return mirrors % 2 === 0;
}

export function fieldOfView(mirrorDiameterMm: number, tubeLengthMm: number): number {
  if (tubeLengthMm <= 0) return 0;
  return parseFloat((2 * Math.atan(mirrorDiameterMm / (2 * tubeLengthMm)) * 180 / Math.PI).toFixed(1));
}

export function lightLoss(mirrors: number, reflectivity: number): number {
  return parseFloat(((1 - Math.pow(reflectivity, mirrors)) * 100).toFixed(1));
}

export function reflectivity(type: MirrorType): number {
  const r: Record<MirrorType, number> = {
    flat: 0.85, prism: 0.95, front_surface: 0.97, polished_metal: 0.80,
  };
  return r[type];
}

export function tubeDiameter(mirrorDiameterMm: number): number {
  return parseFloat((mirrorDiameterMm * 1.4).toFixed(0));
}

export function rotationRange(): number {
  return 360;
}

export function objectDistance(elevationDeg: number, heightM: number): number {
  if (elevationDeg <= 0 || elevationDeg >= 90) return 0;
  const rad = elevationDeg * Math.PI / 180;
  return parseFloat((heightM / Math.tan(rad)).toFixed(1));
}

export function magnification(objectiveFl: number, eyepieceFl: number): number {
  if (eyepieceFl <= 0) return 1;
  return parseFloat((objectiveFl / eyepieceFl).toFixed(1));
}

export function waterproofDepthM(sealType: string): number {
  if (sealType === "oring") return 100;
  if (sealType === "gasket") return 30;
  return 5;
}

export function mirrorTypes(): MirrorType[] {
  return ["flat", "prism", "front_surface", "polished_metal"];
}

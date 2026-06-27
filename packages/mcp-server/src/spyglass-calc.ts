export type LensType = "plano_convex" | "bi_convex" | "achromat" | "meniscus";
export type SpyglassType = "galilean" | "keplerian" | "terrestrial" | "opera";

export function magnification(objectiveFl: number, eyepieceFl: number): number {
  if (eyepieceFl <= 0) return 0;
  return parseFloat((objectiveFl / eyepieceFl).toFixed(1));
}

export function focalLength(radiusCurvature: number, refractiveIndex: number): number {
  if (refractiveIndex <= 1) return Infinity;
  return parseFloat((radiusCurvature / (2 * (refractiveIndex - 1))).toFixed(1));
}

export function tubeLength(objectiveFl: number, eyepieceFl: number, type: SpyglassType): number {
  if (type === "galilean") return parseFloat((objectiveFl - eyepieceFl).toFixed(1));
  return parseFloat((objectiveFl + eyepieceFl).toFixed(1));
}

export function fieldOfView(apparentFov: number, mag: number): number {
  if (mag <= 0) return 0;
  return parseFloat((apparentFov / mag).toFixed(2));
}

export function exitPupil(objectiveDiameterMm: number, mag: number): number {
  if (mag <= 0) return 0;
  return parseFloat((objectiveDiameterMm / mag).toFixed(1));
}

export function lightGatheringPower(objectiveDiameterMm: number): number {
  const pupil = 7;
  return parseFloat((Math.pow(objectiveDiameterMm / pupil, 2)).toFixed(1));
}

export function resolution(objectiveDiameterMm: number): number {
  if (objectiveDiameterMm <= 0) return 0;
  return parseFloat((116 / objectiveDiameterMm).toFixed(2));
}

export function chromaticAberration(lens: LensType): string {
  if (lens === "achromat") return "low";
  if (lens === "meniscus") return "medium";
  return "high";
}

export function drawLength(tubeLengthMm: number, sections: number): number {
  if (sections <= 0) return tubeLengthMm;
  return parseFloat((tubeLengthMm / sections).toFixed(1));
}

export function weightEstimate(objectiveDiameterMm: number, tubeLengthMm: number): number {
  return parseFloat((objectiveDiameterMm * tubeLengthMm * 0.0005).toFixed(0));
}

export function spyglassTypes(): SpyglassType[] {
  return ["galilean", "keplerian", "terrestrial", "opera"];
}

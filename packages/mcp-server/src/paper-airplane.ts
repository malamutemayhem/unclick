export type PlaneDesign = "dart" | "glider" | "stunt" | "canard" | "delta" | "biplane";
export type PaperWeight = "copy" | "cardstock" | "origami" | "tissue";

export function foldCount(design: PlaneDesign): number {
  const folds: Record<PlaneDesign, number> = {
    dart: 6, glider: 8, stunt: 10, canard: 12, delta: 7, biplane: 14,
  };
  return folds[design];
}

export function wingSpan(paperWidthCm: number, design: PlaneDesign): number {
  const factor: Record<PlaneDesign, number> = {
    dart: 0.6, glider: 0.9, stunt: 0.7, canard: 0.65, delta: 0.85, biplane: 0.5,
  };
  return parseFloat((paperWidthCm * factor[design]).toFixed(1));
}

export function aspectRatio(wingSpanCm: number, chordCm: number): number {
  return parseFloat((wingSpanCm / chordCm).toFixed(2));
}

export function throwSpeed(distanceM: number, timeS: number): number {
  return parseFloat((distanceM / timeS).toFixed(1));
}

export function flightDistance(design: PlaneDesign, paperWeight: PaperWeight): number {
  const baseM: Record<PlaneDesign, number> = {
    dart: 15, glider: 20, stunt: 8, canard: 12, delta: 18, biplane: 10,
  };
  const factor: Record<PaperWeight, number> = {
    copy: 1.0, cardstock: 0.8, origami: 1.1, tissue: 0.6,
  };
  return parseFloat((baseM[design] * factor[paperWeight]).toFixed(1));
}

export function flightTime(design: PlaneDesign): number {
  const seconds: Record<PlaneDesign, number> = {
    dart: 2, glider: 6, stunt: 4, canard: 4, delta: 3, biplane: 3,
  };
  return seconds[design];
}

export function liftCoefficient(angleOfAttackDeg: number): number {
  const rad = angleOfAttackDeg * Math.PI / 180;
  return parseFloat((2 * Math.PI * rad).toFixed(3));
}

export function noseWeight(paperWeightGsm: number, areaPercent: number = 0.15): number {
  return parseFloat((paperWeightGsm * areaPercent * 3).toFixed(1));
}

export function stabilizerArea(wingAreaCm2: number): number {
  return parseFloat((wingAreaCm2 * 0.15).toFixed(1));
}

export function elevonAngle(pitch: "up" | "neutral" | "down"): number {
  const angles: Record<string, number> = { up: 15, neutral: 0, down: -10 };
  return angles[pitch];
}

export function bestLaunchAngle(design: PlaneDesign): number {
  const angles: Record<PlaneDesign, number> = {
    dart: 10, glider: 0, stunt: 30, canard: 15, delta: 5, biplane: 10,
  };
  return angles[design];
}

export function competitionScore(distanceM: number, flightTimeS: number, accuracyM: number): number {
  return parseFloat((distanceM * 2 + flightTimeS * 10 - accuracyM * 3).toFixed(1));
}

export function planeDesigns(): PlaneDesign[] {
  return ["dart", "glider", "stunt", "canard", "delta", "biplane"];
}

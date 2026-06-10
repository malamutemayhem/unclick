export type QuadrantType = "mural" | "portable" | "horary" | "gunners" | "davis";

export function radiusCm(type: QuadrantType): number {
  const radii: Record<QuadrantType, number> = {
    mural: 150, portable: 20, horary: 15, gunners: 30, davis: 25,
  };
  return radii[type];
}

export function arcDegrees(type: QuadrantType): number {
  const arcs: Record<QuadrantType, number> = {
    mural: 90, portable: 90, horary: 90, gunners: 45, davis: 65,
  };
  return arcs[type];
}

export function graduationCount(arcDeg: number, resolution: "degree" | "half" | "quarter"): number {
  const mult: Record<string, number> = { degree: 1, half: 2, quarter: 4 };
  return arcDeg * mult[resolution];
}

export function plumbLineLengthCm(radiusCm: number): number {
  return parseFloat((radiusCm * 1.1).toFixed(1));
}

export function sightVaneLengthCm(radiusCm: number): number {
  return parseFloat((radiusCm * 0.6).toFixed(1));
}

export function altitudeAccuracyArcMin(type: QuadrantType): number {
  const accuracy: Record<QuadrantType, number> = {
    mural: 1, portable: 15, horary: 20, gunners: 10, davis: 5,
  };
  return accuracy[type];
}

export function weightKg(type: QuadrantType): number {
  const weights: Record<QuadrantType, number> = {
    mural: 50, portable: 0.5, horary: 0.3, gunners: 2, davis: 1.5,
  };
  return weights[type];
}

export function materialRequired(type: QuadrantType): string {
  const materials: Record<QuadrantType, string> = {
    mural: "stone", portable: "brass", horary: "wood", gunners: "bronze", davis: "ebony",
  };
  return materials[type];
}

export function constructionHours(type: QuadrantType): number {
  const hours: Record<QuadrantType, number> = {
    mural: 200, portable: 40, horary: 20, gunners: 60, davis: 80,
  };
  return hours[type];
}

export function costEstimate(type: QuadrantType, baseCost: number): number {
  const mult: Record<QuadrantType, number> = {
    mural: 10.0, portable: 2.0, horary: 1.0, gunners: 3.0, davis: 4.0,
  };
  return parseFloat((baseCost * mult[type]).toFixed(2));
}

export function quadrantTypes(): QuadrantType[] {
  return ["mural", "portable", "horary", "gunners", "davis"];
}

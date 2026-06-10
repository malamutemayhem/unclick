export type PlaneTableMethod = "radiation" | "intersection" | "traversing" | "resection" | "three_point";

export function accuracyRating(method: PlaneTableMethod): number {
  const acc: Record<PlaneTableMethod, number> = {
    radiation: 5, intersection: 7, traversing: 6, resection: 8, three_point: 9,
  };
  return acc[method];
}

export function controlPointsNeeded(method: PlaneTableMethod): number {
  const pts: Record<PlaneTableMethod, number> = {
    radiation: 1, intersection: 2, traversing: 2, resection: 3, three_point: 3,
  };
  return pts[method];
}

export function sightRaysPerPoint(method: PlaneTableMethod): number {
  const rays: Record<PlaneTableMethod, number> = {
    radiation: 1, intersection: 2, traversing: 1, resection: 3, three_point: 3,
  };
  return rays[method];
}

export function fieldPlottingSpeed(method: PlaneTableMethod): number {
  const s: Record<PlaneTableMethod, number> = {
    radiation: 8, intersection: 6, traversing: 5, resection: 3, three_point: 2,
  };
  return s[method];
}

export function alidadeRequired(method: PlaneTableMethod): boolean {
  return true;
}

export function orientationSteps(method: PlaneTableMethod): number {
  const steps: Record<PlaneTableMethod, number> = {
    radiation: 2, intersection: 3, traversing: 3, resection: 5, three_point: 6,
  };
  return steps[method];
}

export function difficultyRating(method: PlaneTableMethod): number {
  const d: Record<PlaneTableMethod, number> = {
    radiation: 2, intersection: 4, traversing: 5, resection: 7, three_point: 9,
  };
  return d[method];
}

export function bestForTerrain(method: PlaneTableMethod): string {
  const t: Record<PlaneTableMethod, string> = {
    radiation: "open_flat", intersection: "river_crossing",
    traversing: "road_survey", resection: "hilly",
    three_point: "complex_terrain",
  };
  return t[method];
}

export function costEstimate(method: PlaneTableMethod): number {
  const c: Record<PlaneTableMethod, number> = {
    radiation: 150, intersection: 150, traversing: 150, resection: 150, three_point: 150,
  };
  return c[method];
}

export function planeTableMethods(): PlaneTableMethod[] {
  return ["radiation", "intersection", "traversing", "resection", "three_point"];
}

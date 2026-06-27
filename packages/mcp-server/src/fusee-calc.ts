export type FuseeShape = "conical" | "hyperbolic" | "snail" | "stepped" | "spiral";

export function largeEndDiameterMm(barrelDiameterMm: number): number {
  return Math.round(barrelDiameterMm * 0.9);
}

export function smallEndDiameterMm(largeEndMm: number): number {
  return Math.round(largeEndMm * 0.4);
}

export function chainLengthMm(barrelDiameterMm: number, turns: number): number {
  return Math.round(barrelDiameterMm * Math.PI * turns);
}

export function grooveCount(shape: FuseeShape): number {
  const grooves: Record<FuseeShape, number> = {
    conical: 12, hyperbolic: 14, snail: 1, stepped: 8, spiral: 10,
  };
  return grooves[shape];
}

export function torqueEqualization(shape: FuseeShape): number {
  const ratings: Record<FuseeShape, number> = {
    conical: 3, hyperbolic: 5, snail: 4, stepped: 2, spiral: 4,
  };
  return ratings[shape];
}

export function chainPitchMm(fuseeHeightMm: number, grooves: number): number {
  if (grooves <= 0) return 0;
  return parseFloat((fuseeHeightMm / grooves).toFixed(2));
}

export function machiningTimeHours(shape: FuseeShape): number {
  const hours: Record<FuseeShape, number> = {
    conical: 4, hyperbolic: 8, snail: 6, stepped: 3, spiral: 5,
  };
  return hours[shape];
}

export function materialWeightG(shape: FuseeShape, heightMm: number): number {
  const factor: Record<FuseeShape, number> = {
    conical: 0.8, hyperbolic: 0.7, snail: 1.0, stepped: 0.9, spiral: 0.75,
  };
  return parseFloat((heightMm * factor[shape]).toFixed(1));
}

export function costEstimate(shape: FuseeShape): number {
  const costs: Record<FuseeShape, number> = {
    conical: 80, hyperbolic: 150, snail: 120, stepped: 60, spiral: 100,
  };
  return costs[shape];
}

export function fuseeShapes(): FuseeShape[] {
  return ["conical", "hyperbolic", "snail", "stepped", "spiral"];
}

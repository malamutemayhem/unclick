export type PyramidType = "step" | "true_smooth" | "bent" | "nubian" | "mesoamerican";

export function heightMeters(pyramid: PyramidType): number {
  const m: Record<PyramidType, number> = {
    step: 62, true_smooth: 146, bent: 105, nubian: 30, mesoamerican: 45,
  };
  return m[pyramid];
}

export function baseAreaM2(pyramid: PyramidType): number {
  const m: Record<PyramidType, number> = {
    step: 12000, true_smooth: 53000, bent: 47000, nubian: 2500, mesoamerican: 15000,
  };
  return m[pyramid];
}

export function slopeAngleDegrees(pyramid: PyramidType): number {
  const m: Record<PyramidType, number> = {
    step: 40, true_smooth: 52, bent: 55, nubian: 70, mesoamerican: 35,
  };
  return m[pyramid];
}

export function constructionYears(pyramid: PyramidType): number {
  const m: Record<PyramidType, number> = {
    step: 20, true_smooth: 20, bent: 15, nubian: 5, mesoamerican: 100,
  };
  return m[pyramid];
}

export function internalChambers(pyramid: PyramidType): number {
  const m: Record<PyramidType, number> = {
    step: 6, true_smooth: 3, bent: 2, nubian: 1, mesoamerican: 5,
  };
  return m[pyramid];
}

export function hasFlatTop(pyramid: PyramidType): boolean {
  const m: Record<PyramidType, boolean> = {
    step: false, true_smooth: false, bent: false, nubian: false, mesoamerican: true,
  };
  return m[pyramid];
}

export function funerary(pyramid: PyramidType): boolean {
  const m: Record<PyramidType, boolean> = {
    step: true, true_smooth: true, bent: true, nubian: true, mesoamerican: false,
  };
  return m[pyramid];
}

export function civilization(pyramid: PyramidType): string {
  const m: Record<PyramidType, string> = {
    step: "old_kingdom_egypt", true_smooth: "old_kingdom_egypt", bent: "old_kingdom_egypt",
    nubian: "kush", mesoamerican: "maya_aztec",
  };
  return m[pyramid];
}

export function preservationState(pyramid: PyramidType): number {
  const m: Record<PyramidType, number> = {
    step: 7, true_smooth: 9, bent: 8, nubian: 5, mesoamerican: 6,
  };
  return m[pyramid];
}

export function pyramidTypes(): PyramidType[] {
  return ["step", "true_smooth", "bent", "nubian", "mesoamerican"];
}

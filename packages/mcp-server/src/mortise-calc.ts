export type MortiseType = "through" | "blind" | "wedged" | "drawbored" | "haunched";

export function mortiseWidthMm(tenonThicknessMm: number): number {
  return parseFloat((tenonThicknessMm + 0.5).toFixed(1));
}

export function mortiseDepthMm(stockThicknessMm: number, type: MortiseType): number {
  if (type === "through") return stockThicknessMm;
  if (type === "haunched") return parseFloat((stockThicknessMm * 0.75).toFixed(1));
  return parseFloat((stockThicknessMm * 0.67).toFixed(1));
}

export function tenonLengthMm(mortiseDepthMm: number): number {
  return parseFloat((mortiseDepthMm - 1).toFixed(1));
}

export function tenonThicknessMm(stockThicknessMm: number): number {
  return parseFloat((stockThicknessMm / 3).toFixed(1));
}

export function shoulderCountPerSide(type: MortiseType): number {
  if (type === "haunched") return 2;
  return 1;
}

export function drawboreDiameterMm(tenonThicknessMm: number): number {
  return parseFloat((tenonThicknessMm * 0.3).toFixed(1));
}

export function drawboreOffsetMm(tenonThicknessMm: number): number {
  return parseFloat((tenonThicknessMm * 0.15).toFixed(1));
}

export function glueSurfaceAreaCm2(mortiseWidthMm: number, mortiseDepthMm: number, tenonLengthMm: number): number {
  return parseFloat(((mortiseWidthMm * tenonLengthMm * 2 + mortiseDepthMm * tenonLengthMm * 2) / 100).toFixed(1));
}

export function cuttingTimeMinutes(type: MortiseType, skill: "beginner" | "intermediate" | "expert"): number {
  const base: Record<MortiseType, number> = {
    through: 30, blind: 25, wedged: 35, drawbored: 40, haunched: 45,
  };
  const mult: Record<string, number> = { beginner: 2.0, intermediate: 1.0, expert: 0.6 };
  return Math.round(base[type] * mult[skill]);
}

export function jointStrengthRating(type: MortiseType): number {
  const ratings: Record<MortiseType, number> = {
    through: 7, blind: 6, wedged: 9, drawbored: 10, haunched: 8,
  };
  return ratings[type];
}

export function mortiseTypes(): MortiseType[] {
  return ["through", "blind", "wedged", "drawbored", "haunched"];
}

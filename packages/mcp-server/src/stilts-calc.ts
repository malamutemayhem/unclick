export type StiltType = "peg" | "drywall" | "circus" | "spring" | "jumping";

export function stiltHeight(userHeightCm: number, desiredHeightCm: number): number {
  return parseFloat((desiredHeightCm - userHeightCm).toFixed(0));
}

export function footplatformSize(shoeSize: number): { lengthCm: number; widthCm: number } {
  return {
    lengthCm: parseFloat((shoeSize * 0.67 + 5).toFixed(0)),
    widthCm: parseFloat((shoeSize * 0.3 + 3).toFixed(0)),
  };
}

export function strapCount(stiltHeight: number): number {
  if (stiltHeight < 30) return 1;
  if (stiltHeight < 60) return 2;
  return 3;
}

export function balancePoint(stiltHeight: number): number {
  return parseFloat((stiltHeight * 0.6).toFixed(0));
}

export function fallRisk(heightCm: number, experience: string): string {
  const factors: Record<string, number> = {
    beginner: 3, intermediate: 2, expert: 1,
  };
  const f = factors[experience] || 2;
  const risk = heightCm * f / 100;
  if (risk < 1) return "low";
  if (risk < 2) return "moderate";
  return "high";
}

export function trainingHours(type: StiltType): number {
  const hours: Record<StiltType, number> = {
    peg: 5, drywall: 2, circus: 40, spring: 20, jumping: 30,
  };
  return hours[type];
}

export function loadCapacityKg(poleDiameterCm: number, material: string): number {
  const strengths: Record<string, number> = {
    wood: 50, aluminum: 80, carbon_fiber: 120, steel: 100,
  };
  const s = strengths[material] || 50;
  return parseFloat((Math.PI * Math.pow(poleDiameterCm / 2, 2) * s).toFixed(0));
}

export function speedReduction(heightCm: number): number {
  return parseFloat(Math.max(0, 100 - heightCm * 0.5).toFixed(0));
}

export function stiltTypes(): StiltType[] {
  return ["peg", "drywall", "circus", "spring", "jumping"];
}

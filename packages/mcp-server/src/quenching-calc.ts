export type QuenchMedium = "water" | "brine" | "oil" | "air" | "polymer";

export function coolingRateRating(medium: QuenchMedium): number {
  const r: Record<QuenchMedium, number> = {
    water: 8, brine: 10, oil: 5, air: 1, polymer: 6,
  };
  return r[medium];
}

export function crackRisk(medium: QuenchMedium): number {
  const r: Record<QuenchMedium, number> = {
    water: 7, brine: 9, oil: 3, air: 1, polymer: 4,
  };
  return r[medium];
}

export function distortionRisk(medium: QuenchMedium): number {
  const d: Record<QuenchMedium, number> = {
    water: 8, brine: 9, oil: 4, air: 1, polymer: 5,
  };
  return d[medium];
}

export function hardnessAchievable(medium: QuenchMedium): number {
  const h: Record<QuenchMedium, number> = {
    water: 65, brine: 67, oil: 60, air: 45, polymer: 62,
  };
  return h[medium];
}

export function tempRangeCelsius(medium: QuenchMedium): { min: number; max: number } {
  const ranges: Record<QuenchMedium, { min: number; max: number }> = {
    water: { min: 15, max: 30 }, brine: { min: 15, max: 25 },
    oil: { min: 40, max: 80 }, air: { min: 20, max: 25 },
    polymer: { min: 20, max: 50 },
  };
  return ranges[medium];
}

export function reusable(medium: QuenchMedium): boolean {
  return medium !== "air";
}

export function fireHazard(medium: QuenchMedium): boolean {
  return medium === "oil";
}

export function environmentalImpact(medium: QuenchMedium): number {
  const e: Record<QuenchMedium, number> = {
    water: 2, brine: 5, oil: 7, air: 0, polymer: 6,
  };
  return e[medium];
}

export function costPerLiter(medium: QuenchMedium): number {
  const c: Record<QuenchMedium, number> = {
    water: 0.01, brine: 0.05, oil: 3, air: 0, polymer: 8,
  };
  return c[medium];
}

export function quenchMedia(): QuenchMedium[] {
  return ["water", "brine", "oil", "air", "polymer"];
}

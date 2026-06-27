export type QuenchMedium = "water" | "oil" | "brine" | "air" | "polymer";

export function coolingRateIndex(medium: QuenchMedium): number {
  const c: Record<QuenchMedium, number> = {
    water: 8, oil: 5, brine: 10, air: 1, polymer: 6,
  };
  return c[medium];
}

export function crackRisk(medium: QuenchMedium): number {
  const r: Record<QuenchMedium, number> = {
    water: 7, oil: 3, brine: 9, air: 1, polymer: 4,
  };
  return r[medium];
}

export function distortionRisk(medium: QuenchMedium): number {
  const d: Record<QuenchMedium, number> = {
    water: 7, oil: 4, brine: 8, air: 1, polymer: 3,
  };
  return d[medium];
}

export function hardnessAchieved(medium: QuenchMedium): number {
  const h: Record<QuenchMedium, number> = {
    water: 9, oil: 6, brine: 10, air: 3, polymer: 7,
  };
  return h[medium];
}

export function flashPoint(medium: QuenchMedium): boolean {
  const f: Record<QuenchMedium, boolean> = {
    water: false, oil: true, brine: false, air: false, polymer: false,
  };
  return f[medium];
}

export function reusability(medium: QuenchMedium): number {
  const r: Record<QuenchMedium, number> = {
    water: 10, oil: 8, brine: 9, air: 10, polymer: 6,
  };
  return r[medium];
}

export function bestSteelType(medium: QuenchMedium): string {
  const b: Record<QuenchMedium, string> = {
    water: "low_carbon", oil: "high_carbon", brine: "tool_steel",
    air: "air_hardening", polymer: "alloy_steel",
  };
  return b[medium];
}

export function vaporBarrier(medium: QuenchMedium): number {
  const v: Record<QuenchMedium, number> = {
    water: 7, oil: 3, brine: 2, air: 0, polymer: 4,
  };
  return v[medium];
}

export function costPerLiter(medium: QuenchMedium): number {
  const c: Record<QuenchMedium, number> = {
    water: 0.01, oil: 5, brine: 0.1, air: 0, polymer: 15,
  };
  return c[medium];
}

export function quenchMedia(): QuenchMedium[] {
  return ["water", "oil", "brine", "air", "polymer"];
}

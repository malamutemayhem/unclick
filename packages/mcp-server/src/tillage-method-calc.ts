export type TillageMethod = "conventional" | "reduced" | "no_till" | "strip_till" | "ridge_till";

export function soilDisturbance(t: TillageMethod): number {
  const m: Record<TillageMethod, number> = {
    conventional: 10, reduced: 6, no_till: 1, strip_till: 4, ridge_till: 5,
  };
  return m[t];
}

export function erosionRisk(t: TillageMethod): number {
  const m: Record<TillageMethod, number> = {
    conventional: 9, reduced: 5, no_till: 1, strip_till: 3, ridge_till: 4,
  };
  return m[t];
}

export function fuelUsage(t: TillageMethod): number {
  const m: Record<TillageMethod, number> = {
    conventional: 10, reduced: 6, no_till: 1, strip_till: 4, ridge_till: 5,
  };
  return m[t];
}

export function soilHealthBenefit(t: TillageMethod): number {
  const m: Record<TillageMethod, number> = {
    conventional: 1, reduced: 5, no_till: 10, strip_till: 7, ridge_till: 6,
  };
  return m[t];
}

export function weedSuppression(t: TillageMethod): number {
  const m: Record<TillageMethod, number> = {
    conventional: 9, reduced: 6, no_till: 3, strip_till: 5, ridge_till: 7,
  };
  return m[t];
}

export function requiresSpecialEquipment(t: TillageMethod): boolean {
  const m: Record<TillageMethod, boolean> = {
    conventional: false, reduced: false, no_till: true, strip_till: true, ridge_till: true,
  };
  return m[t];
}

export function residueRetained(t: TillageMethod): boolean {
  const m: Record<TillageMethod, boolean> = {
    conventional: false, reduced: true, no_till: true, strip_till: true, ridge_till: true,
  };
  return m[t];
}

export function bestClimate(t: TillageMethod): string {
  const m: Record<TillageMethod, string> = {
    conventional: "any_climate", reduced: "temperate",
    no_till: "humid_subtropical", strip_till: "cold_wet_spring",
    ridge_till: "poorly_drained_soils",
  };
  return m[t];
}

export function carbonImpact(t: TillageMethod): string {
  const m: Record<TillageMethod, string> = {
    conventional: "net_carbon_release", reduced: "slight_sequestration",
    no_till: "strong_sequestration", strip_till: "moderate_sequestration",
    ridge_till: "moderate_sequestration",
  };
  return m[t];
}

export function tillageMethods(): TillageMethod[] {
  return ["conventional", "reduced", "no_till", "strip_till", "ridge_till"];
}

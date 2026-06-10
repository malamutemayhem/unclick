export type HvacFilter = "fiberglass" | "pleated" | "hepa" | "electrostatic" | "activated_carbon";

export function particleCapture(f: HvacFilter): number {
  const m: Record<HvacFilter, number> = {
    fiberglass: 3, pleated: 7, hepa: 10, electrostatic: 6, activated_carbon: 5,
  };
  return m[f];
}

export function airflowRestriction(f: HvacFilter): number {
  const m: Record<HvacFilter, number> = {
    fiberglass: 2, pleated: 5, hepa: 9, electrostatic: 4, activated_carbon: 6,
  };
  return m[f];
}

export function replacementCost(f: HvacFilter): number {
  const m: Record<HvacFilter, number> = {
    fiberglass: 2, pleated: 5, hepa: 9, electrostatic: 3, activated_carbon: 7,
  };
  return m[f];
}

export function odorRemoval(f: HvacFilter): number {
  const m: Record<HvacFilter, number> = {
    fiberglass: 1, pleated: 2, hepa: 3, electrostatic: 2, activated_carbon: 10,
  };
  return m[f];
}

export function lifeSpanMonths(f: HvacFilter): number {
  const m: Record<HvacFilter, number> = {
    fiberglass: 1, pleated: 3, hepa: 6, electrostatic: 12, activated_carbon: 3,
  };
  return m[f];
}

export function washable(f: HvacFilter): boolean {
  const m: Record<HvacFilter, boolean> = {
    fiberglass: false, pleated: false, hepa: false, electrostatic: true, activated_carbon: false,
  };
  return m[f];
}

export function allergenRated(f: HvacFilter): boolean {
  const m: Record<HvacFilter, boolean> = {
    fiberglass: false, pleated: true, hepa: true, electrostatic: false, activated_carbon: false,
  };
  return m[f];
}

export function mervRating(f: HvacFilter): string {
  const m: Record<HvacFilter, string> = {
    fiberglass: "merv_1_4", pleated: "merv_8_13", hepa: "merv_17_20",
    electrostatic: "merv_6_10", activated_carbon: "merv_5_8",
  };
  return m[f];
}

export function bestApplication(f: HvacFilter): string {
  const m: Record<HvacFilter, string> = {
    fiberglass: "basic_equipment_protection", pleated: "residential_allergy",
    hepa: "hospital_cleanroom", electrostatic: "reusable_residential",
    activated_carbon: "smoke_chemical_odor",
  };
  return m[f];
}

export function hvacFilters(): HvacFilter[] {
  return ["fiberglass", "pleated", "hepa", "electrostatic", "activated_carbon"];
}

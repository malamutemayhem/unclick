export type DentalFilling = "amalgam" | "composite" | "ceramic" | "gold" | "glass_ionomer";

export function durabilityYears(f: DentalFilling): number {
  const m: Record<DentalFilling, number> = {
    amalgam: 9, composite: 6, ceramic: 8, gold: 10, glass_ionomer: 4,
  };
  return m[f];
}

export function aestheticMatch(f: DentalFilling): number {
  const m: Record<DentalFilling, number> = {
    amalgam: 2, composite: 9, ceramic: 10, gold: 1, glass_ionomer: 7,
  };
  return m[f];
}

export function costLevel(f: DentalFilling): number {
  const m: Record<DentalFilling, number> = {
    amalgam: 3, composite: 5, ceramic: 8, gold: 10, glass_ionomer: 4,
  };
  return m[f];
}

export function biocompatibility(f: DentalFilling): number {
  const m: Record<DentalFilling, number> = {
    amalgam: 5, composite: 8, ceramic: 9, gold: 10, glass_ionomer: 7,
  };
  return m[f];
}

export function wearResistance(f: DentalFilling): number {
  const m: Record<DentalFilling, number> = {
    amalgam: 9, composite: 6, ceramic: 8, gold: 10, glass_ionomer: 4,
  };
  return m[f];
}

export function mercuryFree(f: DentalFilling): boolean {
  const m: Record<DentalFilling, boolean> = {
    amalgam: false, composite: true, ceramic: true, gold: true, glass_ionomer: true,
  };
  return m[f];
}

export function toothColored(f: DentalFilling): boolean {
  const m: Record<DentalFilling, boolean> = {
    amalgam: false, composite: true, ceramic: true, gold: false, glass_ionomer: true,
  };
  return m[f];
}

export function bestLocation(f: DentalFilling): string {
  const m: Record<DentalFilling, string> = {
    amalgam: "posterior_molars", composite: "anterior_visible",
    ceramic: "inlays_onlays", gold: "posterior_high_stress",
    glass_ionomer: "root_surfaces",
  };
  return m[f];
}

export function bondingMethod(f: DentalFilling): string {
  const m: Record<DentalFilling, string> = {
    amalgam: "mechanical_retention", composite: "adhesive_bonding",
    ceramic: "resin_cement", gold: "cementation",
    glass_ionomer: "chemical_bond",
  };
  return m[f];
}

export function dentalFillings(): DentalFilling[] {
  return ["amalgam", "composite", "ceramic", "gold", "glass_ionomer"];
}

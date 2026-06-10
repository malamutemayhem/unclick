export type DentalCement = "glass_ionomer" | "resin_modified" | "zinc_phosphate" | "polycarboxylate" | "resin_cement";

export function bondStrength(d: DentalCement): number {
  const m: Record<DentalCement, number> = {
    glass_ionomer: 6, resin_modified: 8, zinc_phosphate: 5, polycarboxylate: 4, resin_cement: 10,
  };
  return m[d];
}

export function fluorideRelease(d: DentalCement): number {
  const m: Record<DentalCement, number> = {
    glass_ionomer: 10, resin_modified: 8, zinc_phosphate: 1, polycarboxylate: 2, resin_cement: 1,
  };
  return m[d];
}

export function biocompatibility(d: DentalCement): number {
  const m: Record<DentalCement, number> = {
    glass_ionomer: 8, resin_modified: 7, zinc_phosphate: 5, polycarboxylate: 9, resin_cement: 6,
  };
  return m[d];
}

export function workingTime(d: DentalCement): number {
  const m: Record<DentalCement, number> = {
    glass_ionomer: 5, resin_modified: 7, zinc_phosphate: 4, polycarboxylate: 6, resin_cement: 8,
  };
  return m[d];
}

export function materialCost(d: DentalCement): number {
  const m: Record<DentalCement, number> = {
    glass_ionomer: 4, resin_modified: 6, zinc_phosphate: 2, polycarboxylate: 3, resin_cement: 9,
  };
  return m[d];
}

export function moistureTolerant(d: DentalCement): boolean {
  const m: Record<DentalCement, boolean> = {
    glass_ionomer: true, resin_modified: true, zinc_phosphate: false, polycarboxylate: true, resin_cement: false,
  };
  return m[d];
}

export function lightCured(d: DentalCement): boolean {
  const m: Record<DentalCement, boolean> = {
    glass_ionomer: false, resin_modified: true, zinc_phosphate: false, polycarboxylate: false, resin_cement: true,
  };
  return m[d];
}

export function settingMechanism(d: DentalCement): string {
  const m: Record<DentalCement, string> = {
    glass_ionomer: "acid_base_ion_exchange", resin_modified: "dual_cure_light_chemical",
    zinc_phosphate: "acid_base_crystallization", polycarboxylate: "chelation_metal_oxide",
    resin_cement: "free_radical_polymerization",
  };
  return m[d];
}

export function bestRestoration(d: DentalCement): string {
  const m: Record<DentalCement, string> = {
    glass_ionomer: "pediatric_temporary_crown", resin_modified: "porcelain_veneer_inlay",
    zinc_phosphate: "metal_crown_bridge", polycarboxylate: "sensitive_pulp_liner",
    resin_cement: "ceramic_zirconia_crown",
  };
  return m[d];
}

export function dentalCements(): DentalCement[] {
  return ["glass_ionomer", "resin_modified", "zinc_phosphate", "polycarboxylate", "resin_cement"];
}

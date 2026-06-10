export type StainRemoval = "enzymatic" | "oxidizing" | "solvent_based" | "acid" | "surfactant";

export function proteinStainEfficacy(s: StainRemoval): number {
  const m: Record<StainRemoval, number> = {
    enzymatic: 10, oxidizing: 5, solvent_based: 3, acid: 4, surfactant: 6,
  };
  return m[s];
}

export function colorSafety(s: StainRemoval): number {
  const m: Record<StainRemoval, number> = {
    enzymatic: 8, oxidizing: 3, solvent_based: 7, acid: 4, surfactant: 9,
  };
  return m[s];
}

export function fabricRange(s: StainRemoval): number {
  const m: Record<StainRemoval, number> = {
    enzymatic: 7, oxidizing: 5, solvent_based: 8, acid: 3, surfactant: 10,
  };
  return m[s];
}

export function speedOfAction(s: StainRemoval): number {
  const m: Record<StainRemoval, number> = {
    enzymatic: 4, oxidizing: 8, solvent_based: 9, acid: 7, surfactant: 5,
  };
  return m[s];
}

export function environmentalImpact(s: StainRemoval): number {
  const m: Record<StainRemoval, number> = {
    enzymatic: 3, oxidizing: 6, solvent_based: 9, acid: 7, surfactant: 4,
  };
  return m[s];
}

export function requiresPreSoak(s: StainRemoval): boolean {
  const m: Record<StainRemoval, boolean> = {
    enzymatic: true, oxidizing: false, solvent_based: false, acid: true, surfactant: false,
  };
  return m[s];
}

export function safeForDelicates(s: StainRemoval): boolean {
  const m: Record<StainRemoval, boolean> = {
    enzymatic: false, oxidizing: false, solvent_based: true, acid: false, surfactant: true,
  };
  return m[s];
}

export function activeIngredient(s: StainRemoval): string {
  const m: Record<StainRemoval, string> = {
    enzymatic: "protease_lipase_amylase", oxidizing: "hydrogen_peroxide_percarbonate",
    solvent_based: "d_limonene_glycol_ether", acid: "citric_acetic_oxalic",
    surfactant: "anionic_nonionic_detergent",
  };
  return m[s];
}

export function bestStainType(s: StainRemoval): string {
  const m: Record<StainRemoval, string> = {
    enzymatic: "blood_grass_food", oxidizing: "wine_coffee_dye",
    solvent_based: "grease_oil_ink", acid: "rust_mineral_hard_water",
    surfactant: "general_soil_dirt",
  };
  return m[s];
}

export function stainRemovals(): StainRemoval[] {
  return ["enzymatic", "oxidizing", "solvent_based", "acid", "surfactant"];
}

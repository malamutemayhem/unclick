export type BiohazardLevel = "bsl_1" | "bsl_2" | "bsl_3" | "bsl_4" | "absl_2";

export function containmentRigor(b: BiohazardLevel): number {
  const m: Record<BiohazardLevel, number> = {
    bsl_1: 2, bsl_2: 5, bsl_3: 8, bsl_4: 10, absl_2: 6,
  };
  return m[b];
}

export function facilityBuildCost(b: BiohazardLevel): number {
  const m: Record<BiohazardLevel, number> = {
    bsl_1: 2, bsl_2: 4, bsl_3: 8, bsl_4: 10, absl_2: 5,
  };
  return m[b];
}

export function ppeRequirement(b: BiohazardLevel): number {
  const m: Record<BiohazardLevel, number> = {
    bsl_1: 2, bsl_2: 4, bsl_3: 8, bsl_4: 10, absl_2: 5,
  };
  return m[b];
}

export function regulatoryOverhead(b: BiohazardLevel): number {
  const m: Record<BiohazardLevel, number> = {
    bsl_1: 2, bsl_2: 4, bsl_3: 8, bsl_4: 10, absl_2: 6,
  };
  return m[b];
}

export function trainingHours(b: BiohazardLevel): number {
  const m: Record<BiohazardLevel, number> = {
    bsl_1: 2, bsl_2: 4, bsl_3: 7, bsl_4: 10, absl_2: 5,
  };
  return m[b];
}

export function requiresNegativePressure(b: BiohazardLevel): boolean {
  const m: Record<BiohazardLevel, boolean> = {
    bsl_1: false, bsl_2: false, bsl_3: true, bsl_4: true, absl_2: false,
  };
  return m[b];
}

export function requiresPositivePressureSuit(b: BiohazardLevel): boolean {
  const m: Record<BiohazardLevel, boolean> = {
    bsl_1: false, bsl_2: false, bsl_3: false, bsl_4: true, absl_2: false,
  };
  return m[b];
}

export function wasteDecontamination(b: BiohazardLevel): string {
  const m: Record<BiohazardLevel, string> = {
    bsl_1: "standard_autoclave", bsl_2: "autoclave_chemical_disinfect",
    bsl_3: "double_door_autoclave", bsl_4: "chemical_shower_full_decon",
    absl_2: "autoclave_carcass_incinerator",
  };
  return m[b];
}

export function typicalPathogen(b: BiohazardLevel): string {
  const m: Record<BiohazardLevel, string> = {
    bsl_1: "nonpathogenic_e_coli", bsl_2: "influenza_staph_hiv",
    bsl_3: "tuberculosis_sars_anthrax", bsl_4: "ebola_marburg_smallpox",
    absl_2: "animal_model_bsl2_agent",
  };
  return m[b];
}

export function biohazardLevels(): BiohazardLevel[] {
  return ["bsl_1", "bsl_2", "bsl_3", "bsl_4", "absl_2"];
}

export type FluxTypeType = "rosin_core_mild" | "water_soluble_active" | "no_clean_low_res" | "oleic_acid_stained" | "paste_flux_plumb";

export function cleaningPower(t: FluxTypeType): number {
  const m: Record<FluxTypeType, number> = {
    rosin_core_mild: 5, water_soluble_active: 9, no_clean_low_res: 3, oleic_acid_stained: 8, paste_flux_plumb: 10,
  };
  return m[t];
}

export function residueSafe(t: FluxTypeType): number {
  const m: Record<FluxTypeType, number> = {
    rosin_core_mild: 8, water_soluble_active: 3, no_clean_low_res: 10, oleic_acid_stained: 6, paste_flux_plumb: 4,
  };
  return m[t];
}

export function workingTime(t: FluxTypeType): number {
  const m: Record<FluxTypeType, number> = {
    rosin_core_mild: 6, water_soluble_active: 7, no_clean_low_res: 8, oleic_acid_stained: 9, paste_flux_plumb: 5,
  };
  return m[t];
}

export function easeOfClean(t: FluxTypeType): number {
  const m: Record<FluxTypeType, number> = {
    rosin_core_mild: 5, water_soluble_active: 10, no_clean_low_res: 10, oleic_acid_stained: 7, paste_flux_plumb: 4,
  };
  return m[t];
}

export function fluxCost(t: FluxTypeType): number {
  const m: Record<FluxTypeType, number> = {
    rosin_core_mild: 1, water_soluble_active: 2, no_clean_low_res: 2, oleic_acid_stained: 3, paste_flux_plumb: 2,
  };
  return m[t];
}

export function needsCleanup(t: FluxTypeType): boolean {
  const m: Record<FluxTypeType, boolean> = {
    rosin_core_mild: true, water_soluble_active: true, no_clean_low_res: false, oleic_acid_stained: true, paste_flux_plumb: true,
  };
  return m[t];
}

export function forGlass(t: FluxTypeType): boolean {
  const m: Record<FluxTypeType, boolean> = {
    rosin_core_mild: false, water_soluble_active: false, no_clean_low_res: false, oleic_acid_stained: true, paste_flux_plumb: false,
  };
  return m[t];
}

export function baseChemistry(t: FluxTypeType): string {
  const m: Record<FluxTypeType, string> = {
    rosin_core_mild: "natural_pine_rosin",
    water_soluble_active: "organic_acid_blend",
    no_clean_low_res: "synthetic_resin_low",
    oleic_acid_stained: "oleic_acid_tallow",
    paste_flux_plumb: "zinc_chloride_active",
  };
  return m[t];
}

export function bestProject(t: FluxTypeType): string {
  const m: Record<FluxTypeType, string> = {
    rosin_core_mild: "electronics_pcb_board",
    water_soluble_active: "heavy_joint_clean",
    no_clean_low_res: "smt_reflow_board",
    oleic_acid_stained: "stained_glass_copper",
    paste_flux_plumb: "plumbing_pipe_joint",
  };
  return m[t];
}

export function fluxTypes(): FluxTypeType[] {
  return ["rosin_core_mild", "water_soluble_active", "no_clean_low_res", "oleic_acid_stained", "paste_flux_plumb"];
}

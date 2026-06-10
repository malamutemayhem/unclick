export type ColdBrewType = "mason_jar_diy" | "pitcher_filter" | "immersion_toddy" | "drip_tower" | "nitro_keg";

export function smoothness(t: ColdBrewType): number {
  const m: Record<ColdBrewType, number> = {
    mason_jar_diy: 6, pitcher_filter: 7, immersion_toddy: 8, drip_tower: 10, nitro_keg: 9,
  };
  return m[t];
}

export function batchSize(t: ColdBrewType): number {
  const m: Record<ColdBrewType, number> = {
    mason_jar_diy: 3, pitcher_filter: 6, immersion_toddy: 8, drip_tower: 4, nitro_keg: 10,
  };
  return m[t];
}

export function brewSimplicity(t: ColdBrewType): number {
  const m: Record<ColdBrewType, number> = {
    mason_jar_diy: 10, pitcher_filter: 8, immersion_toddy: 7, drip_tower: 3, nitro_keg: 4,
  };
  return m[t];
}

export function concentrateStrength(t: ColdBrewType): number {
  const m: Record<ColdBrewType, number> = {
    mason_jar_diy: 6, pitcher_filter: 5, immersion_toddy: 10, drip_tower: 7, nitro_keg: 5,
  };
  return m[t];
}

export function setupCost(t: ColdBrewType): number {
  const m: Record<ColdBrewType, number> = {
    mason_jar_diy: 1, pitcher_filter: 3, immersion_toddy: 4, drip_tower: 9, nitro_keg: 10,
  };
  return m[t];
}

export function countertopDisplay(t: ColdBrewType): boolean {
  const m: Record<ColdBrewType, boolean> = {
    mason_jar_diy: false, pitcher_filter: false, immersion_toddy: false, drip_tower: true, nitro_keg: true,
  };
  return m[t];
}

export function needsRefrigeration(t: ColdBrewType): boolean {
  const m: Record<ColdBrewType, boolean> = {
    mason_jar_diy: true, pitcher_filter: true, immersion_toddy: true, drip_tower: false, nitro_keg: true,
  };
  return m[t];
}

export function extractionMethod(t: ColdBrewType): string {
  const m: Record<ColdBrewType, string> = {
    mason_jar_diy: "full_immersion_strain_cloth", pitcher_filter: "built_in_mesh_plunge",
    immersion_toddy: "felt_pad_drain_overnight", drip_tower: "slow_drip_ice_gravity",
    nitro_keg: "pressurized_nitrogen_infuse",
  };
  return m[t];
}

export function bestServe(t: ColdBrewType): string {
  const m: Record<ColdBrewType, string> = {
    mason_jar_diy: "budget_experiment_start", pitcher_filter: "fridge_ready_to_pour",
    immersion_toddy: "concentrate_dilute_week_supply", drip_tower: "cafe_visual_slow_craft",
    nitro_keg: "draft_tap_creamy_cascade",
  };
  return m[t];
}

export function coldBrews(): ColdBrewType[] {
  return ["mason_jar_diy", "pitcher_filter", "immersion_toddy", "drip_tower", "nitro_keg"];
}

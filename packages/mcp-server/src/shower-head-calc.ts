export type ShowerHeadType = "rain_ceiling" | "handheld_detach" | "high_pressure_jet" | "dual_combo" | "filtered_vitamin";

export function waterPressure(t: ShowerHeadType): number {
  const m: Record<ShowerHeadType, number> = {
    rain_ceiling: 4, handheld_detach: 6, high_pressure_jet: 10, dual_combo: 8, filtered_vitamin: 5,
  };
  return m[t];
}

export function coverageArea(t: ShowerHeadType): number {
  const m: Record<ShowerHeadType, number> = {
    rain_ceiling: 10, handheld_detach: 5, high_pressure_jet: 3, dual_combo: 8, filtered_vitamin: 5,
  };
  return m[t];
}

export function waterEfficiency(t: ShowerHeadType): number {
  const m: Record<ShowerHeadType, number> = {
    rain_ceiling: 4, handheld_detach: 7, high_pressure_jet: 3, dual_combo: 5, filtered_vitamin: 8,
  };
  return m[t];
}

export function installDifficulty(t: ShowerHeadType): number {
  const m: Record<ShowerHeadType, number> = {
    rain_ceiling: 9, handheld_detach: 2, high_pressure_jet: 2, dual_combo: 4, filtered_vitamin: 3,
  };
  return m[t];
}

export function headCost(t: ShowerHeadType): number {
  const m: Record<ShowerHeadType, number> = {
    rain_ceiling: 8, handheld_detach: 4, high_pressure_jet: 3, dual_combo: 6, filtered_vitamin: 5,
  };
  return m[t];
}

export function hasFilter(t: ShowerHeadType): boolean {
  const m: Record<ShowerHeadType, boolean> = {
    rain_ceiling: false, handheld_detach: false, high_pressure_jet: false, dual_combo: false, filtered_vitamin: true,
  };
  return m[t];
}

export function multiSpray(t: ShowerHeadType): boolean {
  const m: Record<ShowerHeadType, boolean> = {
    rain_ceiling: false, handheld_detach: true, high_pressure_jet: true, dual_combo: true, filtered_vitamin: false,
  };
  return m[t];
}

export function sprayDesign(t: ShowerHeadType): string {
  const m: Record<ShowerHeadType, string> = {
    rain_ceiling: "wide_gravity_laminar_flow", handheld_detach: "flexible_hose_multi_setting",
    high_pressure_jet: "turbo_nozzle_concentrated", dual_combo: "fixed_plus_handheld_diverter",
    filtered_vitamin: "kdf_carbon_infused_cartridge",
  };
  return m[t];
}

export function bestBathroom(t: ShowerHeadType): string {
  const m: Record<ShowerHeadType, string> = {
    rain_ceiling: "luxury_spa_master_bath", handheld_detach: "family_kids_pets_rinse",
    high_pressure_jet: "low_pressure_fix_boost", dual_combo: "versatile_two_person_use",
    filtered_vitamin: "hard_water_chlorine_area",
  };
  return m[t];
}

export function showerHeads(): ShowerHeadType[] {
  return ["rain_ceiling", "handheld_detach", "high_pressure_jet", "dual_combo", "filtered_vitamin"];
}

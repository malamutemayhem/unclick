export type SteamMopType = "upright_standard" | "handheld_portable" | "cylinder_canister" | "spin_scrub" | "steam_vacuum_combo";

export function steamPower(t: SteamMopType): number {
  const m: Record<SteamMopType, number> = {
    upright_standard: 7, handheld_portable: 4, cylinder_canister: 9, spin_scrub: 8, steam_vacuum_combo: 8,
  };
  return m[t];
}

export function heatUpTime(t: SteamMopType): number {
  const m: Record<SteamMopType, number> = {
    upright_standard: 7, handheld_portable: 9, cylinder_canister: 4, spin_scrub: 6, steam_vacuum_combo: 5,
  };
  return m[t];
}

export function tankSize(t: SteamMopType): number {
  const m: Record<SteamMopType, number> = {
    upright_standard: 6, handheld_portable: 2, cylinder_canister: 10, spin_scrub: 6, steam_vacuum_combo: 7,
  };
  return m[t];
}

export function maneuverability(t: SteamMopType): number {
  const m: Record<SteamMopType, number> = {
    upright_standard: 7, handheld_portable: 10, cylinder_canister: 5, spin_scrub: 8, steam_vacuum_combo: 6,
  };
  return m[t];
}

export function mopCost(t: SteamMopType): number {
  const m: Record<SteamMopType, number> = {
    upright_standard: 4, handheld_portable: 3, cylinder_canister: 8, spin_scrub: 6, steam_vacuum_combo: 9,
  };
  return m[t];
}

export function chemicalFree(t: SteamMopType): boolean {
  const m: Record<SteamMopType, boolean> = {
    upright_standard: true, handheld_portable: true, cylinder_canister: true, spin_scrub: true, steam_vacuum_combo: true,
  };
  return m[t];
}

export function vacuumBuiltIn(t: SteamMopType): boolean {
  const m: Record<SteamMopType, boolean> = {
    upright_standard: false, handheld_portable: false, cylinder_canister: false, spin_scrub: false, steam_vacuum_combo: true,
  };
  return m[t];
}

export function padType(t: SteamMopType): string {
  const m: Record<SteamMopType, string> = {
    upright_standard: "microfiber_rectangle",
    handheld_portable: "cloth_bonnet_small",
    cylinder_canister: "floor_nozzle_cloth",
    spin_scrub: "rotating_microfiber_disc",
    steam_vacuum_combo: "dual_clean_vac_steam",
  };
  return m[t];
}

export function bestFloor(t: SteamMopType): string {
  const m: Record<SteamMopType, string> = {
    upright_standard: "hardwood_tile_daily",
    handheld_portable: "countertop_grout_spot",
    cylinder_canister: "whole_house_deep_clean",
    spin_scrub: "tile_grout_scrub",
    steam_vacuum_combo: "busy_household_all_floor",
  };
  return m[t];
}

export function steamMops(): SteamMopType[] {
  return ["upright_standard", "handheld_portable", "cylinder_canister", "spin_scrub", "steam_vacuum_combo"];
}

export type SteamCleanerType = "handheld_compact" | "cylinder_canister" | "upright_mop" | "wallpaper_strip" | "commercial_vapor";

export function steamTemp(t: SteamCleanerType): number {
  const m: Record<SteamCleanerType, number> = {
    handheld_compact: 5, cylinder_canister: 9, upright_mop: 7, wallpaper_strip: 6, commercial_vapor: 10,
  };
  return m[t];
}

export function tankCapacity(t: SteamCleanerType): number {
  const m: Record<SteamCleanerType, number> = {
    handheld_compact: 2, cylinder_canister: 9, upright_mop: 5, wallpaper_strip: 4, commercial_vapor: 10,
  };
  return m[t];
}

export function heatUpTime(t: SteamCleanerType): number {
  const m: Record<SteamCleanerType, number> = {
    handheld_compact: 10, cylinder_canister: 4, upright_mop: 8, wallpaper_strip: 7, commercial_vapor: 2,
  };
  return m[t];
}

export function attachmentCount(t: SteamCleanerType): number {
  const m: Record<SteamCleanerType, number> = {
    handheld_compact: 5, cylinder_canister: 10, upright_mop: 4, wallpaper_strip: 2, commercial_vapor: 8,
  };
  return m[t];
}

export function cleanerCost(t: SteamCleanerType): number {
  const m: Record<SteamCleanerType, number> = {
    handheld_compact: 2, cylinder_canister: 7, upright_mop: 5, wallpaper_strip: 3, commercial_vapor: 10,
  };
  return m[t];
}

export function continuousSteam(t: SteamCleanerType): boolean {
  const m: Record<SteamCleanerType, boolean> = {
    handheld_compact: false, cylinder_canister: true, upright_mop: true, wallpaper_strip: true, commercial_vapor: true,
  };
  return m[t];
}

export function pressurized(t: SteamCleanerType): boolean {
  const m: Record<SteamCleanerType, boolean> = {
    handheld_compact: false, cylinder_canister: true, upright_mop: false, wallpaper_strip: false, commercial_vapor: true,
  };
  return m[t];
}

export function heatingElement(t: SteamCleanerType): string {
  const m: Record<SteamCleanerType, string> = {
    handheld_compact: "direct_heat_small_boiler", cylinder_canister: "pressurized_steel_boiler",
    upright_mop: "heating_plate_instant", wallpaper_strip: "open_reservoir_steam_plate",
    commercial_vapor: "industrial_boiler_high_psi",
  };
  return m[t];
}

export function bestClean(t: SteamCleanerType): string {
  const m: Record<SteamCleanerType, string> = {
    handheld_compact: "grout_faucet_spot_sanitize", cylinder_canister: "whole_home_multi_surface",
    upright_mop: "hard_floor_daily_sanitize", wallpaper_strip: "wallpaper_removal_prep",
    commercial_vapor: "restaurant_hospital_grade",
  };
  return m[t];
}

export function steamCleaners(): SteamCleanerType[] {
  return ["handheld_compact", "cylinder_canister", "upright_mop", "wallpaper_strip", "commercial_vapor"];
}

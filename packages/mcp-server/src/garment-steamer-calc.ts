export type GarmentSteamerType = "handheld_travel_compact" | "upright_standing_pole" | "press_style_flat" | "fabric_refresh_spray" | "commercial_high_pressure";

export function wrinkleRemoval(t: GarmentSteamerType): number {
  const m: Record<GarmentSteamerType, number> = {
    handheld_travel_compact: 6, upright_standing_pole: 9, press_style_flat: 10, fabric_refresh_spray: 3, commercial_high_pressure: 10,
  };
  return m[t];
}

export function heatUpSpeed(t: GarmentSteamerType): number {
  const m: Record<GarmentSteamerType, number> = {
    handheld_travel_compact: 9, upright_standing_pole: 6, press_style_flat: 5, fabric_refresh_spray: 10, commercial_high_pressure: 4,
  };
  return m[t];
}

export function steamDuration(t: GarmentSteamerType): number {
  const m: Record<GarmentSteamerType, number> = {
    handheld_travel_compact: 4, upright_standing_pole: 9, press_style_flat: 7, fabric_refresh_spray: 1, commercial_high_pressure: 10,
  };
  return m[t];
}

export function portability(t: GarmentSteamerType): number {
  const m: Record<GarmentSteamerType, number> = {
    handheld_travel_compact: 10, upright_standing_pole: 4, press_style_flat: 3, fabric_refresh_spray: 10, commercial_high_pressure: 2,
  };
  return m[t];
}

export function steamerCost(t: GarmentSteamerType): number {
  const m: Record<GarmentSteamerType, number> = {
    handheld_travel_compact: 2, upright_standing_pole: 5, press_style_flat: 6, fabric_refresh_spray: 1, commercial_high_pressure: 9,
  };
  return m[t];
}

export function sanitizes(t: GarmentSteamerType): boolean {
  const m: Record<GarmentSteamerType, boolean> = {
    handheld_travel_compact: true, upright_standing_pole: true, press_style_flat: true, fabric_refresh_spray: false, commercial_high_pressure: true,
  };
  return m[t];
}

export function needsHanger(t: GarmentSteamerType): boolean {
  const m: Record<GarmentSteamerType, boolean> = {
    handheld_travel_compact: true, upright_standing_pole: true, press_style_flat: false, fabric_refresh_spray: false, commercial_high_pressure: true,
  };
  return m[t];
}

export function steamMethod(t: GarmentSteamerType): string {
  const m: Record<GarmentSteamerType, string> = {
    handheld_travel_compact: "small_tank_quick_burst",
    upright_standing_pole: "large_tank_continuous_flow",
    press_style_flat: "heated_plate_press_steam",
    fabric_refresh_spray: "chemical_spray_no_heat",
    commercial_high_pressure: "boiler_high_psi_nozzle",
  };
  return m[t];
}

export function bestUse(t: GarmentSteamerType): string {
  const m: Record<GarmentSteamerType, string> = {
    handheld_travel_compact: "travel_quick_touchup",
    upright_standing_pole: "home_closet_daily",
    press_style_flat: "crisp_shirt_crease_press",
    fabric_refresh_spray: "fabric_odor_refresh",
    commercial_high_pressure: "tailor_retail_volume",
  };
  return m[t];
}

export function garmentSteamers(): GarmentSteamerType[] {
  return ["handheld_travel_compact", "upright_standing_pole", "press_style_flat", "fabric_refresh_spray", "commercial_high_pressure"];
}

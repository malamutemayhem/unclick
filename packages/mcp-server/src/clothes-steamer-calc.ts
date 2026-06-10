export type ClothesSteamerType = "handheld_travel" | "upright_garment" | "press_flat_steam" | "steam_iron_combo" | "portable_mini";

export function wrinkleRemoval(t: ClothesSteamerType): number {
  const m: Record<ClothesSteamerType, number> = {
    handheld_travel: 6, upright_garment: 9, press_flat_steam: 10, steam_iron_combo: 8, portable_mini: 4,
  };
  return m[t];
}

export function heatUpTime(t: ClothesSteamerType): number {
  const m: Record<ClothesSteamerType, number> = {
    handheld_travel: 8, upright_garment: 5, press_flat_steam: 4, steam_iron_combo: 6, portable_mini: 10,
  };
  return m[t];
}

export function tankCapacity(t: ClothesSteamerType): number {
  const m: Record<ClothesSteamerType, number> = {
    handheld_travel: 3, upright_garment: 10, press_flat_steam: 7, steam_iron_combo: 5, portable_mini: 1,
  };
  return m[t];
}

export function portability(t: ClothesSteamerType): number {
  const m: Record<ClothesSteamerType, number> = {
    handheld_travel: 9, upright_garment: 3, press_flat_steam: 2, steam_iron_combo: 6, portable_mini: 10,
  };
  return m[t];
}

export function steamerCost(t: ClothesSteamerType): number {
  const m: Record<ClothesSteamerType, number> = {
    handheld_travel: 3, upright_garment: 7, press_flat_steam: 8, steam_iron_combo: 5, portable_mini: 2,
  };
  return m[t];
}

export function fabricSafe(t: ClothesSteamerType): boolean {
  const m: Record<ClothesSteamerType, boolean> = {
    handheld_travel: true, upright_garment: true, press_flat_steam: false, steam_iron_combo: false, portable_mini: true,
  };
  return m[t];
}

export function creasePossible(t: ClothesSteamerType): boolean {
  const m: Record<ClothesSteamerType, boolean> = {
    handheld_travel: false, upright_garment: false, press_flat_steam: true, steam_iron_combo: true, portable_mini: false,
  };
  return m[t];
}

export function steamMethod(t: ClothesSteamerType): string {
  const m: Record<ClothesSteamerType, string> = {
    handheld_travel: "continuous_jet_handheld",
    upright_garment: "telescopic_pole_hose",
    press_flat_steam: "heated_plate_press_clamp",
    steam_iron_combo: "soleplate_steam_burst",
    portable_mini: "compact_burst_pocket",
  };
  return m[t];
}

export function bestUse(t: ClothesSteamerType): string {
  const m: Record<ClothesSteamerType, string> = {
    handheld_travel: "hotel_suitcase_refresh",
    upright_garment: "closet_full_wardrobe",
    press_flat_steam: "dress_shirt_crisp_pleat",
    steam_iron_combo: "general_home_ironing",
    portable_mini: "quick_touch_up_office",
  };
  return m[t];
}

export function clothesSteamers(): ClothesSteamerType[] {
  return ["handheld_travel", "upright_garment", "press_flat_steam", "steam_iron_combo", "portable_mini"];
}

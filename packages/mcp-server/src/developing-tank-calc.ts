export type DevelopingTankType = "stainless_steel_reel" | "plastic_paterson" | "jobo_rotary" | "mod54_sheet" | "daylight_ap_compact";

export function loadEase(t: DevelopingTankType): number {
  const m: Record<DevelopingTankType, number> = {
    stainless_steel_reel: 4, plastic_paterson: 8, jobo_rotary: 6, mod54_sheet: 5, daylight_ap_compact: 9,
  };
  return m[t];
}

export function developConsistency(t: DevelopingTankType): number {
  const m: Record<DevelopingTankType, number> = {
    stainless_steel_reel: 8, plastic_paterson: 7, jobo_rotary: 10, mod54_sheet: 7, daylight_ap_compact: 6,
  };
  return m[t];
}

export function chemistryVolume(t: DevelopingTankType): number {
  const m: Record<DevelopingTankType, number> = {
    stainless_steel_reel: 6, plastic_paterson: 7, jobo_rotary: 4, mod54_sheet: 8, daylight_ap_compact: 3,
  };
  return m[t];
}

export function formatRange(t: DevelopingTankType): number {
  const m: Record<DevelopingTankType, number> = {
    stainless_steel_reel: 6, plastic_paterson: 7, jobo_rotary: 9, mod54_sheet: 10, daylight_ap_compact: 4,
  };
  return m[t];
}

export function tankCost(t: DevelopingTankType): number {
  const m: Record<DevelopingTankType, number> = {
    stainless_steel_reel: 5, plastic_paterson: 3, jobo_rotary: 10, mod54_sheet: 6, daylight_ap_compact: 4,
  };
  return m[t];
}

export function lightTight(t: DevelopingTankType): boolean {
  const m: Record<DevelopingTankType, boolean> = {
    stainless_steel_reel: true, plastic_paterson: true, jobo_rotary: true, mod54_sheet: true, daylight_ap_compact: true,
  };
  return m[t];
}

export function motorized(t: DevelopingTankType): boolean {
  const m: Record<DevelopingTankType, boolean> = {
    stainless_steel_reel: false, plastic_paterson: false, jobo_rotary: true, mod54_sheet: false, daylight_ap_compact: false,
  };
  return m[t];
}

export function agitationMethod(t: DevelopingTankType): string {
  const m: Record<DevelopingTankType, string> = {
    stainless_steel_reel: "inversion_manual_tap",
    plastic_paterson: "inversion_twist_rod",
    jobo_rotary: "continuous_rotation_motor",
    mod54_sheet: "inversion_gentle_rock",
    daylight_ap_compact: "squeeze_bellows_pump",
  };
  return m[t];
}

export function bestFormat(t: DevelopingTankType): string {
  const m: Record<DevelopingTankType, string> = {
    stainless_steel_reel: "classic_35mm_120_roll",
    plastic_paterson: "beginner_35mm_easy",
    jobo_rotary: "pro_batch_consistent",
    mod54_sheet: "large_format_4x5",
    daylight_ap_compact: "quick_single_roll",
  };
  return m[t];
}

export function developingTanks(): DevelopingTankType[] {
  return ["stainless_steel_reel", "plastic_paterson", "jobo_rotary", "mod54_sheet", "daylight_ap_compact"];
}

export type ParingKnifeType = "english_bevel_wide" | "french_plow_narrow" | "japanese_skive_thin" | "swiss_spokeshave_curve" | "utility_snap_blade";

export function edgeSharp(t: ParingKnifeType): number {
  const m: Record<ParingKnifeType, number> = {
    english_bevel_wide: 8, french_plow_narrow: 9, japanese_skive_thin: 10, swiss_spokeshave_curve: 7, utility_snap_blade: 6,
  };
  return m[t];
}

export function controlFine(t: ParingKnifeType): number {
  const m: Record<ParingKnifeType, number> = {
    english_bevel_wide: 7, french_plow_narrow: 9, japanese_skive_thin: 10, swiss_spokeshave_curve: 8, utility_snap_blade: 5,
  };
  return m[t];
}

export function leatherPare(t: ParingKnifeType): number {
  const m: Record<ParingKnifeType, number> = {
    english_bevel_wide: 9, french_plow_narrow: 8, japanese_skive_thin: 10, swiss_spokeshave_curve: 7, utility_snap_blade: 4,
  };
  return m[t];
}

export function easeOfUse(t: ParingKnifeType): number {
  const m: Record<ParingKnifeType, number> = {
    english_bevel_wide: 7, french_plow_narrow: 6, japanese_skive_thin: 4, swiss_spokeshave_curve: 8, utility_snap_blade: 10,
  };
  return m[t];
}

export function knifeCost(t: ParingKnifeType): number {
  const m: Record<ParingKnifeType, number> = {
    english_bevel_wide: 4, french_plow_narrow: 4, japanese_skive_thin: 5, swiss_spokeshave_curve: 3, utility_snap_blade: 1,
  };
  return m[t];
}

export function replaceBlade(t: ParingKnifeType): boolean {
  const m: Record<ParingKnifeType, boolean> = {
    english_bevel_wide: false, french_plow_narrow: false, japanese_skive_thin: false, swiss_spokeshave_curve: false, utility_snap_blade: true,
  };
  return m[t];
}

export function beveled(t: ParingKnifeType): boolean {
  const m: Record<ParingKnifeType, boolean> = {
    english_bevel_wide: true, french_plow_narrow: true, japanese_skive_thin: true, swiss_spokeshave_curve: false, utility_snap_blade: false,
  };
  return m[t];
}

export function bladeMaterial(t: ParingKnifeType): string {
  const m: Record<ParingKnifeType, string> = {
    english_bevel_wide: "carbon_steel_forged",
    french_plow_narrow: "high_carbon_ground",
    japanese_skive_thin: "white_steel_laminate",
    swiss_spokeshave_curve: "tool_steel_curved",
    utility_snap_blade: "snap_off_segment",
  };
  return m[t];
}

export function bestUse(t: ParingKnifeType): string {
  const m: Record<ParingKnifeType, string> = {
    english_bevel_wide: "edge_paring_leather",
    french_plow_narrow: "spine_edge_trim",
    japanese_skive_thin: "thin_leather_skive",
    swiss_spokeshave_curve: "curved_spine_pare",
    utility_snap_blade: "board_paper_cut",
  };
  return m[t];
}

export function paringKnives(): ParingKnifeType[] {
  return ["english_bevel_wide", "french_plow_narrow", "japanese_skive_thin", "swiss_spokeshave_curve", "utility_snap_blade"];
}

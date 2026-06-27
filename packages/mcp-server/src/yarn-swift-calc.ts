export type YarnSwiftType = "umbrella_fold_wood" | "amish_style_vertical" | "tabletop_clamp_metal" | "skein_winder_rotary" | "ball_winder_combo";

export function windSpeed(t: YarnSwiftType): number {
  const m: Record<YarnSwiftType, number> = {
    umbrella_fold_wood: 7, amish_style_vertical: 6, tabletop_clamp_metal: 8, skein_winder_rotary: 9, ball_winder_combo: 10,
  };
  return m[t];
}

export function skeinCapacity(t: YarnSwiftType): number {
  const m: Record<YarnSwiftType, number> = {
    umbrella_fold_wood: 8, amish_style_vertical: 9, tabletop_clamp_metal: 7, skein_winder_rotary: 10, ball_winder_combo: 6,
  };
  return m[t];
}

export function foldability(t: YarnSwiftType): number {
  const m: Record<YarnSwiftType, number> = {
    umbrella_fold_wood: 10, amish_style_vertical: 3, tabletop_clamp_metal: 7, skein_winder_rotary: 4, ball_winder_combo: 8,
  };
  return m[t];
}

export function stability(t: YarnSwiftType): number {
  const m: Record<YarnSwiftType, number> = {
    umbrella_fold_wood: 6, amish_style_vertical: 9, tabletop_clamp_metal: 8, skein_winder_rotary: 10, ball_winder_combo: 7,
  };
  return m[t];
}

export function swiftCost(t: YarnSwiftType): number {
  const m: Record<YarnSwiftType, number> = {
    umbrella_fold_wood: 2, amish_style_vertical: 2, tabletop_clamp_metal: 2, skein_winder_rotary: 3, ball_winder_combo: 3,
  };
  return m[t];
}

export function freestanding(t: YarnSwiftType): boolean {
  const m: Record<YarnSwiftType, boolean> = {
    umbrella_fold_wood: false, amish_style_vertical: true, tabletop_clamp_metal: false, skein_winder_rotary: true, ball_winder_combo: false,
  };
  return m[t];
}

export function clampMount(t: YarnSwiftType): boolean {
  const m: Record<YarnSwiftType, boolean> = {
    umbrella_fold_wood: true, amish_style_vertical: false, tabletop_clamp_metal: true, skein_winder_rotary: false, ball_winder_combo: true,
  };
  return m[t];
}

export function swiftFrame(t: YarnSwiftType): string {
  const m: Record<YarnSwiftType, string> = {
    umbrella_fold_wood: "birch_umbrella_fold",
    amish_style_vertical: "hardwood_cross_arm",
    tabletop_clamp_metal: "steel_expandable",
    skein_winder_rotary: "metal_cage_rotary",
    ball_winder_combo: "plastic_gear_set",
  };
  return m[t];
}

export function bestUse(t: YarnSwiftType): string {
  const m: Record<YarnSwiftType, string> = {
    umbrella_fold_wood: "portable_skein_hold",
    amish_style_vertical: "floor_stand_wind",
    tabletop_clamp_metal: "table_edge_wind",
    skein_winder_rotary: "bulk_skein_unwind",
    ball_winder_combo: "skein_to_ball_fast",
  };
  return m[t];
}

export function yarnSwifts(): YarnSwiftType[] {
  return ["umbrella_fold_wood", "amish_style_vertical", "tabletop_clamp_metal", "skein_winder_rotary", "ball_winder_combo"];
}

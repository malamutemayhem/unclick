export type TesseraCutterType = "hardie_anvil_hammer" | "wheeled_nipper_score" | "glass_cutter_oil" | "wet_saw_diamond" | "mosaic_plier_snap";

export function cutAccuracy(t: TesseraCutterType): number {
  const m: Record<TesseraCutterType, number> = {
    hardie_anvil_hammer: 6, wheeled_nipper_score: 8, glass_cutter_oil: 9, wet_saw_diamond: 10, mosaic_plier_snap: 7,
  };
  return m[t];
}

export function speedOutput(t: TesseraCutterType): number {
  const m: Record<TesseraCutterType, number> = {
    hardie_anvil_hammer: 9, wheeled_nipper_score: 7, glass_cutter_oil: 6, wet_saw_diamond: 10, mosaic_plier_snap: 8,
  };
  return m[t];
}

export function shapeControl(t: TesseraCutterType): number {
  const m: Record<TesseraCutterType, number> = {
    hardie_anvil_hammer: 5, wheeled_nipper_score: 8, glass_cutter_oil: 9, wet_saw_diamond: 10, mosaic_plier_snap: 7,
  };
  return m[t];
}

export function portability(t: TesseraCutterType): number {
  const m: Record<TesseraCutterType, number> = {
    hardie_anvil_hammer: 6, wheeled_nipper_score: 9, glass_cutter_oil: 10, wet_saw_diamond: 3, mosaic_plier_snap: 9,
  };
  return m[t];
}

export function cutterCost(t: TesseraCutterType): number {
  const m: Record<TesseraCutterType, number> = {
    hardie_anvil_hammer: 2, wheeled_nipper_score: 1, glass_cutter_oil: 1, wet_saw_diamond: 4, mosaic_plier_snap: 1,
  };
  return m[t];
}

export function needsWater(t: TesseraCutterType): boolean {
  const m: Record<TesseraCutterType, boolean> = {
    hardie_anvil_hammer: false, wheeled_nipper_score: false, glass_cutter_oil: false, wet_saw_diamond: true, mosaic_plier_snap: false,
  };
  return m[t];
}

export function forSmalti(t: TesseraCutterType): boolean {
  const m: Record<TesseraCutterType, boolean> = {
    hardie_anvil_hammer: true, wheeled_nipper_score: true, glass_cutter_oil: false, wet_saw_diamond: true, mosaic_plier_snap: false,
  };
  return m[t];
}

export function cuttingAction(t: TesseraCutterType): string {
  const m: Record<TesseraCutterType, string> = {
    hardie_anvil_hammer: "strike_split_fracture",
    wheeled_nipper_score: "score_snap_wheel",
    glass_cutter_oil: "oil_wheel_score_line",
    wet_saw_diamond: "diamond_blade_wet_cut",
    mosaic_plier_snap: "squeeze_snap_break",
  };
  return m[t];
}

export function bestTessera(t: TesseraCutterType): string {
  const m: Record<TesseraCutterType, string> = {
    hardie_anvil_hammer: "marble_stone_cube",
    wheeled_nipper_score: "vitreous_glass_tile",
    glass_cutter_oil: "stained_glass_piece",
    wet_saw_diamond: "porcelain_precise_shape",
    mosaic_plier_snap: "ceramic_tile_small",
  };
  return m[t];
}

export function tesseraCutters(): TesseraCutterType[] {
  return ["hardie_anvil_hammer", "wheeled_nipper_score", "glass_cutter_oil", "wet_saw_diamond", "mosaic_plier_snap"];
}

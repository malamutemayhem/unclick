export type BandSawType = "benchtop_9_inch" | "floor_14_inch" | "resaw_17_inch" | "portable_metal" | "meat_bone_food";

export function cutDepth(t: BandSawType): number {
  const m: Record<BandSawType, number> = {
    benchtop_9_inch: 4, floor_14_inch: 7, resaw_17_inch: 10, portable_metal: 3, meat_bone_food: 6,
  };
  return m[t];
}

export function throatCapacity(t: BandSawType): number {
  const m: Record<BandSawType, number> = {
    benchtop_9_inch: 4, floor_14_inch: 7, resaw_17_inch: 10, portable_metal: 3, meat_bone_food: 5,
  };
  return m[t];
}

export function curveAbility(t: BandSawType): number {
  const m: Record<BandSawType, number> = {
    benchtop_9_inch: 8, floor_14_inch: 7, resaw_17_inch: 5, portable_metal: 6, meat_bone_food: 3,
  };
  return m[t];
}

export function bladeSpeed(t: BandSawType): number {
  const m: Record<BandSawType, number> = {
    benchtop_9_inch: 7, floor_14_inch: 8, resaw_17_inch: 6, portable_metal: 4, meat_bone_food: 5,
  };
  return m[t];
}

export function sawCost(t: BandSawType): number {
  const m: Record<BandSawType, number> = {
    benchtop_9_inch: 3, floor_14_inch: 6, resaw_17_inch: 9, portable_metal: 5, meat_bone_food: 7,
  };
  return m[t];
}

export function resawCapable(t: BandSawType): boolean {
  const m: Record<BandSawType, boolean> = {
    benchtop_9_inch: false, floor_14_inch: true, resaw_17_inch: true, portable_metal: false, meat_bone_food: false,
  };
  return m[t];
}

export function foodGrade(t: BandSawType): boolean {
  const m: Record<BandSawType, boolean> = {
    benchtop_9_inch: false, floor_14_inch: false, resaw_17_inch: false, portable_metal: false, meat_bone_food: true,
  };
  return m[t];
}

export function bladeWidth(t: BandSawType): string {
  const m: Record<BandSawType, string> = {
    benchtop_9_inch: "quarter_inch_narrow",
    floor_14_inch: "half_inch_general",
    resaw_17_inch: "one_inch_wide_resaw",
    portable_metal: "bimetal_variable_pitch",
    meat_bone_food: "stainless_steel_toothed",
  };
  return m[t];
}

export function bestCut(t: BandSawType): string {
  const m: Record<BandSawType, string> = {
    benchtop_9_inch: "scroll_curve_small_parts",
    floor_14_inch: "general_woodworking_shop",
    resaw_17_inch: "veneer_bookmatched_lumber",
    portable_metal: "pipe_bar_stock_metal",
    meat_bone_food: "butcher_shop_processing",
  };
  return m[t];
}

export function bandSaws(): BandSawType[] {
  return ["benchtop_9_inch", "floor_14_inch", "resaw_17_inch", "portable_metal", "meat_bone_food"];
}

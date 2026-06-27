export type ChipCarvingType = "stab_knife_straight" | "cutting_knife_skew" | "detail_knife_small" | "chip_set_three" | "palm_handle_short";

export function cutPrecision(t: ChipCarvingType): number {
  const m: Record<ChipCarvingType, number> = {
    stab_knife_straight: 8, cutting_knife_skew: 9, detail_knife_small: 10, chip_set_three: 7, palm_handle_short: 8,
  };
  return m[t];
}

export function chipClean(t: ChipCarvingType): number {
  const m: Record<ChipCarvingType, number> = {
    stab_knife_straight: 9, cutting_knife_skew: 10, detail_knife_small: 7, chip_set_three: 8, palm_handle_short: 8,
  };
  return m[t];
}

export function comfortGrip(t: ChipCarvingType): number {
  const m: Record<ChipCarvingType, number> = {
    stab_knife_straight: 7, cutting_knife_skew: 7, detail_knife_small: 6, chip_set_three: 7, palm_handle_short: 10,
  };
  return m[t];
}

export function edgeHold(t: ChipCarvingType): number {
  const m: Record<ChipCarvingType, number> = {
    stab_knife_straight: 8, cutting_knife_skew: 9, detail_knife_small: 7, chip_set_three: 8, palm_handle_short: 7,
  };
  return m[t];
}

export function knifeCost(t: ChipCarvingType): number {
  const m: Record<ChipCarvingType, number> = {
    stab_knife_straight: 2, cutting_knife_skew: 3, detail_knife_small: 3, chip_set_three: 4, palm_handle_short: 2,
  };
  return m[t];
}

export function forGeometric(t: ChipCarvingType): boolean {
  const m: Record<ChipCarvingType, boolean> = {
    stab_knife_straight: true, cutting_knife_skew: true, detail_knife_small: false, chip_set_three: true, palm_handle_short: true,
  };
  return m[t];
}

export function isSet(t: ChipCarvingType): boolean {
  const m: Record<ChipCarvingType, boolean> = {
    stab_knife_straight: false, cutting_knife_skew: false, detail_knife_small: false, chip_set_three: true, palm_handle_short: false,
  };
  return m[t];
}

export function bladeProfile(t: ChipCarvingType): string {
  const m: Record<ChipCarvingType, string> = {
    stab_knife_straight: "straight_edge_point",
    cutting_knife_skew: "skew_angle_edge",
    detail_knife_small: "narrow_point_blade",
    chip_set_three: "stab_cut_detail_trio",
    palm_handle_short: "short_blade_palm",
  };
  return m[t];
}

export function bestUse(t: ChipCarvingType): string {
  const m: Record<ChipCarvingType, string> = {
    stab_knife_straight: "triangle_chip_stab",
    cutting_knife_skew: "chip_removal_cut",
    detail_knife_small: "fine_accent_detail",
    chip_set_three: "complete_chip_project",
    palm_handle_short: "small_piece_comfort",
  };
  return m[t];
}

export function chipCarvingKnives(): ChipCarvingType[] {
  return ["stab_knife_straight", "cutting_knife_skew", "detail_knife_small", "chip_set_three", "palm_handle_short"];
}

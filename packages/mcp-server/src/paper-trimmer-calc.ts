export type PaperTrimmerType = "rotary_blade_slide" | "guillotine_arm_chop" | "swing_arm_pivot" | "craft_knife_mat" | "personal_trimmer_mini";

export function cutPrecision(t: PaperTrimmerType): number {
  const m: Record<PaperTrimmerType, number> = {
    rotary_blade_slide: 9, guillotine_arm_chop: 7, swing_arm_pivot: 8, craft_knife_mat: 10, personal_trimmer_mini: 7,
  };
  return m[t];
}

export function sheetCapacity(t: PaperTrimmerType): number {
  const m: Record<PaperTrimmerType, number> = {
    rotary_blade_slide: 5, guillotine_arm_chop: 10, swing_arm_pivot: 8, craft_knife_mat: 1, personal_trimmer_mini: 3,
  };
  return m[t];
}

export function safetyLevel(t: PaperTrimmerType): number {
  const m: Record<PaperTrimmerType, number> = {
    rotary_blade_slide: 9, guillotine_arm_chop: 4, swing_arm_pivot: 6, craft_knife_mat: 3, personal_trimmer_mini: 10,
  };
  return m[t];
}

export function portability(t: PaperTrimmerType): number {
  const m: Record<PaperTrimmerType, number> = {
    rotary_blade_slide: 6, guillotine_arm_chop: 3, swing_arm_pivot: 4, craft_knife_mat: 8, personal_trimmer_mini: 10,
  };
  return m[t];
}

export function trimmerCost(t: PaperTrimmerType): number {
  const m: Record<PaperTrimmerType, number> = {
    rotary_blade_slide: 3, guillotine_arm_chop: 4, swing_arm_pivot: 3, craft_knife_mat: 1, personal_trimmer_mini: 2,
  };
  return m[t];
}

export function replaceBlade(t: PaperTrimmerType): boolean {
  const m: Record<PaperTrimmerType, boolean> = {
    rotary_blade_slide: true, guillotine_arm_chop: false, swing_arm_pivot: false, craft_knife_mat: true, personal_trimmer_mini: true,
  };
  return m[t];
}

export function selfHealing(t: PaperTrimmerType): boolean {
  const m: Record<PaperTrimmerType, boolean> = {
    rotary_blade_slide: false, guillotine_arm_chop: false, swing_arm_pivot: false, craft_knife_mat: true, personal_trimmer_mini: false,
  };
  return m[t];
}

export function bladeType(t: PaperTrimmerType): string {
  const m: Record<PaperTrimmerType, string> = {
    rotary_blade_slide: "circular_rolling_blade",
    guillotine_arm_chop: "long_straight_blade",
    swing_arm_pivot: "pivot_arm_blade",
    craft_knife_mat: "replaceable_snap_blade",
    personal_trimmer_mini: "small_rotary_cartridge",
  };
  return m[t];
}

export function bestProject(t: PaperTrimmerType): string {
  const m: Record<PaperTrimmerType, string> = {
    rotary_blade_slide: "card_making_precise",
    guillotine_arm_chop: "bulk_stack_trim",
    swing_arm_pivot: "scrapbook_large_cut",
    craft_knife_mat: "intricate_freehand",
    personal_trimmer_mini: "travel_crop_event",
  };
  return m[t];
}

export function paperTrimmers(): PaperTrimmerType[] {
  return ["rotary_blade_slide", "guillotine_arm_chop", "swing_arm_pivot", "craft_knife_mat", "personal_trimmer_mini"];
}

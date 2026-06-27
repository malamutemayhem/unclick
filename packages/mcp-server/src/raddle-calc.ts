export type RaddleType = "wood_peg_basic" | "metal_tooth_clamp" | "adjustable_width_slide" | "paddle_raddle_combo" | "sectional_beam_guide";

export function warpSpread(t: RaddleType): number {
  const m: Record<RaddleType, number> = {
    wood_peg_basic: 7, metal_tooth_clamp: 9, adjustable_width_slide: 10, paddle_raddle_combo: 6, sectional_beam_guide: 8,
  };
  return m[t];
}

export function easeOfUse(t: RaddleType): number {
  const m: Record<RaddleType, number> = {
    wood_peg_basic: 8, metal_tooth_clamp: 7, adjustable_width_slide: 9, paddle_raddle_combo: 10, sectional_beam_guide: 5,
  };
  return m[t];
}

export function warpProtect(t: RaddleType): number {
  const m: Record<RaddleType, number> = {
    wood_peg_basic: 8, metal_tooth_clamp: 6, adjustable_width_slide: 7, paddle_raddle_combo: 9, sectional_beam_guide: 7,
  };
  return m[t];
}

export function widthRange(t: RaddleType): number {
  const m: Record<RaddleType, number> = {
    wood_peg_basic: 6, metal_tooth_clamp: 7, adjustable_width_slide: 10, paddle_raddle_combo: 5, sectional_beam_guide: 8,
  };
  return m[t];
}

export function raddleCost(t: RaddleType): number {
  const m: Record<RaddleType, number> = {
    wood_peg_basic: 2, metal_tooth_clamp: 3, adjustable_width_slide: 4, paddle_raddle_combo: 3, sectional_beam_guide: 5,
  };
  return m[t];
}

export function adjustable(t: RaddleType): boolean {
  const m: Record<RaddleType, boolean> = {
    wood_peg_basic: false, metal_tooth_clamp: false, adjustable_width_slide: true, paddle_raddle_combo: false, sectional_beam_guide: true,
  };
  return m[t];
}

export function hasClamp(t: RaddleType): boolean {
  const m: Record<RaddleType, boolean> = {
    wood_peg_basic: false, metal_tooth_clamp: true, adjustable_width_slide: true, paddle_raddle_combo: false, sectional_beam_guide: true,
  };
  return m[t];
}

export function raddleMaterial(t: RaddleType): string {
  const m: Record<RaddleType, string> = {
    wood_peg_basic: "hardwood_dowel_peg",
    metal_tooth_clamp: "steel_tooth_rail",
    adjustable_width_slide: "aluminum_slide_track",
    paddle_raddle_combo: "wood_paddle_slotted",
    sectional_beam_guide: "metal_section_divider",
  };
  return m[t];
}

export function bestUse(t: RaddleType): string {
  const m: Record<RaddleType, string> = {
    wood_peg_basic: "basic_warp_spread",
    metal_tooth_clamp: "fine_warp_dense",
    adjustable_width_slide: "variable_width_project",
    paddle_raddle_combo: "small_loom_warp",
    sectional_beam_guide: "sectional_beam_warp",
  };
  return m[t];
}

export function raddles(): RaddleType[] {
  return ["wood_peg_basic", "metal_tooth_clamp", "adjustable_width_slide", "paddle_raddle_combo", "sectional_beam_guide"];
}

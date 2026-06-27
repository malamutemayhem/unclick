export type MakeupBrushType = "kabuki_powder_round" | "flat_foundation_paddle" | "angled_contour_sculpt" | "fan_highlight_sweep" | "blending_sponge_damp";

export function coverage(t: MakeupBrushType): number {
  const m: Record<MakeupBrushType, number> = {
    kabuki_powder_round: 8, flat_foundation_paddle: 10, angled_contour_sculpt: 6, fan_highlight_sweep: 4, blending_sponge_damp: 9,
  };
  return m[t];
}

export function blendAbility(t: MakeupBrushType): number {
  const m: Record<MakeupBrushType, number> = {
    kabuki_powder_round: 7, flat_foundation_paddle: 6, angled_contour_sculpt: 8, fan_highlight_sweep: 5, blending_sponge_damp: 10,
  };
  return m[t];
}

export function precision(t: MakeupBrushType): number {
  const m: Record<MakeupBrushType, number> = {
    kabuki_powder_round: 5, flat_foundation_paddle: 7, angled_contour_sculpt: 10, fan_highlight_sweep: 8, blending_sponge_damp: 6,
  };
  return m[t];
}

export function softness(t: MakeupBrushType): number {
  const m: Record<MakeupBrushType, number> = {
    kabuki_powder_round: 9, flat_foundation_paddle: 7, angled_contour_sculpt: 8, fan_highlight_sweep: 10, blending_sponge_damp: 8,
  };
  return m[t];
}

export function brushCost(t: MakeupBrushType): number {
  const m: Record<MakeupBrushType, number> = {
    kabuki_powder_round: 6, flat_foundation_paddle: 5, angled_contour_sculpt: 7, fan_highlight_sweep: 8, blending_sponge_damp: 3,
  };
  return m[t];
}

export function veganFriendly(t: MakeupBrushType): boolean {
  const m: Record<MakeupBrushType, boolean> = {
    kabuki_powder_round: true, flat_foundation_paddle: true, angled_contour_sculpt: true, fan_highlight_sweep: false, blending_sponge_damp: true,
  };
  return m[t];
}

export function washable(t: MakeupBrushType): boolean {
  const m: Record<MakeupBrushType, boolean> = {
    kabuki_powder_round: true, flat_foundation_paddle: true, angled_contour_sculpt: true, fan_highlight_sweep: true, blending_sponge_damp: true,
  };
  return m[t];
}

export function bristleMaterial(t: MakeupBrushType): string {
  const m: Record<MakeupBrushType, string> = {
    kabuki_powder_round: "synthetic_taklon_dense",
    flat_foundation_paddle: "nylon_flat_packed_firm",
    angled_contour_sculpt: "synthetic_duo_fiber_angle",
    fan_highlight_sweep: "natural_goat_hair_fan",
    blending_sponge_damp: "latex_free_hydrophilic_foam",
  };
  return m[t];
}

export function bestProduct(t: MakeupBrushType): string {
  const m: Record<MakeupBrushType, string> = {
    kabuki_powder_round: "loose_powder_setting",
    flat_foundation_paddle: "liquid_foundation_full",
    angled_contour_sculpt: "bronzer_contour_define",
    fan_highlight_sweep: "highlighter_light_dust",
    blending_sponge_damp: "concealer_cream_blend",
  };
  return m[t];
}

export function makeupBrushes(): MakeupBrushType[] {
  return ["kabuki_powder_round", "flat_foundation_paddle", "angled_contour_sculpt", "fan_highlight_sweep", "blending_sponge_damp"];
}

export type FettlingKnifeType = "flexible_blade_soft" | "stiff_blade_hard" | "serrated_edge_cut" | "angled_blade_trim" | "palette_knife_wide";

export function cutClean(t: FettlingKnifeType): number {
  const m: Record<FettlingKnifeType, number> = {
    flexible_blade_soft: 7, stiff_blade_hard: 9, serrated_edge_cut: 6, angled_blade_trim: 8, palette_knife_wide: 5,
  };
  return m[t];
}

export function flexControl(t: FettlingKnifeType): number {
  const m: Record<FettlingKnifeType, number> = {
    flexible_blade_soft: 10, stiff_blade_hard: 4, serrated_edge_cut: 5, angled_blade_trim: 7, palette_knife_wide: 8,
  };
  return m[t];
}

export function seamReach(t: FettlingKnifeType): number {
  const m: Record<FettlingKnifeType, number> = {
    flexible_blade_soft: 8, stiff_blade_hard: 6, serrated_edge_cut: 5, angled_blade_trim: 10, palette_knife_wide: 4,
  };
  return m[t];
}

export function durability(t: FettlingKnifeType): number {
  const m: Record<FettlingKnifeType, number> = {
    flexible_blade_soft: 6, stiff_blade_hard: 9, serrated_edge_cut: 8, angled_blade_trim: 7, palette_knife_wide: 7,
  };
  return m[t];
}

export function knifeCost(t: FettlingKnifeType): number {
  const m: Record<FettlingKnifeType, number> = {
    flexible_blade_soft: 1, stiff_blade_hard: 1, serrated_edge_cut: 2, angled_blade_trim: 2, palette_knife_wide: 1,
  };
  return m[t];
}

export function flexBlade(t: FettlingKnifeType): boolean {
  const m: Record<FettlingKnifeType, boolean> = {
    flexible_blade_soft: true, stiff_blade_hard: false, serrated_edge_cut: false, angled_blade_trim: false, palette_knife_wide: true,
  };
  return m[t];
}

export function serrated(t: FettlingKnifeType): boolean {
  const m: Record<FettlingKnifeType, boolean> = {
    flexible_blade_soft: false, stiff_blade_hard: false, serrated_edge_cut: true, angled_blade_trim: false, palette_knife_wide: false,
  };
  return m[t];
}

export function bladeMaterial(t: FettlingKnifeType): string {
  const m: Record<FettlingKnifeType, string> = {
    flexible_blade_soft: "spring_steel_thin",
    stiff_blade_hard: "carbon_steel_thick",
    serrated_edge_cut: "stainless_serrated",
    angled_blade_trim: "tool_steel_angled",
    palette_knife_wide: "flexible_stainless",
  };
  return m[t];
}

export function bestUse(t: FettlingKnifeType): string {
  const m: Record<FettlingKnifeType, string> = {
    flexible_blade_soft: "mold_seam_clean",
    stiff_blade_hard: "slab_edge_trim",
    serrated_edge_cut: "foam_clay_cut",
    angled_blade_trim: "tight_angle_reach",
    palette_knife_wide: "slip_apply_spread",
  };
  return m[t];
}

export function fettlingKnives(): FettlingKnifeType[] {
  return ["flexible_blade_soft", "stiff_blade_hard", "serrated_edge_cut", "angled_blade_trim", "palette_knife_wide"];
}

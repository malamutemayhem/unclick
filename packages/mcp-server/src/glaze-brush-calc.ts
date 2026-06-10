export type GlazeBrushType = "hake_flat_wide" | "fan_blending_soft" | "round_detail_fine" | "mop_wash_large" | "liner_stripe_thin";

export function coverageArea(t: GlazeBrushType): number {
  const m: Record<GlazeBrushType, number> = {
    hake_flat_wide: 10, fan_blending_soft: 7, round_detail_fine: 3, mop_wash_large: 9, liner_stripe_thin: 2,
  };
  return m[t];
}

export function detailControl(t: GlazeBrushType): number {
  const m: Record<GlazeBrushType, number> = {
    hake_flat_wide: 4, fan_blending_soft: 7, round_detail_fine: 10, mop_wash_large: 3, liner_stripe_thin: 10,
  };
  return m[t];
}

export function glazeHold(t: GlazeBrushType): number {
  const m: Record<GlazeBrushType, number> = {
    hake_flat_wide: 9, fan_blending_soft: 6, round_detail_fine: 5, mop_wash_large: 10, liner_stripe_thin: 4,
  };
  return m[t];
}

export function strokeSmooth(t: GlazeBrushType): number {
  const m: Record<GlazeBrushType, number> = {
    hake_flat_wide: 8, fan_blending_soft: 10, round_detail_fine: 7, mop_wash_large: 8, liner_stripe_thin: 6,
  };
  return m[t];
}

export function brushCost(t: GlazeBrushType): number {
  const m: Record<GlazeBrushType, number> = {
    hake_flat_wide: 1, fan_blending_soft: 2, round_detail_fine: 2, mop_wash_large: 2, liner_stripe_thin: 2,
  };
  return m[t];
}

export function forBaseCoat(t: GlazeBrushType): boolean {
  const m: Record<GlazeBrushType, boolean> = {
    hake_flat_wide: true, fan_blending_soft: false, round_detail_fine: false, mop_wash_large: true, liner_stripe_thin: false,
  };
  return m[t];
}

export function forBlending(t: GlazeBrushType): boolean {
  const m: Record<GlazeBrushType, boolean> = {
    hake_flat_wide: false, fan_blending_soft: true, round_detail_fine: false, mop_wash_large: false, liner_stripe_thin: false,
  };
  return m[t];
}

export function bristleType(t: GlazeBrushType): string {
  const m: Record<GlazeBrushType, string> = {
    hake_flat_wide: "goat_hair_soft",
    fan_blending_soft: "synthetic_nylon_fan",
    round_detail_fine: "sable_hair_pointed",
    mop_wash_large: "squirrel_hair_dome",
    liner_stripe_thin: "synthetic_fine_tip",
  };
  return m[t];
}

export function bestTechnique(t: GlazeBrushType): string {
  const m: Record<GlazeBrushType, string> = {
    hake_flat_wide: "even_base_coat_dip",
    fan_blending_soft: "gradient_blend_fade",
    round_detail_fine: "hand_painted_motif",
    mop_wash_large: "underglazing_wash",
    liner_stripe_thin: "fine_line_decoration",
  };
  return m[t];
}

export function glazeBrushes(): GlazeBrushType[] {
  return ["hake_flat_wide", "fan_blending_soft", "round_detail_fine", "mop_wash_large", "liner_stripe_thin"];
}

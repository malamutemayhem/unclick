export type PaintBrush = "round_sable" | "flat_bristle" | "filbert_synthetic" | "fan_blender" | "rigger_liner";

export function paintHolding(p: PaintBrush): number {
  const m: Record<PaintBrush, number> = {
    round_sable: 10, flat_bristle: 7, filbert_synthetic: 8, fan_blender: 3, rigger_liner: 5,
  };
  return m[p];
}

export function strokeControl(p: PaintBrush): number {
  const m: Record<PaintBrush, number> = {
    round_sable: 10, flat_bristle: 7, filbert_synthetic: 8, fan_blender: 4, rigger_liner: 9,
  };
  return m[p];
}

export function coverageArea(p: PaintBrush): number {
  const m: Record<PaintBrush, number> = {
    round_sable: 4, flat_bristle: 10, filbert_synthetic: 7, fan_blender: 6, rigger_liner: 1,
  };
  return m[p];
}

export function blendingAbility(p: PaintBrush): number {
  const m: Record<PaintBrush, number> = {
    round_sable: 7, flat_bristle: 5, filbert_synthetic: 9, fan_blender: 10, rigger_liner: 3,
  };
  return m[p];
}

export function brushCost(p: PaintBrush): number {
  const m: Record<PaintBrush, number> = {
    round_sable: 9, flat_bristle: 4, filbert_synthetic: 5, fan_blender: 4, rigger_liner: 6,
  };
  return m[p];
}

export function naturalHair(p: PaintBrush): boolean {
  const m: Record<PaintBrush, boolean> = {
    round_sable: true, flat_bristle: true, filbert_synthetic: false, fan_blender: false, rigger_liner: true,
  };
  return m[p];
}

export function suitableForWatercolor(p: PaintBrush): boolean {
  const m: Record<PaintBrush, boolean> = {
    round_sable: true, flat_bristle: false, filbert_synthetic: true, fan_blender: false, rigger_liner: true,
  };
  return m[p];
}

export function bristleMaterial(p: PaintBrush): string {
  const m: Record<PaintBrush, string> = {
    round_sable: "kolinsky_sable_natural_hair", flat_bristle: "hog_bristle_interlocked",
    filbert_synthetic: "taklon_nylon_blend_soft", fan_blender: "synthetic_fan_spread_fiber",
    rigger_liner: "sable_extra_long_point_hair",
  };
  return m[p];
}

export function bestTechnique(p: PaintBrush): string {
  const m: Record<PaintBrush, string> = {
    round_sable: "detail_wash_watercolor", flat_bristle: "bold_stroke_oil_acrylic",
    filbert_synthetic: "portrait_soft_edge_blend", fan_blender: "foliage_texture_dry_brush",
    rigger_liner: "fine_line_branch_signature",
  };
  return m[p];
}

export function paintBrushes(): PaintBrush[] {
  return ["round_sable", "flat_bristle", "filbert_synthetic", "fan_blender", "rigger_liner"];
}

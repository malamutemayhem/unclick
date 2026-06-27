export type BlendingToolType = "foam_round_dab" | "brush_flat_sweep" | "sponge_wedge_soft" | "mini_ink_apply" | "blending_pan_pastel";

export function blendSmooth(t: BlendingToolType): number {
  const m: Record<BlendingToolType, number> = {
    foam_round_dab: 9, brush_flat_sweep: 7, sponge_wedge_soft: 8, mini_ink_apply: 6, blending_pan_pastel: 10,
  };
  return m[t];
}

export function inkPickup(t: BlendingToolType): number {
  const m: Record<BlendingToolType, number> = {
    foam_round_dab: 8, brush_flat_sweep: 6, sponge_wedge_soft: 9, mini_ink_apply: 10, blending_pan_pastel: 7,
  };
  return m[t];
}

export function controlFine(t: BlendingToolType): number {
  const m: Record<BlendingToolType, number> = {
    foam_round_dab: 8, brush_flat_sweep: 7, sponge_wedge_soft: 5, mini_ink_apply: 10, blending_pan_pastel: 6,
  };
  return m[t];
}

export function cleanEase(t: BlendingToolType): number {
  const m: Record<BlendingToolType, number> = {
    foam_round_dab: 5, brush_flat_sweep: 7, sponge_wedge_soft: 4, mini_ink_apply: 3, blending_pan_pastel: 9,
  };
  return m[t];
}

export function toolCost(t: BlendingToolType): number {
  const m: Record<BlendingToolType, number> = {
    foam_round_dab: 1, brush_flat_sweep: 2, sponge_wedge_soft: 1, mini_ink_apply: 2, blending_pan_pastel: 3,
  };
  return m[t];
}

export function replaceable(t: BlendingToolType): boolean {
  const m: Record<BlendingToolType, boolean> = {
    foam_round_dab: true, brush_flat_sweep: false, sponge_wedge_soft: true, mini_ink_apply: true, blending_pan_pastel: true,
  };
  return m[t];
}

export function reusable(t: BlendingToolType): boolean {
  const m: Record<BlendingToolType, boolean> = {
    foam_round_dab: true, brush_flat_sweep: true, sponge_wedge_soft: false, mini_ink_apply: false, blending_pan_pastel: true,
  };
  return m[t];
}

export function padShape(t: BlendingToolType): string {
  const m: Record<BlendingToolType, string> = {
    foam_round_dab: "round_dome_foam",
    brush_flat_sweep: "flat_bristle_fan",
    sponge_wedge_soft: "wedge_cut_sponge",
    mini_ink_apply: "mini_round_dauber",
    blending_pan_pastel: "micropore_sponge_pad",
  };
  return m[t];
}

export function bestUse(t: BlendingToolType): string {
  const m: Record<BlendingToolType, string> = {
    foam_round_dab: "ink_blend_edge_card",
    brush_flat_sweep: "broad_wash_sweep",
    sponge_wedge_soft: "background_texture",
    mini_ink_apply: "small_area_detail",
    blending_pan_pastel: "soft_pastel_blend",
  };
  return m[t];
}

export function blendingTools(): BlendingToolType[] {
  return ["foam_round_dab", "brush_flat_sweep", "sponge_wedge_soft", "mini_ink_apply", "blending_pan_pastel"];
}

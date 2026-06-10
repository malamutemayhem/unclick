export type StitchingGrooverType = "adjustable_fence_guide" | "fixed_width_single" | "v_groove_edge_tool" | "stitch_marking_wheel" | "creasing_iron_heated";

export function grooveDepth(t: StitchingGrooverType): number {
  const m: Record<StitchingGrooverType, number> = {
    adjustable_fence_guide: 9, fixed_width_single: 8, v_groove_edge_tool: 7, stitch_marking_wheel: 5, creasing_iron_heated: 10,
  };
  return m[t];
}

export function lineConsistency(t: StitchingGrooverType): number {
  const m: Record<StitchingGrooverType, number> = {
    adjustable_fence_guide: 10, fixed_width_single: 8, v_groove_edge_tool: 7, stitch_marking_wheel: 9, creasing_iron_heated: 9,
  };
  return m[t];
}

export function versatility(t: StitchingGrooverType): number {
  const m: Record<StitchingGrooverType, number> = {
    adjustable_fence_guide: 10, fixed_width_single: 4, v_groove_edge_tool: 6, stitch_marking_wheel: 8, creasing_iron_heated: 7,
  };
  return m[t];
}

export function easeOfUse(t: StitchingGrooverType): number {
  const m: Record<StitchingGrooverType, number> = {
    adjustable_fence_guide: 8, fixed_width_single: 9, v_groove_edge_tool: 7, stitch_marking_wheel: 10, creasing_iron_heated: 6,
  };
  return m[t];
}

export function grooverCost(t: StitchingGrooverType): number {
  const m: Record<StitchingGrooverType, number> = {
    adjustable_fence_guide: 2, fixed_width_single: 1, v_groove_edge_tool: 1, stitch_marking_wheel: 2, creasing_iron_heated: 3,
  };
  return m[t];
}

export function needsHeat(t: StitchingGrooverType): boolean {
  const m: Record<StitchingGrooverType, boolean> = {
    adjustable_fence_guide: false, fixed_width_single: false, v_groove_edge_tool: false, stitch_marking_wheel: false, creasing_iron_heated: true,
  };
  return m[t];
}

export function adjustableWidth(t: StitchingGrooverType): boolean {
  const m: Record<StitchingGrooverType, boolean> = {
    adjustable_fence_guide: true, fixed_width_single: false, v_groove_edge_tool: false, stitch_marking_wheel: false, creasing_iron_heated: false,
  };
  return m[t];
}

export function bladeProfile(t: StitchingGrooverType): string {
  const m: Record<StitchingGrooverType, string> = {
    adjustable_fence_guide: "u_channel_fence",
    fixed_width_single: "u_channel_fixed",
    v_groove_edge_tool: "v_notch_blade",
    stitch_marking_wheel: "toothed_wheel_roll",
    creasing_iron_heated: "flat_tip_electric",
  };
  return m[t];
}

export function bestUse(t: StitchingGrooverType): string {
  const m: Record<StitchingGrooverType, string> = {
    adjustable_fence_guide: "wallet_card_holder",
    fixed_width_single: "belt_edge_stitch",
    v_groove_edge_tool: "decorative_edge_line",
    stitch_marking_wheel: "even_stitch_spacing",
    creasing_iron_heated: "luxury_bag_crease",
  };
  return m[t];
}

export function stitchingGroovers(): StitchingGrooverType[] {
  return ["adjustable_fence_guide", "fixed_width_single", "v_groove_edge_tool", "stitch_marking_wheel", "creasing_iron_heated"];
}

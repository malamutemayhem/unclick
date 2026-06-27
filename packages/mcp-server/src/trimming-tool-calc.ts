export type TrimmingToolType = "chattering_spring_steel" | "loop_tool_round_wire" | "ribbon_tool_flat_blade" | "diamond_tip_carbide" | "wooden_handle_gouge";

export function clayRemoval(t: TrimmingToolType): number {
  const m: Record<TrimmingToolType, number> = {
    chattering_spring_steel: 6, loop_tool_round_wire: 9, ribbon_tool_flat_blade: 10, diamond_tip_carbide: 7, wooden_handle_gouge: 8,
  };
  return m[t];
}

export function surfaceTexture(t: TrimmingToolType): number {
  const m: Record<TrimmingToolType, number> = {
    chattering_spring_steel: 10, loop_tool_round_wire: 5, ribbon_tool_flat_blade: 4, diamond_tip_carbide: 7, wooden_handle_gouge: 6,
  };
  return m[t];
}

export function controlFeel(t: TrimmingToolType): number {
  const m: Record<TrimmingToolType, number> = {
    chattering_spring_steel: 7, loop_tool_round_wire: 9, ribbon_tool_flat_blade: 8, diamond_tip_carbide: 10, wooden_handle_gouge: 8,
  };
  return m[t];
}

export function durability(t: TrimmingToolType): number {
  const m: Record<TrimmingToolType, number> = {
    chattering_spring_steel: 8, loop_tool_round_wire: 7, ribbon_tool_flat_blade: 7, diamond_tip_carbide: 10, wooden_handle_gouge: 6,
  };
  return m[t];
}

export function trimCost(t: TrimmingToolType): number {
  const m: Record<TrimmingToolType, number> = {
    chattering_spring_steel: 2, loop_tool_round_wire: 1, ribbon_tool_flat_blade: 1, diamond_tip_carbide: 3, wooden_handle_gouge: 1,
  };
  return m[t];
}

export function decorative(t: TrimmingToolType): boolean {
  const m: Record<TrimmingToolType, boolean> = {
    chattering_spring_steel: true, loop_tool_round_wire: false, ribbon_tool_flat_blade: false, diamond_tip_carbide: false, wooden_handle_gouge: false,
  };
  return m[t];
}

export function forFootTrim(t: TrimmingToolType): boolean {
  const m: Record<TrimmingToolType, boolean> = {
    chattering_spring_steel: false, loop_tool_round_wire: true, ribbon_tool_flat_blade: true, diamond_tip_carbide: true, wooden_handle_gouge: true,
  };
  return m[t];
}

export function bladeType(t: TrimmingToolType): string {
  const m: Record<TrimmingToolType, string> = {
    chattering_spring_steel: "flexible_spring_strip",
    loop_tool_round_wire: "round_wire_loop",
    ribbon_tool_flat_blade: "flat_ribbon_edge",
    diamond_tip_carbide: "carbide_point_insert",
    wooden_handle_gouge: "curved_gouge_steel",
  };
  return m[t];
}

export function bestPot(t: TrimmingToolType): string {
  const m: Record<TrimmingToolType, string> = {
    chattering_spring_steel: "decorative_chatter_bowl",
    loop_tool_round_wire: "mug_foot_ring",
    ribbon_tool_flat_blade: "platter_base_flat",
    diamond_tip_carbide: "porcelain_precise_trim",
    wooden_handle_gouge: "stoneware_heavy_carve",
  };
  return m[t];
}

export function trimmingTools(): TrimmingToolType[] {
  return ["chattering_spring_steel", "loop_tool_round_wire", "ribbon_tool_flat_blade", "diamond_tip_carbide", "wooden_handle_gouge"];
}

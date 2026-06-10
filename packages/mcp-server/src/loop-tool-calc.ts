export type LoopToolType = "small_round_trim" | "large_oval_scoop" | "ribbon_flat_shave" | "double_end_combo" | "wire_loop_fine";

export function clayRemoval(t: LoopToolType): number {
  const m: Record<LoopToolType, number> = {
    small_round_trim: 5, large_oval_scoop: 9, ribbon_flat_shave: 8, double_end_combo: 7, wire_loop_fine: 4,
  };
  return m[t];
}

export function detailControl(t: LoopToolType): number {
  const m: Record<LoopToolType, number> = {
    small_round_trim: 9, large_oval_scoop: 5, ribbon_flat_shave: 7, double_end_combo: 6, wire_loop_fine: 10,
  };
  return m[t];
}

export function surfaceFinish(t: LoopToolType): number {
  const m: Record<LoopToolType, number> = {
    small_round_trim: 7, large_oval_scoop: 6, ribbon_flat_shave: 10, double_end_combo: 7, wire_loop_fine: 8,
  };
  return m[t];
}

export function durability(t: LoopToolType): number {
  const m: Record<LoopToolType, number> = {
    small_round_trim: 8, large_oval_scoop: 7, ribbon_flat_shave: 6, double_end_combo: 8, wire_loop_fine: 5,
  };
  return m[t];
}

export function toolCost(t: LoopToolType): number {
  const m: Record<LoopToolType, number> = {
    small_round_trim: 1, large_oval_scoop: 1, ribbon_flat_shave: 2, double_end_combo: 2, wire_loop_fine: 1,
  };
  return m[t];
}

export function doubleEnded(t: LoopToolType): boolean {
  const m: Record<LoopToolType, boolean> = {
    small_round_trim: false, large_oval_scoop: false, ribbon_flat_shave: false, double_end_combo: true, wire_loop_fine: false,
  };
  return m[t];
}

export function forTrimming(t: LoopToolType): boolean {
  const m: Record<LoopToolType, boolean> = {
    small_round_trim: true, large_oval_scoop: false, ribbon_flat_shave: true, double_end_combo: true, wire_loop_fine: true,
  };
  return m[t];
}

export function loopMaterial(t: LoopToolType): string {
  const m: Record<LoopToolType, string> = {
    small_round_trim: "spring_steel_round",
    large_oval_scoop: "stainless_steel_oval",
    ribbon_flat_shave: "tempered_steel_ribbon",
    double_end_combo: "carbon_steel_mixed",
    wire_loop_fine: "piano_wire_thin",
  };
  return m[t];
}

export function bestUse(t: LoopToolType): string {
  const m: Record<LoopToolType, string> = {
    small_round_trim: "foot_ring_trim",
    large_oval_scoop: "hollow_form_scoop",
    ribbon_flat_shave: "smooth_surface_shave",
    double_end_combo: "general_trim_carve",
    wire_loop_fine: "detail_carve_line",
  };
  return m[t];
}

export function loopTools(): LoopToolType[] {
  return ["small_round_trim", "large_oval_scoop", "ribbon_flat_shave", "double_end_combo", "wire_loop_fine"];
}

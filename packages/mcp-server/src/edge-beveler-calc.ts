export type EdgeBevelerType = "standard_hand_bevel" | "french_edge_skiver" | "safety_beveler_guard" | "micro_bevel_fine" | "power_rotary_bevel";

export function cutQuality(t: EdgeBevelerType): number {
  const m: Record<EdgeBevelerType, number> = {
    standard_hand_bevel: 8, french_edge_skiver: 9, safety_beveler_guard: 6, micro_bevel_fine: 10, power_rotary_bevel: 7,
  };
  return m[t];
}

export function speedOutput(t: EdgeBevelerType): number {
  const m: Record<EdgeBevelerType, number> = {
    standard_hand_bevel: 6, french_edge_skiver: 7, safety_beveler_guard: 5, micro_bevel_fine: 4, power_rotary_bevel: 10,
  };
  return m[t];
}

export function controlFeel(t: EdgeBevelerType): number {
  const m: Record<EdgeBevelerType, number> = {
    standard_hand_bevel: 9, french_edge_skiver: 8, safety_beveler_guard: 10, micro_bevel_fine: 9, power_rotary_bevel: 6,
  };
  return m[t];
}

export function edgeFinish(t: EdgeBevelerType): number {
  const m: Record<EdgeBevelerType, number> = {
    standard_hand_bevel: 8, french_edge_skiver: 9, safety_beveler_guard: 6, micro_bevel_fine: 10, power_rotary_bevel: 7,
  };
  return m[t];
}

export function bevelerCost(t: EdgeBevelerType): number {
  const m: Record<EdgeBevelerType, number> = {
    standard_hand_bevel: 1, french_edge_skiver: 2, safety_beveler_guard: 1, micro_bevel_fine: 2, power_rotary_bevel: 3,
  };
  return m[t];
}

export function needsPower(t: EdgeBevelerType): boolean {
  const m: Record<EdgeBevelerType, boolean> = {
    standard_hand_bevel: false, french_edge_skiver: false, safety_beveler_guard: false, micro_bevel_fine: false, power_rotary_bevel: true,
  };
  return m[t];
}

export function beginnerSafe(t: EdgeBevelerType): boolean {
  const m: Record<EdgeBevelerType, boolean> = {
    standard_hand_bevel: true, french_edge_skiver: false, safety_beveler_guard: true, micro_bevel_fine: false, power_rotary_bevel: false,
  };
  return m[t];
}

export function bladeGeometry(t: EdgeBevelerType): string {
  const m: Record<EdgeBevelerType, string> = {
    standard_hand_bevel: "flat_bevel_edge",
    french_edge_skiver: "curved_scoop_blade",
    safety_beveler_guard: "guarded_flat_blade",
    micro_bevel_fine: "narrow_precision_tip",
    power_rotary_bevel: "spinning_drum_cutter",
  };
  return m[t];
}

export function bestLeather(t: EdgeBevelerType): string {
  const m: Record<EdgeBevelerType, string> = {
    standard_hand_bevel: "veg_tan_belt_strap",
    french_edge_skiver: "chrome_tan_garment",
    safety_beveler_guard: "beginner_practice_scrap",
    micro_bevel_fine: "luxury_shell_cordovan",
    power_rotary_bevel: "production_batch_edge",
  };
  return m[t];
}

export function edgeBevelers(): EdgeBevelerType[] {
  return ["standard_hand_bevel", "french_edge_skiver", "safety_beveler_guard", "micro_bevel_fine", "power_rotary_bevel"];
}

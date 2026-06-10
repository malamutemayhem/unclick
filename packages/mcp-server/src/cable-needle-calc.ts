export type CableNeedleType = "bent_hook_standard" | "straight_dpn_mini" | "u_shaped_deep" | "flexi_cable_soft" | "claw_grip_hold";

export function stitchHold(t: CableNeedleType): number {
  const m: Record<CableNeedleType, number> = {
    bent_hook_standard: 9, straight_dpn_mini: 5, u_shaped_deep: 10, flexi_cable_soft: 7, claw_grip_hold: 8,
  };
  return m[t];
}

export function easeOfUse(t: CableNeedleType): number {
  const m: Record<CableNeedleType, number> = {
    bent_hook_standard: 8, straight_dpn_mini: 7, u_shaped_deep: 6, flexi_cable_soft: 9, claw_grip_hold: 7,
  };
  return m[t];
}

export function slipResist(t: CableNeedleType): number {
  const m: Record<CableNeedleType, number> = {
    bent_hook_standard: 8, straight_dpn_mini: 4, u_shaped_deep: 10, flexi_cable_soft: 7, claw_grip_hold: 9,
  };
  return m[t];
}

export function compactSize(t: CableNeedleType): number {
  const m: Record<CableNeedleType, number> = {
    bent_hook_standard: 7, straight_dpn_mini: 9, u_shaped_deep: 5, flexi_cable_soft: 8, claw_grip_hold: 6,
  };
  return m[t];
}

export function cableCost(t: CableNeedleType): number {
  const m: Record<CableNeedleType, number> = {
    bent_hook_standard: 1, straight_dpn_mini: 1, u_shaped_deep: 2, flexi_cable_soft: 2, claw_grip_hold: 2,
  };
  return m[t];
}

export function hasBend(t: CableNeedleType): boolean {
  const m: Record<CableNeedleType, boolean> = {
    bent_hook_standard: true, straight_dpn_mini: false, u_shaped_deep: true, flexi_cable_soft: false, claw_grip_hold: true,
  };
  return m[t];
}

export function flexible(t: CableNeedleType): boolean {
  const m: Record<CableNeedleType, boolean> = {
    bent_hook_standard: false, straight_dpn_mini: false, u_shaped_deep: false, flexi_cable_soft: true, claw_grip_hold: false,
  };
  return m[t];
}

export function needleShape(t: CableNeedleType): string {
  const m: Record<CableNeedleType, string> = {
    bent_hook_standard: "j_bend_aluminum",
    straight_dpn_mini: "short_straight_wood",
    u_shaped_deep: "deep_u_curve_metal",
    flexi_cable_soft: "soft_wire_bend",
    claw_grip_hold: "notched_claw_tip",
  };
  return m[t];
}

export function bestCable(t: CableNeedleType): string {
  const m: Record<CableNeedleType, string> = {
    bent_hook_standard: "standard_cable_cross",
    straight_dpn_mini: "simple_hold_front",
    u_shaped_deep: "complex_cable_many",
    flexi_cable_soft: "travel_knit_cable",
    claw_grip_hold: "slippery_yarn_hold",
  };
  return m[t];
}

export function cableNeedles(): CableNeedleType[] {
  return ["bent_hook_standard", "straight_dpn_mini", "u_shaped_deep", "flexi_cable_soft", "claw_grip_hold"];
}

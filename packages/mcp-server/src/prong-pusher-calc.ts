export type ProngPusherType = "cup_tip_round" | "flat_blade_wide" | "notch_tip_prong" | "bezel_rocker_curve" | "micro_push_fine";

export function pushForce(t: ProngPusherType): number {
  const m: Record<ProngPusherType, number> = {
    cup_tip_round: 7, flat_blade_wide: 8, notch_tip_prong: 6, bezel_rocker_curve: 9, micro_push_fine: 5,
  };
  return m[t];
}

export function controlAccuracy(t: ProngPusherType): number {
  const m: Record<ProngPusherType, number> = {
    cup_tip_round: 8, flat_blade_wide: 6, notch_tip_prong: 10, bezel_rocker_curve: 7, micro_push_fine: 9,
  };
  return m[t];
}

export function scratchSafe(t: ProngPusherType): number {
  const m: Record<ProngPusherType, number> = {
    cup_tip_round: 9, flat_blade_wide: 5, notch_tip_prong: 7, bezel_rocker_curve: 8, micro_push_fine: 6,
  };
  return m[t];
}

export function versatility(t: ProngPusherType): number {
  const m: Record<ProngPusherType, number> = {
    cup_tip_round: 8, flat_blade_wide: 9, notch_tip_prong: 5, bezel_rocker_curve: 7, micro_push_fine: 6,
  };
  return m[t];
}

export function pusherCost(t: ProngPusherType): number {
  const m: Record<ProngPusherType, number> = {
    cup_tip_round: 2, flat_blade_wide: 1, notch_tip_prong: 2, bezel_rocker_curve: 2, micro_push_fine: 3,
  };
  return m[t];
}

export function stoneProtect(t: ProngPusherType): boolean {
  const m: Record<ProngPusherType, boolean> = {
    cup_tip_round: true, flat_blade_wide: false, notch_tip_prong: true, bezel_rocker_curve: true, micro_push_fine: false,
  };
  return m[t];
}

export function forMicroSet(t: ProngPusherType): boolean {
  const m: Record<ProngPusherType, boolean> = {
    cup_tip_round: false, flat_blade_wide: false, notch_tip_prong: false, bezel_rocker_curve: false, micro_push_fine: true,
  };
  return m[t];
}

export function tipProfile(t: ProngPusherType): string {
  const m: Record<ProngPusherType, string> = {
    cup_tip_round: "concave_cup_brass",
    flat_blade_wide: "flat_polished_steel",
    notch_tip_prong: "v_notch_hardened",
    bezel_rocker_curve: "curved_rocker_smooth",
    micro_push_fine: "needle_point_carbide",
  };
  return m[t];
}

export function bestUse(t: ProngPusherType): string {
  const m: Record<ProngPusherType, string> = {
    cup_tip_round: "round_prong_close",
    flat_blade_wide: "bezel_wall_press",
    notch_tip_prong: "individual_prong_set",
    bezel_rocker_curve: "curved_bezel_rock",
    micro_push_fine: "pave_micro_stone",
  };
  return m[t];
}

export function prongPushers(): ProngPusherType[] {
  return ["cup_tip_round", "flat_blade_wide", "notch_tip_prong", "bezel_rocker_curve", "micro_push_fine"];
}

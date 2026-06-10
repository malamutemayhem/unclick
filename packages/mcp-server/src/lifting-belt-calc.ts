export type LiftingBeltType = "leather_prong_powerlifting" | "lever_lock_quick_release" | "nylon_velcro_general" | "tapered_bodybuilding_contour" | "dip_belt_chain_weighted";

export function backSupport(t: LiftingBeltType): number {
  const m: Record<LiftingBeltType, number> = {
    leather_prong_powerlifting: 10, lever_lock_quick_release: 10, nylon_velcro_general: 6, tapered_bodybuilding_contour: 7, dip_belt_chain_weighted: 3,
  };
  return m[t];
}

export function flexibility(t: LiftingBeltType): number {
  const m: Record<LiftingBeltType, number> = {
    leather_prong_powerlifting: 4, lever_lock_quick_release: 4, nylon_velcro_general: 9, tapered_bodybuilding_contour: 8, dip_belt_chain_weighted: 10,
  };
  return m[t];
}

export function quickOnOff(t: LiftingBeltType): number {
  const m: Record<LiftingBeltType, number> = {
    leather_prong_powerlifting: 5, lever_lock_quick_release: 10, nylon_velcro_general: 9, tapered_bodybuilding_contour: 6, dip_belt_chain_weighted: 7,
  };
  return m[t];
}

export function durability(t: LiftingBeltType): number {
  const m: Record<LiftingBeltType, number> = {
    leather_prong_powerlifting: 10, lever_lock_quick_release: 9, nylon_velcro_general: 6, tapered_bodybuilding_contour: 8, dip_belt_chain_weighted: 9,
  };
  return m[t];
}

export function beltCost(t: LiftingBeltType): number {
  const m: Record<LiftingBeltType, number> = {
    leather_prong_powerlifting: 3, lever_lock_quick_release: 3, nylon_velcro_general: 1, tapered_bodybuilding_contour: 2, dip_belt_chain_weighted: 2,
  };
  return m[t];
}

export function ipfApproved(t: LiftingBeltType): boolean {
  const m: Record<LiftingBeltType, boolean> = {
    leather_prong_powerlifting: true, lever_lock_quick_release: true, nylon_velcro_general: false, tapered_bodybuilding_contour: false, dip_belt_chain_weighted: false,
  };
  return m[t];
}

export function hasChainAttach(t: LiftingBeltType): boolean {
  const m: Record<LiftingBeltType, boolean> = {
    leather_prong_powerlifting: false, lever_lock_quick_release: false, nylon_velcro_general: false, tapered_bodybuilding_contour: false, dip_belt_chain_weighted: true,
  };
  return m[t];
}

export function closureType(t: LiftingBeltType): string {
  const m: Record<LiftingBeltType, string> = {
    leather_prong_powerlifting: "single_or_double_prong",
    lever_lock_quick_release: "lever_cam_lock",
    nylon_velcro_general: "velcro_hook_loop",
    tapered_bodybuilding_contour: "buckle_prong_narrow",
    dip_belt_chain_weighted: "chain_clip_carabiner",
  };
  return m[t];
}

export function bestLift(t: LiftingBeltType): string {
  const m: Record<LiftingBeltType, string> = {
    leather_prong_powerlifting: "squat_deadlift_max",
    lever_lock_quick_release: "competition_platform",
    nylon_velcro_general: "crossfit_wod_mixed",
    tapered_bodybuilding_contour: "overhead_press_row",
    dip_belt_chain_weighted: "weighted_dip_pullup",
  };
  return m[t];
}

export function liftingBelts(): LiftingBeltType[] {
  return ["leather_prong_powerlifting", "lever_lock_quick_release", "nylon_velcro_general", "tapered_bodybuilding_contour", "dip_belt_chain_weighted"];
}

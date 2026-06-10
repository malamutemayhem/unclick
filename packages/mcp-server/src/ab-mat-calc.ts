export type AbMatType = "contour_sit_up_pad" | "flat_core_trainer" | "wedge_decline_angle" | "roller_wheel_combo" | "swiss_ball_inflatable";

export function spineSupport(t: AbMatType): number {
  const m: Record<AbMatType, number> = {
    contour_sit_up_pad: 10, flat_core_trainer: 6, wedge_decline_angle: 7, roller_wheel_combo: 4, swiss_ball_inflatable: 8,
  };
  return m[t];
}

export function coreActivation(t: AbMatType): number {
  const m: Record<AbMatType, number> = {
    contour_sit_up_pad: 8, flat_core_trainer: 7, wedge_decline_angle: 9, roller_wheel_combo: 10, swiss_ball_inflatable: 8,
  };
  return m[t];
}

export function storageSize(t: AbMatType): number {
  const m: Record<AbMatType, number> = {
    contour_sit_up_pad: 8, flat_core_trainer: 7, wedge_decline_angle: 6, roller_wheel_combo: 9, swiss_ball_inflatable: 4,
  };
  return m[t];
}

export function versatility(t: AbMatType): number {
  const m: Record<AbMatType, number> = {
    contour_sit_up_pad: 5, flat_core_trainer: 7, wedge_decline_angle: 6, roller_wheel_combo: 7, swiss_ball_inflatable: 10,
  };
  return m[t];
}

export function matCost(t: AbMatType): number {
  const m: Record<AbMatType, number> = {
    contour_sit_up_pad: 1, flat_core_trainer: 1, wedge_decline_angle: 2, roller_wheel_combo: 1, swiss_ball_inflatable: 1,
  };
  return m[t];
}

export function noSlip(t: AbMatType): boolean {
  const m: Record<AbMatType, boolean> = {
    contour_sit_up_pad: true, flat_core_trainer: true, wedge_decline_angle: true, roller_wheel_combo: false, swiss_ball_inflatable: false,
  };
  return m[t];
}

export function inflatable(t: AbMatType): boolean {
  const m: Record<AbMatType, boolean> = {
    contour_sit_up_pad: false, flat_core_trainer: false, wedge_decline_angle: false, roller_wheel_combo: false, swiss_ball_inflatable: true,
  };
  return m[t];
}

export function foamType(t: AbMatType): string {
  const m: Record<AbMatType, string> = {
    contour_sit_up_pad: "high_density_contour",
    flat_core_trainer: "closed_cell_flat_foam",
    wedge_decline_angle: "firm_wedge_incline",
    roller_wheel_combo: "knee_pad_foam_strip",
    swiss_ball_inflatable: "anti_burst_pvc_rubber",
  };
  return m[t];
}

export function bestExercise(t: AbMatType): string {
  const m: Record<AbMatType, string> = {
    contour_sit_up_pad: "crossfit_ghdstyle_situp",
    flat_core_trainer: "plank_dead_bug_series",
    wedge_decline_angle: "decline_crunch_leg_raise",
    roller_wheel_combo: "ab_wheel_rollout",
    swiss_ball_inflatable: "stability_crunch_pike",
  };
  return m[t];
}

export function abMats(): AbMatType[] {
  return ["contour_sit_up_pad", "flat_core_trainer", "wedge_decline_angle", "roller_wheel_combo", "swiss_ball_inflatable"];
}

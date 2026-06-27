export type RunningPlierType = "standard_8_inch" | "pistol_grip_ergo" | "mini_6_inch_small" | "wide_jaw_thick" | "adjustable_screw_set";

export function breakForce(t: RunningPlierType): number {
  const m: Record<RunningPlierType, number> = {
    standard_8_inch: 8, pistol_grip_ergo: 7, mini_6_inch_small: 5, wide_jaw_thick: 10, adjustable_screw_set: 9,
  };
  return m[t];
}

export function controlFine(t: RunningPlierType): number {
  const m: Record<RunningPlierType, number> = {
    standard_8_inch: 8, pistol_grip_ergo: 9, mini_6_inch_small: 10, wide_jaw_thick: 6, adjustable_screw_set: 7,
  };
  return m[t];
}

export function comfortGrip(t: RunningPlierType): number {
  const m: Record<RunningPlierType, number> = {
    standard_8_inch: 7, pistol_grip_ergo: 10, mini_6_inch_small: 6, wide_jaw_thick: 7, adjustable_screw_set: 8,
  };
  return m[t];
}

export function glassRange(t: RunningPlierType): number {
  const m: Record<RunningPlierType, number> = {
    standard_8_inch: 8, pistol_grip_ergo: 7, mini_6_inch_small: 5, wide_jaw_thick: 10, adjustable_screw_set: 9,
  };
  return m[t];
}

export function plierCost(t: RunningPlierType): number {
  const m: Record<RunningPlierType, number> = {
    standard_8_inch: 2, pistol_grip_ergo: 3, mini_6_inch_small: 2, wide_jaw_thick: 3, adjustable_screw_set: 4,
  };
  return m[t];
}

export function adjustable(t: RunningPlierType): boolean {
  const m: Record<RunningPlierType, boolean> = {
    standard_8_inch: false, pistol_grip_ergo: false, mini_6_inch_small: false, wide_jaw_thick: false, adjustable_screw_set: true,
  };
  return m[t];
}

export function forSmallCut(t: RunningPlierType): boolean {
  const m: Record<RunningPlierType, boolean> = {
    standard_8_inch: false, pistol_grip_ergo: false, mini_6_inch_small: true, wide_jaw_thick: false, adjustable_screw_set: false,
  };
  return m[t];
}

export function jawType(t: RunningPlierType): string {
  const m: Record<RunningPlierType, string> = {
    standard_8_inch: "curved_jaw_nylon",
    pistol_grip_ergo: "curved_jaw_rubber",
    mini_6_inch_small: "narrow_jaw_precision",
    wide_jaw_thick: "wide_jaw_heavy",
    adjustable_screw_set: "adjustable_jaw_screw",
  };
  return m[t];
}

export function bestUse(t: RunningPlierType): string {
  const m: Record<RunningPlierType, string> = {
    standard_8_inch: "general_score_break",
    pistol_grip_ergo: "comfort_long_session",
    mini_6_inch_small: "small_piece_detail",
    wide_jaw_thick: "thick_glass_break",
    adjustable_screw_set: "variable_thickness",
  };
  return m[t];
}

export function runningPliers(): RunningPlierType[] {
  return ["standard_8_inch", "pistol_grip_ergo", "mini_6_inch_small", "wide_jaw_thick", "adjustable_screw_set"];
}

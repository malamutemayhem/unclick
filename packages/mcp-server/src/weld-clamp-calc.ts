export type WeldClampType = "c_clamp_standard" | "locking_plier_grip" | "magnetic_square_angle" | "corner_clamp_ninety" | "toggle_clamp_quick";

export function holdForce(t: WeldClampType): number {
  const m: Record<WeldClampType, number> = {
    c_clamp_standard: 9, locking_plier_grip: 8, magnetic_square_angle: 5, corner_clamp_ninety: 7, toggle_clamp_quick: 8,
  };
  return m[t];
}

export function setupSpeed(t: WeldClampType): number {
  const m: Record<WeldClampType, number> = {
    c_clamp_standard: 5, locking_plier_grip: 8, magnetic_square_angle: 10, corner_clamp_ninety: 6, toggle_clamp_quick: 9,
  };
  return m[t];
}

export function angleControl(t: WeldClampType): number {
  const m: Record<WeldClampType, number> = {
    c_clamp_standard: 3, locking_plier_grip: 4, magnetic_square_angle: 10, corner_clamp_ninety: 10, toggle_clamp_quick: 5,
  };
  return m[t];
}

export function heatResist(t: WeldClampType): number {
  const m: Record<WeldClampType, number> = {
    c_clamp_standard: 9, locking_plier_grip: 8, magnetic_square_angle: 6, corner_clamp_ninety: 8, toggle_clamp_quick: 7,
  };
  return m[t];
}

export function clampCost(t: WeldClampType): number {
  const m: Record<WeldClampType, number> = {
    c_clamp_standard: 1, locking_plier_grip: 1, magnetic_square_angle: 2, corner_clamp_ninety: 2, toggle_clamp_quick: 2,
  };
  return m[t];
}

export function oneHanded(t: WeldClampType): boolean {
  const m: Record<WeldClampType, boolean> = {
    c_clamp_standard: false, locking_plier_grip: true, magnetic_square_angle: true, corner_clamp_ninety: false, toggle_clamp_quick: true,
  };
  return m[t];
}

export function holdsAngle(t: WeldClampType): boolean {
  const m: Record<WeldClampType, boolean> = {
    c_clamp_standard: false, locking_plier_grip: false, magnetic_square_angle: true, corner_clamp_ninety: true, toggle_clamp_quick: false,
  };
  return m[t];
}

export function jawType(t: WeldClampType): string {
  const m: Record<WeldClampType, string> = {
    c_clamp_standard: "flat_swivel_pad",
    locking_plier_grip: "serrated_jaw_lock",
    magnetic_square_angle: "rare_earth_magnet",
    corner_clamp_ninety: "fixed_ninety_degree",
    toggle_clamp_quick: "rubber_tip_lever",
  };
  return m[t];
}

export function bestJoint(t: WeldClampType): string {
  const m: Record<WeldClampType, string> = {
    c_clamp_standard: "flat_plate_butt_weld",
    locking_plier_grip: "pipe_round_stock",
    magnetic_square_angle: "box_frame_square",
    corner_clamp_ninety: "angle_iron_corner",
    toggle_clamp_quick: "jig_fixture_repeat",
  };
  return m[t];
}

export function weldClamps(): WeldClampType[] {
  return ["c_clamp_standard", "locking_plier_grip", "magnetic_square_angle", "corner_clamp_ninety", "toggle_clamp_quick"];
}

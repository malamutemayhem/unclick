export type KeyboardTrayType = "undermount_slide_rail" | "clamp_on_desk_edge" | "articulating_arm_swing" | "corner_diagonal_fit" | "standing_desk_riser";

export function ergonomicAngle(t: KeyboardTrayType): number {
  const m: Record<KeyboardTrayType, number> = {
    undermount_slide_rail: 8, clamp_on_desk_edge: 6, articulating_arm_swing: 10, corner_diagonal_fit: 7, standing_desk_riser: 7,
  };
  return m[t];
}

export function surfaceArea(t: KeyboardTrayType): number {
  const m: Record<KeyboardTrayType, number> = {
    undermount_slide_rail: 8, clamp_on_desk_edge: 6, articulating_arm_swing: 7, corner_diagonal_fit: 7, standing_desk_riser: 9,
  };
  return m[t];
}

export function adjustability(t: KeyboardTrayType): number {
  const m: Record<KeyboardTrayType, number> = {
    undermount_slide_rail: 7, clamp_on_desk_edge: 5, articulating_arm_swing: 10, corner_diagonal_fit: 6, standing_desk_riser: 8,
  };
  return m[t];
}

export function installEase(t: KeyboardTrayType): number {
  const m: Record<KeyboardTrayType, number> = {
    undermount_slide_rail: 4, clamp_on_desk_edge: 9, articulating_arm_swing: 3, corner_diagonal_fit: 5, standing_desk_riser: 10,
  };
  return m[t];
}

export function trayCost(t: KeyboardTrayType): number {
  const m: Record<KeyboardTrayType, number> = {
    undermount_slide_rail: 3, clamp_on_desk_edge: 2, articulating_arm_swing: 5, corner_diagonal_fit: 3, standing_desk_riser: 4,
  };
  return m[t];
}

export function noDrilling(t: KeyboardTrayType): boolean {
  const m: Record<KeyboardTrayType, boolean> = {
    undermount_slide_rail: false, clamp_on_desk_edge: true, articulating_arm_swing: false, corner_diagonal_fit: false, standing_desk_riser: true,
  };
  return m[t];
}

export function hasMousePad(t: KeyboardTrayType): boolean {
  const m: Record<KeyboardTrayType, boolean> = {
    undermount_slide_rail: true, clamp_on_desk_edge: false, articulating_arm_swing: true, corner_diagonal_fit: false, standing_desk_riser: true,
  };
  return m[t];
}

export function mountStyle(t: KeyboardTrayType): string {
  const m: Record<KeyboardTrayType, string> = {
    undermount_slide_rail: "screw_mount_ball_bearing",
    clamp_on_desk_edge: "c_clamp_quick_attach",
    articulating_arm_swing: "arm_pivot_wall_desk",
    corner_diagonal_fit: "bracket_angled_mount",
    standing_desk_riser: "freestanding_platform",
  };
  return m[t];
}

export function bestDesk(t: KeyboardTrayType): string {
  const m: Record<KeyboardTrayType, string> = {
    undermount_slide_rail: "standard_office_desk",
    clamp_on_desk_edge: "rental_no_modify_desk",
    articulating_arm_swing: "ergonomic_workstation",
    corner_diagonal_fit: "l_shape_corner_desk",
    standing_desk_riser: "sit_stand_converter",
  };
  return m[t];
}

export function keyboardTrays(): KeyboardTrayType[] {
  return ["undermount_slide_rail", "clamp_on_desk_edge", "articulating_arm_swing", "corner_diagonal_fit", "standing_desk_riser"];
}

export type LeatherPunchType = "rotary_wheel_multi" | "drive_punch_single" | "oblong_slot_belt" | "screw_punch_adjustable" | "hollow_tube_grommet";

export function holePrecision(t: LeatherPunchType): number {
  const m: Record<LeatherPunchType, number> = {
    rotary_wheel_multi: 8, drive_punch_single: 9, oblong_slot_belt: 7, screw_punch_adjustable: 10, hollow_tube_grommet: 8,
  };
  return m[t];
}

export function easeOfUse(t: LeatherPunchType): number {
  const m: Record<LeatherPunchType, number> = {
    rotary_wheel_multi: 10, drive_punch_single: 6, oblong_slot_belt: 7, screw_punch_adjustable: 9, hollow_tube_grommet: 7,
  };
  return m[t];
}

export function sizeRange(t: LeatherPunchType): number {
  const m: Record<LeatherPunchType, number> = {
    rotary_wheel_multi: 9, drive_punch_single: 3, oblong_slot_belt: 5, screw_punch_adjustable: 8, hollow_tube_grommet: 6,
  };
  return m[t];
}

export function leatherThickness(t: LeatherPunchType): number {
  const m: Record<LeatherPunchType, number> = {
    rotary_wheel_multi: 6, drive_punch_single: 10, oblong_slot_belt: 8, screw_punch_adjustable: 7, hollow_tube_grommet: 9,
  };
  return m[t];
}

export function punchCost(t: LeatherPunchType): number {
  const m: Record<LeatherPunchType, number> = {
    rotary_wheel_multi: 2, drive_punch_single: 1, oblong_slot_belt: 1, screw_punch_adjustable: 3, hollow_tube_grommet: 1,
  };
  return m[t];
}

export function needsMallet(t: LeatherPunchType): boolean {
  const m: Record<LeatherPunchType, boolean> = {
    rotary_wheel_multi: false, drive_punch_single: true, oblong_slot_belt: true, screw_punch_adjustable: false, hollow_tube_grommet: true,
  };
  return m[t];
}

export function multiSize(t: LeatherPunchType): boolean {
  const m: Record<LeatherPunchType, boolean> = {
    rotary_wheel_multi: true, drive_punch_single: false, oblong_slot_belt: false, screw_punch_adjustable: true, hollow_tube_grommet: false,
  };
  return m[t];
}

export function punchShape(t: LeatherPunchType): string {
  const m: Record<LeatherPunchType, string> = {
    rotary_wheel_multi: "round_rotary_disc",
    drive_punch_single: "round_fixed_tube",
    oblong_slot_belt: "oval_slot_blade",
    screw_punch_adjustable: "round_screw_tip",
    hollow_tube_grommet: "flared_tube_anvil",
  };
  return m[t];
}

export function bestProject(t: LeatherPunchType): string {
  const m: Record<LeatherPunchType, string> = {
    rotary_wheel_multi: "belt_strap_hole",
    drive_punch_single: "heavy_saddle_harness",
    oblong_slot_belt: "buckle_tongue_slot",
    screw_punch_adjustable: "journal_binding_craft",
    hollow_tube_grommet: "tarp_eyelet_install",
  };
  return m[t];
}

export function leatherPunches(): LeatherPunchType[] {
  return ["rotary_wheel_multi", "drive_punch_single", "oblong_slot_belt", "screw_punch_adjustable", "hollow_tube_grommet"];
}

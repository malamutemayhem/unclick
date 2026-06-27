export type DrillPressType = "benchtop_compact" | "floor_standing" | "radial_arm" | "magnetic_portable" | "cnc_mill_drill";

export function drillPower(t: DrillPressType): number {
  const m: Record<DrillPressType, number> = {
    benchtop_compact: 5, floor_standing: 8, radial_arm: 7, magnetic_portable: 6, cnc_mill_drill: 10,
  };
  return m[t];
}

export function precision(t: DrillPressType): number {
  const m: Record<DrillPressType, number> = {
    benchtop_compact: 7, floor_standing: 8, radial_arm: 6, magnetic_portable: 5, cnc_mill_drill: 10,
  };
  return m[t];
}

export function swingCapacity(t: DrillPressType): number {
  const m: Record<DrillPressType, number> = {
    benchtop_compact: 4, floor_standing: 8, radial_arm: 10, magnetic_portable: 3, cnc_mill_drill: 7,
  };
  return m[t];
}

export function portability(t: DrillPressType): number {
  const m: Record<DrillPressType, number> = {
    benchtop_compact: 7, floor_standing: 1, radial_arm: 1, magnetic_portable: 10, cnc_mill_drill: 1,
  };
  return m[t];
}

export function pressCost(t: DrillPressType): number {
  const m: Record<DrillPressType, number> = {
    benchtop_compact: 3, floor_standing: 6, radial_arm: 7, magnetic_portable: 5, cnc_mill_drill: 10,
  };
  return m[t];
}

export function variableSpeed(t: DrillPressType): boolean {
  const m: Record<DrillPressType, boolean> = {
    benchtop_compact: true, floor_standing: true, radial_arm: true, magnetic_portable: true, cnc_mill_drill: true,
  };
  return m[t];
}

export function computerControlled(t: DrillPressType): boolean {
  const m: Record<DrillPressType, boolean> = {
    benchtop_compact: false, floor_standing: false, radial_arm: false, magnetic_portable: false, cnc_mill_drill: true,
  };
  return m[t];
}

export function driveType(t: DrillPressType): string {
  const m: Record<DrillPressType, string> = {
    benchtop_compact: "belt_pulley_step",
    floor_standing: "belt_pulley_variable",
    radial_arm: "gear_head_radial",
    magnetic_portable: "direct_drive_motor",
    cnc_mill_drill: "servo_motor_spindle",
  };
  return m[t];
}

export function bestProject(t: DrillPressType): string {
  const m: Record<DrillPressType, string> = {
    benchtop_compact: "hobby_small_workshop",
    floor_standing: "cabinet_furniture_shop",
    radial_arm: "large_panel_beam_work",
    magnetic_portable: "steel_construction_site",
    cnc_mill_drill: "precision_metal_prototype",
  };
  return m[t];
}

export function drillPresses(): DrillPressType[] {
  return ["benchtop_compact", "floor_standing", "radial_arm", "magnetic_portable", "cnc_mill_drill"];
}

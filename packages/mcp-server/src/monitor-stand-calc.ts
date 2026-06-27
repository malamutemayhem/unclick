export type MonitorStandType = "riser_shelf_wood" | "arm_clamp_adjustable" | "dual_arm_gas_spring" | "laptop_stand_fold" | "wall_mount_tilt";

export function ergonomicHeight(t: MonitorStandType): number {
  const m: Record<MonitorStandType, number> = {
    riser_shelf_wood: 5, arm_clamp_adjustable: 10, dual_arm_gas_spring: 10, laptop_stand_fold: 8, wall_mount_tilt: 9,
  };
  return m[t];
}

export function adjustability(t: MonitorStandType): number {
  const m: Record<MonitorStandType, number> = {
    riser_shelf_wood: 2, arm_clamp_adjustable: 10, dual_arm_gas_spring: 10, laptop_stand_fold: 7, wall_mount_tilt: 6,
  };
  return m[t];
}

export function deskSpaceSaved(t: MonitorStandType): number {
  const m: Record<MonitorStandType, number> = {
    riser_shelf_wood: 6, arm_clamp_adjustable: 9, dual_arm_gas_spring: 9, laptop_stand_fold: 5, wall_mount_tilt: 10,
  };
  return m[t];
}

export function stability(t: MonitorStandType): number {
  const m: Record<MonitorStandType, number> = {
    riser_shelf_wood: 9, arm_clamp_adjustable: 7, dual_arm_gas_spring: 8, laptop_stand_fold: 6, wall_mount_tilt: 10,
  };
  return m[t];
}

export function standCost(t: MonitorStandType): number {
  const m: Record<MonitorStandType, number> = {
    riser_shelf_wood: 3, arm_clamp_adjustable: 7, dual_arm_gas_spring: 9, laptop_stand_fold: 4, wall_mount_tilt: 6,
  };
  return m[t];
}

export function cableManagement(t: MonitorStandType): boolean {
  const m: Record<MonitorStandType, boolean> = {
    riser_shelf_wood: false, arm_clamp_adjustable: true, dual_arm_gas_spring: true, laptop_stand_fold: false, wall_mount_tilt: true,
  };
  return m[t];
}

export function vesaCompatible(t: MonitorStandType): boolean {
  const m: Record<MonitorStandType, boolean> = {
    riser_shelf_wood: false, arm_clamp_adjustable: true, dual_arm_gas_spring: true, laptop_stand_fold: false, wall_mount_tilt: true,
  };
  return m[t];
}

export function mountType(t: MonitorStandType): string {
  const m: Record<MonitorStandType, string> = {
    riser_shelf_wood: "freestanding_shelf",
    arm_clamp_adjustable: "desk_clamp_c_mount",
    dual_arm_gas_spring: "desk_clamp_grommet",
    laptop_stand_fold: "freestanding_tray",
    wall_mount_tilt: "wall_stud_bracket",
  };
  return m[t];
}

export function bestSetup(t: MonitorStandType): string {
  const m: Record<MonitorStandType, string> = {
    riser_shelf_wood: "simple_single_screen",
    arm_clamp_adjustable: "home_office_flexible",
    dual_arm_gas_spring: "dual_monitor_workflow",
    laptop_stand_fold: "portable_laptop_travel",
    wall_mount_tilt: "permanent_clean_minimal",
  };
  return m[t];
}

export function monitorStands(): MonitorStandType[] {
  return ["riser_shelf_wood", "arm_clamp_adjustable", "dual_arm_gas_spring", "laptop_stand_fold", "wall_mount_tilt"];
}

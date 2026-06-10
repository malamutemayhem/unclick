export type MonitorArmType = "single_gas_spring" | "dual_stacked" | "wall_mount_fixed" | "freestanding_base" | "laptop_tray_combo";

export function weightCapacity(t: MonitorArmType): number {
  const m: Record<MonitorArmType, number> = {
    single_gas_spring: 7, dual_stacked: 9, wall_mount_fixed: 10, freestanding_base: 6, laptop_tray_combo: 4,
  };
  return m[t];
}

export function adjustmentRange(t: MonitorArmType): number {
  const m: Record<MonitorArmType, number> = {
    single_gas_spring: 10, dual_stacked: 8, wall_mount_fixed: 3, freestanding_base: 6, laptop_tray_combo: 7,
  };
  return m[t];
}

export function deskSpace(t: MonitorArmType): number {
  const m: Record<MonitorArmType, number> = {
    single_gas_spring: 9, dual_stacked: 8, wall_mount_fixed: 10, freestanding_base: 4, laptop_tray_combo: 7,
  };
  return m[t];
}

export function installEase(t: MonitorArmType): number {
  const m: Record<MonitorArmType, number> = {
    single_gas_spring: 7, dual_stacked: 5, wall_mount_fixed: 3, freestanding_base: 10, laptop_tray_combo: 8,
  };
  return m[t];
}

export function armCost(t: MonitorArmType): number {
  const m: Record<MonitorArmType, number> = {
    single_gas_spring: 5, dual_stacked: 8, wall_mount_fixed: 4, freestanding_base: 3, laptop_tray_combo: 6,
  };
  return m[t];
}

export function cableManagement(t: MonitorArmType): boolean {
  const m: Record<MonitorArmType, boolean> = {
    single_gas_spring: true, dual_stacked: true, wall_mount_fixed: true, freestanding_base: false, laptop_tray_combo: true,
  };
  return m[t];
}

export function vesaCompatible(t: MonitorArmType): boolean {
  const m: Record<MonitorArmType, boolean> = {
    single_gas_spring: true, dual_stacked: true, wall_mount_fixed: true, freestanding_base: true, laptop_tray_combo: false,
  };
  return m[t];
}

export function mountType(t: MonitorArmType): string {
  const m: Record<MonitorArmType, string> = {
    single_gas_spring: "c_clamp_grommet_desk", dual_stacked: "heavy_duty_pole_clamp",
    wall_mount_fixed: "stud_mount_bracket", freestanding_base: "weighted_platform_base",
    laptop_tray_combo: "clamp_with_tray_plate",
  };
  return m[t];
}

export function bestSetup(t: MonitorArmType): string {
  const m: Record<MonitorArmType, string> = {
    single_gas_spring: "standard_desk_single_screen", dual_stacked: "trader_multi_monitor",
    wall_mount_fixed: "permanent_clean_install", freestanding_base: "shared_desk_no_drill",
    laptop_tray_combo: "laptop_plus_external",
  };
  return m[t];
}

export function monitorArms(): MonitorArmType[] {
  return ["single_gas_spring", "dual_stacked", "wall_mount_fixed", "freestanding_base", "laptop_tray_combo"];
}

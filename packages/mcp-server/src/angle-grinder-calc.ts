export type AngleGrinderType = "small_four_inch" | "medium_five_inch" | "large_seven_inch" | "variable_speed_dial" | "cordless_battery_port";

export function cuttingPower(t: AngleGrinderType): number {
  const m: Record<AngleGrinderType, number> = {
    small_four_inch: 6, medium_five_inch: 8, large_seven_inch: 10, variable_speed_dial: 7, cordless_battery_port: 5,
  };
  return m[t];
}

export function controlEase(t: AngleGrinderType): number {
  const m: Record<AngleGrinderType, number> = {
    small_four_inch: 10, medium_five_inch: 8, large_seven_inch: 5, variable_speed_dial: 9, cordless_battery_port: 9,
  };
  return m[t];
}

export function portability(t: AngleGrinderType): number {
  const m: Record<AngleGrinderType, number> = {
    small_four_inch: 8, medium_five_inch: 7, large_seven_inch: 4, variable_speed_dial: 6, cordless_battery_port: 10,
  };
  return m[t];
}

export function discVariety(t: AngleGrinderType): number {
  const m: Record<AngleGrinderType, number> = {
    small_four_inch: 10, medium_five_inch: 9, large_seven_inch: 7, variable_speed_dial: 10, cordless_battery_port: 8,
  };
  return m[t];
}

export function grinderCost(t: AngleGrinderType): number {
  const m: Record<AngleGrinderType, number> = {
    small_four_inch: 1, medium_five_inch: 2, large_seven_inch: 3, variable_speed_dial: 2, cordless_battery_port: 3,
  };
  return m[t];
}

export function variableSpeed(t: AngleGrinderType): boolean {
  const m: Record<AngleGrinderType, boolean> = {
    small_four_inch: false, medium_five_inch: false, large_seven_inch: false, variable_speed_dial: true, cordless_battery_port: false,
  };
  return m[t];
}

export function cordless(t: AngleGrinderType): boolean {
  const m: Record<AngleGrinderType, boolean> = {
    small_four_inch: false, medium_five_inch: false, large_seven_inch: false, variable_speed_dial: false, cordless_battery_port: true,
  };
  return m[t];
}

export function motorType(t: AngleGrinderType): string {
  const m: Record<AngleGrinderType, string> = {
    small_four_inch: "brushed_ac_motor",
    medium_five_inch: "brushless_ac_motor",
    large_seven_inch: "high_torque_ac",
    variable_speed_dial: "electronic_speed_ac",
    cordless_battery_port: "brushless_dc_battery",
  };
  return m[t];
}

export function bestTask(t: AngleGrinderType): string {
  const m: Record<AngleGrinderType, string> = {
    small_four_inch: "light_grinding_deburr",
    medium_five_inch: "general_cut_grind",
    large_seven_inch: "heavy_stock_removal",
    variable_speed_dial: "polishing_sanding_finish",
    cordless_battery_port: "field_work_mobile",
  };
  return m[t];
}

export function angleGrinders(): AngleGrinderType[] {
  return ["small_four_inch", "medium_five_inch", "large_seven_inch", "variable_speed_dial", "cordless_battery_port"];
}

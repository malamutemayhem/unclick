export type BobbinWinderType = "built_in_machine_side" | "standalone_electric_speed" | "hand_crank_portable" | "industrial_auto_stop" | "thread_stand_combo";

export function windSpeed(t: BobbinWinderType): number {
  const m: Record<BobbinWinderType, number> = {
    built_in_machine_side: 7, standalone_electric_speed: 9, hand_crank_portable: 4, industrial_auto_stop: 10, thread_stand_combo: 6,
  };
  return m[t];
}

export function threadCare(t: BobbinWinderType): number {
  const m: Record<BobbinWinderType, number> = {
    built_in_machine_side: 8, standalone_electric_speed: 7, hand_crank_portable: 10, industrial_auto_stop: 8, thread_stand_combo: 9,
  };
  return m[t];
}

export function portability(t: BobbinWinderType): number {
  const m: Record<BobbinWinderType, number> = {
    built_in_machine_side: 3, standalone_electric_speed: 7, hand_crank_portable: 10, industrial_auto_stop: 2, thread_stand_combo: 5,
  };
  return m[t];
}

export function bobbinFit(t: BobbinWinderType): number {
  const m: Record<BobbinWinderType, number> = {
    built_in_machine_side: 10, standalone_electric_speed: 8, hand_crank_portable: 6, industrial_auto_stop: 9, thread_stand_combo: 7,
  };
  return m[t];
}

export function winderCost(t: BobbinWinderType): number {
  const m: Record<BobbinWinderType, number> = {
    built_in_machine_side: 0, standalone_electric_speed: 2, hand_crank_portable: 1, industrial_auto_stop: 3, thread_stand_combo: 2,
  };
  return m[t];
}

export function autoStop(t: BobbinWinderType): boolean {
  const m: Record<BobbinWinderType, boolean> = {
    built_in_machine_side: true, standalone_electric_speed: false, hand_crank_portable: false, industrial_auto_stop: true, thread_stand_combo: false,
  };
  return m[t];
}

export function needsPower(t: BobbinWinderType): boolean {
  const m: Record<BobbinWinderType, boolean> = {
    built_in_machine_side: true, standalone_electric_speed: true, hand_crank_portable: false, industrial_auto_stop: true, thread_stand_combo: false,
  };
  return m[t];
}

export function driveType(t: BobbinWinderType): string {
  const m: Record<BobbinWinderType, string> = {
    built_in_machine_side: "friction_wheel_clutch",
    standalone_electric_speed: "dc_motor_belt",
    hand_crank_portable: "manual_gear_handle",
    industrial_auto_stop: "servo_motor_sensor",
    thread_stand_combo: "gravity_feed_spindle",
  };
  return m[t];
}

export function bestSetup(t: BobbinWinderType): string {
  const m: Record<BobbinWinderType, string> = {
    built_in_machine_side: "home_sewing_everyday",
    standalone_electric_speed: "multi_machine_studio",
    hand_crank_portable: "travel_repair_kit",
    industrial_auto_stop: "production_garment_factory",
    thread_stand_combo: "embroidery_color_change",
  };
  return m[t];
}

export function bobbinWinders(): BobbinWinderType[] {
  return ["built_in_machine_side", "standalone_electric_speed", "hand_crank_portable", "industrial_auto_stop", "thread_stand_combo"];
}

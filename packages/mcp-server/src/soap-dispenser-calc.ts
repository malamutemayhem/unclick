export type SoapDispenserType = "pump_manual" | "touchless_sensor" | "wall_mount_refill" | "foaming_pump" | "dish_sink_built_in";

export function hygieneLevel(t: SoapDispenserType): number {
  const m: Record<SoapDispenserType, number> = {
    pump_manual: 5, touchless_sensor: 10, wall_mount_refill: 7, foaming_pump: 6, dish_sink_built_in: 8,
  };
  return m[t];
}

export function soapEfficiency(t: SoapDispenserType): number {
  const m: Record<SoapDispenserType, number> = {
    pump_manual: 5, touchless_sensor: 8, wall_mount_refill: 7, foaming_pump: 10, dish_sink_built_in: 6,
  };
  return m[t];
}

export function refillEase(t: SoapDispenserType): number {
  const m: Record<SoapDispenserType, number> = {
    pump_manual: 10, touchless_sensor: 7, wall_mount_refill: 6, foaming_pump: 9, dish_sink_built_in: 3,
  };
  return m[t];
}

export function styleAppeal(t: SoapDispenserType): number {
  const m: Record<SoapDispenserType, number> = {
    pump_manual: 7, touchless_sensor: 6, wall_mount_refill: 5, foaming_pump: 7, dish_sink_built_in: 10,
  };
  return m[t];
}

export function dispenserCost(t: SoapDispenserType): number {
  const m: Record<SoapDispenserType, number> = {
    pump_manual: 1, touchless_sensor: 6, wall_mount_refill: 4, foaming_pump: 3, dish_sink_built_in: 7,
  };
  return m[t];
}

export function touchFree(t: SoapDispenserType): boolean {
  const m: Record<SoapDispenserType, boolean> = {
    pump_manual: false, touchless_sensor: true, wall_mount_refill: false, foaming_pump: false, dish_sink_built_in: false,
  };
  return m[t];
}

export function wallMountable(t: SoapDispenserType): boolean {
  const m: Record<SoapDispenserType, boolean> = {
    pump_manual: false, touchless_sensor: false, wall_mount_refill: true, foaming_pump: false, dish_sink_built_in: false,
  };
  return m[t];
}

export function dispenseMechanism(t: SoapDispenserType): string {
  const m: Record<SoapDispenserType, string> = {
    pump_manual: "spring_piston_push",
    touchless_sensor: "infrared_motor_pump",
    wall_mount_refill: "lever_valve_cartridge",
    foaming_pump: "air_mix_foam_chamber",
    dish_sink_built_in: "under_counter_tube_pump",
  };
  return m[t];
}

export function bestSpot(t: SoapDispenserType): string {
  const m: Record<SoapDispenserType, string> = {
    pump_manual: "bathroom_vanity_counter",
    touchless_sensor: "kitchen_germ_conscious",
    wall_mount_refill: "commercial_restroom",
    foaming_pump: "kids_bathroom_less_waste",
    dish_sink_built_in: "kitchen_sink_clean_look",
  };
  return m[t];
}

export function soapDispensers(): SoapDispenserType[] {
  return ["pump_manual", "touchless_sensor", "wall_mount_refill", "foaming_pump", "dish_sink_built_in"];
}

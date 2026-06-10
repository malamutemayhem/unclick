export type HoseNozzleType = "pistol_grip_trigger" | "fireman_twist_adjust" | "fan_spray_flat_pattern" | "watering_wand_long_reach" | "turbo_jet_high_pressure";

export function sprayPower(t: HoseNozzleType): number {
  const m: Record<HoseNozzleType, number> = {
    pistol_grip_trigger: 7, fireman_twist_adjust: 8, fan_spray_flat_pattern: 5, watering_wand_long_reach: 4, turbo_jet_high_pressure: 10,
  };
  return m[t];
}

export function patternRange(t: HoseNozzleType): number {
  const m: Record<HoseNozzleType, number> = {
    pistol_grip_trigger: 8, fireman_twist_adjust: 9, fan_spray_flat_pattern: 6, watering_wand_long_reach: 3, turbo_jet_high_pressure: 2,
  };
  return m[t];
}

export function comfort(t: HoseNozzleType): number {
  const m: Record<HoseNozzleType, number> = {
    pistol_grip_trigger: 8, fireman_twist_adjust: 6, fan_spray_flat_pattern: 7, watering_wand_long_reach: 9, turbo_jet_high_pressure: 5,
  };
  return m[t];
}

export function gentleness(t: HoseNozzleType): number {
  const m: Record<HoseNozzleType, number> = {
    pistol_grip_trigger: 6, fireman_twist_adjust: 5, fan_spray_flat_pattern: 8, watering_wand_long_reach: 10, turbo_jet_high_pressure: 2,
  };
  return m[t];
}

export function nozzleCost(t: HoseNozzleType): number {
  const m: Record<HoseNozzleType, number> = {
    pistol_grip_trigger: 2, fireman_twist_adjust: 2, fan_spray_flat_pattern: 2, watering_wand_long_reach: 3, turbo_jet_high_pressure: 3,
  };
  return m[t];
}

export function lockOnSpray(t: HoseNozzleType): boolean {
  const m: Record<HoseNozzleType, boolean> = {
    pistol_grip_trigger: true, fireman_twist_adjust: true, fan_spray_flat_pattern: false, watering_wand_long_reach: false, turbo_jet_high_pressure: true,
  };
  return m[t];
}

export function adjustableFlow(t: HoseNozzleType): boolean {
  const m: Record<HoseNozzleType, boolean> = {
    pistol_grip_trigger: true, fireman_twist_adjust: true, fan_spray_flat_pattern: false, watering_wand_long_reach: true, turbo_jet_high_pressure: false,
  };
  return m[t];
}

export function sprayMechanism(t: HoseNozzleType): string {
  const m: Record<HoseNozzleType, string> = {
    pistol_grip_trigger: "squeeze_trigger_valve",
    fireman_twist_adjust: "rotating_collar_dial",
    fan_spray_flat_pattern: "fixed_flat_slit_orifice",
    watering_wand_long_reach: "thumb_slide_valve",
    turbo_jet_high_pressure: "turbine_rotating_head",
  };
  return m[t];
}

export function bestTask(t: HoseNozzleType): string {
  const m: Record<HoseNozzleType, string> = {
    pistol_grip_trigger: "general_garden_watering",
    fireman_twist_adjust: "car_wash_driveway",
    fan_spray_flat_pattern: "lawn_soaking_even",
    watering_wand_long_reach: "hanging_basket_delicate",
    turbo_jet_high_pressure: "deck_cleaning_power",
  };
  return m[t];
}

export function hoseNozzles(): HoseNozzleType[] {
  return ["pistol_grip_trigger", "fireman_twist_adjust", "fan_spray_flat_pattern", "watering_wand_long_reach", "turbo_jet_high_pressure"];
}

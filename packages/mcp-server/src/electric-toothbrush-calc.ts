export type ElectricToothbrushType = "sonic_vibrating" | "oscillating_rotating" | "ultrasonic_wave" | "bamboo_battery" | "water_flosser_combo";

export function cleaningPower(t: ElectricToothbrushType): number {
  const m: Record<ElectricToothbrushType, number> = {
    sonic_vibrating: 9, oscillating_rotating: 8, ultrasonic_wave: 10, bamboo_battery: 4, water_flosser_combo: 7,
  };
  return m[t];
}

export function gumGentle(t: ElectricToothbrushType): number {
  const m: Record<ElectricToothbrushType, number> = {
    sonic_vibrating: 8, oscillating_rotating: 6, ultrasonic_wave: 10, bamboo_battery: 9, water_flosser_combo: 7,
  };
  return m[t];
}

export function batteryLife(t: ElectricToothbrushType): number {
  const m: Record<ElectricToothbrushType, number> = {
    sonic_vibrating: 8, oscillating_rotating: 7, ultrasonic_wave: 6, bamboo_battery: 5, water_flosser_combo: 4,
  };
  return m[t];
}

export function travelFriendly(t: ElectricToothbrushType): number {
  const m: Record<ElectricToothbrushType, number> = {
    sonic_vibrating: 7, oscillating_rotating: 7, ultrasonic_wave: 6, bamboo_battery: 9, water_flosser_combo: 3,
  };
  return m[t];
}

export function brushCost(t: ElectricToothbrushType): number {
  const m: Record<ElectricToothbrushType, number> = {
    sonic_vibrating: 6, oscillating_rotating: 5, ultrasonic_wave: 9, bamboo_battery: 2, water_flosser_combo: 8,
  };
  return m[t];
}

export function pressureSensor(t: ElectricToothbrushType): boolean {
  const m: Record<ElectricToothbrushType, boolean> = {
    sonic_vibrating: true, oscillating_rotating: true, ultrasonic_wave: false, bamboo_battery: false, water_flosser_combo: true,
  };
  return m[t];
}

export function ecoFriendly(t: ElectricToothbrushType): boolean {
  const m: Record<ElectricToothbrushType, boolean> = {
    sonic_vibrating: false, oscillating_rotating: false, ultrasonic_wave: false, bamboo_battery: true, water_flosser_combo: false,
  };
  return m[t];
}

export function brushMotion(t: ElectricToothbrushType): string {
  const m: Record<ElectricToothbrushType, string> = {
    sonic_vibrating: "side_to_side_vibration",
    oscillating_rotating: "circular_oscillate_pulse",
    ultrasonic_wave: "high_freq_wave_cavitation",
    bamboo_battery: "gentle_vibrate_bamboo_head",
    water_flosser_combo: "brush_plus_water_jet",
  };
  return m[t];
}

export function bestUser(t: ElectricToothbrushType): string {
  const m: Record<ElectricToothbrushType, string> = {
    sonic_vibrating: "general_daily_deep_clean",
    oscillating_rotating: "plaque_heavy_removal",
    ultrasonic_wave: "sensitive_gum_periodontal",
    bamboo_battery: "eco_conscious_minimal",
    water_flosser_combo: "braces_implant_bridge",
  };
  return m[t];
}

export function electricToothbrushes(): ElectricToothbrushType[] {
  return ["sonic_vibrating", "oscillating_rotating", "ultrasonic_wave", "bamboo_battery", "water_flosser_combo"];
}

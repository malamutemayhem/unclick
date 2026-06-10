export type HumidifierType = "cool_mist_ultrasonic" | "warm_mist_steam" | "evaporative_wick" | "whole_house_furnace" | "personal_usb";

export function moistureOutput(t: HumidifierType): number {
  const m: Record<HumidifierType, number> = {
    cool_mist_ultrasonic: 7, warm_mist_steam: 8, evaporative_wick: 7, whole_house_furnace: 10, personal_usb: 2,
  };
  return m[t];
}

export function roomCoverage(t: HumidifierType): number {
  const m: Record<HumidifierType, number> = {
    cool_mist_ultrasonic: 7, warm_mist_steam: 6, evaporative_wick: 8, whole_house_furnace: 10, personal_usb: 1,
  };
  return m[t];
}

export function noiseLevel(t: HumidifierType): number {
  const m: Record<HumidifierType, number> = {
    cool_mist_ultrasonic: 2, warm_mist_steam: 4, evaporative_wick: 6, whole_house_furnace: 3, personal_usb: 1,
  };
  return m[t];
}

export function maintenanceNeed(t: HumidifierType): number {
  const m: Record<HumidifierType, number> = {
    cool_mist_ultrasonic: 6, warm_mist_steam: 5, evaporative_wick: 8, whole_house_furnace: 4, personal_usb: 3,
  };
  return m[t];
}

export function unitCost(t: HumidifierType): number {
  const m: Record<HumidifierType, number> = {
    cool_mist_ultrasonic: 5, warm_mist_steam: 5, evaporative_wick: 6, whole_house_furnace: 10, personal_usb: 2,
  };
  return m[t];
}

export function filterRequired(t: HumidifierType): boolean {
  const m: Record<HumidifierType, boolean> = {
    cool_mist_ultrasonic: false, warm_mist_steam: false, evaporative_wick: true, whole_house_furnace: true, personal_usb: false,
  };
  return m[t];
}

export function heatsWater(t: HumidifierType): boolean {
  const m: Record<HumidifierType, boolean> = {
    cool_mist_ultrasonic: false, warm_mist_steam: true, evaporative_wick: false, whole_house_furnace: false, personal_usb: false,
  };
  return m[t];
}

export function mistMethod(t: HumidifierType): string {
  const m: Record<HumidifierType, string> = {
    cool_mist_ultrasonic: "piezo_vibration_plate",
    warm_mist_steam: "boil_element_chamber",
    evaporative_wick: "fan_blown_wet_filter",
    whole_house_furnace: "bypass_flow_through_pad",
    personal_usb: "mini_ultrasonic_disc",
  };
  return m[t];
}

export function bestUse(t: HumidifierType): string {
  const m: Record<HumidifierType, string> = {
    cool_mist_ultrasonic: "bedroom_nursery_quiet",
    warm_mist_steam: "cold_season_sinus_relief",
    evaporative_wick: "living_room_large_area",
    whole_house_furnace: "full_home_hvac_system",
    personal_usb: "desk_travel_spot",
  };
  return m[t];
}

export function humidifiers(): HumidifierType[] {
  return ["cool_mist_ultrasonic", "warm_mist_steam", "evaporative_wick", "whole_house_furnace", "personal_usb"];
}

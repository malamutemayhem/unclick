export type SmokeDetectorType = "ionization" | "photoelectric" | "dual_sensor" | "smart_wifi" | "heat_only";

export function flameSensitivity(t: SmokeDetectorType): number {
  const m: Record<SmokeDetectorType, number> = {
    ionization: 10, photoelectric: 5, dual_sensor: 9, smart_wifi: 7, heat_only: 2,
  };
  return m[t];
}

export function smolderSensitivity(t: SmokeDetectorType): number {
  const m: Record<SmokeDetectorType, number> = {
    ionization: 4, photoelectric: 10, dual_sensor: 9, smart_wifi: 8, heat_only: 1,
  };
  return m[t];
}

export function falseAlarmResist(t: SmokeDetectorType): number {
  const m: Record<SmokeDetectorType, number> = {
    ionization: 3, photoelectric: 7, dual_sensor: 6, smart_wifi: 9, heat_only: 10,
  };
  return m[t];
}

export function batteryLife(t: SmokeDetectorType): number {
  const m: Record<SmokeDetectorType, number> = {
    ionization: 7, photoelectric: 8, dual_sensor: 6, smart_wifi: 4, heat_only: 9,
  };
  return m[t];
}

export function detectorCost(t: SmokeDetectorType): number {
  const m: Record<SmokeDetectorType, number> = {
    ionization: 1, photoelectric: 3, dual_sensor: 5, smart_wifi: 8, heat_only: 2,
  };
  return m[t];
}

export function interconnected(t: SmokeDetectorType): boolean {
  const m: Record<SmokeDetectorType, boolean> = {
    ionization: false, photoelectric: false, dual_sensor: true, smart_wifi: true, heat_only: false,
  };
  return m[t];
}

export function phoneAlert(t: SmokeDetectorType): boolean {
  const m: Record<SmokeDetectorType, boolean> = {
    ionization: false, photoelectric: false, dual_sensor: false, smart_wifi: true, heat_only: false,
  };
  return m[t];
}

export function sensorTech(t: SmokeDetectorType): string {
  const m: Record<SmokeDetectorType, string> = {
    ionization: "americium_241_ion_chamber", photoelectric: "led_light_scatter_chamber",
    dual_sensor: "ion_plus_photo_combined", smart_wifi: "split_spectrum_ai_detect",
    heat_only: "thermistor_rate_of_rise",
  };
  return m[t];
}

export function bestRoom(t: SmokeDetectorType): string {
  const m: Record<SmokeDetectorType, string> = {
    ionization: "bedroom_fast_flame_alert", photoelectric: "living_room_hallway",
    dual_sensor: "whole_home_baseline", smart_wifi: "rental_remote_monitor",
    heat_only: "kitchen_garage_dusty",
  };
  return m[t];
}

export function smokeDetectors(): SmokeDetectorType[] {
  return ["ionization", "photoelectric", "dual_sensor", "smart_wifi", "heat_only"];
}

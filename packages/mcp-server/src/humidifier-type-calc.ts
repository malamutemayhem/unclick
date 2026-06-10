export type HumidifierType = "evaporative" | "ultrasonic" | "steam" | "impeller" | "bypass_flow";

export function moistureOutput(h: HumidifierType): number {
  const m: Record<HumidifierType, number> = {
    evaporative: 7, ultrasonic: 8, steam: 10, impeller: 6, bypass_flow: 9,
  };
  return m[h];
}

export function energyConsumption(h: HumidifierType): number {
  const m: Record<HumidifierType, number> = {
    evaporative: 3, ultrasonic: 4, steam: 9, impeller: 3, bypass_flow: 5,
  };
  return m[h];
}

export function mineralDustRisk(h: HumidifierType): number {
  const m: Record<HumidifierType, number> = {
    evaporative: 2, ultrasonic: 9, steam: 1, impeller: 8, bypass_flow: 2,
  };
  return m[h];
}

export function noiseLevel(h: HumidifierType): number {
  const m: Record<HumidifierType, number> = {
    evaporative: 5, ultrasonic: 2, steam: 6, impeller: 7, bypass_flow: 4,
  };
  return m[h];
}

export function maintenanceFrequency(h: HumidifierType): number {
  const m: Record<HumidifierType, number> = {
    evaporative: 6, ultrasonic: 7, steam: 3, impeller: 5, bypass_flow: 4,
  };
  return m[h];
}

export function selfSterilizing(h: HumidifierType): boolean {
  const m: Record<HumidifierType, boolean> = {
    evaporative: false, ultrasonic: false, steam: true, impeller: false, bypass_flow: false,
  };
  return m[h];
}

export function wholeHouseCapable(h: HumidifierType): boolean {
  const m: Record<HumidifierType, boolean> = {
    evaporative: false, ultrasonic: false, steam: true, impeller: false, bypass_flow: true,
  };
  return m[h];
}

export function mistType(h: HumidifierType): string {
  const m: Record<HumidifierType, string> = {
    evaporative: "invisible_water_vapor", ultrasonic: "cool_visible_mist",
    steam: "warm_sterile_vapor", impeller: "cool_rotating_disc_mist",
    bypass_flow: "furnace_evaporated_water",
  };
  return m[h];
}

export function bestApplication(h: HumidifierType): string {
  const m: Record<HumidifierType, string> = {
    evaporative: "bedroom_living_room", ultrasonic: "nursery_quiet_room",
    steam: "medical_whole_house", impeller: "child_safe_room",
    bypass_flow: "forced_air_furnace",
  };
  return m[h];
}

export function humidifierTypes(): HumidifierType[] {
  return ["evaporative", "ultrasonic", "steam", "impeller", "bypass_flow"];
}

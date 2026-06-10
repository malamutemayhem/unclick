export type PressureWasherType = "electric_light" | "gas_medium" | "gas_heavy_pro" | "battery_cordless" | "hot_water_commercial";

export function psiRating(t: PressureWasherType): number {
  const m: Record<PressureWasherType, number> = {
    electric_light: 4, gas_medium: 7, gas_heavy_pro: 10, battery_cordless: 3, hot_water_commercial: 9,
  };
  return m[t];
}

export function flowGpm(t: PressureWasherType): number {
  const m: Record<PressureWasherType, number> = {
    electric_light: 4, gas_medium: 7, gas_heavy_pro: 10, battery_cordless: 3, hot_water_commercial: 8,
  };
  return m[t];
}

export function portabilityRating(t: PressureWasherType): number {
  const m: Record<PressureWasherType, number> = {
    electric_light: 9, gas_medium: 5, gas_heavy_pro: 2, battery_cordless: 10, hot_water_commercial: 1,
  };
  return m[t];
}

export function noiseLevel(t: PressureWasherType): number {
  const m: Record<PressureWasherType, number> = {
    electric_light: 9, gas_medium: 4, gas_heavy_pro: 2, battery_cordless: 10, hot_water_commercial: 3,
  };
  return m[t];
}

export function washerCost(t: PressureWasherType): number {
  const m: Record<PressureWasherType, number> = {
    electric_light: 2, gas_medium: 5, gas_heavy_pro: 8, battery_cordless: 4, hot_water_commercial: 10,
  };
  return m[t];
}

export function hotWater(t: PressureWasherType): boolean {
  const m: Record<PressureWasherType, boolean> = {
    electric_light: false, gas_medium: false, gas_heavy_pro: false, battery_cordless: false, hot_water_commercial: true,
  };
  return m[t];
}

export function soapTank(t: PressureWasherType): boolean {
  const m: Record<PressureWasherType, boolean> = {
    electric_light: true, gas_medium: true, gas_heavy_pro: true, battery_cordless: false, hot_water_commercial: true,
  };
  return m[t];
}

export function pumpType(t: PressureWasherType): string {
  const m: Record<PressureWasherType, string> = {
    electric_light: "axial_cam_wobble_plate", gas_medium: "axial_cam_pump",
    gas_heavy_pro: "triplex_plunger_pump", battery_cordless: "brushless_motor_pump",
    hot_water_commercial: "ceramic_plunger_heated",
  };
  return m[t];
}

export function bestTask(t: PressureWasherType): string {
  const m: Record<PressureWasherType, string> = {
    electric_light: "car_patio_furniture_wash", gas_medium: "deck_fence_driveway",
    gas_heavy_pro: "concrete_graffiti_heavy", battery_cordless: "boat_rv_remote_wash",
    hot_water_commercial: "grease_oil_industrial_clean",
  };
  return m[t];
}

export function pressureWashers(): PressureWasherType[] {
  return ["electric_light", "gas_medium", "gas_heavy_pro", "battery_cordless", "hot_water_commercial"];
}

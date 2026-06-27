export type OutboardMotorType = "two_stroke_gas" | "four_stroke_gas" | "electric_trolling" | "jet_drive" | "diesel_commercial";

export function horsepower(t: OutboardMotorType): number {
  const m: Record<OutboardMotorType, number> = {
    two_stroke_gas: 8, four_stroke_gas: 9, electric_trolling: 2, jet_drive: 7, diesel_commercial: 10,
  };
  return m[t];
}

export function fuelEfficiency(t: OutboardMotorType): number {
  const m: Record<OutboardMotorType, number> = {
    two_stroke_gas: 4, four_stroke_gas: 8, electric_trolling: 10, jet_drive: 5, diesel_commercial: 7,
  };
  return m[t];
}

export function noiseLevel(t: OutboardMotorType): number {
  const m: Record<OutboardMotorType, number> = {
    two_stroke_gas: 9, four_stroke_gas: 6, electric_trolling: 1, jet_drive: 8, diesel_commercial: 10,
  };
  return m[t];
}

export function durability(t: OutboardMotorType): number {
  const m: Record<OutboardMotorType, number> = {
    two_stroke_gas: 6, four_stroke_gas: 9, electric_trolling: 7, jet_drive: 7, diesel_commercial: 10,
  };
  return m[t];
}

export function motorCost(t: OutboardMotorType): number {
  const m: Record<OutboardMotorType, number> = {
    two_stroke_gas: 4, four_stroke_gas: 7, electric_trolling: 3, jet_drive: 8, diesel_commercial: 10,
  };
  return m[t];
}

export function emissionFree(t: OutboardMotorType): boolean {
  const m: Record<OutboardMotorType, boolean> = {
    two_stroke_gas: false, four_stroke_gas: false, electric_trolling: true, jet_drive: false, diesel_commercial: false,
  };
  return m[t];
}

export function shallowWater(t: OutboardMotorType): boolean {
  const m: Record<OutboardMotorType, boolean> = {
    two_stroke_gas: false, four_stroke_gas: false, electric_trolling: true, jet_drive: true, diesel_commercial: false,
  };
  return m[t];
}

export function propulsionDesign(t: OutboardMotorType): string {
  const m: Record<OutboardMotorType, string> = {
    two_stroke_gas: "crankcase_scavenged_prop", four_stroke_gas: "overhead_cam_prop_shaft",
    electric_trolling: "brushless_dc_propeller", jet_drive: "impeller_water_intake",
    diesel_commercial: "direct_injection_shaft_drive",
  };
  return m[t];
}

export function bestBoat(t: OutboardMotorType): string {
  const m: Record<OutboardMotorType, string> = {
    two_stroke_gas: "lightweight_dinghy_tender", four_stroke_gas: "family_fishing_cruiser",
    electric_trolling: "bass_boat_silent_approach", jet_drive: "shallow_river_skiff",
    diesel_commercial: "heavy_trawler_workboat",
  };
  return m[t];
}

export function outboardMotors(): OutboardMotorType[] {
  return ["two_stroke_gas", "four_stroke_gas", "electric_trolling", "jet_drive", "diesel_commercial"];
}

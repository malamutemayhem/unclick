export type Hygrometer = "capacitive" | "resistive" | "psychrometer" | "chilled_mirror" | "hair_tension";

export function humidityAccuracy(h: Hygrometer): number {
  const m: Record<Hygrometer, number> = {
    capacitive: 8, resistive: 6, psychrometer: 7, chilled_mirror: 10, hair_tension: 4,
  };
  return m[h];
}

export function responseSpeed(h: Hygrometer): number {
  const m: Record<Hygrometer, number> = {
    capacitive: 8, resistive: 7, psychrometer: 4, chilled_mirror: 6, hair_tension: 2,
  };
  return m[h];
}

export function operatingRange(h: Hygrometer): number {
  const m: Record<Hygrometer, number> = {
    capacitive: 9, resistive: 7, psychrometer: 8, chilled_mirror: 10, hair_tension: 5,
  };
  return m[h];
}

export function longTermStability(h: Hygrometer): number {
  const m: Record<Hygrometer, number> = {
    capacitive: 7, resistive: 5, psychrometer: 9, chilled_mirror: 10, hair_tension: 3,
  };
  return m[h];
}

export function sensorCost(h: Hygrometer): number {
  const m: Record<Hygrometer, number> = {
    capacitive: 4, resistive: 2, psychrometer: 3, chilled_mirror: 10, hair_tension: 1,
  };
  return m[h];
}

export function requiresWetBulb(h: Hygrometer): boolean {
  const m: Record<Hygrometer, boolean> = {
    capacitive: false, resistive: false, psychrometer: true, chilled_mirror: false, hair_tension: false,
  };
  return m[h];
}

export function electronic(h: Hygrometer): boolean {
  const m: Record<Hygrometer, boolean> = {
    capacitive: true, resistive: true, psychrometer: false, chilled_mirror: true, hair_tension: false,
  };
  return m[h];
}

export function sensingPrinciple(h: Hygrometer): string {
  const m: Record<Hygrometer, string> = {
    capacitive: "dielectric_polymer_capacitance", resistive: "conductive_polymer_resistance",
    psychrometer: "wet_dry_bulb_evaporation", chilled_mirror: "dew_point_condensation_detect",
    hair_tension: "hygroscopic_hair_expansion",
  };
  return m[h];
}

export function bestApplication(h: Hygrometer): string {
  const m: Record<Hygrometer, string> = {
    capacitive: "hvac_industrial_general", resistive: "consumer_indoor_climate",
    psychrometer: "field_meteorology_calibration", chilled_mirror: "lab_reference_standard",
    hair_tension: "museum_display_analog",
  };
  return m[h];
}

export function hygrometers(): Hygrometer[] {
  return ["capacitive", "resistive", "psychrometer", "chilled_mirror", "hair_tension"];
}

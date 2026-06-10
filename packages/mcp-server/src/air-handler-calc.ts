export type AirHandler = "single_speed" | "two_speed" | "variable_speed" | "constant_volume" | "dual_fuel";

export function airflowControl(a: AirHandler): number {
  const m: Record<AirHandler, number> = {
    single_speed: 3, two_speed: 6, variable_speed: 10, constant_volume: 4, dual_fuel: 7,
  };
  return m[a];
}

export function energyEfficiency(a: AirHandler): number {
  const m: Record<AirHandler, number> = {
    single_speed: 4, two_speed: 6, variable_speed: 10, constant_volume: 3, dual_fuel: 8,
  };
  return m[a];
}

export function comfortLevel(a: AirHandler): number {
  const m: Record<AirHandler, number> = {
    single_speed: 4, two_speed: 6, variable_speed: 10, constant_volume: 5, dual_fuel: 7,
  };
  return m[a];
}

export function noiseOutput(a: AirHandler): number {
  const m: Record<AirHandler, number> = {
    single_speed: 8, two_speed: 6, variable_speed: 2, constant_volume: 8, dual_fuel: 5,
  };
  return m[a];
}

export function unitCost(a: AirHandler): number {
  const m: Record<AirHandler, number> = {
    single_speed: 3, two_speed: 5, variable_speed: 9, constant_volume: 4, dual_fuel: 8,
  };
  return m[a];
}

export function humidityControl(a: AirHandler): boolean {
  const m: Record<AirHandler, boolean> = {
    single_speed: false, two_speed: false, variable_speed: true, constant_volume: false, dual_fuel: true,
  };
  return m[a];
}

export function residentialCommon(a: AirHandler): boolean {
  const m: Record<AirHandler, boolean> = {
    single_speed: true, two_speed: true, variable_speed: true, constant_volume: false, dual_fuel: true,
  };
  return m[a];
}

export function motorType(a: AirHandler): string {
  const m: Record<AirHandler, string> = {
    single_speed: "psc_motor", two_speed: "dual_psc_motor",
    variable_speed: "ecm_bldc_motor", constant_volume: "psc_commercial",
    dual_fuel: "ecm_hybrid_motor",
  };
  return m[a];
}

export function bestClimate(a: AirHandler): string {
  const m: Record<AirHandler, string> = {
    single_speed: "mild_dry", two_speed: "moderate_seasonal",
    variable_speed: "humid_variable", constant_volume: "commercial_constant",
    dual_fuel: "extreme_cold_heat",
  };
  return m[a];
}

export function airHandlers(): AirHandler[] {
  return ["single_speed", "two_speed", "variable_speed", "constant_volume", "dual_fuel"];
}

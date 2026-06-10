export type VentilationType = "natural" | "mechanical_exhaust" | "mechanical_supply" | "balanced" | "energy_recovery";

export function airChangeRate(v: VentilationType): number {
  const m: Record<VentilationType, number> = {
    natural: 3, mechanical_exhaust: 7, mechanical_supply: 7, balanced: 9, energy_recovery: 9,
  };
  return m[v];
}

export function energyCost(v: VentilationType): number {
  const m: Record<VentilationType, number> = {
    natural: 1, mechanical_exhaust: 5, mechanical_supply: 5, balanced: 7, energy_recovery: 4,
  };
  return m[v];
}

export function installationCost(v: VentilationType): number {
  const m: Record<VentilationType, number> = {
    natural: 2, mechanical_exhaust: 5, mechanical_supply: 5, balanced: 8, energy_recovery: 10,
  };
  return m[v];
}

export function filtrationCapability(v: VentilationType): number {
  const m: Record<VentilationType, number> = {
    natural: 1, mechanical_exhaust: 3, mechanical_supply: 8, balanced: 9, energy_recovery: 9,
  };
  return m[v];
}

export function noiseGeneration(v: VentilationType): number {
  const m: Record<VentilationType, number> = {
    natural: 1, mechanical_exhaust: 6, mechanical_supply: 6, balanced: 5, energy_recovery: 5,
  };
  return m[v];
}

export function requiresDuctwork(v: VentilationType): boolean {
  const m: Record<VentilationType, boolean> = {
    natural: false, mechanical_exhaust: true, mechanical_supply: true, balanced: true, energy_recovery: true,
  };
  return m[v];
}

export function heatRecovery(v: VentilationType): boolean {
  const m: Record<VentilationType, boolean> = {
    natural: false, mechanical_exhaust: false, mechanical_supply: false, balanced: false, energy_recovery: true,
  };
  return m[v];
}

export function controlMethod(v: VentilationType): string {
  const m: Record<VentilationType, string> = {
    natural: "wind_stack_effect", mechanical_exhaust: "fan_negative_pressure",
    mechanical_supply: "fan_positive_pressure", balanced: "dual_fan_neutral",
    energy_recovery: "heat_exchanger_dual_fan",
  };
  return m[v];
}

export function bestApplication(v: VentilationType): string {
  const m: Record<VentilationType, string> = {
    natural: "mild_climate_residential", mechanical_exhaust: "bathroom_kitchen",
    mechanical_supply: "clean_room_hospital", balanced: "commercial_office",
    energy_recovery: "cold_climate_tight_building",
  };
  return m[v];
}

export function ventilationTypes(): VentilationType[] {
  return ["natural", "mechanical_exhaust", "mechanical_supply", "balanced", "energy_recovery"];
}

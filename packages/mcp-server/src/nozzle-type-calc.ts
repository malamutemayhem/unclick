export type NozzleType = "brass_standard" | "hardened_steel" | "ruby_tip" | "titanium_alloy" | "copper_plated";

export function thermalConductivity(n: NozzleType): number {
  const m: Record<NozzleType, number> = {
    brass_standard: 9, hardened_steel: 5, ruby_tip: 4, titanium_alloy: 3, copper_plated: 10,
  };
  return m[n];
}

export function abrasionResistance(n: NozzleType): number {
  const m: Record<NozzleType, number> = {
    brass_standard: 2, hardened_steel: 9, ruby_tip: 10, titanium_alloy: 7, copper_plated: 3,
  };
  return m[n];
}

export function printPrecision(n: NozzleType): number {
  const m: Record<NozzleType, number> = {
    brass_standard: 7, hardened_steel: 8, ruby_tip: 10, titanium_alloy: 6, copper_plated: 8,
  };
  return m[n];
}

export function nozzleLifespan(n: NozzleType): number {
  const m: Record<NozzleType, number> = {
    brass_standard: 3, hardened_steel: 8, ruby_tip: 10, titanium_alloy: 7, copper_plated: 4,
  };
  return m[n];
}

export function nozzleCost(n: NozzleType): number {
  const m: Record<NozzleType, number> = {
    brass_standard: 1, hardened_steel: 4, ruby_tip: 10, titanium_alloy: 6, copper_plated: 3,
  };
  return m[n];
}

export function suitableForAbrasive(n: NozzleType): boolean {
  const m: Record<NozzleType, boolean> = {
    brass_standard: false, hardened_steel: true, ruby_tip: true, titanium_alloy: true, copper_plated: false,
  };
  return m[n];
}

export function lightweight(n: NozzleType): boolean {
  const m: Record<NozzleType, boolean> = {
    brass_standard: true, hardened_steel: false, ruby_tip: true, titanium_alloy: true, copper_plated: false,
  };
  return m[n];
}

export function composition(n: NozzleType): string {
  const m: Record<NozzleType, string> = {
    brass_standard: "c360_free_machining_brass", hardened_steel: "a2_tool_steel_heat_treated",
    ruby_tip: "brass_body_synthetic_ruby_insert", titanium_alloy: "grade_5_ti6al4v_alloy",
    copper_plated: "nickel_plated_copper_core",
  };
  return m[n];
}

export function bestFilament(n: NozzleType): string {
  const m: Record<NozzleType, string> = {
    brass_standard: "pla_abs_petg_non_abrasive", hardened_steel: "carbon_fiber_glow_metal",
    ruby_tip: "any_filament_premium_quality", titanium_alloy: "abrasive_lightweight_direct",
    copper_plated: "pla_petg_fast_heat_transfer",
  };
  return m[n];
}

export function nozzleTypes(): NozzleType[] {
  return ["brass_standard", "hardened_steel", "ruby_tip", "titanium_alloy", "copper_plated"];
}

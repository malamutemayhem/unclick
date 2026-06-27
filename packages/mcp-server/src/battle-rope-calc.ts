export type BattleRopeType = "manila_natural" | "poly_dacron" | "nylon_coated" | "weighted_core" | "elastic_bungee";

export function waveIntensity(t: BattleRopeType): number {
  const m: Record<BattleRopeType, number> = {
    manila_natural: 8, poly_dacron: 9, nylon_coated: 7, weighted_core: 10, elastic_bungee: 5,
  };
  return m[t];
}

export function ropeDurability(t: BattleRopeType): number {
  const m: Record<BattleRopeType, number> = {
    manila_natural: 4, poly_dacron: 9, nylon_coated: 10, weighted_core: 8, elastic_bungee: 6,
  };
  return m[t];
}

export function gripFeel(t: BattleRopeType): number {
  const m: Record<BattleRopeType, number> = {
    manila_natural: 6, poly_dacron: 8, nylon_coated: 9, weighted_core: 7, elastic_bungee: 8,
  };
  return m[t];
}

export function indoorSafe(t: BattleRopeType): number {
  const m: Record<BattleRopeType, number> = {
    manila_natural: 3, poly_dacron: 7, nylon_coated: 10, weighted_core: 6, elastic_bungee: 9,
  };
  return m[t];
}

export function ropeCost(t: BattleRopeType): number {
  const m: Record<BattleRopeType, number> = {
    manila_natural: 2, poly_dacron: 5, nylon_coated: 7, weighted_core: 9, elastic_bungee: 6,
  };
  return m[t];
}

export function waterResistant(t: BattleRopeType): boolean {
  const m: Record<BattleRopeType, boolean> = {
    manila_natural: false, poly_dacron: true, nylon_coated: true, weighted_core: true, elastic_bungee: true,
  };
  return m[t];
}

export function shedsFiber(t: BattleRopeType): boolean {
  const m: Record<BattleRopeType, boolean> = {
    manila_natural: true, poly_dacron: false, nylon_coated: false, weighted_core: false, elastic_bungee: false,
  };
  return m[t];
}

export function coreMaterial(t: BattleRopeType): string {
  const m: Record<BattleRopeType, string> = {
    manila_natural: "hemp_manila_fiber",
    poly_dacron: "braided_poly_dacron",
    nylon_coated: "nylon_sleeve_over_poly",
    weighted_core: "steel_chain_inner_fill",
    elastic_bungee: "rubber_bungee_cord_center",
  };
  return m[t];
}

export function bestWorkout(t: BattleRopeType): string {
  const m: Record<BattleRopeType, string> = {
    manila_natural: "outdoor_bootcamp_classic",
    poly_dacron: "crossfit_gym_standard",
    nylon_coated: "indoor_studio_clean",
    weighted_core: "advanced_strength_hiit",
    elastic_bungee: "low_impact_rehab_cardio",
  };
  return m[t];
}

export function battleRopes(): BattleRopeType[] {
  return ["manila_natural", "poly_dacron", "nylon_coated", "weighted_core", "elastic_bungee"];
}

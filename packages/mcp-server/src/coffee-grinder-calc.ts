export type CoffeeGrinder = "blade_electric" | "flat_burr" | "conical_burr" | "hand_manual" | "roller_commercial";

export function grindConsistency(c: CoffeeGrinder): number {
  const m: Record<CoffeeGrinder, number> = {
    blade_electric: 3, flat_burr: 9, conical_burr: 8, hand_manual: 7, roller_commercial: 10,
  };
  return m[c];
}

export function grindRange(c: CoffeeGrinder): number {
  const m: Record<CoffeeGrinder, number> = {
    blade_electric: 4, flat_burr: 10, conical_burr: 9, hand_manual: 7, roller_commercial: 8,
  };
  return m[c];
}

export function retention(c: CoffeeGrinder): number {
  const m: Record<CoffeeGrinder, number> = {
    blade_electric: 2, flat_burr: 6, conical_burr: 4, hand_manual: 1, roller_commercial: 8,
  };
  return m[c];
}

export function noiseLevel(c: CoffeeGrinder): number {
  const m: Record<CoffeeGrinder, number> = {
    blade_electric: 7, flat_burr: 8, conical_burr: 5, hand_manual: 1, roller_commercial: 10,
  };
  return m[c];
}

export function grinderCost(c: CoffeeGrinder): number {
  const m: Record<CoffeeGrinder, number> = {
    blade_electric: 2, flat_burr: 8, conical_burr: 6, hand_manual: 4, roller_commercial: 10,
  };
  return m[c];
}

export function electric(c: CoffeeGrinder): boolean {
  const m: Record<CoffeeGrinder, boolean> = {
    blade_electric: true, flat_burr: true, conical_burr: true, hand_manual: false, roller_commercial: true,
  };
  return m[c];
}

export function espressoCapable(c: CoffeeGrinder): boolean {
  const m: Record<CoffeeGrinder, boolean> = {
    blade_electric: false, flat_burr: true, conical_burr: true, hand_manual: true, roller_commercial: true,
  };
  return m[c];
}

export function burrMaterial(c: CoffeeGrinder): string {
  const m: Record<CoffeeGrinder, string> = {
    blade_electric: "stainless_steel_blade_chop", flat_burr: "hardened_steel_flat_disc",
    conical_burr: "ceramic_conical_slow_grind", hand_manual: "stainless_conical_hand_crank",
    roller_commercial: "grooved_steel_roller_pair",
  };
  return m[c];
}

export function bestBrew(c: CoffeeGrinder): string {
  const m: Record<CoffeeGrinder, string> = {
    blade_electric: "french_press_coarse_only", flat_burr: "espresso_pour_over_precise",
    conical_burr: "all_brew_methods_home", hand_manual: "travel_camping_single_dose",
    roller_commercial: "cafe_high_volume_production",
  };
  return m[c];
}

export function coffeeGrinders(): CoffeeGrinder[] {
  return ["blade_electric", "flat_burr", "conical_burr", "hand_manual", "roller_commercial"];
}

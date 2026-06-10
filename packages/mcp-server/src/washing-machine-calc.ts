export type WashingMachine = "top_load_agitator" | "top_load_impeller" | "front_load" | "combo_washer_dryer" | "portable";

export function cleaningPower(w: WashingMachine): number {
  const m: Record<WashingMachine, number> = {
    top_load_agitator: 8, top_load_impeller: 7, front_load: 10, combo_washer_dryer: 6, portable: 4,
  };
  return m[w];
}

export function waterEfficiency(w: WashingMachine): number {
  const m: Record<WashingMachine, number> = {
    top_load_agitator: 3, top_load_impeller: 6, front_load: 10, combo_washer_dryer: 7, portable: 5,
  };
  return m[w];
}

export function fabricGentleness(w: WashingMachine): number {
  const m: Record<WashingMachine, number> = {
    top_load_agitator: 3, top_load_impeller: 7, front_load: 9, combo_washer_dryer: 8, portable: 6,
  };
  return m[w];
}

export function loadCapacity(w: WashingMachine): number {
  const m: Record<WashingMachine, number> = {
    top_load_agitator: 8, top_load_impeller: 9, front_load: 10, combo_washer_dryer: 5, portable: 3,
  };
  return m[w];
}

export function purchasePrice(w: WashingMachine): number {
  const m: Record<WashingMachine, number> = {
    top_load_agitator: 3, top_load_impeller: 5, front_load: 8, combo_washer_dryer: 9, portable: 2,
  };
  return m[w];
}

export function stackable(w: WashingMachine): boolean {
  const m: Record<WashingMachine, boolean> = {
    top_load_agitator: false, top_load_impeller: false, front_load: true, combo_washer_dryer: false, portable: false,
  };
  return m[w];
}

export function requiresHookup(w: WashingMachine): boolean {
  const m: Record<WashingMachine, boolean> = {
    top_load_agitator: true, top_load_impeller: true, front_load: true, combo_washer_dryer: true, portable: false,
  };
  return m[w];
}

export function spinMethod(w: WashingMachine): string {
  const m: Record<WashingMachine, string> = {
    top_load_agitator: "central_post_agitator", top_load_impeller: "low_profile_disc",
    front_load: "tumble_horizontal_drum", combo_washer_dryer: "tumble_with_heat_dry",
    portable: "pulsator_mini_drum",
  };
  return m[w];
}

export function bestHousehold(w: WashingMachine): string {
  const m: Record<WashingMachine, string> = {
    top_load_agitator: "heavy_soil_budget", top_load_impeller: "family_mixed_loads",
    front_load: "efficiency_conscious_premium", combo_washer_dryer: "apartment_no_vent",
    portable: "dorm_rv_small_space",
  };
  return m[w];
}

export function washingMachines(): WashingMachine[] {
  return ["top_load_agitator", "top_load_impeller", "front_load", "combo_washer_dryer", "portable"];
}

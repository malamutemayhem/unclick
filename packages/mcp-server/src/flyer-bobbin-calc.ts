export type FlyerBobbinType = "standard_wood_round" | "jumbo_bulk_large" | "lace_weight_small" | "sliding_hook_adjust" | "delta_high_speed";

export function yarnCapacity(t: FlyerBobbinType): number {
  const m: Record<FlyerBobbinType, number> = {
    standard_wood_round: 6, jumbo_bulk_large: 10, lace_weight_small: 3, sliding_hook_adjust: 7, delta_high_speed: 5,
  };
  return m[t];
}

export function windEven(t: FlyerBobbinType): number {
  const m: Record<FlyerBobbinType, number> = {
    standard_wood_round: 7, jumbo_bulk_large: 5, lace_weight_small: 9, sliding_hook_adjust: 10, delta_high_speed: 6,
  };
  return m[t];
}

export function spinSpeed(t: FlyerBobbinType): number {
  const m: Record<FlyerBobbinType, number> = {
    standard_wood_round: 7, jumbo_bulk_large: 5, lace_weight_small: 8, sliding_hook_adjust: 6, delta_high_speed: 10,
  };
  return m[t];
}

export function weightBalance(t: FlyerBobbinType): number {
  const m: Record<FlyerBobbinType, number> = {
    standard_wood_round: 8, jumbo_bulk_large: 5, lace_weight_small: 9, sliding_hook_adjust: 7, delta_high_speed: 10,
  };
  return m[t];
}

export function bobbinCost(t: FlyerBobbinType): number {
  const m: Record<FlyerBobbinType, number> = {
    standard_wood_round: 1, jumbo_bulk_large: 2, lace_weight_small: 1, sliding_hook_adjust: 2, delta_high_speed: 3,
  };
  return m[t];
}

export function adjustable(t: FlyerBobbinType): boolean {
  const m: Record<FlyerBobbinType, boolean> = {
    standard_wood_round: false, jumbo_bulk_large: false, lace_weight_small: false, sliding_hook_adjust: true, delta_high_speed: false,
  };
  return m[t];
}

export function highSpeed(t: FlyerBobbinType): boolean {
  const m: Record<FlyerBobbinType, boolean> = {
    standard_wood_round: false, jumbo_bulk_large: false, lace_weight_small: false, sliding_hook_adjust: false, delta_high_speed: true,
  };
  return m[t];
}

export function coreMaterial(t: FlyerBobbinType): string {
  const m: Record<FlyerBobbinType, string> = {
    standard_wood_round: "hardwood_turned",
    jumbo_bulk_large: "plywood_laminate",
    lace_weight_small: "hardwood_small_bore",
    sliding_hook_adjust: "wood_metal_hook",
    delta_high_speed: "polymer_composite",
  };
  return m[t];
}

export function bestUse(t: FlyerBobbinType): string {
  const m: Record<FlyerBobbinType, string> = {
    standard_wood_round: "everyday_spin_ply",
    jumbo_bulk_large: "bulky_art_yarn",
    lace_weight_small: "fine_lace_spin",
    sliding_hook_adjust: "even_wind_control",
    delta_high_speed: "speed_production_spin",
  };
  return m[t];
}

export function flyerBobbins(): FlyerBobbinType[] {
  return ["standard_wood_round", "jumbo_bulk_large", "lace_weight_small", "sliding_hook_adjust", "delta_high_speed"];
}

export type LacePillowType = "flat_cookie_round" | "bolster_roll_long" | "dome_mushroom_raised" | "travel_foam_portable" | "block_polystyrene_firm";

export function workSurface(t: LacePillowType): number {
  const m: Record<LacePillowType, number> = {
    flat_cookie_round: 8, bolster_roll_long: 7, dome_mushroom_raised: 9, travel_foam_portable: 5, block_polystyrene_firm: 7,
  };
  return m[t];
}

export function pinHold(t: LacePillowType): number {
  const m: Record<LacePillowType, number> = {
    flat_cookie_round: 9, bolster_roll_long: 8, dome_mushroom_raised: 8, travel_foam_portable: 6, block_polystyrene_firm: 10,
  };
  return m[t];
}

export function portability(t: LacePillowType): number {
  const m: Record<LacePillowType, number> = {
    flat_cookie_round: 5, bolster_roll_long: 4, dome_mushroom_raised: 3, travel_foam_portable: 10, block_polystyrene_firm: 7,
  };
  return m[t];
}

export function stability(t: LacePillowType): number {
  const m: Record<LacePillowType, number> = {
    flat_cookie_round: 9, bolster_roll_long: 7, dome_mushroom_raised: 10, travel_foam_portable: 5, block_polystyrene_firm: 8,
  };
  return m[t];
}

export function pillowCost(t: LacePillowType): number {
  const m: Record<LacePillowType, number> = {
    flat_cookie_round: 3, bolster_roll_long: 4, dome_mushroom_raised: 5, travel_foam_portable: 2, block_polystyrene_firm: 1,
  };
  return m[t];
}

export function rotatable(t: LacePillowType): boolean {
  const m: Record<LacePillowType, boolean> = {
    flat_cookie_round: true, bolster_roll_long: true, dome_mushroom_raised: true, travel_foam_portable: false, block_polystyrene_firm: false,
  };
  return m[t];
}

export function forContinuous(t: LacePillowType): boolean {
  const m: Record<LacePillowType, boolean> = {
    flat_cookie_round: false, bolster_roll_long: true, dome_mushroom_raised: false, travel_foam_portable: false, block_polystyrene_firm: false,
  };
  return m[t];
}

export function pillowFill(t: LacePillowType): string {
  const m: Record<LacePillowType, string> = {
    flat_cookie_round: "sawdust_packed_firm",
    bolster_roll_long: "straw_wrapped_tight",
    dome_mushroom_raised: "cork_dense_shaped",
    travel_foam_portable: "high_density_foam",
    block_polystyrene_firm: "polystyrene_block",
  };
  return m[t];
}

export function bestUse(t: LacePillowType): string {
  const m: Record<LacePillowType, string> = {
    flat_cookie_round: "midland_torchon_lace",
    bolster_roll_long: "continuous_lace_band",
    dome_mushroom_raised: "honiton_raised_work",
    travel_foam_portable: "travel_lace_class",
    block_polystyrene_firm: "beginner_practice",
  };
  return m[t];
}

export function lacePillows(): LacePillowType[] {
  return ["flat_cookie_round", "bolster_roll_long", "dome_mushroom_raised", "travel_foam_portable", "block_polystyrene_firm"];
}

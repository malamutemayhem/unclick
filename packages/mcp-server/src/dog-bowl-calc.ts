export type DogBowlType = "stainless_steel_basic" | "slow_feeder_maze" | "elevated_raised" | "travel_collapsible" | "automatic_gravity";

export function durability(t: DogBowlType): number {
  const m: Record<DogBowlType, number> = {
    stainless_steel_basic: 10, slow_feeder_maze: 6, elevated_raised: 8, travel_collapsible: 4, automatic_gravity: 7,
  };
  return m[t];
}

export function eatingPace(t: DogBowlType): number {
  const m: Record<DogBowlType, number> = {
    stainless_steel_basic: 3, slow_feeder_maze: 10, elevated_raised: 4, travel_collapsible: 3, automatic_gravity: 2,
  };
  return m[t];
}

export function neckComfort(t: DogBowlType): number {
  const m: Record<DogBowlType, number> = {
    stainless_steel_basic: 4, slow_feeder_maze: 4, elevated_raised: 10, travel_collapsible: 3, automatic_gravity: 7,
  };
  return m[t];
}

export function portability(t: DogBowlType): number {
  const m: Record<DogBowlType, number> = {
    stainless_steel_basic: 6, slow_feeder_maze: 3, elevated_raised: 2, travel_collapsible: 10, automatic_gravity: 1,
  };
  return m[t];
}

export function bowlCost(t: DogBowlType): number {
  const m: Record<DogBowlType, number> = {
    stainless_steel_basic: 1, slow_feeder_maze: 3, elevated_raised: 5, travel_collapsible: 2, automatic_gravity: 6,
  };
  return m[t];
}

export function dishwasherSafe(t: DogBowlType): boolean {
  const m: Record<DogBowlType, boolean> = {
    stainless_steel_basic: true, slow_feeder_maze: true, elevated_raised: true, travel_collapsible: false, automatic_gravity: false,
  };
  return m[t];
}

export function nonSlip(t: DogBowlType): boolean {
  const m: Record<DogBowlType, boolean> = {
    stainless_steel_basic: true, slow_feeder_maze: true, elevated_raised: true, travel_collapsible: false, automatic_gravity: true,
  };
  return m[t];
}

export function bowlMaterial(t: DogBowlType): string {
  const m: Record<DogBowlType, string> = {
    stainless_steel_basic: "food_grade_stainless",
    slow_feeder_maze: "bpa_free_plastic_ridge",
    elevated_raised: "bamboo_stand_steel_bowl",
    travel_collapsible: "silicone_fold_flat",
    automatic_gravity: "bpa_free_hopper_tray",
  };
  return m[t];
}

export function bestDog(t: DogBowlType): string {
  const m: Record<DogBowlType, string> = {
    stainless_steel_basic: "everyday_any_breed",
    slow_feeder_maze: "fast_eater_bloat_risk",
    elevated_raised: "large_breed_senior",
    travel_collapsible: "hike_road_trip_camp",
    automatic_gravity: "multi_day_away_refill",
  };
  return m[t];
}

export function dogBowls(): DogBowlType[] {
  return ["stainless_steel_basic", "slow_feeder_maze", "elevated_raised", "travel_collapsible", "automatic_gravity"];
}

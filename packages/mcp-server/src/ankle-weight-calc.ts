export type AnkleWeightType = "adjustable_sand_fill" | "fixed_neoprene_wrap" | "weighted_strap_buckle" | "aquatic_water_drag" | "magnetic_bar_insert";

export function resistance(t: AnkleWeightType): number {
  const m: Record<AnkleWeightType, number> = {
    adjustable_sand_fill: 9, fixed_neoprene_wrap: 7, weighted_strap_buckle: 8, aquatic_water_drag: 6, magnetic_bar_insert: 10,
  };
  return m[t];
}

export function comfort(t: AnkleWeightType): number {
  const m: Record<AnkleWeightType, number> = {
    adjustable_sand_fill: 7, fixed_neoprene_wrap: 9, weighted_strap_buckle: 6, aquatic_water_drag: 8, magnetic_bar_insert: 7,
  };
  return m[t];
}

export function adjustability(t: AnkleWeightType): number {
  const m: Record<AnkleWeightType, number> = {
    adjustable_sand_fill: 10, fixed_neoprene_wrap: 3, weighted_strap_buckle: 8, aquatic_water_drag: 5, magnetic_bar_insert: 9,
  };
  return m[t];
}

export function stayPut(t: AnkleWeightType): number {
  const m: Record<AnkleWeightType, number> = {
    adjustable_sand_fill: 7, fixed_neoprene_wrap: 8, weighted_strap_buckle: 9, aquatic_water_drag: 6, magnetic_bar_insert: 8,
  };
  return m[t];
}

export function weightCost(t: AnkleWeightType): number {
  const m: Record<AnkleWeightType, number> = {
    adjustable_sand_fill: 2, fixed_neoprene_wrap: 1, weighted_strap_buckle: 2, aquatic_water_drag: 3, magnetic_bar_insert: 3,
  };
  return m[t];
}

export function waterproof(t: AnkleWeightType): boolean {
  const m: Record<AnkleWeightType, boolean> = {
    adjustable_sand_fill: false, fixed_neoprene_wrap: false, weighted_strap_buckle: false, aquatic_water_drag: true, magnetic_bar_insert: false,
  };
  return m[t];
}

export function variableWeight(t: AnkleWeightType): boolean {
  const m: Record<AnkleWeightType, boolean> = {
    adjustable_sand_fill: true, fixed_neoprene_wrap: false, weighted_strap_buckle: true, aquatic_water_drag: false, magnetic_bar_insert: true,
  };
  return m[t];
}

export function fillType(t: AnkleWeightType): string {
  const m: Record<AnkleWeightType, string> = {
    adjustable_sand_fill: "iron_sand_granules",
    fixed_neoprene_wrap: "solid_iron_shot",
    weighted_strap_buckle: "steel_bar_removable",
    aquatic_water_drag: "water_resistance_fins",
    magnetic_bar_insert: "neodymium_bar_stack",
  };
  return m[t];
}

export function bestExercise(t: AnkleWeightType): string {
  const m: Record<AnkleWeightType, string> = {
    adjustable_sand_fill: "leg_lift_progression",
    fixed_neoprene_wrap: "walking_daily_wear",
    weighted_strap_buckle: "glute_kickback_heavy",
    aquatic_water_drag: "pool_rehab_therapy",
    magnetic_bar_insert: "pilates_barre_studio",
  };
  return m[t];
}

export function ankleWeights(): AnkleWeightType[] {
  return ["adjustable_sand_fill", "fixed_neoprene_wrap", "weighted_strap_buckle", "aquatic_water_drag", "magnetic_bar_insert"];
}

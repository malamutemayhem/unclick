export type PetFountainType = "gravity_flow_basic" | "ceramic_circulating" | "stainless_multi_stream" | "plastic_flower_top" | "outdoor_solar_powered";

export function waterFreshness(t: PetFountainType): number {
  const m: Record<PetFountainType, number> = {
    gravity_flow_basic: 3, ceramic_circulating: 9, stainless_multi_stream: 10, plastic_flower_top: 7, outdoor_solar_powered: 6,
  };
  return m[t];
}

export function capacity(t: PetFountainType): number {
  const m: Record<PetFountainType, number> = {
    gravity_flow_basic: 8, ceramic_circulating: 6, stainless_multi_stream: 7, plastic_flower_top: 5, outdoor_solar_powered: 9,
  };
  return m[t];
}

export function quietOperation(t: PetFountainType): number {
  const m: Record<PetFountainType, number> = {
    gravity_flow_basic: 10, ceramic_circulating: 8, stainless_multi_stream: 6, plastic_flower_top: 5, outdoor_solar_powered: 4,
  };
  return m[t];
}

export function cleanEase(t: PetFountainType): number {
  const m: Record<PetFountainType, number> = {
    gravity_flow_basic: 9, ceramic_circulating: 6, stainless_multi_stream: 8, plastic_flower_top: 5, outdoor_solar_powered: 4,
  };
  return m[t];
}

export function fountainCost(t: PetFountainType): number {
  const m: Record<PetFountainType, number> = {
    gravity_flow_basic: 1, ceramic_circulating: 5, stainless_multi_stream: 6, plastic_flower_top: 3, outdoor_solar_powered: 7,
  };
  return m[t];
}

export function hasFilter(t: PetFountainType): boolean {
  const m: Record<PetFountainType, boolean> = {
    gravity_flow_basic: false, ceramic_circulating: true, stainless_multi_stream: true, plastic_flower_top: true, outdoor_solar_powered: true,
  };
  return m[t];
}

export function needsPower(t: PetFountainType): boolean {
  const m: Record<PetFountainType, boolean> = {
    gravity_flow_basic: false, ceramic_circulating: true, stainless_multi_stream: true, plastic_flower_top: true, outdoor_solar_powered: false,
  };
  return m[t];
}

export function basinMaterial(t: PetFountainType): string {
  const m: Record<PetFountainType, string> = {
    gravity_flow_basic: "bpa_free_plastic_jug",
    ceramic_circulating: "glazed_ceramic_basin",
    stainless_multi_stream: "food_grade_stainless",
    plastic_flower_top: "bpa_free_plastic_petal",
    outdoor_solar_powered: "uv_resist_plastic_solar",
  };
  return m[t];
}

export function bestPet(t: PetFountainType): string {
  const m: Record<PetFountainType, string> = {
    gravity_flow_basic: "travel_power_outage_backup",
    ceramic_circulating: "indoor_cat_chin_acne",
    stainless_multi_stream: "multi_pet_household",
    plastic_flower_top: "curious_cat_kitten",
    outdoor_solar_powered: "patio_yard_outdoor_pet",
  };
  return m[t];
}

export function petFountains(): PetFountainType[] {
  return ["gravity_flow_basic", "ceramic_circulating", "stainless_multi_stream", "plastic_flower_top", "outdoor_solar_powered"];
}

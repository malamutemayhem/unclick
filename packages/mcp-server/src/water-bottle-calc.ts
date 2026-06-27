export type WaterBottleType = "stainless_insulated" | "glass_silicone_sleeve" | "plastic_bpa_free" | "collapsible_silicone" | "filtered_built_in";

export function insulation(t: WaterBottleType): number {
  const m: Record<WaterBottleType, number> = {
    stainless_insulated: 10, glass_silicone_sleeve: 3, plastic_bpa_free: 2, collapsible_silicone: 1, filtered_built_in: 4,
  };
  return m[t];
}

export function durability(t: WaterBottleType): number {
  const m: Record<WaterBottleType, number> = {
    stainless_insulated: 10, glass_silicone_sleeve: 4, plastic_bpa_free: 6, collapsible_silicone: 5, filtered_built_in: 7,
  };
  return m[t];
}

export function tastePurity(t: WaterBottleType): number {
  const m: Record<WaterBottleType, number> = {
    stainless_insulated: 8, glass_silicone_sleeve: 10, plastic_bpa_free: 5, collapsible_silicone: 6, filtered_built_in: 9,
  };
  return m[t];
}

export function portability(t: WaterBottleType): number {
  const m: Record<WaterBottleType, number> = {
    stainless_insulated: 6, glass_silicone_sleeve: 4, plastic_bpa_free: 8, collapsible_silicone: 10, filtered_built_in: 7,
  };
  return m[t];
}

export function bottleCost(t: WaterBottleType): number {
  const m: Record<WaterBottleType, number> = {
    stainless_insulated: 5, glass_silicone_sleeve: 4, plastic_bpa_free: 1, collapsible_silicone: 3, filtered_built_in: 7,
  };
  return m[t];
}

export function keepsCold24h(t: WaterBottleType): boolean {
  const m: Record<WaterBottleType, boolean> = {
    stainless_insulated: true, glass_silicone_sleeve: false, plastic_bpa_free: false, collapsible_silicone: false, filtered_built_in: false,
  };
  return m[t];
}

export function dishwasherSafe(t: WaterBottleType): boolean {
  const m: Record<WaterBottleType, boolean> = {
    stainless_insulated: false, glass_silicone_sleeve: true, plastic_bpa_free: true, collapsible_silicone: true, filtered_built_in: false,
  };
  return m[t];
}

export function wallType(t: WaterBottleType): string {
  const m: Record<WaterBottleType, string> = {
    stainless_insulated: "double_wall_vacuum_steel",
    glass_silicone_sleeve: "borosilicate_glass_sleeve",
    plastic_bpa_free: "tritan_single_wall",
    collapsible_silicone: "food_grade_silicone_fold",
    filtered_built_in: "tritan_carbon_filter_straw",
  };
  return m[t];
}

export function bestUse(t: WaterBottleType): string {
  const m: Record<WaterBottleType, string> = {
    stainless_insulated: "all_day_gym_outdoor",
    glass_silicone_sleeve: "office_desk_yoga",
    plastic_bpa_free: "kids_school_sports",
    collapsible_silicone: "travel_hiking_pack_flat",
    filtered_built_in: "tap_water_travel_filter",
  };
  return m[t];
}

export function waterBottles(): WaterBottleType[] {
  return ["stainless_insulated", "glass_silicone_sleeve", "plastic_bpa_free", "collapsible_silicone", "filtered_built_in"];
}

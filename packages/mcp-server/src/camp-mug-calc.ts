export type CampMugType = "titanium_single_wall" | "stainless_double_insulated" | "enamel_classic_retro" | "collapsible_silicone_fold" | "insulated_french_press";

export function heatRetention(t: CampMugType): number {
  const m: Record<CampMugType, number> = {
    titanium_single_wall: 3, stainless_double_insulated: 10, enamel_classic_retro: 5, collapsible_silicone_fold: 4, insulated_french_press: 9,
  };
  return m[t];
}

export function packWeight(t: CampMugType): number {
  const m: Record<CampMugType, number> = {
    titanium_single_wall: 10, stainless_double_insulated: 4, enamel_classic_retro: 5, collapsible_silicone_fold: 9, insulated_french_press: 3,
  };
  return m[t];
}

export function durability(t: CampMugType): number {
  const m: Record<CampMugType, number> = {
    titanium_single_wall: 10, stainless_double_insulated: 9, enamel_classic_retro: 4, collapsible_silicone_fold: 6, insulated_french_press: 7,
  };
  return m[t];
}

export function versatility(t: CampMugType): number {
  const m: Record<CampMugType, number> = {
    titanium_single_wall: 8, stainless_double_insulated: 7, enamel_classic_retro: 6, collapsible_silicone_fold: 5, insulated_french_press: 9,
  };
  return m[t];
}

export function mugCost(t: CampMugType): number {
  const m: Record<CampMugType, number> = {
    titanium_single_wall: 3, stainless_double_insulated: 2, enamel_classic_retro: 1, collapsible_silicone_fold: 1, insulated_french_press: 3,
  };
  return m[t];
}

export function directFlame(t: CampMugType): boolean {
  const m: Record<CampMugType, boolean> = {
    titanium_single_wall: true, stainless_double_insulated: false, enamel_classic_retro: true, collapsible_silicone_fold: false, insulated_french_press: false,
  };
  return m[t];
}

export function collapsible(t: CampMugType): boolean {
  const m: Record<CampMugType, boolean> = {
    titanium_single_wall: false, stainless_double_insulated: false, enamel_classic_retro: false, collapsible_silicone_fold: true, insulated_french_press: false,
  };
  return m[t];
}

export function wallConstruction(t: CampMugType): string {
  const m: Record<CampMugType, string> = {
    titanium_single_wall: "grade_2_titanium_thin",
    stainless_double_insulated: "vacuum_double_wall_steel",
    enamel_classic_retro: "steel_core_enamel_coat",
    collapsible_silicone_fold: "food_grade_silicone",
    insulated_french_press: "double_wall_press_insert",
  };
  return m[t];
}

export function bestUse(t: CampMugType): string {
  const m: Record<CampMugType, string> = {
    titanium_single_wall: "ultralight_backpacking",
    stainless_double_insulated: "cold_weather_hot_drink",
    enamel_classic_retro: "car_camp_campfire_vibe",
    collapsible_silicone_fold: "travel_day_hike_compact",
    insulated_french_press: "coffee_lover_camp_brew",
  };
  return m[t];
}

export function campMugs(): CampMugType[] {
  return ["titanium_single_wall", "stainless_double_insulated", "enamel_classic_retro", "collapsible_silicone_fold", "insulated_french_press"];
}

export type BentoBoxType = "traditional_lacquer_wood" | "stainless_steel_tiffin" | "plastic_compartment_snap" | "silicone_collapsible" | "insulated_heated_electric";

export function compartments(t: BentoBoxType): number {
  const m: Record<BentoBoxType, number> = {
    traditional_lacquer_wood: 7, stainless_steel_tiffin: 9, plastic_compartment_snap: 8, silicone_collapsible: 5, insulated_heated_electric: 6,
  };
  return m[t];
}

export function leakProof(t: BentoBoxType): number {
  const m: Record<BentoBoxType, number> = {
    traditional_lacquer_wood: 4, stainless_steel_tiffin: 7, plastic_compartment_snap: 9, silicone_collapsible: 8, insulated_heated_electric: 10,
  };
  return m[t];
}

export function portability(t: BentoBoxType): number {
  const m: Record<BentoBoxType, number> = {
    traditional_lacquer_wood: 6, stainless_steel_tiffin: 5, plastic_compartment_snap: 8, silicone_collapsible: 10, insulated_heated_electric: 4,
  };
  return m[t];
}

export function heatRetention(t: BentoBoxType): number {
  const m: Record<BentoBoxType, number> = {
    traditional_lacquer_wood: 5, stainless_steel_tiffin: 7, plastic_compartment_snap: 3, silicone_collapsible: 4, insulated_heated_electric: 10,
  };
  return m[t];
}

export function boxCost(t: BentoBoxType): number {
  const m: Record<BentoBoxType, number> = {
    traditional_lacquer_wood: 8, stainless_steel_tiffin: 6, plastic_compartment_snap: 3, silicone_collapsible: 5, insulated_heated_electric: 9,
  };
  return m[t];
}

export function microwaveSafe(t: BentoBoxType): boolean {
  const m: Record<BentoBoxType, boolean> = {
    traditional_lacquer_wood: false, stainless_steel_tiffin: false, plastic_compartment_snap: true, silicone_collapsible: true, insulated_heated_electric: false,
  };
  return m[t];
}

export function dishwasherSafe(t: BentoBoxType): boolean {
  const m: Record<BentoBoxType, boolean> = {
    traditional_lacquer_wood: false, stainless_steel_tiffin: true, plastic_compartment_snap: true, silicone_collapsible: true, insulated_heated_electric: false,
  };
  return m[t];
}

export function boxMaterial(t: BentoBoxType): string {
  const m: Record<BentoBoxType, string> = {
    traditional_lacquer_wood: "cedar_urushi_lacquer",
    stainless_steel_tiffin: "food_grade_304_steel",
    plastic_compartment_snap: "bpa_free_tritan_pp",
    silicone_collapsible: "platinum_silicone_fold",
    insulated_heated_electric: "stainless_double_wall_heater",
  };
  return m[t];
}

export function bestMeal(t: BentoBoxType): string {
  const m: Record<BentoBoxType, string> = {
    traditional_lacquer_wood: "japanese_aesthetic_sushi",
    stainless_steel_tiffin: "indian_curry_multi_tier",
    plastic_compartment_snap: "kids_school_snack_lunch",
    silicone_collapsible: "travel_hike_space_save",
    insulated_heated_electric: "office_hot_meal_desk",
  };
  return m[t];
}

export function bentoBoxes(): BentoBoxType[] {
  return ["traditional_lacquer_wood", "stainless_steel_tiffin", "plastic_compartment_snap", "silicone_collapsible", "insulated_heated_electric"];
}

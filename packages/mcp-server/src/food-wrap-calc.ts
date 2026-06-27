export type FoodWrapType = "beeswax_reusable" | "silicone_stretch_lid" | "plastic_cling_film" | "aluminum_foil_heavy" | "parchment_paper_roll";

export function sealQuality(t: FoodWrapType): number {
  const m: Record<FoodWrapType, number> = {
    beeswax_reusable: 6, silicone_stretch_lid: 9, plastic_cling_film: 8, aluminum_foil_heavy: 10, parchment_paper_roll: 3,
  };
  return m[t];
}

export function ecoFriendly(t: FoodWrapType): number {
  const m: Record<FoodWrapType, number> = {
    beeswax_reusable: 10, silicone_stretch_lid: 8, plastic_cling_film: 2, aluminum_foil_heavy: 4, parchment_paper_roll: 6,
  };
  return m[t];
}

export function versatility(t: FoodWrapType): number {
  const m: Record<FoodWrapType, number> = {
    beeswax_reusable: 6, silicone_stretch_lid: 7, plastic_cling_film: 8, aluminum_foil_heavy: 10, parchment_paper_roll: 9,
  };
  return m[t];
}

export function easeOfUse(t: FoodWrapType): number {
  const m: Record<FoodWrapType, number> = {
    beeswax_reusable: 7, silicone_stretch_lid: 9, plastic_cling_film: 8, aluminum_foil_heavy: 8, parchment_paper_roll: 7,
  };
  return m[t];
}

export function wrapCost(t: FoodWrapType): number {
  const m: Record<FoodWrapType, number> = {
    beeswax_reusable: 7, silicone_stretch_lid: 6, plastic_cling_film: 2, aluminum_foil_heavy: 4, parchment_paper_roll: 3,
  };
  return m[t];
}

export function reusable(t: FoodWrapType): boolean {
  const m: Record<FoodWrapType, boolean> = {
    beeswax_reusable: true, silicone_stretch_lid: true, plastic_cling_film: false, aluminum_foil_heavy: false, parchment_paper_roll: false,
  };
  return m[t];
}

export function heatSafe(t: FoodWrapType): boolean {
  const m: Record<FoodWrapType, boolean> = {
    beeswax_reusable: false, silicone_stretch_lid: true, plastic_cling_film: false, aluminum_foil_heavy: true, parchment_paper_roll: true,
  };
  return m[t];
}

export function wrapMaterial(t: FoodWrapType): string {
  const m: Record<FoodWrapType, string> = {
    beeswax_reusable: "organic_cotton_beeswax_jojoba",
    silicone_stretch_lid: "food_grade_silicone_disc",
    plastic_cling_film: "ldpe_polyethylene_cling",
    aluminum_foil_heavy: "heavy_gauge_aluminum_sheet",
    parchment_paper_roll: "silicone_coated_paper_unbleach",
  };
  return m[t];
}

export function bestUse(t: FoodWrapType): string {
  const m: Record<FoodWrapType, string> = {
    beeswax_reusable: "sandwich_cheese_produce_wrap",
    silicone_stretch_lid: "bowl_container_leftover_seal",
    plastic_cling_film: "quick_cover_fridge_store",
    aluminum_foil_heavy: "grill_oven_bake_freeze",
    parchment_paper_roll: "baking_sheet_liner_steam",
  };
  return m[t];
}

export function foodWraps(): FoodWrapType[] {
  return ["beeswax_reusable", "silicone_stretch_lid", "plastic_cling_film", "aluminum_foil_heavy", "parchment_paper_roll"];
}

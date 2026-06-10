export type SoapDishType = "ceramic_classic_tray" | "stainless_steel_drain" | "bamboo_slat_natural" | "suction_cup_wall" | "silicone_flex_waterfall";

export function drainage(t: SoapDishType): number {
  const m: Record<SoapDishType, number> = {
    ceramic_classic_tray: 3, stainless_steel_drain: 9, bamboo_slat_natural: 8, suction_cup_wall: 7, silicone_flex_waterfall: 10,
  };
  return m[t];
}

export function durability(t: SoapDishType): number {
  const m: Record<SoapDishType, number> = {
    ceramic_classic_tray: 6, stainless_steel_drain: 10, bamboo_slat_natural: 5, suction_cup_wall: 4, silicone_flex_waterfall: 8,
  };
  return m[t];
}

export function aesthetics(t: SoapDishType): number {
  const m: Record<SoapDishType, number> = {
    ceramic_classic_tray: 9, stainless_steel_drain: 7, bamboo_slat_natural: 10, suction_cup_wall: 4, silicone_flex_waterfall: 6,
  };
  return m[t];
}

export function cleanEase(t: SoapDishType): number {
  const m: Record<SoapDishType, number> = {
    ceramic_classic_tray: 7, stainless_steel_drain: 9, bamboo_slat_natural: 4, suction_cup_wall: 6, silicone_flex_waterfall: 10,
  };
  return m[t];
}

export function dishCost(t: SoapDishType): number {
  const m: Record<SoapDishType, number> = {
    ceramic_classic_tray: 3, stainless_steel_drain: 4, bamboo_slat_natural: 3, suction_cup_wall: 2, silicone_flex_waterfall: 2,
  };
  return m[t];
}

export function wallMount(t: SoapDishType): boolean {
  const m: Record<SoapDishType, boolean> = {
    ceramic_classic_tray: false, stainless_steel_drain: false, bamboo_slat_natural: false, suction_cup_wall: true, silicone_flex_waterfall: true,
  };
  return m[t];
}

export function rustProof(t: SoapDishType): boolean {
  const m: Record<SoapDishType, boolean> = {
    ceramic_classic_tray: true, stainless_steel_drain: true, bamboo_slat_natural: false, suction_cup_wall: true, silicone_flex_waterfall: true,
  };
  return m[t];
}

export function dishMaterial(t: SoapDishType): string {
  const m: Record<SoapDishType, string> = {
    ceramic_classic_tray: "glazed_ceramic_solid",
    stainless_steel_drain: "brushed_stainless_perforated",
    bamboo_slat_natural: "natural_bamboo_slatted",
    suction_cup_wall: "abs_plastic_suction",
    silicone_flex_waterfall: "food_grade_silicone_drain",
  };
  return m[t];
}

export function bestBathroom(t: SoapDishType): string {
  const m: Record<SoapDishType, string> = {
    ceramic_classic_tray: "vanity_countertop_decor",
    stainless_steel_drain: "modern_minimalist_shower",
    bamboo_slat_natural: "spa_natural_theme",
    suction_cup_wall: "rental_no_drill_shower",
    silicone_flex_waterfall: "family_easy_clean_kids",
  };
  return m[t];
}

export function soapDishes(): SoapDishType[] {
  return ["ceramic_classic_tray", "stainless_steel_drain", "bamboo_slat_natural", "suction_cup_wall", "silicone_flex_waterfall"];
}

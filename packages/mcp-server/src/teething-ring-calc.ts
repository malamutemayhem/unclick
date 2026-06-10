export type TeethingRingType = "silicone_textured" | "wooden_natural_maple" | "water_filled_cool" | "rubber_banana_shape" | "fabric_crinkle_combo";

export function gumRelief(t: TeethingRingType): number {
  const m: Record<TeethingRingType, number> = {
    silicone_textured: 9, wooden_natural_maple: 7, water_filled_cool: 10, rubber_banana_shape: 8, fabric_crinkle_combo: 5,
  };
  return m[t];
}

export function gripEase(t: TeethingRingType): number {
  const m: Record<TeethingRingType, number> = {
    silicone_textured: 8, wooden_natural_maple: 6, water_filled_cool: 7, rubber_banana_shape: 10, fabric_crinkle_combo: 9,
  };
  return m[t];
}

export function durability(t: TeethingRingType): number {
  const m: Record<TeethingRingType, number> = {
    silicone_textured: 9, wooden_natural_maple: 10, water_filled_cool: 5, rubber_banana_shape: 8, fabric_crinkle_combo: 6,
  };
  return m[t];
}

export function sensoryStimulation(t: TeethingRingType): number {
  const m: Record<TeethingRingType, number> = {
    silicone_textured: 8, wooden_natural_maple: 5, water_filled_cool: 6, rubber_banana_shape: 7, fabric_crinkle_combo: 10,
  };
  return m[t];
}

export function ringCost(t: TeethingRingType): number {
  const m: Record<TeethingRingType, number> = {
    silicone_textured: 4, wooden_natural_maple: 6, water_filled_cool: 3, rubber_banana_shape: 5, fabric_crinkle_combo: 7,
  };
  return m[t];
}

export function freezerSafe(t: TeethingRingType): boolean {
  const m: Record<TeethingRingType, boolean> = {
    silicone_textured: true, wooden_natural_maple: false, water_filled_cool: true, rubber_banana_shape: true, fabric_crinkle_combo: false,
  };
  return m[t];
}

export function allNatural(t: TeethingRingType): boolean {
  const m: Record<TeethingRingType, boolean> = {
    silicone_textured: false, wooden_natural_maple: true, water_filled_cool: false, rubber_banana_shape: true, fabric_crinkle_combo: false,
  };
  return m[t];
}

export function ringMaterial(t: TeethingRingType): string {
  const m: Record<TeethingRingType, string> = {
    silicone_textured: "food_grade_silicone_bumps",
    wooden_natural_maple: "unfinished_hard_maple_smooth",
    water_filled_cool: "phthalate_free_gel_core",
    rubber_banana_shape: "natural_rubber_latex_mold",
    fabric_crinkle_combo: "organic_cotton_crinkle_fill",
  };
  return m[t];
}

export function bestStage(t: TeethingRingType): string {
  const m: Record<TeethingRingType, string> = {
    silicone_textured: "front_teeth_early_teething",
    wooden_natural_maple: "eco_conscious_parent_gift",
    water_filled_cool: "sore_gum_cold_relief",
    rubber_banana_shape: "back_molar_self_reach",
    fabric_crinkle_combo: "sensory_play_early_grasp",
  };
  return m[t];
}

export function teethingRings(): TeethingRingType[] {
  return ["silicone_textured", "wooden_natural_maple", "water_filled_cool", "rubber_banana_shape", "fabric_crinkle_combo"];
}

export type MuddlerType = "wooden_flat_head" | "stainless_toothed" | "plastic_nylon" | "bamboo_natural" | "mortar_pestle_granite";

export function crushPower(t: MuddlerType): number {
  const m: Record<MuddlerType, number> = {
    wooden_flat_head: 7, stainless_toothed: 9, plastic_nylon: 5, bamboo_natural: 6, mortar_pestle_granite: 10,
  };
  return m[t];
}

export function gentleExtract(t: MuddlerType): number {
  const m: Record<MuddlerType, number> = {
    wooden_flat_head: 8, stainless_toothed: 4, plastic_nylon: 7, bamboo_natural: 9, mortar_pestle_granite: 3,
  };
  return m[t];
}

export function glassProtect(t: MuddlerType): number {
  const m: Record<MuddlerType, number> = {
    wooden_flat_head: 7, stainless_toothed: 3, plastic_nylon: 10, bamboo_natural: 8, mortar_pestle_granite: 1,
  };
  return m[t];
}

export function cleanEase(t: MuddlerType): number {
  const m: Record<MuddlerType, number> = {
    wooden_flat_head: 4, stainless_toothed: 9, plastic_nylon: 10, bamboo_natural: 5, mortar_pestle_granite: 6,
  };
  return m[t];
}

export function muddlerCost(t: MuddlerType): number {
  const m: Record<MuddlerType, number> = {
    wooden_flat_head: 3, stainless_toothed: 5, plastic_nylon: 2, bamboo_natural: 4, mortar_pestle_granite: 7,
  };
  return m[t];
}

export function dishwasherSafe(t: MuddlerType): boolean {
  const m: Record<MuddlerType, boolean> = {
    wooden_flat_head: false, stainless_toothed: true, plastic_nylon: true, bamboo_natural: false, mortar_pestle_granite: false,
  };
  return m[t];
}

export function absorbsFlavor(t: MuddlerType): boolean {
  const m: Record<MuddlerType, boolean> = {
    wooden_flat_head: true, stainless_toothed: false, plastic_nylon: false, bamboo_natural: true, mortar_pestle_granite: false,
  };
  return m[t];
}

export function tipMaterial(t: MuddlerType): string {
  const m: Record<MuddlerType, string> = {
    wooden_flat_head: "flat_maple_end_grain",
    stainless_toothed: "serrated_steel_teeth",
    plastic_nylon: "textured_nylon_head",
    bamboo_natural: "rounded_bamboo_knob",
    mortar_pestle_granite: "rough_granite_bowl",
  };
  return m[t];
}

export function bestDrink(t: MuddlerType): string {
  const m: Record<MuddlerType, string> = {
    wooden_flat_head: "mojito_old_fashioned",
    stainless_toothed: "caipirinha_fruit_crush",
    plastic_nylon: "gentle_herb_release",
    bamboo_natural: "mint_julep_classic",
    mortar_pestle_granite: "spice_paste_infusion",
  };
  return m[t];
}

export function muddlers(): MuddlerType[] {
  return ["wooden_flat_head", "stainless_toothed", "plastic_nylon", "bamboo_natural", "mortar_pestle_granite"];
}

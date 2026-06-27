export type ShampooType = "clarifying" | "moisturizing" | "volumizing" | "color_safe" | "medicated";

export function cleansingPower(s: ShampooType): number {
  const m: Record<ShampooType, number> = {
    clarifying: 10, moisturizing: 5, volumizing: 7, color_safe: 4, medicated: 8,
  };
  return m[s];
}

export function moistureRetention(s: ShampooType): number {
  const m: Record<ShampooType, number> = {
    clarifying: 2, moisturizing: 10, volumizing: 4, color_safe: 8, medicated: 5,
  };
  return m[s];
}

export function scalpHealth(s: ShampooType): number {
  const m: Record<ShampooType, number> = {
    clarifying: 6, moisturizing: 7, volumizing: 5, color_safe: 6, medicated: 10,
  };
  return m[s];
}

export function dailyUseRating(s: ShampooType): number {
  const m: Record<ShampooType, number> = {
    clarifying: 2, moisturizing: 9, volumizing: 8, color_safe: 10, medicated: 3,
  };
  return m[s];
}

export function productCost(s: ShampooType): number {
  const m: Record<ShampooType, number> = {
    clarifying: 4, moisturizing: 5, volumizing: 5, color_safe: 7, medicated: 8,
  };
  return m[s];
}

export function sulfateFree(s: ShampooType): boolean {
  const m: Record<ShampooType, boolean> = {
    clarifying: false, moisturizing: true, volumizing: false, color_safe: true, medicated: false,
  };
  return m[s];
}

export function requiresPrescription(s: ShampooType): boolean {
  const m: Record<ShampooType, boolean> = {
    clarifying: false, moisturizing: false, volumizing: false, color_safe: false, medicated: true,
  };
  return m[s];
}

export function activeIngredient(s: ShampooType): string {
  const m: Record<ShampooType, string> = {
    clarifying: "sodium_lauryl_sulfate_strong", moisturizing: "argan_oil_glycerin_panthenol",
    volumizing: "hydrolyzed_wheat_protein_biotin", color_safe: "gentle_surfactant_uv_filter",
    medicated: "ketoconazole_zinc_pyrithione",
  };
  return m[s];
}

export function bestHairConcern(s: ShampooType): string {
  const m: Record<ShampooType, string> = {
    clarifying: "product_buildup_oily_scalp", moisturizing: "dry_damaged_frizzy",
    volumizing: "flat_thin_limp", color_safe: "dyed_highlighted_treated",
    medicated: "dandruff_psoriasis_fungal",
  };
  return m[s];
}

export function shampooTypes(): ShampooType[] {
  return ["clarifying", "moisturizing", "volumizing", "color_safe", "medicated"];
}

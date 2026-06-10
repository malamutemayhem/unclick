export type CocktailStrainerType = "hawthorne_coil_spring" | "julep_perforated_cap" | "fine_mesh_conical" | "built_in_shaker_lid" | "double_strain_combo";

export function strainPrecision(t: CocktailStrainerType): number {
  const m: Record<CocktailStrainerType, number> = {
    hawthorne_coil_spring: 7, julep_perforated_cap: 6, fine_mesh_conical: 10, built_in_shaker_lid: 4, double_strain_combo: 10,
  };
  return m[t];
}

export function flowSpeed(t: CocktailStrainerType): number {
  const m: Record<CocktailStrainerType, number> = {
    hawthorne_coil_spring: 8, julep_perforated_cap: 9, fine_mesh_conical: 4, built_in_shaker_lid: 10, double_strain_combo: 3,
  };
  return m[t];
}

export function easeOfUse(t: CocktailStrainerType): number {
  const m: Record<CocktailStrainerType, number> = {
    hawthorne_coil_spring: 9, julep_perforated_cap: 6, fine_mesh_conical: 7, built_in_shaker_lid: 10, double_strain_combo: 5,
  };
  return m[t];
}

export function iceControl(t: CocktailStrainerType): number {
  const m: Record<CocktailStrainerType, number> = {
    hawthorne_coil_spring: 9, julep_perforated_cap: 7, fine_mesh_conical: 6, built_in_shaker_lid: 5, double_strain_combo: 8,
  };
  return m[t];
}

export function strainerCost(t: CocktailStrainerType): number {
  const m: Record<CocktailStrainerType, number> = {
    hawthorne_coil_spring: 3, julep_perforated_cap: 4, fine_mesh_conical: 3, built_in_shaker_lid: 1, double_strain_combo: 6,
  };
  return m[t];
}

export function fitsAllGlasses(t: CocktailStrainerType): boolean {
  const m: Record<CocktailStrainerType, boolean> = {
    hawthorne_coil_spring: true, julep_perforated_cap: false, fine_mesh_conical: true, built_in_shaker_lid: false, double_strain_combo: true,
  };
  return m[t];
}

export function catchesPulp(t: CocktailStrainerType): boolean {
  const m: Record<CocktailStrainerType, boolean> = {
    hawthorne_coil_spring: false, julep_perforated_cap: false, fine_mesh_conical: true, built_in_shaker_lid: false, double_strain_combo: true,
  };
  return m[t];
}

export function meshType(t: CocktailStrainerType): string {
  const m: Record<CocktailStrainerType, string> = {
    hawthorne_coil_spring: "coil_spring_perforated_plate",
    julep_perforated_cap: "dome_perforated_holes",
    fine_mesh_conical: "woven_stainless_fine_mesh",
    built_in_shaker_lid: "slotted_lid_integrated",
    double_strain_combo: "hawthorne_plus_fine_mesh",
  };
  return m[t];
}

export function bestDrink(t: CocktailStrainerType): string {
  const m: Record<CocktailStrainerType, string> = {
    hawthorne_coil_spring: "shaken_cocktail_general",
    julep_perforated_cap: "stirred_mixing_glass",
    fine_mesh_conical: "citrus_egg_white_foam",
    built_in_shaker_lid: "quick_casual_home_bar",
    double_strain_combo: "craft_bar_pristine_pour",
  };
  return m[t];
}

export function cocktailStrainers(): CocktailStrainerType[] {
  return ["hawthorne_coil_spring", "julep_perforated_cap", "fine_mesh_conical", "built_in_shaker_lid", "double_strain_combo"];
}

export type SoapLyeType = "sodium_hydroxide_bar" | "potassium_hydroxide_liquid" | "dual_lye_blend" | "melt_pour_base" | "rebatch_grate_melt";

export function hardness(t: SoapLyeType): number {
  const m: Record<SoapLyeType, number> = {
    sodium_hydroxide_bar: 10, potassium_hydroxide_liquid: 3, dual_lye_blend: 7, melt_pour_base: 8, rebatch_grate_melt: 9,
  };
  return m[t];
}

export function latherQuality(t: SoapLyeType): number {
  const m: Record<SoapLyeType, number> = {
    sodium_hydroxide_bar: 7, potassium_hydroxide_liquid: 10, dual_lye_blend: 9, melt_pour_base: 6, rebatch_grate_melt: 7,
  };
  return m[t];
}

export function cureTime(t: SoapLyeType): number {
  const m: Record<SoapLyeType, number> = {
    sodium_hydroxide_bar: 3, potassium_hydroxide_liquid: 5, dual_lye_blend: 4, melt_pour_base: 10, rebatch_grate_melt: 7,
  };
  return m[t];
}

export function beginnerSafe(t: SoapLyeType): number {
  const m: Record<SoapLyeType, number> = {
    sodium_hydroxide_bar: 5, potassium_hydroxide_liquid: 4, dual_lye_blend: 4, melt_pour_base: 10, rebatch_grate_melt: 8,
  };
  return m[t];
}

export function lyeCost(t: SoapLyeType): number {
  const m: Record<SoapLyeType, number> = {
    sodium_hydroxide_bar: 1, potassium_hydroxide_liquid: 2, dual_lye_blend: 2, melt_pour_base: 3, rebatch_grate_melt: 2,
  };
  return m[t];
}

export function needsCure(t: SoapLyeType): boolean {
  const m: Record<SoapLyeType, boolean> = {
    sodium_hydroxide_bar: true, potassium_hydroxide_liquid: true, dual_lye_blend: true, melt_pour_base: false, rebatch_grate_melt: false,
  };
  return m[t];
}

export function handlesLye(t: SoapLyeType): boolean {
  const m: Record<SoapLyeType, boolean> = {
    sodium_hydroxide_bar: true, potassium_hydroxide_liquid: true, dual_lye_blend: true, melt_pour_base: false, rebatch_grate_melt: false,
  };
  return m[t];
}

export function processType(t: SoapLyeType): string {
  const m: Record<SoapLyeType, string> = {
    sodium_hydroxide_bar: "cold_process_saponify",
    potassium_hydroxide_liquid: "hot_process_liquid",
    dual_lye_blend: "cream_soap_blend",
    melt_pour_base: "melt_pour_premade",
    rebatch_grate_melt: "rebatch_hand_mill",
  };
  return m[t];
}

export function bestSoap(t: SoapLyeType): string {
  const m: Record<SoapLyeType, string> = {
    sodium_hydroxide_bar: "artisan_bar_swirl",
    potassium_hydroxide_liquid: "liquid_castile_pump",
    dual_lye_blend: "shaving_cream_lather",
    melt_pour_base: "decorative_embed_gift",
    rebatch_grate_melt: "rustic_confetti_bar",
  };
  return m[t];
}

export function soapLyes(): SoapLyeType[] {
  return ["sodium_hydroxide_bar", "potassium_hydroxide_liquid", "dual_lye_blend", "melt_pour_base", "rebatch_grate_melt"];
}

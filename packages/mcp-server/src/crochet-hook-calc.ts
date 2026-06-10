export type CrochetHookType = "aluminum_basic_smooth" | "ergonomic_rubber_grip" | "bamboo_warm_light" | "steel_lace_fine" | "interchangeable_set_case";

export function smoothness(t: CrochetHookType): number {
  const m: Record<CrochetHookType, number> = {
    aluminum_basic_smooth: 9, ergonomic_rubber_grip: 8, bamboo_warm_light: 6, steel_lace_fine: 10, interchangeable_set_case: 8,
  };
  return m[t];
}

export function comfort(t: CrochetHookType): number {
  const m: Record<CrochetHookType, number> = {
    aluminum_basic_smooth: 5, ergonomic_rubber_grip: 10, bamboo_warm_light: 7, steel_lace_fine: 4, interchangeable_set_case: 8,
  };
  return m[t];
}

export function sizeRange(t: CrochetHookType): number {
  const m: Record<CrochetHookType, number> = {
    aluminum_basic_smooth: 8, ergonomic_rubber_grip: 7, bamboo_warm_light: 6, steel_lace_fine: 9, interchangeable_set_case: 10,
  };
  return m[t];
}

export function durability(t: CrochetHookType): number {
  const m: Record<CrochetHookType, number> = {
    aluminum_basic_smooth: 9, ergonomic_rubber_grip: 7, bamboo_warm_light: 5, steel_lace_fine: 10, interchangeable_set_case: 8,
  };
  return m[t];
}

export function hookCost(t: CrochetHookType): number {
  const m: Record<CrochetHookType, number> = {
    aluminum_basic_smooth: 1, ergonomic_rubber_grip: 4, bamboo_warm_light: 3, steel_lace_fine: 2, interchangeable_set_case: 7,
  };
  return m[t];
}

export function inlineHook(t: CrochetHookType): boolean {
  const m: Record<CrochetHookType, boolean> = {
    aluminum_basic_smooth: true, ergonomic_rubber_grip: false, bamboo_warm_light: false, steel_lace_fine: true, interchangeable_set_case: false,
  };
  return m[t];
}

export function comesInSet(t: CrochetHookType): boolean {
  const m: Record<CrochetHookType, boolean> = {
    aluminum_basic_smooth: false, ergonomic_rubber_grip: false, bamboo_warm_light: false, steel_lace_fine: false, interchangeable_set_case: true,
  };
  return m[t];
}

export function shaftMaterial(t: CrochetHookType): string {
  const m: Record<CrochetHookType, string> = {
    aluminum_basic_smooth: "anodized_aluminum",
    ergonomic_rubber_grip: "aluminum_rubber_handle",
    bamboo_warm_light: "moso_bamboo_natural",
    steel_lace_fine: "nickel_plated_steel",
    interchangeable_set_case: "aluminum_snap_tip",
  };
  return m[t];
}

export function bestYarn(t: CrochetHookType): string {
  const m: Record<CrochetHookType, string> = {
    aluminum_basic_smooth: "acrylic_worsted_general",
    ergonomic_rubber_grip: "long_session_arthritis",
    bamboo_warm_light: "cotton_silk_slippery",
    steel_lace_fine: "thread_lace_doily",
    interchangeable_set_case: "multi_weight_variety",
  };
  return m[t];
}

export function crochetHooks(): CrochetHookType[] {
  return ["aluminum_basic_smooth", "ergonomic_rubber_grip", "bamboo_warm_light", "steel_lace_fine", "interchangeable_set_case"];
}

export type PatioChairType = "adirondack_wood" | "sling_aluminum" | "wicker_resin" | "folding_metal_bistro" | "zero_gravity_recline";

export function comfort(t: PatioChairType): number {
  const m: Record<PatioChairType, number> = {
    adirondack_wood: 8, sling_aluminum: 6, wicker_resin: 7, folding_metal_bistro: 5, zero_gravity_recline: 10,
  };
  return m[t];
}

export function durability(t: PatioChairType): number {
  const m: Record<PatioChairType, number> = {
    adirondack_wood: 7, sling_aluminum: 8, wicker_resin: 6, folding_metal_bistro: 7, zero_gravity_recline: 5,
  };
  return m[t];
}

export function stackability(t: PatioChairType): number {
  const m: Record<PatioChairType, number> = {
    adirondack_wood: 1, sling_aluminum: 8, wicker_resin: 4, folding_metal_bistro: 10, zero_gravity_recline: 3,
  };
  return m[t];
}

export function weatherResist(t: PatioChairType): number {
  const m: Record<PatioChairType, number> = {
    adirondack_wood: 5, sling_aluminum: 9, wicker_resin: 7, folding_metal_bistro: 8, zero_gravity_recline: 6,
  };
  return m[t];
}

export function chairCost(t: PatioChairType): number {
  const m: Record<PatioChairType, number> = {
    adirondack_wood: 6, sling_aluminum: 4, wicker_resin: 5, folding_metal_bistro: 3, zero_gravity_recline: 7,
  };
  return m[t];
}

export function foldable(t: PatioChairType): boolean {
  const m: Record<PatioChairType, boolean> = {
    adirondack_wood: false, sling_aluminum: false, wicker_resin: false, folding_metal_bistro: true, zero_gravity_recline: true,
  };
  return m[t];
}

export function hasArmrests(t: PatioChairType): boolean {
  const m: Record<PatioChairType, boolean> = {
    adirondack_wood: true, sling_aluminum: true, wicker_resin: true, folding_metal_bistro: false, zero_gravity_recline: true,
  };
  return m[t];
}

export function frameMaterial(t: PatioChairType): string {
  const m: Record<PatioChairType, string> = {
    adirondack_wood: "cedar_slat_contoured",
    sling_aluminum: "powder_coated_aluminum",
    wicker_resin: "pe_rattan_steel_frame",
    folding_metal_bistro: "wrought_iron_fold_flat",
    zero_gravity_recline: "textilene_mesh_steel",
  };
  return m[t];
}

export function bestSetting(t: PatioChairType): string {
  const m: Record<PatioChairType, string> = {
    adirondack_wood: "lakeside_deck_firepit",
    sling_aluminum: "pool_deck_quick_dry",
    wicker_resin: "covered_porch_dining",
    folding_metal_bistro: "small_balcony_cafe",
    zero_gravity_recline: "backyard_sun_lounging",
  };
  return m[t];
}

export function patioChairs(): PatioChairType[] {
  return ["adirondack_wood", "sling_aluminum", "wicker_resin", "folding_metal_bistro", "zero_gravity_recline"];
}

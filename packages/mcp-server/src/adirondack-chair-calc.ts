export type AdirondackChairType = "wood_cedar_classic" | "recycled_poly_hdpe" | "folding_portable_resin" | "oversized_wide_seat" | "rocker_curved_base";

export function comfort(t: AdirondackChairType): number {
  const m: Record<AdirondackChairType, number> = {
    wood_cedar_classic: 8, recycled_poly_hdpe: 9, folding_portable_resin: 6, oversized_wide_seat: 10, rocker_curved_base: 9,
  };
  return m[t];
}

export function durability(t: AdirondackChairType): number {
  const m: Record<AdirondackChairType, number> = {
    wood_cedar_classic: 7, recycled_poly_hdpe: 10, folding_portable_resin: 5, oversized_wide_seat: 8, rocker_curved_base: 7,
  };
  return m[t];
}

export function weatherResist(t: AdirondackChairType): number {
  const m: Record<AdirondackChairType, number> = {
    wood_cedar_classic: 6, recycled_poly_hdpe: 10, folding_portable_resin: 7, oversized_wide_seat: 6, rocker_curved_base: 6,
  };
  return m[t];
}

export function portability(t: AdirondackChairType): number {
  const m: Record<AdirondackChairType, number> = {
    wood_cedar_classic: 3, recycled_poly_hdpe: 3, folding_portable_resin: 9, oversized_wide_seat: 2, rocker_curved_base: 3,
  };
  return m[t];
}

export function chairCost(t: AdirondackChairType): number {
  const m: Record<AdirondackChairType, number> = {
    wood_cedar_classic: 6, recycled_poly_hdpe: 8, folding_portable_resin: 3, oversized_wide_seat: 7, rocker_curved_base: 7,
  };
  return m[t];
}

export function foldable(t: AdirondackChairType): boolean {
  const m: Record<AdirondackChairType, boolean> = {
    wood_cedar_classic: false, recycled_poly_hdpe: false, folding_portable_resin: true, oversized_wide_seat: false, rocker_curved_base: false,
  };
  return m[t];
}

export function rocks(t: AdirondackChairType): boolean {
  const m: Record<AdirondackChairType, boolean> = {
    wood_cedar_classic: false, recycled_poly_hdpe: false, folding_portable_resin: false, oversized_wide_seat: false, rocker_curved_base: true,
  };
  return m[t];
}

export function frameMaterial(t: AdirondackChairType): string {
  const m: Record<AdirondackChairType, string> = {
    wood_cedar_classic: "western_red_cedar",
    recycled_poly_hdpe: "recycled_hdpe_plastic",
    folding_portable_resin: "molded_resin_polyprop",
    oversized_wide_seat: "treated_hardwood_wide",
    rocker_curved_base: "cedar_curved_runner",
  };
  return m[t];
}

export function bestSpot(t: AdirondackChairType): string {
  const m: Record<AdirondackChairType, string> = {
    wood_cedar_classic: "porch_deck_lakefront",
    recycled_poly_hdpe: "pool_dock_all_weather",
    folding_portable_resin: "beach_camping_tailgate",
    oversized_wide_seat: "firepit_lounge_patio",
    rocker_curved_base: "porch_garden_sunset",
  };
  return m[t];
}

export function adirondackChairs(): AdirondackChairType[] {
  return ["wood_cedar_classic", "recycled_poly_hdpe", "folding_portable_resin", "oversized_wide_seat", "rocker_curved_base"];
}

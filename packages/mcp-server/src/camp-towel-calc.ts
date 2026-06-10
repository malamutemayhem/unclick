export type CampTowelType = "microfiber_quick_dry" | "chamois_synthetic_ultra" | "bamboo_blend_eco" | "linen_natural_pack" | "cotton_terry_comfort";

export function drySpeed(t: CampTowelType): number {
  const m: Record<CampTowelType, number> = {
    microfiber_quick_dry: 10, chamois_synthetic_ultra: 9, bamboo_blend_eco: 6, linen_natural_pack: 7, cotton_terry_comfort: 3,
  };
  return m[t];
}

export function absorbency(t: CampTowelType): number {
  const m: Record<CampTowelType, number> = {
    microfiber_quick_dry: 8, chamois_synthetic_ultra: 9, bamboo_blend_eco: 7, linen_natural_pack: 6, cotton_terry_comfort: 10,
  };
  return m[t];
}

export function packSize(t: CampTowelType): number {
  const m: Record<CampTowelType, number> = {
    microfiber_quick_dry: 9, chamois_synthetic_ultra: 10, bamboo_blend_eco: 6, linen_natural_pack: 7, cotton_terry_comfort: 3,
  };
  return m[t];
}

export function softness(t: CampTowelType): number {
  const m: Record<CampTowelType, number> = {
    microfiber_quick_dry: 7, chamois_synthetic_ultra: 5, bamboo_blend_eco: 9, linen_natural_pack: 6, cotton_terry_comfort: 10,
  };
  return m[t];
}

export function towelCost(t: CampTowelType): number {
  const m: Record<CampTowelType, number> = {
    microfiber_quick_dry: 1, chamois_synthetic_ultra: 2, bamboo_blend_eco: 2, linen_natural_pack: 2, cotton_terry_comfort: 1,
  };
  return m[t];
}

export function antiMicrobial(t: CampTowelType): boolean {
  const m: Record<CampTowelType, boolean> = {
    microfiber_quick_dry: true, chamois_synthetic_ultra: false, bamboo_blend_eco: true, linen_natural_pack: true, cotton_terry_comfort: false,
  };
  return m[t];
}

export function ecoFriendly(t: CampTowelType): boolean {
  const m: Record<CampTowelType, boolean> = {
    microfiber_quick_dry: false, chamois_synthetic_ultra: false, bamboo_blend_eco: true, linen_natural_pack: true, cotton_terry_comfort: true,
  };
  return m[t];
}

export function fiberType(t: CampTowelType): string {
  const m: Record<CampTowelType, string> = {
    microfiber_quick_dry: "split_polyester_nylon",
    chamois_synthetic_ultra: "pva_synthetic_chamois",
    bamboo_blend_eco: "bamboo_viscose_blend",
    linen_natural_pack: "flax_linen_weave",
    cotton_terry_comfort: "looped_terry_cotton",
  };
  return m[t];
}

export function bestTrip(t: CampTowelType): string {
  const m: Record<CampTowelType, string> = {
    microfiber_quick_dry: "backpacking_multi_day",
    chamois_synthetic_ultra: "swim_kayak_water_sport",
    bamboo_blend_eco: "eco_travel_hostel",
    linen_natural_pack: "european_travel_light",
    cotton_terry_comfort: "car_camp_cabin_stay",
  };
  return m[t];
}

export function campTowels(): CampTowelType[] {
  return ["microfiber_quick_dry", "chamois_synthetic_ultra", "bamboo_blend_eco", "linen_natural_pack", "cotton_terry_comfort"];
}

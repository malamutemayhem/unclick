export type BedSheetType = "cotton_percale_crisp" | "sateen_weave_silky" | "linen_flax_breathe" | "bamboo_lyocell_soft" | "microfiber_poly_budget";

export function softness(t: BedSheetType): number {
  const m: Record<BedSheetType, number> = {
    cotton_percale_crisp: 6, sateen_weave_silky: 9, linen_flax_breathe: 5, bamboo_lyocell_soft: 10, microfiber_poly_budget: 7,
  };
  return m[t];
}

export function breathability(t: BedSheetType): number {
  const m: Record<BedSheetType, number> = {
    cotton_percale_crisp: 9, sateen_weave_silky: 6, linen_flax_breathe: 10, bamboo_lyocell_soft: 8, microfiber_poly_budget: 4,
  };
  return m[t];
}

export function durability(t: BedSheetType): number {
  const m: Record<BedSheetType, number> = {
    cotton_percale_crisp: 8, sateen_weave_silky: 6, linen_flax_breathe: 10, bamboo_lyocell_soft: 5, microfiber_poly_budget: 7,
  };
  return m[t];
}

export function wrinkleResist(t: BedSheetType): number {
  const m: Record<BedSheetType, number> = {
    cotton_percale_crisp: 3, sateen_weave_silky: 7, linen_flax_breathe: 1, bamboo_lyocell_soft: 6, microfiber_poly_budget: 10,
  };
  return m[t];
}

export function sheetCost(t: BedSheetType): number {
  const m: Record<BedSheetType, number> = {
    cotton_percale_crisp: 5, sateen_weave_silky: 6, linen_flax_breathe: 8, bamboo_lyocell_soft: 7, microfiber_poly_budget: 2,
  };
  return m[t];
}

export function getsOfterWithWash(t: BedSheetType): boolean {
  const m: Record<BedSheetType, boolean> = {
    cotton_percale_crisp: true, sateen_weave_silky: false, linen_flax_breathe: true, bamboo_lyocell_soft: false, microfiber_poly_budget: false,
  };
  return m[t];
}

export function ecoFriendly(t: BedSheetType): boolean {
  const m: Record<BedSheetType, boolean> = {
    cotton_percale_crisp: false, sateen_weave_silky: false, linen_flax_breathe: true, bamboo_lyocell_soft: true, microfiber_poly_budget: false,
  };
  return m[t];
}

export function weaveType(t: BedSheetType): string {
  const m: Record<BedSheetType, string> = {
    cotton_percale_crisp: "one_over_one_under_plain",
    sateen_weave_silky: "four_over_one_under_satin",
    linen_flax_breathe: "plain_weave_flax_fiber",
    bamboo_lyocell_soft: "twill_weave_cellulose",
    microfiber_poly_budget: "brushed_polyester_tight",
  };
  return m[t];
}

export function bestSleeper(t: BedSheetType): string {
  const m: Record<BedSheetType, string> = {
    cotton_percale_crisp: "hot_sleeper_crisp_cool",
    sateen_weave_silky: "luxury_smooth_hotel_feel",
    linen_flax_breathe: "warm_climate_year_round",
    bamboo_lyocell_soft: "sensitive_skin_eco_minded",
    microfiber_poly_budget: "guest_room_easy_care",
  };
  return m[t];
}

export function bedSheets(): BedSheetType[] {
  return ["cotton_percale_crisp", "sateen_weave_silky", "linen_flax_breathe", "bamboo_lyocell_soft", "microfiber_poly_budget"];
}

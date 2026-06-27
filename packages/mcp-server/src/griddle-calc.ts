export type GriddleType = "electric_nonstick_flat" | "cast_iron_stovetop" | "outdoor_propane_large" | "reversible_grill_griddle" | "commercial_chrome_top";

export function heatEvenness(t: GriddleType): number {
  const m: Record<GriddleType, number> = {
    electric_nonstick_flat: 8, cast_iron_stovetop: 7, outdoor_propane_large: 6, reversible_grill_griddle: 7, commercial_chrome_top: 10,
  };
  return m[t];
}

export function cookingSurface(t: GriddleType): number {
  const m: Record<GriddleType, number> = {
    electric_nonstick_flat: 6, cast_iron_stovetop: 5, outdoor_propane_large: 10, reversible_grill_griddle: 7, commercial_chrome_top: 9,
  };
  return m[t];
}

export function heatRetention(t: GriddleType): number {
  const m: Record<GriddleType, number> = {
    electric_nonstick_flat: 5, cast_iron_stovetop: 10, outdoor_propane_large: 7, reversible_grill_griddle: 8, commercial_chrome_top: 9,
  };
  return m[t];
}

export function portability(t: GriddleType): number {
  const m: Record<GriddleType, number> = {
    electric_nonstick_flat: 7, cast_iron_stovetop: 4, outdoor_propane_large: 3, reversible_grill_griddle: 6, commercial_chrome_top: 2,
  };
  return m[t];
}

export function griddleCost(t: GriddleType): number {
  const m: Record<GriddleType, number> = {
    electric_nonstick_flat: 3, cast_iron_stovetop: 4, outdoor_propane_large: 6, reversible_grill_griddle: 5, commercial_chrome_top: 9,
  };
  return m[t];
}

export function greaseTrap(t: GriddleType): boolean {
  const m: Record<GriddleType, boolean> = {
    electric_nonstick_flat: true, cast_iron_stovetop: false, outdoor_propane_large: true, reversible_grill_griddle: true, commercial_chrome_top: true,
  };
  return m[t];
}

export function tempControl(t: GriddleType): boolean {
  const m: Record<GriddleType, boolean> = {
    electric_nonstick_flat: true, cast_iron_stovetop: false, outdoor_propane_large: true, reversible_grill_griddle: false, commercial_chrome_top: true,
  };
  return m[t];
}

export function surfaceMaterial(t: GriddleType): string {
  const m: Record<GriddleType, string> = {
    electric_nonstick_flat: "aluminum_nonstick_coated",
    cast_iron_stovetop: "seasoned_cast_iron",
    outdoor_propane_large: "cold_rolled_steel",
    reversible_grill_griddle: "cast_iron_dual_side",
    commercial_chrome_top: "chrome_plated_steel",
  };
  return m[t];
}

export function bestMeal(t: GriddleType): string {
  const m: Record<GriddleType, string> = {
    electric_nonstick_flat: "pancake_egg_breakfast",
    cast_iron_stovetop: "smash_burger_sear",
    outdoor_propane_large: "backyard_cookout_group",
    reversible_grill_griddle: "versatile_indoor_meal",
    commercial_chrome_top: "restaurant_diner_volume",
  };
  return m[t];
}

export function griddles(): GriddleType[] {
  return ["electric_nonstick_flat", "cast_iron_stovetop", "outdoor_propane_large", "reversible_grill_griddle", "commercial_chrome_top"];
}

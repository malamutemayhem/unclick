export type CoffeeBrew = "pour_over" | "french_press" | "aeropress" | "cold_brew" | "moka_pot";

export function flavorClarity(c: CoffeeBrew): number {
  const m: Record<CoffeeBrew, number> = {
    pour_over: 10, french_press: 5, aeropress: 8, cold_brew: 7, moka_pot: 6,
  };
  return m[c];
}

export function bodyFullness(c: CoffeeBrew): number {
  const m: Record<CoffeeBrew, number> = {
    pour_over: 4, french_press: 10, aeropress: 7, cold_brew: 8, moka_pot: 9,
  };
  return m[c];
}

export function brewTime(c: CoffeeBrew): number {
  const m: Record<CoffeeBrew, number> = {
    pour_over: 5, french_press: 5, aeropress: 8, cold_brew: 1, moka_pot: 6,
  };
  return m[c];
}

export function forgiveness(c: CoffeeBrew): number {
  const m: Record<CoffeeBrew, number> = {
    pour_over: 3, french_press: 9, aeropress: 8, cold_brew: 10, moka_pot: 5,
  };
  return m[c];
}

export function equipmentCost(c: CoffeeBrew): number {
  const m: Record<CoffeeBrew, number> = {
    pour_over: 3, french_press: 2, aeropress: 3, cold_brew: 2, moka_pot: 4,
  };
  return m[c];
}

export function usesFilter(c: CoffeeBrew): boolean {
  const m: Record<CoffeeBrew, boolean> = {
    pour_over: true, french_press: false, aeropress: true, cold_brew: true, moka_pot: false,
  };
  return m[c];
}

export function immersionMethod(c: CoffeeBrew): boolean {
  const m: Record<CoffeeBrew, boolean> = {
    pour_over: false, french_press: true, aeropress: true, cold_brew: true, moka_pot: false,
  };
  return m[c];
}

export function extractionStyle(c: CoffeeBrew): string {
  const m: Record<CoffeeBrew, string> = {
    pour_over: "gravity_drip_through_bed", french_press: "steep_plunge_metal_mesh",
    aeropress: "pressure_push_paper_filter", cold_brew: "long_steep_cold_water",
    moka_pot: "steam_pressure_stovetop",
  };
  return m[c];
}

export function bestFor(c: CoffeeBrew): string {
  const m: Record<CoffeeBrew, string> = {
    pour_over: "single_origin_light_roast", french_press: "bold_dark_roast_group",
    aeropress: "travel_versatile_experiment", cold_brew: "smooth_sweet_concentrate",
    moka_pot: "strong_stovetop_espresso_style",
  };
  return m[c];
}

export function coffeeBrews(): CoffeeBrew[] {
  return ["pour_over", "french_press", "aeropress", "cold_brew", "moka_pot"];
}

export type CoffeeRoast = "light" | "medium" | "medium_dark" | "dark" | "espresso";

export function roastTempCelsius(roast: CoffeeRoast): number {
  const m: Record<CoffeeRoast, number> = {
    light: 196, medium: 210, medium_dark: 225, dark: 240, espresso: 245,
  };
  return m[roast];
}

export function caffeineContentMg(roast: CoffeeRoast): number {
  const m: Record<CoffeeRoast, number> = {
    light: 95, medium: 90, medium_dark: 85, dark: 80, espresso: 63,
  };
  return m[roast];
}

export function acidity(roast: CoffeeRoast): number {
  const m: Record<CoffeeRoast, number> = {
    light: 9, medium: 7, medium_dark: 5, dark: 3, espresso: 4,
  };
  return m[roast];
}

export function bodyFullness(roast: CoffeeRoast): number {
  const m: Record<CoffeeRoast, number> = {
    light: 3, medium: 5, medium_dark: 7, dark: 9, espresso: 10,
  };
  return m[roast];
}

export function bitterness(roast: CoffeeRoast): number {
  const m: Record<CoffeeRoast, number> = {
    light: 2, medium: 4, medium_dark: 6, dark: 8, espresso: 9,
  };
  return m[roast];
}

export function oilOnSurface(roast: CoffeeRoast): boolean {
  const m: Record<CoffeeRoast, boolean> = {
    light: false, medium: false, medium_dark: true, dark: true, espresso: true,
  };
  return m[roast];
}

export function originFlavorRetained(roast: CoffeeRoast): boolean {
  const m: Record<CoffeeRoast, boolean> = {
    light: true, medium: true, medium_dark: false, dark: false, espresso: false,
  };
  return m[roast];
}

export function bestBrewMethod(roast: CoffeeRoast): string {
  const m: Record<CoffeeRoast, string> = {
    light: "pour_over", medium: "drip", medium_dark: "french_press",
    dark: "cold_brew", espresso: "espresso_machine",
  };
  return m[roast];
}

export function flavorNotes(roast: CoffeeRoast): string {
  const m: Record<CoffeeRoast, string> = {
    light: "fruity_floral", medium: "balanced_sweet", medium_dark: "chocolate_caramel",
    dark: "smoky_bold", espresso: "intense_crema",
  };
  return m[roast];
}

export function coffeeRoasts(): CoffeeRoast[] {
  return ["light", "medium", "medium_dark", "dark", "espresso"];
}

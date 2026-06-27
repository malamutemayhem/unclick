export type KojiProduct = "miso" | "soy_sauce" | "sake" | "amazake" | "shio_koji";

export function fermentationDays(product: KojiProduct): number {
  const f: Record<KojiProduct, number> = {
    miso: 180, soy_sauce: 365, sake: 30, amazake: 1, shio_koji: 7,
  };
  return f[product];
}

export function tempCelsius(product: KojiProduct): number {
  const t: Record<KojiProduct, number> = {
    miso: 25, soy_sauce: 25, sake: 15, amazake: 60, shio_koji: 20,
  };
  return t[product];
}

export function saltPercent(product: KojiProduct): number {
  const s: Record<KojiProduct, number> = {
    miso: 12, soy_sauce: 18, sake: 0, amazake: 0, shio_koji: 13,
  };
  return s[product];
}

export function umamiLevel(product: KojiProduct): number {
  const u: Record<KojiProduct, number> = {
    miso: 9, soy_sauce: 10, sake: 3, amazake: 2, shio_koji: 7,
  };
  return u[product];
}

export function enzymeActivity(product: KojiProduct): number {
  const e: Record<KojiProduct, number> = {
    miso: 6, soy_sauce: 7, sake: 10, amazake: 9, shio_koji: 8,
  };
  return e[product];
}

export function grainSubstrate(product: KojiProduct): string {
  const g: Record<KojiProduct, string> = {
    miso: "soybeans", soy_sauce: "wheat_soy", sake: "rice",
    amazake: "rice", shio_koji: "rice",
  };
  return g[product];
}

export function alcoholic(product: KojiProduct): boolean {
  const a: Record<KojiProduct, boolean> = {
    miso: false, soy_sauce: false, sake: true, amazake: false, shio_koji: false,
  };
  return a[product];
}

export function shelfLifeMonths(product: KojiProduct): number {
  const s: Record<KojiProduct, number> = {
    miso: 24, soy_sauce: 36, sake: 12, amazake: 1, shio_koji: 3,
  };
  return s[product];
}

export function costPerKg(product: KojiProduct): number {
  const c: Record<KojiProduct, number> = {
    miso: 15, soy_sauce: 20, sake: 25, amazake: 8, shio_koji: 12,
  };
  return c[product];
}

export function kojiProducts(): KojiProduct[] {
  return ["miso", "soy_sauce", "sake", "amazake", "shio_koji"];
}

export type GrapeVariety = "cabernet_sauvignon" | "pinot_noir" | "chardonnay" | "riesling" | "syrah";

export function tanninLevel(g: GrapeVariety): number {
  const m: Record<GrapeVariety, number> = {
    cabernet_sauvignon: 10, pinot_noir: 5, chardonnay: 2, riesling: 1, syrah: 8,
  };
  return m[g];
}

export function acidityLevel(g: GrapeVariety): number {
  const m: Record<GrapeVariety, number> = {
    cabernet_sauvignon: 6, pinot_noir: 7, chardonnay: 5, riesling: 10, syrah: 5,
  };
  return m[g];
}

export function bodyWeight(g: GrapeVariety): number {
  const m: Record<GrapeVariety, number> = {
    cabernet_sauvignon: 10, pinot_noir: 5, chardonnay: 7, riesling: 3, syrah: 9,
  };
  return m[g];
}

export function agingPotentialYears(g: GrapeVariety): number {
  const m: Record<GrapeVariety, number> = {
    cabernet_sauvignon: 20, pinot_noir: 15, chardonnay: 8, riesling: 25, syrah: 18,
  };
  return m[g];
}

export function globalAcreage(g: GrapeVariety): number {
  const m: Record<GrapeVariety, number> = {
    cabernet_sauvignon: 10, pinot_noir: 6, chardonnay: 9, riesling: 4, syrah: 7,
  };
  return m[g];
}

export function isRed(g: GrapeVariety): boolean {
  const m: Record<GrapeVariety, boolean> = {
    cabernet_sauvignon: true, pinot_noir: true, chardonnay: false, riesling: false, syrah: true,
  };
  return m[g];
}

export function coldClimateAdapted(g: GrapeVariety): boolean {
  const m: Record<GrapeVariety, boolean> = {
    cabernet_sauvignon: false, pinot_noir: true, chardonnay: true, riesling: true, syrah: false,
  };
  return m[g];
}

export function classicRegion(g: GrapeVariety): string {
  const m: Record<GrapeVariety, string> = {
    cabernet_sauvignon: "bordeaux_napa", pinot_noir: "burgundy_oregon",
    chardonnay: "burgundy_california", riesling: "alsace_mosel",
    syrah: "rhone_barossa",
  };
  return m[g];
}

export function flavorProfile(g: GrapeVariety): string {
  const m: Record<GrapeVariety, string> = {
    cabernet_sauvignon: "blackcurrant_cedar", pinot_noir: "cherry_earthy",
    chardonnay: "apple_butter", riesling: "citrus_petrol",
    syrah: "blackberry_pepper",
  };
  return m[g];
}

export function grapeVarieties(): GrapeVariety[] {
  return ["cabernet_sauvignon", "pinot_noir", "chardonnay", "riesling", "syrah"];
}

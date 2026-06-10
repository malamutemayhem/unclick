export type TinctureMethod = "alcohol_maceration" | "glycerin" | "vinegar" | "double_extraction" | "percolation";

export function extractionDays(method: TinctureMethod): number {
  const m: Record<TinctureMethod, number> = {
    alcohol_maceration: 28, glycerin: 42, vinegar: 21, double_extraction: 56, percolation: 3,
  };
  return m[method];
}

export function potency(method: TinctureMethod): number {
  const m: Record<TinctureMethod, number> = {
    alcohol_maceration: 9, glycerin: 5, vinegar: 4, double_extraction: 10, percolation: 7,
  };
  return m[method];
}

export function shelfLifeYears(method: TinctureMethod): number {
  const m: Record<TinctureMethod, number> = {
    alcohol_maceration: 5, glycerin: 2, vinegar: 1, double_extraction: 5, percolation: 4,
  };
  return m[method];
}

export function tasteAcceptability(method: TinctureMethod): number {
  const m: Record<TinctureMethod, number> = {
    alcohol_maceration: 4, glycerin: 8, vinegar: 5, double_extraction: 3, percolation: 5,
  };
  return m[method];
}

export function bioavailability(method: TinctureMethod): number {
  const m: Record<TinctureMethod, number> = {
    alcohol_maceration: 8, glycerin: 6, vinegar: 5, double_extraction: 9, percolation: 7,
  };
  return m[method];
}

export function alcoholFree(method: TinctureMethod): boolean {
  const m: Record<TinctureMethod, boolean> = {
    alcohol_maceration: false, glycerin: true, vinegar: true, double_extraction: false, percolation: false,
  };
  return m[method];
}

export function childSafe(method: TinctureMethod): boolean {
  const m: Record<TinctureMethod, boolean> = {
    alcohol_maceration: false, glycerin: true, vinegar: true, double_extraction: false, percolation: false,
  };
  return m[method];
}

export function bestHerb(method: TinctureMethod): string {
  const m: Record<TinctureMethod, string> = {
    alcohol_maceration: "echinacea", glycerin: "chamomile", vinegar: "garlic",
    double_extraction: "reishi_mushroom", percolation: "goldenseal",
  };
  return m[method];
}

export function costPerBottle(method: TinctureMethod): number {
  const m: Record<TinctureMethod, number> = {
    alcohol_maceration: 12, glycerin: 15, vinegar: 8, double_extraction: 20, percolation: 10,
  };
  return m[method];
}

export function tinctureMethods(): TinctureMethod[] {
  return ["alcohol_maceration", "glycerin", "vinegar", "double_extraction", "percolation"];
}

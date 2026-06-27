export type CottonVariety = "pima" | "egyptian" | "upland" | "sea_island" | "organic";

export function stapleLengthMm(variety: CottonVariety): number {
  const s: Record<CottonVariety, number> = {
    pima: 38, egyptian: 40, upland: 28, sea_island: 50, organic: 30,
  };
  return s[variety];
}

export function softnessRating(variety: CottonVariety): number {
  const r: Record<CottonVariety, number> = {
    pima: 9, egyptian: 10, upland: 5, sea_island: 10, organic: 6,
  };
  return r[variety];
}

export function strengthGPerTex(variety: CottonVariety): number {
  const s: Record<CottonVariety, number> = {
    pima: 32, egyptian: 35, upland: 25, sea_island: 38, organic: 24,
  };
  return s[variety];
}

export function absorbencyPercent(variety: CottonVariety): number {
  const a: Record<CottonVariety, number> = {
    pima: 27, egyptian: 28, upland: 24, sea_island: 30, organic: 26,
  };
  return a[variety];
}

export function pillResistance(variety: CottonVariety): number {
  const p: Record<CottonVariety, number> = {
    pima: 8, egyptian: 9, upland: 4, sea_island: 10, organic: 5,
  };
  return p[variety];
}

export function luster(variety: CottonVariety): number {
  const l: Record<CottonVariety, number> = {
    pima: 8, egyptian: 9, upland: 4, sea_island: 10, organic: 5,
  };
  return l[variety];
}

export function pesticidesUsed(variety: CottonVariety): boolean {
  const p: Record<CottonVariety, boolean> = {
    pima: true, egyptian: true, upland: true, sea_island: true, organic: false,
  };
  return p[variety];
}

export function bestProduct(variety: CottonVariety): string {
  const b: Record<CottonVariety, string> = {
    pima: "dress_shirts", egyptian: "luxury_sheets", upland: "t_shirts",
    sea_island: "fine_underwear", organic: "baby_clothing",
  };
  return b[variety];
}

export function costPerKg(variety: CottonVariety): number {
  const c: Record<CottonVariety, number> = {
    pima: 8, egyptian: 12, upland: 3, sea_island: 25, organic: 6,
  };
  return c[variety];
}

export function cottonVarieties(): CottonVariety[] {
  return ["pima", "egyptian", "upland", "sea_island", "organic"];
}

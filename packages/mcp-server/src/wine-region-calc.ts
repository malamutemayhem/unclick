export type WineRegion = "bordeaux" | "burgundy" | "napa" | "barossa" | "tuscany";

export function avgTempC(w: WineRegion): number {
  const m: Record<WineRegion, number> = {
    bordeaux: 14, burgundy: 11, napa: 16, barossa: 18, tuscany: 15,
  };
  return m[w];
}

export function prestigeScore(w: WineRegion): number {
  const m: Record<WineRegion, number> = {
    bordeaux: 10, burgundy: 10, napa: 8, barossa: 7, tuscany: 9,
  };
  return m[w];
}

export function priceRange(w: WineRegion): number {
  const m: Record<WineRegion, number> = {
    bordeaux: 10, burgundy: 10, napa: 9, barossa: 6, tuscany: 8,
  };
  return m[w];
}

export function hectaresUnderVine(w: WineRegion): number {
  const m: Record<WineRegion, number> = {
    bordeaux: 10, burgundy: 5, napa: 4, barossa: 3, tuscany: 6,
  };
  return m[w];
}

export function vintageVariation(w: WineRegion): number {
  const m: Record<WineRegion, number> = {
    bordeaux: 8, burgundy: 9, napa: 3, barossa: 4, tuscany: 6,
  };
  return m[w];
}

export function oldWorldRegion(w: WineRegion): boolean {
  const m: Record<WineRegion, boolean> = {
    bordeaux: true, burgundy: true, napa: false, barossa: false, tuscany: true,
  };
  return m[w];
}

export function blendingTradition(w: WineRegion): boolean {
  const m: Record<WineRegion, boolean> = {
    bordeaux: true, burgundy: false, napa: true, barossa: true, tuscany: true,
  };
  return m[w];
}

export function signatureGrape(w: WineRegion): string {
  const m: Record<WineRegion, string> = {
    bordeaux: "cabernet_merlot", burgundy: "pinot_noir_chardonnay",
    napa: "cabernet_sauvignon", barossa: "shiraz",
    tuscany: "sangiovese",
  };
  return m[w];
}

export function classificationSystem(w: WineRegion): string {
  const m: Record<WineRegion, string> = {
    bordeaux: "grand_cru_classe", burgundy: "premier_grand_cru",
    napa: "ava_system", barossa: "old_vine_charter",
    tuscany: "docg_doc",
  };
  return m[w];
}

export function wineRegions(): WineRegion[] {
  return ["bordeaux", "burgundy", "napa", "barossa", "tuscany"];
}

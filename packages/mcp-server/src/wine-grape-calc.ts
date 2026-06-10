export type WineGrape = "cabernet_sauvignon" | "pinot_noir" | "chardonnay" | "riesling" | "merlot";

export function tanninLevel(grape: WineGrape): number {
  const m: Record<WineGrape, number> = {
    cabernet_sauvignon: 10, pinot_noir: 4, chardonnay: 1, riesling: 1, merlot: 6,
  };
  return m[grape];
}

export function acidityLevel(grape: WineGrape): number {
  const m: Record<WineGrape, number> = {
    cabernet_sauvignon: 6, pinot_noir: 7, chardonnay: 6, riesling: 10, merlot: 5,
  };
  return m[grape];
}

export function bodyWeight(grape: WineGrape): number {
  const m: Record<WineGrape, number> = {
    cabernet_sauvignon: 10, pinot_noir: 5, chardonnay: 7, riesling: 3, merlot: 7,
  };
  return m[grape];
}

export function agingPotentialYears(grape: WineGrape): number {
  const m: Record<WineGrape, number> = {
    cabernet_sauvignon: 30, pinot_noir: 15, chardonnay: 10, riesling: 20, merlot: 12,
  };
  return m[grape];
}

export function idealServingTempC(grape: WineGrape): number {
  const m: Record<WineGrape, number> = {
    cabernet_sauvignon: 18, pinot_noir: 16, chardonnay: 12, riesling: 8, merlot: 17,
  };
  return m[grape];
}

export function red(grape: WineGrape): boolean {
  const m: Record<WineGrape, boolean> = {
    cabernet_sauvignon: true, pinot_noir: true, chardonnay: false, riesling: false, merlot: true,
  };
  return m[grape];
}

export function aromaticVariety(grape: WineGrape): boolean {
  const m: Record<WineGrape, boolean> = {
    cabernet_sauvignon: false, pinot_noir: false, chardonnay: false, riesling: true, merlot: false,
  };
  return m[grape];
}

export function bestRegion(grape: WineGrape): string {
  const m: Record<WineGrape, string> = {
    cabernet_sauvignon: "bordeaux", pinot_noir: "burgundy", chardonnay: "burgundy",
    riesling: "mosel", merlot: "bordeaux",
  };
  return m[grape];
}

export function foodPairing(grape: WineGrape): string {
  const m: Record<WineGrape, string> = {
    cabernet_sauvignon: "red_meat", pinot_noir: "duck", chardonnay: "seafood",
    riesling: "spicy_food", merlot: "pasta",
  };
  return m[grape];
}

export function wineGrapes(): WineGrape[] {
  return ["cabernet_sauvignon", "pinot_noir", "chardonnay", "riesling", "merlot"];
}

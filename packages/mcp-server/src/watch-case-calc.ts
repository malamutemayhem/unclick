export type WatchCase = "stainless_steel" | "titanium" | "gold" | "ceramic" | "carbon_fiber";

export function weightRating(c: WatchCase): number {
  const m: Record<WatchCase, number> = {
    stainless_steel: 7, titanium: 4, gold: 9, ceramic: 5, carbon_fiber: 2,
  };
  return m[c];
}

export function corrosionResistance(c: WatchCase): number {
  const m: Record<WatchCase, number> = {
    stainless_steel: 7, titanium: 9, gold: 10, ceramic: 10, carbon_fiber: 8,
  };
  return m[c];
}

export function scratchResistance(c: WatchCase): number {
  const m: Record<WatchCase, number> = {
    stainless_steel: 6, titanium: 5, gold: 3, ceramic: 10, carbon_fiber: 7,
  };
  return m[c];
}

export function priceLevel(c: WatchCase): number {
  const m: Record<WatchCase, number> = {
    stainless_steel: 4, titanium: 6, gold: 10, ceramic: 7, carbon_fiber: 8,
  };
  return m[c];
}

export function allergyFriendly(c: WatchCase): number {
  const m: Record<WatchCase, number> = {
    stainless_steel: 6, titanium: 10, gold: 9, ceramic: 10, carbon_fiber: 9,
  };
  return m[c];
}

export function magneticResistant(c: WatchCase): boolean {
  const m: Record<WatchCase, boolean> = {
    stainless_steel: false, titanium: true, gold: true, ceramic: true, carbon_fiber: true,
  };
  return m[c];
}

export function preciousMetal(c: WatchCase): boolean {
  const m: Record<WatchCase, boolean> = {
    stainless_steel: false, titanium: false, gold: true, ceramic: false, carbon_fiber: false,
  };
  return m[c];
}

export function finishOptions(c: WatchCase): string {
  const m: Record<WatchCase, string> = {
    stainless_steel: "brushed_polished_pvd", titanium: "brushed_blasted_dlc",
    gold: "polished_satin_engraved", ceramic: "matte_polished",
    carbon_fiber: "forged_woven_matte",
  };
  return m[c];
}

export function typicalBrand(c: WatchCase): string {
  const m: Record<WatchCase, string> = {
    stainless_steel: "rolex_omega_seiko", titanium: "citizen_breitling_panerai",
    gold: "patek_philippe_audemars", ceramic: "rado_chanel_omega",
    carbon_fiber: "richard_mille_hublot",
  };
  return m[c];
}

export function watchCases(): WatchCase[] {
  return ["stainless_steel", "titanium", "gold", "ceramic", "carbon_fiber"];
}

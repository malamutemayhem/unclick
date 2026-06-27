export type WineGlassType = "bordeaux_tall_bowl" | "burgundy_wide_round" | "universal_all_purpose" | "stemless_casual" | "crystal_lead_free";

export function aromaRelease(t: WineGlassType): number {
  const m: Record<WineGlassType, number> = {
    bordeaux_tall_bowl: 8, burgundy_wide_round: 10, universal_all_purpose: 7, stemless_casual: 5, crystal_lead_free: 9,
  };
  return m[t];
}

export function tipability(t: WineGlassType): number {
  const m: Record<WineGlassType, number> = {
    bordeaux_tall_bowl: 4, burgundy_wide_round: 3, universal_all_purpose: 5, stemless_casual: 10, crystal_lead_free: 4,
  };
  return m[t];
}

export function elegance(t: WineGlassType): number {
  const m: Record<WineGlassType, number> = {
    bordeaux_tall_bowl: 9, burgundy_wide_round: 9, universal_all_purpose: 6, stemless_casual: 4, crystal_lead_free: 10,
  };
  return m[t];
}

export function dishwasherSafe(t: WineGlassType): number {
  const m: Record<WineGlassType, number> = {
    bordeaux_tall_bowl: 5, burgundy_wide_round: 4, universal_all_purpose: 7, stemless_casual: 10, crystal_lead_free: 3,
  };
  return m[t];
}

export function glassCost(t: WineGlassType): number {
  const m: Record<WineGlassType, number> = {
    bordeaux_tall_bowl: 6, burgundy_wide_round: 7, universal_all_purpose: 3, stemless_casual: 2, crystal_lead_free: 9,
  };
  return m[t];
}

export function hasStem(t: WineGlassType): boolean {
  const m: Record<WineGlassType, boolean> = {
    bordeaux_tall_bowl: true, burgundy_wide_round: true, universal_all_purpose: true, stemless_casual: false, crystal_lead_free: true,
  };
  return m[t];
}

export function breakResistant(t: WineGlassType): boolean {
  const m: Record<WineGlassType, boolean> = {
    bordeaux_tall_bowl: false, burgundy_wide_round: false, universal_all_purpose: false, stemless_casual: true, crystal_lead_free: false,
  };
  return m[t];
}

export function glassMaterial(t: WineGlassType): string {
  const m: Record<WineGlassType, string> = {
    bordeaux_tall_bowl: "machine_blown_crystal",
    burgundy_wide_round: "thin_wall_crystal",
    universal_all_purpose: "soda_lime_glass",
    stemless_casual: "tempered_glass_thick",
    crystal_lead_free: "titanium_crystal_hand",
  };
  return m[t];
}

export function bestWine(t: WineGlassType): string {
  const m: Record<WineGlassType, string> = {
    bordeaux_tall_bowl: "cabernet_merlot_bold",
    burgundy_wide_round: "pinot_noir_nebbiolo",
    universal_all_purpose: "everyday_red_white",
    stemless_casual: "patio_party_informal",
    crystal_lead_free: "fine_dining_sommelier",
  };
  return m[t];
}

export function wineGlasses(): WineGlassType[] {
  return ["bordeaux_tall_bowl", "burgundy_wide_round", "universal_all_purpose", "stemless_casual", "crystal_lead_free"];
}

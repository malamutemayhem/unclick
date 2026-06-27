export type OutdoorRugType = "polypropylene_flat" | "recycled_plastic" | "natural_jute" | "bamboo_slat" | "rubber_backed_fade";

export function weatherResistance(t: OutdoorRugType): number {
  const m: Record<OutdoorRugType, number> = {
    polypropylene_flat: 9, recycled_plastic: 10, natural_jute: 4, bamboo_slat: 6, rubber_backed_fade: 8,
  };
  return m[t];
}

export function softness(t: OutdoorRugType): number {
  const m: Record<OutdoorRugType, number> = {
    polypropylene_flat: 6, recycled_plastic: 5, natural_jute: 8, bamboo_slat: 3, rubber_backed_fade: 7,
  };
  return m[t];
}

export function cleanability(t: OutdoorRugType): number {
  const m: Record<OutdoorRugType, number> = {
    polypropylene_flat: 9, recycled_plastic: 10, natural_jute: 4, bamboo_slat: 7, rubber_backed_fade: 8,
  };
  return m[t];
}

export function ecoFriendly(t: OutdoorRugType): number {
  const m: Record<OutdoorRugType, number> = {
    polypropylene_flat: 3, recycled_plastic: 10, natural_jute: 9, bamboo_slat: 8, rubber_backed_fade: 4,
  };
  return m[t];
}

export function rugCost(t: OutdoorRugType): number {
  const m: Record<OutdoorRugType, number> = {
    polypropylene_flat: 4, recycled_plastic: 6, natural_jute: 5, bamboo_slat: 7, rubber_backed_fade: 5,
  };
  return m[t];
}

export function moldResistant(t: OutdoorRugType): boolean {
  const m: Record<OutdoorRugType, boolean> = {
    polypropylene_flat: true, recycled_plastic: true, natural_jute: false, bamboo_slat: true, rubber_backed_fade: true,
  };
  return m[t];
}

export function reversible(t: OutdoorRugType): boolean {
  const m: Record<OutdoorRugType, boolean> = {
    polypropylene_flat: true, recycled_plastic: true, natural_jute: false, bamboo_slat: false, rubber_backed_fade: false,
  };
  return m[t];
}

export function fiberMaterial(t: OutdoorRugType): string {
  const m: Record<OutdoorRugType, string> = {
    polypropylene_flat: "uv_stabilized_poly",
    recycled_plastic: "pet_bottle_woven",
    natural_jute: "raw_jute_sisal_blend",
    bamboo_slat: "split_bamboo_cotton_border",
    rubber_backed_fade: "solution_dyed_acrylic",
  };
  return m[t];
}

export function bestSpace(t: OutdoorRugType): string {
  const m: Record<OutdoorRugType, string> = {
    polypropylene_flat: "patio_deck_high_traffic",
    recycled_plastic: "poolside_beach_camp",
    natural_jute: "covered_porch_dry",
    bamboo_slat: "zen_garden_meditation",
    rubber_backed_fade: "entryway_mudroom_step",
  };
  return m[t];
}

export function outdoorRugs(): OutdoorRugType[] {
  return ["polypropylene_flat", "recycled_plastic", "natural_jute", "bamboo_slat", "rubber_backed_fade"];
}

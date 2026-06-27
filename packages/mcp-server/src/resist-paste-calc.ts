export type ResistPasteType = "gutta_rubber_clear" | "water_based_wash" | "wax_resist_hot" | "flour_paste_trad" | "soy_wax_cold";

export function lineSharp(t: ResistPasteType): number {
  const m: Record<ResistPasteType, number> = {
    gutta_rubber_clear: 10, water_based_wash: 6, wax_resist_hot: 7, flour_paste_trad: 4, soy_wax_cold: 5,
  };
  return m[t];
}

export function removeEase(t: ResistPasteType): number {
  const m: Record<ResistPasteType, number> = {
    gutta_rubber_clear: 6, water_based_wash: 10, wax_resist_hot: 4, flour_paste_trad: 8, soy_wax_cold: 7,
  };
  return m[t];
}

export function coverage(t: ResistPasteType): number {
  const m: Record<ResistPasteType, number> = {
    gutta_rubber_clear: 5, water_based_wash: 7, wax_resist_hot: 9, flour_paste_trad: 8, soy_wax_cold: 10,
  };
  return m[t];
}

export function dyeBlock(t: ResistPasteType): number {
  const m: Record<ResistPasteType, number> = {
    gutta_rubber_clear: 10, water_based_wash: 6, wax_resist_hot: 9, flour_paste_trad: 7, soy_wax_cold: 8,
  };
  return m[t];
}

export function pasteCost(t: ResistPasteType): number {
  const m: Record<ResistPasteType, number> = {
    gutta_rubber_clear: 2, water_based_wash: 1, wax_resist_hot: 1, flour_paste_trad: 1, soy_wax_cold: 2,
  };
  return m[t];
}

export function washable(t: ResistPasteType): boolean {
  const m: Record<ResistPasteType, boolean> = {
    gutta_rubber_clear: false, water_based_wash: true, wax_resist_hot: false, flour_paste_trad: true, soy_wax_cold: true,
  };
  return m[t];
}

export function needsHeat(t: ResistPasteType): boolean {
  const m: Record<ResistPasteType, boolean> = {
    gutta_rubber_clear: false, water_based_wash: false, wax_resist_hot: true, flour_paste_trad: false, soy_wax_cold: false,
  };
  return m[t];
}

export function baseIngredient(t: ResistPasteType): string {
  const m: Record<ResistPasteType, string> = {
    gutta_rubber_clear: "natural_rubber_latex",
    water_based_wash: "acrylic_polymer_base",
    wax_resist_hot: "paraffin_beeswax_blend",
    flour_paste_trad: "rice_flour_starch",
    soy_wax_cold: "hydrogenated_soy_wax",
  };
  return m[t];
}

export function bestUse(t: ResistPasteType): string {
  const m: Record<ResistPasteType, string> = {
    gutta_rubber_clear: "silk_paint_outline",
    water_based_wash: "easy_clean_resist",
    wax_resist_hot: "batik_hot_wax",
    flour_paste_trad: "katazome_stencil",
    soy_wax_cold: "cold_wax_batik",
  };
  return m[t];
}

export function resistPastes(): ResistPasteType[] {
  return ["gutta_rubber_clear", "water_based_wash", "wax_resist_hot", "flour_paste_trad", "soy_wax_cold"];
}

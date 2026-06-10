export type PaintPaletteType = "wooden_traditional_oval" | "plastic_stay_wet" | "ceramic_mixing_tile" | "disposable_tear_pad" | "glass_tempered_flat";

export function mixingArea(t: PaintPaletteType): number {
  const m: Record<PaintPaletteType, number> = {
    wooden_traditional_oval: 7, plastic_stay_wet: 9, ceramic_mixing_tile: 6, disposable_tear_pad: 8, glass_tempered_flat: 10,
  };
  return m[t];
}

export function paintFresh(t: PaintPaletteType): number {
  const m: Record<PaintPaletteType, number> = {
    wooden_traditional_oval: 4, plastic_stay_wet: 10, ceramic_mixing_tile: 5, disposable_tear_pad: 3, glass_tempered_flat: 5,
  };
  return m[t];
}

export function cleanEase(t: PaintPaletteType): number {
  const m: Record<PaintPaletteType, number> = {
    wooden_traditional_oval: 4, plastic_stay_wet: 7, ceramic_mixing_tile: 9, disposable_tear_pad: 10, glass_tempered_flat: 8,
  };
  return m[t];
}

export function durability(t: PaintPaletteType): number {
  const m: Record<PaintPaletteType, number> = {
    wooden_traditional_oval: 8, plastic_stay_wet: 6, ceramic_mixing_tile: 9, disposable_tear_pad: 1, glass_tempered_flat: 10,
  };
  return m[t];
}

export function paletteCost(t: PaintPaletteType): number {
  const m: Record<PaintPaletteType, number> = {
    wooden_traditional_oval: 5, plastic_stay_wet: 6, ceramic_mixing_tile: 7, disposable_tear_pad: 3, glass_tempered_flat: 8,
  };
  return m[t];
}

export function hasLid(t: PaintPaletteType): boolean {
  const m: Record<PaintPaletteType, boolean> = {
    wooden_traditional_oval: false, plastic_stay_wet: true, ceramic_mixing_tile: false, disposable_tear_pad: false, glass_tempered_flat: false,
  };
  return m[t];
}

export function nonAbsorbent(t: PaintPaletteType): boolean {
  const m: Record<PaintPaletteType, boolean> = {
    wooden_traditional_oval: false, plastic_stay_wet: true, ceramic_mixing_tile: true, disposable_tear_pad: true, glass_tempered_flat: true,
  };
  return m[t];
}

export function paletteMaterial(t: PaintPaletteType): string {
  const m: Record<PaintPaletteType, string> = {
    wooden_traditional_oval: "sealed_birch_thumb_hole",
    plastic_stay_wet: "polypropylene_sponge_liner",
    ceramic_mixing_tile: "glazed_porcelain_wells",
    disposable_tear_pad: "coated_paper_stack_pad",
    glass_tempered_flat: "tempered_safety_glass_flat",
  };
  return m[t];
}

export function bestMedium(t: PaintPaletteType): string {
  const m: Record<PaintPaletteType, string> = {
    wooden_traditional_oval: "oil_paint_classic_studio",
    plastic_stay_wet: "acrylic_slow_dry_session",
    ceramic_mixing_tile: "watercolor_ink_porcelain",
    disposable_tear_pad: "quick_session_easy_cleanup",
    glass_tempered_flat: "all_media_color_accurate",
  };
  return m[t];
}

export function paintPalettes(): PaintPaletteType[] {
  return ["wooden_traditional_oval", "plastic_stay_wet", "ceramic_mixing_tile", "disposable_tear_pad", "glass_tempered_flat"];
}

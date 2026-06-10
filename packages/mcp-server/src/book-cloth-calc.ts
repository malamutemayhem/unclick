export type BookClothType = "buckram_starch_stiff" | "linen_natural_weave" | "japanese_tissue_wrap" | "cotton_canvas_print" | "silk_shantung_lux";

export function durability(t: BookClothType): number {
  const m: Record<BookClothType, number> = {
    buckram_starch_stiff: 10, linen_natural_weave: 8, japanese_tissue_wrap: 4, cotton_canvas_print: 7, silk_shantung_lux: 5,
  };
  return m[t];
}

export function foldClean(t: BookClothType): number {
  const m: Record<BookClothType, number> = {
    buckram_starch_stiff: 9, linen_natural_weave: 7, japanese_tissue_wrap: 10, cotton_canvas_print: 6, silk_shantung_lux: 8,
  };
  return m[t];
}

export function printAccept(t: BookClothType): number {
  const m: Record<BookClothType, number> = {
    buckram_starch_stiff: 6, linen_natural_weave: 5, japanese_tissue_wrap: 8, cotton_canvas_print: 10, silk_shantung_lux: 4,
  };
  return m[t];
}

export function aesthetic(t: BookClothType): number {
  const m: Record<BookClothType, number> = {
    buckram_starch_stiff: 6, linen_natural_weave: 8, japanese_tissue_wrap: 9, cotton_canvas_print: 7, silk_shantung_lux: 10,
  };
  return m[t];
}

export function clothCost(t: BookClothType): number {
  const m: Record<BookClothType, number> = {
    buckram_starch_stiff: 2, linen_natural_weave: 3, japanese_tissue_wrap: 4, cotton_canvas_print: 2, silk_shantung_lux: 5,
  };
  return m[t];
}

export function paperBacked(t: BookClothType): boolean {
  const m: Record<BookClothType, boolean> = {
    buckram_starch_stiff: true, linen_natural_weave: true, japanese_tissue_wrap: false, cotton_canvas_print: true, silk_shantung_lux: false,
  };
  return m[t];
}

export function waterResist(t: BookClothType): boolean {
  const m: Record<BookClothType, boolean> = {
    buckram_starch_stiff: true, linen_natural_weave: false, japanese_tissue_wrap: false, cotton_canvas_print: false, silk_shantung_lux: false,
  };
  return m[t];
}

export function clothWeave(t: BookClothType): string {
  const m: Record<BookClothType, string> = {
    buckram_starch_stiff: "open_weave_starched",
    linen_natural_weave: "plain_weave_natural",
    japanese_tissue_wrap: "kozo_fiber_sheet",
    cotton_canvas_print: "tight_weave_printed",
    silk_shantung_lux: "slub_weave_sheen",
  };
  return m[t];
}

export function bestUse(t: BookClothType): string {
  const m: Record<BookClothType, string> = {
    buckram_starch_stiff: "library_binding_cover",
    linen_natural_weave: "fine_binding_spine",
    japanese_tissue_wrap: "repair_hinge_mend",
    cotton_canvas_print: "decorative_cover_wrap",
    silk_shantung_lux: "luxury_edition_cover",
  };
  return m[t];
}

export function bookCloths(): BookClothType[] {
  return ["buckram_starch_stiff", "linen_natural_weave", "japanese_tissue_wrap", "cotton_canvas_print", "silk_shantung_lux"];
}

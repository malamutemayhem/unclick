export type DipPenType = "pointed_flex_nib" | "broad_edge_italic" | "copperplate_oblique" | "manga_g_nib" | "crow_quill_fine";

export function lineVariation(t: DipPenType): number {
  const m: Record<DipPenType, number> = {
    pointed_flex_nib: 10, broad_edge_italic: 7, copperplate_oblique: 10, manga_g_nib: 8, crow_quill_fine: 6,
  };
  return m[t];
}

export function inkCapacity(t: DipPenType): number {
  const m: Record<DipPenType, number> = {
    pointed_flex_nib: 6, broad_edge_italic: 9, copperplate_oblique: 6, manga_g_nib: 8, crow_quill_fine: 4,
  };
  return m[t];
}

export function controlFeel(t: DipPenType): number {
  const m: Record<DipPenType, number> = {
    pointed_flex_nib: 8, broad_edge_italic: 7, copperplate_oblique: 9, manga_g_nib: 8, crow_quill_fine: 10,
  };
  return m[t];
}

export function durability(t: DipPenType): number {
  const m: Record<DipPenType, number> = {
    pointed_flex_nib: 6, broad_edge_italic: 9, copperplate_oblique: 6, manga_g_nib: 7, crow_quill_fine: 5,
  };
  return m[t];
}

export function penCost(t: DipPenType): number {
  const m: Record<DipPenType, number> = {
    pointed_flex_nib: 1, broad_edge_italic: 1, copperplate_oblique: 2, manga_g_nib: 1, crow_quill_fine: 1,
  };
  return m[t];
}

export function needsOblique(t: DipPenType): boolean {
  const m: Record<DipPenType, boolean> = {
    pointed_flex_nib: false, broad_edge_italic: false, copperplate_oblique: true, manga_g_nib: false, crow_quill_fine: false,
  };
  return m[t];
}

export function flexNib(t: DipPenType): boolean {
  const m: Record<DipPenType, boolean> = {
    pointed_flex_nib: true, broad_edge_italic: false, copperplate_oblique: true, manga_g_nib: true, crow_quill_fine: false,
  };
  return m[t];
}

export function nibType(t: DipPenType): string {
  const m: Record<DipPenType, string> = {
    pointed_flex_nib: "steel_flex_point",
    broad_edge_italic: "flat_chisel_edge",
    copperplate_oblique: "elbow_offset_point",
    manga_g_nib: "sturdy_flex_round",
    crow_quill_fine: "fine_tubular_point",
  };
  return m[t];
}

export function bestScript(t: DipPenType): string {
  const m: Record<DipPenType, string> = {
    pointed_flex_nib: "spencerian_flourish",
    broad_edge_italic: "italic_uncial_hand",
    copperplate_oblique: "copperplate_engross",
    manga_g_nib: "comic_ink_line_art",
    crow_quill_fine: "botanical_fine_detail",
  };
  return m[t];
}

export function dipPens(): DipPenType[] {
  return ["pointed_flex_nib", "broad_edge_italic", "copperplate_oblique", "manga_g_nib", "crow_quill_fine"];
}

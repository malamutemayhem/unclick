export type GelPenType = "fine_05mm_smooth" | "bold_10mm_vivid" | "retractable_quick_dry" | "glitter_metallic_sparkle" | "white_opaque_highlight";

export function colorVividness(t: GelPenType): number {
  const m: Record<GelPenType, number> = {
    fine_05mm_smooth: 7, bold_10mm_vivid: 10, retractable_quick_dry: 7, glitter_metallic_sparkle: 9, white_opaque_highlight: 8,
  };
  return m[t];
}

export function writingSmoothness(t: GelPenType): number {
  const m: Record<GelPenType, number> = {
    fine_05mm_smooth: 9, bold_10mm_vivid: 8, retractable_quick_dry: 8, glitter_metallic_sparkle: 6, white_opaque_highlight: 5,
  };
  return m[t];
}

export function drySpeed(t: GelPenType): number {
  const m: Record<GelPenType, number> = {
    fine_05mm_smooth: 6, bold_10mm_vivid: 3, retractable_quick_dry: 10, glitter_metallic_sparkle: 4, white_opaque_highlight: 5,
  };
  return m[t];
}

export function lineFineness(t: GelPenType): number {
  const m: Record<GelPenType, number> = {
    fine_05mm_smooth: 10, bold_10mm_vivid: 3, retractable_quick_dry: 7, glitter_metallic_sparkle: 5, white_opaque_highlight: 6,
  };
  return m[t];
}

export function penCost(t: GelPenType): number {
  const m: Record<GelPenType, number> = {
    fine_05mm_smooth: 4, bold_10mm_vivid: 4, retractable_quick_dry: 5, glitter_metallic_sparkle: 5, white_opaque_highlight: 4,
  };
  return m[t];
}

export function smearResist(t: GelPenType): boolean {
  const m: Record<GelPenType, boolean> = {
    fine_05mm_smooth: false, bold_10mm_vivid: false, retractable_quick_dry: true, glitter_metallic_sparkle: false, white_opaque_highlight: false,
  };
  return m[t];
}

export function worksOnDark(t: GelPenType): boolean {
  const m: Record<GelPenType, boolean> = {
    fine_05mm_smooth: false, bold_10mm_vivid: false, retractable_quick_dry: false, glitter_metallic_sparkle: true, white_opaque_highlight: true,
  };
  return m[t];
}

export function inkFormula(t: GelPenType): string {
  const m: Record<GelPenType, string> = {
    fine_05mm_smooth: "water_based_gel_pigment",
    bold_10mm_vivid: "thick_gel_high_pigment",
    retractable_quick_dry: "rapid_dry_gel_polymer",
    glitter_metallic_sparkle: "suspended_glitter_gel",
    white_opaque_highlight: "titanium_dioxide_opaque",
  };
  return m[t];
}

export function bestUse(t: GelPenType): string {
  const m: Record<GelPenType, string> = {
    fine_05mm_smooth: "journaling_note_taking",
    bold_10mm_vivid: "card_making_art_sign",
    retractable_quick_dry: "left_handed_fast_writer",
    glitter_metallic_sparkle: "scrapbook_craft_decor",
    white_opaque_highlight: "dark_paper_correction",
  };
  return m[t];
}

export function gelPens(): GelPenType[] {
  return ["fine_05mm_smooth", "bold_10mm_vivid", "retractable_quick_dry", "glitter_metallic_sparkle", "white_opaque_highlight"];
}

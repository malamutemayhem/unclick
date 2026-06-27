export type WashiTapeType = "solid_color_matte" | "pattern_printed_foil" | "glitter_sparkle_deco" | "wide_masking_journal" | "slim_border_fine_line";

export function adhesion(t: WashiTapeType): number {
  const m: Record<WashiTapeType, number> = {
    solid_color_matte: 6, pattern_printed_foil: 5, glitter_sparkle_deco: 7, wide_masking_journal: 8, slim_border_fine_line: 5,
  };
  return m[t];
}

export function repositionable(t: WashiTapeType): number {
  const m: Record<WashiTapeType, number> = {
    solid_color_matte: 9, pattern_printed_foil: 7, glitter_sparkle_deco: 6, wide_masking_journal: 10, slim_border_fine_line: 8,
  };
  return m[t];
}

export function designVariety(t: WashiTapeType): number {
  const m: Record<WashiTapeType, number> = {
    solid_color_matte: 4, pattern_printed_foil: 10, glitter_sparkle_deco: 8, wide_masking_journal: 5, slim_border_fine_line: 3,
  };
  return m[t];
}

export function writability(t: WashiTapeType): number {
  const m: Record<WashiTapeType, number> = {
    solid_color_matte: 9, pattern_printed_foil: 4, glitter_sparkle_deco: 3, wide_masking_journal: 10, slim_border_fine_line: 7,
  };
  return m[t];
}

export function tapeCost(t: WashiTapeType): number {
  const m: Record<WashiTapeType, number> = {
    solid_color_matte: 2, pattern_printed_foil: 5, glitter_sparkle_deco: 4, wide_masking_journal: 3, slim_border_fine_line: 3,
  };
  return m[t];
}

export function tearByHand(t: WashiTapeType): boolean {
  const m: Record<WashiTapeType, boolean> = {
    solid_color_matte: true, pattern_printed_foil: true, glitter_sparkle_deco: false, wide_masking_journal: true, slim_border_fine_line: true,
  };
  return m[t];
}

export function acidFree(t: WashiTapeType): boolean {
  const m: Record<WashiTapeType, boolean> = {
    solid_color_matte: true, pattern_printed_foil: true, glitter_sparkle_deco: true, wide_masking_journal: true, slim_border_fine_line: true,
  };
  return m[t];
}

export function baseMaterial(t: WashiTapeType): string {
  const m: Record<WashiTapeType, string> = {
    solid_color_matte: "rice_paper_matte_finish",
    pattern_printed_foil: "rice_paper_metallic_foil",
    glitter_sparkle_deco: "rice_paper_glitter_coat",
    wide_masking_journal: "crepe_paper_wide_roll",
    slim_border_fine_line: "rice_paper_narrow_strip",
  };
  return m[t];
}

export function bestProject(t: WashiTapeType): string {
  const m: Record<WashiTapeType, string> = {
    solid_color_matte: "planner_color_code_label",
    pattern_printed_foil: "gift_wrap_card_accent",
    glitter_sparkle_deco: "party_decor_festive",
    wide_masking_journal: "bullet_journal_heading",
    slim_border_fine_line: "border_frame_fine_accent",
  };
  return m[t];
}

export function washiTapes(): WashiTapeType[] {
  return ["solid_color_matte", "pattern_printed_foil", "glitter_sparkle_deco", "wide_masking_journal", "slim_border_fine_line"];
}

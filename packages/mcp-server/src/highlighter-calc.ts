export type HighlighterType = "chisel_tip_standard" | "fine_tip_precise" | "dual_ended_combo" | "erasable_friction" | "gel_wax_no_bleed";

export function coverage(t: HighlighterType): number {
  const m: Record<HighlighterType, number> = {
    chisel_tip_standard: 9, fine_tip_precise: 5, dual_ended_combo: 8, erasable_friction: 7, gel_wax_no_bleed: 6,
  };
  return m[t];
}

export function precision(t: HighlighterType): number {
  const m: Record<HighlighterType, number> = {
    chisel_tip_standard: 5, fine_tip_precise: 10, dual_ended_combo: 8, erasable_friction: 6, gel_wax_no_bleed: 7,
  };
  return m[t];
}

export function inkLife(t: HighlighterType): number {
  const m: Record<HighlighterType, number> = {
    chisel_tip_standard: 7, fine_tip_precise: 6, dual_ended_combo: 5, erasable_friction: 4, gel_wax_no_bleed: 9,
  };
  return m[t];
}

export function bleedThrough(t: HighlighterType): number {
  const m: Record<HighlighterType, number> = {
    chisel_tip_standard: 4, fine_tip_precise: 6, dual_ended_combo: 5, erasable_friction: 7, gel_wax_no_bleed: 10,
  };
  return m[t];
}

export function highlighterCost(t: HighlighterType): number {
  const m: Record<HighlighterType, number> = {
    chisel_tip_standard: 2, fine_tip_precise: 4, dual_ended_combo: 5, erasable_friction: 6, gel_wax_no_bleed: 5,
  };
  return m[t];
}

export function erasable(t: HighlighterType): boolean {
  const m: Record<HighlighterType, boolean> = {
    chisel_tip_standard: false, fine_tip_precise: false, dual_ended_combo: false, erasable_friction: true, gel_wax_no_bleed: false,
  };
  return m[t];
}

export function dryResistant(t: HighlighterType): boolean {
  const m: Record<HighlighterType, boolean> = {
    chisel_tip_standard: false, fine_tip_precise: false, dual_ended_combo: false, erasable_friction: true, gel_wax_no_bleed: true,
  };
  return m[t];
}

export function inkFormula(t: HighlighterType): string {
  const m: Record<HighlighterType, string> = {
    chisel_tip_standard: "water_based_fluorescent",
    fine_tip_precise: "alcohol_based_fine",
    dual_ended_combo: "water_based_dual_wick",
    erasable_friction: "thermosensitive_erasable",
    gel_wax_no_bleed: "solid_gel_wax_stick",
  };
  return m[t];
}

export function bestUse(t: HighlighterType): string {
  const m: Record<HighlighterType, string> = {
    chisel_tip_standard: "textbook_quick_marking",
    fine_tip_precise: "bible_thin_page_study",
    dual_ended_combo: "planner_journal_color",
    erasable_friction: "workbook_reuse_notes",
    gel_wax_no_bleed: "old_book_thin_paper",
  };
  return m[t];
}

export function highlighters(): HighlighterType[] {
  return ["chisel_tip_standard", "fine_tip_precise", "dual_ended_combo", "erasable_friction", "gel_wax_no_bleed"];
}

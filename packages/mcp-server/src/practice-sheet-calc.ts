export type PracticeSheetType = "grid_square_basic" | "guideline_angle_slant" | "dot_grid_flexible" | "lightbox_trace_under" | "watermark_fade_repeat";

export function lineSpacing(t: PracticeSheetType): number {
  const m: Record<PracticeSheetType, number> = {
    grid_square_basic: 7, guideline_angle_slant: 9, dot_grid_flexible: 8, lightbox_trace_under: 6, watermark_fade_repeat: 7,
  };
  return m[t];
}

export function guidanceLevel(t: PracticeSheetType): number {
  const m: Record<PracticeSheetType, number> = {
    grid_square_basic: 6, guideline_angle_slant: 10, dot_grid_flexible: 5, lightbox_trace_under: 9, watermark_fade_repeat: 8,
  };
  return m[t];
}

export function flexibility(t: PracticeSheetType): number {
  const m: Record<PracticeSheetType, number> = {
    grid_square_basic: 5, guideline_angle_slant: 6, dot_grid_flexible: 10, lightbox_trace_under: 7, watermark_fade_repeat: 4,
  };
  return m[t];
}

export function reusability(t: PracticeSheetType): number {
  const m: Record<PracticeSheetType, number> = {
    grid_square_basic: 3, guideline_angle_slant: 3, dot_grid_flexible: 3, lightbox_trace_under: 10, watermark_fade_repeat: 7,
  };
  return m[t];
}

export function sheetCost(t: PracticeSheetType): number {
  const m: Record<PracticeSheetType, number> = {
    grid_square_basic: 1, guideline_angle_slant: 1, dot_grid_flexible: 1, lightbox_trace_under: 3, watermark_fade_repeat: 2,
  };
  return m[t];
}

export function printable(t: PracticeSheetType): boolean {
  const m: Record<PracticeSheetType, boolean> = {
    grid_square_basic: true, guideline_angle_slant: true, dot_grid_flexible: true, lightbox_trace_under: false, watermark_fade_repeat: true,
  };
  return m[t];
}

export function showsAngle(t: PracticeSheetType): boolean {
  const m: Record<PracticeSheetType, boolean> = {
    grid_square_basic: false, guideline_angle_slant: true, dot_grid_flexible: false, lightbox_trace_under: false, watermark_fade_repeat: false,
  };
  return m[t];
}

export function gridStyle(t: PracticeSheetType): string {
  const m: Record<PracticeSheetType, string> = {
    grid_square_basic: "solid_line_square",
    guideline_angle_slant: "angled_nib_ladder",
    dot_grid_flexible: "evenly_spaced_dots",
    lightbox_trace_under: "backlit_exemplar_sheet",
    watermark_fade_repeat: "faded_letterform_trace",
  };
  return m[t];
}

export function bestScript(t: PracticeSheetType): string {
  const m: Record<PracticeSheetType, string> = {
    grid_square_basic: "block_letter_print",
    guideline_angle_slant: "copperplate_spencerian",
    dot_grid_flexible: "modern_brush_layout",
    lightbox_trace_under: "complex_flourish_practice",
    watermark_fade_repeat: "stroke_drill_repetition",
  };
  return m[t];
}

export function practiceSheets(): PracticeSheetType[] {
  return ["grid_square_basic", "guideline_angle_slant", "dot_grid_flexible", "lightbox_trace_under", "watermark_fade_repeat"];
}

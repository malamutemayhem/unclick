export type SketchPadType = "spiral_bound_drawing" | "hardcover_journal_art" | "newsprint_practice_bulk" | "toned_tan_gray" | "mixed_media_heavy";

export function paperWeight(t: SketchPadType): number {
  const m: Record<SketchPadType, number> = {
    spiral_bound_drawing: 6, hardcover_journal_art: 7, newsprint_practice_bulk: 3, toned_tan_gray: 7, mixed_media_heavy: 10,
  };
  return m[t];
}

export function toothTexture(t: SketchPadType): number {
  const m: Record<SketchPadType, number> = {
    spiral_bound_drawing: 6, hardcover_journal_art: 5, newsprint_practice_bulk: 8, toned_tan_gray: 7, mixed_media_heavy: 9,
  };
  return m[t];
}

export function pageCount(t: SketchPadType): number {
  const m: Record<SketchPadType, number> = {
    spiral_bound_drawing: 7, hardcover_journal_art: 5, newsprint_practice_bulk: 10, toned_tan_gray: 6, mixed_media_heavy: 4,
  };
  return m[t];
}

export function portability(t: SketchPadType): number {
  const m: Record<SketchPadType, number> = {
    spiral_bound_drawing: 8, hardcover_journal_art: 9, newsprint_practice_bulk: 4, toned_tan_gray: 7, mixed_media_heavy: 5,
  };
  return m[t];
}

export function padCost(t: SketchPadType): number {
  const m: Record<SketchPadType, number> = {
    spiral_bound_drawing: 4, hardcover_journal_art: 8, newsprint_practice_bulk: 2, toned_tan_gray: 6, mixed_media_heavy: 9,
  };
  return m[t];
}

export function acidFree(t: SketchPadType): boolean {
  const m: Record<SketchPadType, boolean> = {
    spiral_bound_drawing: true, hardcover_journal_art: true, newsprint_practice_bulk: false, toned_tan_gray: true, mixed_media_heavy: true,
  };
  return m[t];
}

export function perforatedSheets(t: SketchPadType): boolean {
  const m: Record<SketchPadType, boolean> = {
    spiral_bound_drawing: true, hardcover_journal_art: false, newsprint_practice_bulk: false, toned_tan_gray: false, mixed_media_heavy: true,
  };
  return m[t];
}

export function paperFinish(t: SketchPadType): string {
  const m: Record<SketchPadType, string> = {
    spiral_bound_drawing: "smooth_medium_tooth",
    hardcover_journal_art: "fine_grain_ivory",
    newsprint_practice_bulk: "rough_absorbent_gray",
    toned_tan_gray: "tinted_smooth_surface",
    mixed_media_heavy: "cold_press_textured",
  };
  return m[t];
}

export function bestMedium(t: SketchPadType): string {
  const m: Record<SketchPadType, string> = {
    spiral_bound_drawing: "graphite_pencil_general",
    hardcover_journal_art: "pen_ink_travel_sketch",
    newsprint_practice_bulk: "charcoal_gesture_warmup",
    toned_tan_gray: "white_charcoal_highlight",
    mixed_media_heavy: "wet_dry_collage_layer",
  };
  return m[t];
}

export function sketchPads(): SketchPadType[] {
  return ["spiral_bound_drawing", "hardcover_journal_art", "newsprint_practice_bulk", "toned_tan_gray", "mixed_media_heavy"];
}

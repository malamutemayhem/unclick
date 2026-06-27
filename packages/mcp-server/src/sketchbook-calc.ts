export type SketchbookType = "spiral_bound" | "hardbound_journal" | "watercolor_heavy" | "toned_tan" | "mixed_media_thick";

export function paperWeight(t: SketchbookType): number {
  const m: Record<SketchbookType, number> = {
    spiral_bound: 4, hardbound_journal: 5, watercolor_heavy: 10, toned_tan: 6, mixed_media_thick: 8,
  };
  return m[t];
}

export function toothTexture(t: SketchbookType): number {
  const m: Record<SketchbookType, number> = {
    spiral_bound: 5, hardbound_journal: 6, watercolor_heavy: 9, toned_tan: 6, mixed_media_thick: 7,
  };
  return m[t];
}

export function pageCount(t: SketchbookType): number {
  const m: Record<SketchbookType, number> = {
    spiral_bound: 10, hardbound_journal: 8, watercolor_heavy: 3, toned_tan: 6, mixed_media_thick: 5,
  };
  return m[t];
}

export function layFlat(t: SketchbookType): number {
  const m: Record<SketchbookType, number> = {
    spiral_bound: 10, hardbound_journal: 6, watercolor_heavy: 8, toned_tan: 7, mixed_media_thick: 7,
  };
  return m[t];
}

export function bookCost(t: SketchbookType): number {
  const m: Record<SketchbookType, number> = {
    spiral_bound: 2, hardbound_journal: 5, watercolor_heavy: 8, toned_tan: 4, mixed_media_thick: 6,
  };
  return m[t];
}

export function acidFree(t: SketchbookType): boolean {
  const m: Record<SketchbookType, boolean> = {
    spiral_bound: false, hardbound_journal: true, watercolor_heavy: true, toned_tan: true, mixed_media_thick: true,
  };
  return m[t];
}

export function perforated(t: SketchbookType): boolean {
  const m: Record<SketchbookType, boolean> = {
    spiral_bound: true, hardbound_journal: false, watercolor_heavy: false, toned_tan: false, mixed_media_thick: false,
  };
  return m[t];
}

export function paperFinish(t: SketchbookType): string {
  const m: Record<SketchbookType, string> = {
    spiral_bound: "smooth_white_drawing",
    hardbound_journal: "cream_medium_tooth",
    watercolor_heavy: "cold_press_cotton_rag",
    toned_tan: "tinted_medium_tan",
    mixed_media_thick: "vellum_surface_heavy",
  };
  return m[t];
}

export function bestMedium(t: SketchbookType): string {
  const m: Record<SketchbookType, string> = {
    spiral_bound: "pencil_pen_daily_sketch",
    hardbound_journal: "ink_pen_travel_journal",
    watercolor_heavy: "watercolor_gouache_wash",
    toned_tan: "charcoal_white_highlight",
    mixed_media_thick: "marker_collage_layered",
  };
  return m[t];
}

export function sketchbooks(): SketchbookType[] {
  return ["spiral_bound", "hardbound_journal", "watercolor_heavy", "toned_tan", "mixed_media_thick"];
}

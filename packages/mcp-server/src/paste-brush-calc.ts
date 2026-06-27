export type PasteBrushType = "round_hake_wide" | "flat_glue_stiff" | "foam_roller_even" | "japanese_nori_soft" | "silicon_spreader_flex";

export function coverage(t: PasteBrushType): number {
  const m: Record<PasteBrushType, number> = {
    round_hake_wide: 9, flat_glue_stiff: 7, foam_roller_even: 10, japanese_nori_soft: 8, silicon_spreader_flex: 6,
  };
  return m[t];
}

export function evenCoat(t: PasteBrushType): number {
  const m: Record<PasteBrushType, number> = {
    round_hake_wide: 7, flat_glue_stiff: 6, foam_roller_even: 10, japanese_nori_soft: 9, silicon_spreader_flex: 8,
  };
  return m[t];
}

export function cleanEase(t: PasteBrushType): number {
  const m: Record<PasteBrushType, number> = {
    round_hake_wide: 5, flat_glue_stiff: 4, foam_roller_even: 3, japanese_nori_soft: 6, silicon_spreader_flex: 10,
  };
  return m[t];
}

export function durability(t: PasteBrushType): number {
  const m: Record<PasteBrushType, number> = {
    round_hake_wide: 7, flat_glue_stiff: 8, foam_roller_even: 3, japanese_nori_soft: 5, silicon_spreader_flex: 10,
  };
  return m[t];
}

export function brushCost(t: PasteBrushType): number {
  const m: Record<PasteBrushType, number> = {
    round_hake_wide: 2, flat_glue_stiff: 1, foam_roller_even: 1, japanese_nori_soft: 3, silicon_spreader_flex: 2,
  };
  return m[t];
}

export function reusable(t: PasteBrushType): boolean {
  const m: Record<PasteBrushType, boolean> = {
    round_hake_wide: true, flat_glue_stiff: true, foam_roller_even: false, japanese_nori_soft: true, silicon_spreader_flex: true,
  };
  return m[t];
}

export function naturalBristle(t: PasteBrushType): boolean {
  const m: Record<PasteBrushType, boolean> = {
    round_hake_wide: true, flat_glue_stiff: true, foam_roller_even: false, japanese_nori_soft: true, silicon_spreader_flex: false,
  };
  return m[t];
}

export function bristleType(t: PasteBrushType): string {
  const m: Record<PasteBrushType, string> = {
    round_hake_wide: "goat_hair_round",
    flat_glue_stiff: "hog_bristle_flat",
    foam_roller_even: "polyurethane_foam",
    japanese_nori_soft: "horse_hair_soft",
    silicon_spreader_flex: "food_grade_silicon",
  };
  return m[t];
}

export function bestUse(t: PasteBrushType): string {
  const m: Record<PasteBrushType, string> = {
    round_hake_wide: "wheat_paste_cover",
    flat_glue_stiff: "pva_spine_glue",
    foam_roller_even: "even_large_area",
    japanese_nori_soft: "rice_paste_tissue",
    silicon_spreader_flex: "precise_small_area",
  };
  return m[t];
}

export function pasteBrushes(): PasteBrushType[] {
  return ["round_hake_wide", "flat_glue_stiff", "foam_roller_even", "japanese_nori_soft", "silicon_spreader_flex"];
}

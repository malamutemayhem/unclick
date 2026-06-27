export type GlassFritType = "fine_powder_dust" | "medium_grain_sand" | "coarse_chunk_gravel" | "noodle_stringer_thin" | "confetti_sheet_flat";

export function meltControl(t: GlassFritType): number {
  const m: Record<GlassFritType, number> = {
    fine_powder_dust: 4, medium_grain_sand: 7, coarse_chunk_gravel: 9, noodle_stringer_thin: 8, confetti_sheet_flat: 6,
  };
  return m[t];
}

export function colorBlend(t: GlassFritType): number {
  const m: Record<GlassFritType, number> = {
    fine_powder_dust: 10, medium_grain_sand: 7, coarse_chunk_gravel: 4, noodle_stringer_thin: 5, confetti_sheet_flat: 6,
  };
  return m[t];
}

export function textureEffect(t: GlassFritType): number {
  const m: Record<GlassFritType, number> = {
    fine_powder_dust: 3, medium_grain_sand: 6, coarse_chunk_gravel: 10, noodle_stringer_thin: 8, confetti_sheet_flat: 7,
  };
  return m[t];
}

export function placementEase(t: GlassFritType): number {
  const m: Record<GlassFritType, number> = {
    fine_powder_dust: 7, medium_grain_sand: 8, coarse_chunk_gravel: 9, noodle_stringer_thin: 5, confetti_sheet_flat: 10,
  };
  return m[t];
}

export function fritCost(t: GlassFritType): number {
  const m: Record<GlassFritType, number> = {
    fine_powder_dust: 2, medium_grain_sand: 2, coarse_chunk_gravel: 2, noodle_stringer_thin: 3, confetti_sheet_flat: 3,
  };
  return m[t];
}

export function dissolvesOnFire(t: GlassFritType): boolean {
  const m: Record<GlassFritType, boolean> = {
    fine_powder_dust: true, medium_grain_sand: false, coarse_chunk_gravel: false, noodle_stringer_thin: false, confetti_sheet_flat: false,
  };
  return m[t];
}

export function linearPattern(t: GlassFritType): boolean {
  const m: Record<GlassFritType, boolean> = {
    fine_powder_dust: false, medium_grain_sand: false, coarse_chunk_gravel: false, noodle_stringer_thin: true, confetti_sheet_flat: false,
  };
  return m[t];
}

export function particleForm(t: GlassFritType): string {
  const m: Record<GlassFritType, string> = {
    fine_powder_dust: "ground_glass_powder",
    medium_grain_sand: "crushed_glass_grain",
    coarse_chunk_gravel: "broken_glass_chunk",
    noodle_stringer_thin: "pulled_glass_thread",
    confetti_sheet_flat: "rolled_glass_sheet",
  };
  return m[t];
}

export function bestEffect(t: GlassFritType): string {
  const m: Record<GlassFritType, string> = {
    fine_powder_dust: "smooth_wash_tint",
    medium_grain_sand: "speckled_grain_field",
    coarse_chunk_gravel: "chunky_mosaic_look",
    noodle_stringer_thin: "line_drawing_detail",
    confetti_sheet_flat: "flat_shape_applique",
  };
  return m[t];
}

export function glassFrits(): GlassFritType[] {
  return ["fine_powder_dust", "medium_grain_sand", "coarse_chunk_gravel", "noodle_stringer_thin", "confetti_sheet_flat"];
}

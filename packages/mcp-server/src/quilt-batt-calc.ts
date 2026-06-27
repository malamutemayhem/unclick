export type QuiltBattType = "cotton_natural_flat" | "polyester_puff_loft" | "wool_warm_breathe" | "bamboo_blend_drape" | "silk_luxury_thin";

export function warmth(t: QuiltBattType): number {
  const m: Record<QuiltBattType, number> = {
    cotton_natural_flat: 7, polyester_puff_loft: 8, wool_warm_breathe: 10, bamboo_blend_drape: 6, silk_luxury_thin: 5,
  };
  return m[t];
}

export function drape(t: QuiltBattType): number {
  const m: Record<QuiltBattType, number> = {
    cotton_natural_flat: 8, polyester_puff_loft: 5, wool_warm_breathe: 7, bamboo_blend_drape: 10, silk_luxury_thin: 9,
  };
  return m[t];
}

export function loft(t: QuiltBattType): number {
  const m: Record<QuiltBattType, number> = {
    cotton_natural_flat: 4, polyester_puff_loft: 10, wool_warm_breathe: 7, bamboo_blend_drape: 5, silk_luxury_thin: 3,
  };
  return m[t];
}

export function shrinkResist(t: QuiltBattType): number {
  const m: Record<QuiltBattType, number> = {
    cotton_natural_flat: 5, polyester_puff_loft: 10, wool_warm_breathe: 6, bamboo_blend_drape: 8, silk_luxury_thin: 7,
  };
  return m[t];
}

export function battCost(t: QuiltBattType): number {
  const m: Record<QuiltBattType, number> = {
    cotton_natural_flat: 2, polyester_puff_loft: 2, wool_warm_breathe: 4, bamboo_blend_drape: 3, silk_luxury_thin: 5,
  };
  return m[t];
}

export function natural(t: QuiltBattType): boolean {
  const m: Record<QuiltBattType, boolean> = {
    cotton_natural_flat: true, polyester_puff_loft: false, wool_warm_breathe: true, bamboo_blend_drape: true, silk_luxury_thin: true,
  };
  return m[t];
}

export function needlePunch(t: QuiltBattType): boolean {
  const m: Record<QuiltBattType, boolean> = {
    cotton_natural_flat: true, polyester_puff_loft: false, wool_warm_breathe: true, bamboo_blend_drape: false, silk_luxury_thin: false,
  };
  return m[t];
}

export function battFiber(t: QuiltBattType): string {
  const m: Record<QuiltBattType, string> = {
    cotton_natural_flat: "organic_cotton_sheet",
    polyester_puff_loft: "bonded_polyester_fill",
    wool_warm_breathe: "merino_wool_layered",
    bamboo_blend_drape: "bamboo_cotton_blend",
    silk_luxury_thin: "mulberry_silk_sheet",
  };
  return m[t];
}

export function bestUse(t: QuiltBattType): string {
  const m: Record<QuiltBattType, string> = {
    cotton_natural_flat: "flat_quilt_vintage",
    polyester_puff_loft: "puffy_comforter_warm",
    wool_warm_breathe: "all_season_breathe",
    bamboo_blend_drape: "wall_hanging_drape",
    silk_luxury_thin: "art_quilt_luxury",
  };
  return m[t];
}

export function quiltBatts(): QuiltBattType[] {
  return ["cotton_natural_flat", "polyester_puff_loft", "wool_warm_breathe", "bamboo_blend_drape", "silk_luxury_thin"];
}

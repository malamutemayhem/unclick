export type CrochetThreadType = "size_10_classic" | "size_20_fine" | "size_30_delicate" | "size_3_thick" | "perle_cotton_sheen";

export function stitchDetail(t: CrochetThreadType): number {
  const m: Record<CrochetThreadType, number> = {
    size_10_classic: 7, size_20_fine: 9, size_30_delicate: 10, size_3_thick: 4, perle_cotton_sheen: 8,
  };
  return m[t];
}

export function easeOfUse(t: CrochetThreadType): number {
  const m: Record<CrochetThreadType, number> = {
    size_10_classic: 9, size_20_fine: 7, size_30_delicate: 5, size_3_thick: 10, perle_cotton_sheen: 8,
  };
  return m[t];
}

export function colorRange(t: CrochetThreadType): number {
  const m: Record<CrochetThreadType, number> = {
    size_10_classic: 10, size_20_fine: 8, size_30_delicate: 6, size_3_thick: 7, perle_cotton_sheen: 9,
  };
  return m[t];
}

export function yardage(t: CrochetThreadType): number {
  const m: Record<CrochetThreadType, number> = {
    size_10_classic: 8, size_20_fine: 9, size_30_delicate: 10, size_3_thick: 5, perle_cotton_sheen: 7,
  };
  return m[t];
}

export function threadCost(t: CrochetThreadType): number {
  const m: Record<CrochetThreadType, number> = {
    size_10_classic: 2, size_20_fine: 3, size_30_delicate: 4, size_3_thick: 2, perle_cotton_sheen: 4,
  };
  return m[t];
}

export function mercerized(t: CrochetThreadType): boolean {
  const m: Record<CrochetThreadType, boolean> = {
    size_10_classic: true, size_20_fine: true, size_30_delicate: true, size_3_thick: false, perle_cotton_sheen: true,
  };
  return m[t];
}

export function forDoily(t: CrochetThreadType): boolean {
  const m: Record<CrochetThreadType, boolean> = {
    size_10_classic: true, size_20_fine: true, size_30_delicate: true, size_3_thick: false, perle_cotton_sheen: false,
  };
  return m[t];
}

export function threadFiber(t: CrochetThreadType): string {
  const m: Record<CrochetThreadType, string> = {
    size_10_classic: "mercerized_cotton_smooth",
    size_20_fine: "egyptian_cotton_fine",
    size_30_delicate: "sea_island_cotton_ultra",
    size_3_thick: "cotton_blend_soft",
    perle_cotton_sheen: "pearl_cotton_twisted",
  };
  return m[t];
}

export function bestProject(t: CrochetThreadType): string {
  const m: Record<CrochetThreadType, string> = {
    size_10_classic: "doily_tablecloth_classic",
    size_20_fine: "fine_lace_edging",
    size_30_delicate: "miniature_lace_art",
    size_3_thick: "coaster_basket_sturdy",
    perle_cotton_sheen: "decorative_motif_sheen",
  };
  return m[t];
}

export function crochetThreads(): CrochetThreadType[] {
  return ["size_10_classic", "size_20_fine", "size_30_delicate", "size_3_thick", "perle_cotton_sheen"];
}

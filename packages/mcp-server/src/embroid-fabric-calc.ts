export type EmbroidFabricType = "aida_cloth_count" | "evenweave_linen" | "muslin_cotton_plain" | "silk_dupioni_sheen" | "felt_wool_thick";

export function stitchGrid(t: EmbroidFabricType): number {
  const m: Record<EmbroidFabricType, number> = {
    aida_cloth_count: 10, evenweave_linen: 9, muslin_cotton_plain: 3, silk_dupioni_sheen: 2, felt_wool_thick: 1,
  };
  return m[t];
}

export function drapeFeel(t: EmbroidFabricType): number {
  const m: Record<EmbroidFabricType, number> = {
    aida_cloth_count: 3, evenweave_linen: 7, muslin_cotton_plain: 8, silk_dupioni_sheen: 10, felt_wool_thick: 2,
  };
  return m[t];
}

export function needleFriendly(t: EmbroidFabricType): number {
  const m: Record<EmbroidFabricType, number> = {
    aida_cloth_count: 10, evenweave_linen: 8, muslin_cotton_plain: 7, silk_dupioni_sheen: 4, felt_wool_thick: 9,
  };
  return m[t];
}

export function washDurable(t: EmbroidFabricType): number {
  const m: Record<EmbroidFabricType, number> = {
    aida_cloth_count: 8, evenweave_linen: 9, muslin_cotton_plain: 10, silk_dupioni_sheen: 3, felt_wool_thick: 5,
  };
  return m[t];
}

export function fabricCost(t: EmbroidFabricType): number {
  const m: Record<EmbroidFabricType, number> = {
    aida_cloth_count: 2, evenweave_linen: 4, muslin_cotton_plain: 1, silk_dupioni_sheen: 5, felt_wool_thick: 2,
  };
  return m[t];
}

export function countedWork(t: EmbroidFabricType): boolean {
  const m: Record<EmbroidFabricType, boolean> = {
    aida_cloth_count: true, evenweave_linen: true, muslin_cotton_plain: false, silk_dupioni_sheen: false, felt_wool_thick: false,
  };
  return m[t];
}

export function noHoopNeeded(t: EmbroidFabricType): boolean {
  const m: Record<EmbroidFabricType, boolean> = {
    aida_cloth_count: false, evenweave_linen: false, muslin_cotton_plain: false, silk_dupioni_sheen: false, felt_wool_thick: true,
  };
  return m[t];
}

export function weaveType(t: EmbroidFabricType): string {
  const m: Record<EmbroidFabricType, string> = {
    aida_cloth_count: "block_weave_grid",
    evenweave_linen: "plain_weave_even",
    muslin_cotton_plain: "plain_weave_loose",
    silk_dupioni_sheen: "slub_weave_crisp",
    felt_wool_thick: "non_woven_pressed",
  };
  return m[t];
}

export function bestStitch(t: EmbroidFabricType): string {
  const m: Record<EmbroidFabricType, string> = {
    aida_cloth_count: "cross_stitch_beginner",
    evenweave_linen: "hardanger_counted_thread",
    muslin_cotton_plain: "surface_embroidery_free",
    silk_dupioni_sheen: "silk_ribbon_embroidery",
    felt_wool_thick: "wool_applique_stitch",
  };
  return m[t];
}

export function embroidFabrics(): EmbroidFabricType[] {
  return ["aida_cloth_count", "evenweave_linen", "muslin_cotton_plain", "silk_dupioni_sheen", "felt_wool_thick"];
}

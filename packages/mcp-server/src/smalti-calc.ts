export type SmaltiType = "venetian_opaque_bright" | "byzantine_gold_leaf" | "mexican_uncut_rough" | "filati_thin_strand" | "orsini_iridescent_sheen";

export function colorIntensity(t: SmaltiType): number {
  const m: Record<SmaltiType, number> = {
    venetian_opaque_bright: 10, byzantine_gold_leaf: 8, mexican_uncut_rough: 7, filati_thin_strand: 6, orsini_iridescent_sheen: 9,
  };
  return m[t];
}

export function lightReflect(t: SmaltiType): number {
  const m: Record<SmaltiType, number> = {
    venetian_opaque_bright: 7, byzantine_gold_leaf: 10, mexican_uncut_rough: 4, filati_thin_strand: 6, orsini_iridescent_sheen: 9,
  };
  return m[t];
}

export function cutEase(t: SmaltiType): number {
  const m: Record<SmaltiType, number> = {
    venetian_opaque_bright: 7, byzantine_gold_leaf: 5, mexican_uncut_rough: 9, filati_thin_strand: 8, orsini_iridescent_sheen: 6,
  };
  return m[t];
}

export function durability(t: SmaltiType): number {
  const m: Record<SmaltiType, number> = {
    venetian_opaque_bright: 9, byzantine_gold_leaf: 8, mexican_uncut_rough: 10, filati_thin_strand: 6, orsini_iridescent_sheen: 7,
  };
  return m[t];
}

export function smaltiCost(t: SmaltiType): number {
  const m: Record<SmaltiType, number> = {
    venetian_opaque_bright: 3, byzantine_gold_leaf: 4, mexican_uncut_rough: 1, filati_thin_strand: 3, orsini_iridescent_sheen: 3,
  };
  return m[t];
}

export function hasGoldLeaf(t: SmaltiType): boolean {
  const m: Record<SmaltiType, boolean> = {
    venetian_opaque_bright: false, byzantine_gold_leaf: true, mexican_uncut_rough: false, filati_thin_strand: false, orsini_iridescent_sheen: false,
  };
  return m[t];
}

export function iridescent(t: SmaltiType): boolean {
  const m: Record<SmaltiType, boolean> = {
    venetian_opaque_bright: false, byzantine_gold_leaf: false, mexican_uncut_rough: false, filati_thin_strand: false, orsini_iridescent_sheen: true,
  };
  return m[t];
}

export function glassOrigin(t: SmaltiType): string {
  const m: Record<SmaltiType, string> = {
    venetian_opaque_bright: "murano_italy_furnace",
    byzantine_gold_leaf: "gold_sandwich_glass",
    mexican_uncut_rough: "hand_poured_slab",
    filati_thin_strand: "drawn_glass_rod",
    orsini_iridescent_sheen: "metallic_oxide_coat",
  };
  return m[t];
}

export function bestProject(t: SmaltiType): string {
  const m: Record<SmaltiType, string> = {
    venetian_opaque_bright: "wall_mural_large",
    byzantine_gold_leaf: "church_icon_sacred",
    mexican_uncut_rough: "outdoor_garden_path",
    filati_thin_strand: "micro_mosaic_detail",
    orsini_iridescent_sheen: "water_feature_pool",
  };
  return m[t];
}

export function smaltis(): SmaltiType[] {
  return ["venetian_opaque_bright", "byzantine_gold_leaf", "mexican_uncut_rough", "filati_thin_strand", "orsini_iridescent_sheen"];
}

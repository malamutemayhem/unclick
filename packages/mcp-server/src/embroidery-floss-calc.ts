export type EmbroideryFlossType = "cotton_stranded_six" | "silk_filament_sheen" | "metallic_thread_sparkle" | "wool_crewel_matte" | "rayon_viscose_shine";

export function colorRange(t: EmbroideryFlossType): number {
  const m: Record<EmbroideryFlossType, number> = {
    cotton_stranded_six: 10, silk_filament_sheen: 7, metallic_thread_sparkle: 5, wool_crewel_matte: 6, rayon_viscose_shine: 8,
  };
  return m[t];
}

export function stitchSmooth(t: EmbroideryFlossType): number {
  const m: Record<EmbroideryFlossType, number> = {
    cotton_stranded_six: 8, silk_filament_sheen: 10, metallic_thread_sparkle: 4, wool_crewel_matte: 6, rayon_viscose_shine: 9,
  };
  return m[t];
}

export function durability(t: EmbroideryFlossType): number {
  const m: Record<EmbroideryFlossType, number> = {
    cotton_stranded_six: 9, silk_filament_sheen: 7, metallic_thread_sparkle: 5, wool_crewel_matte: 8, rayon_viscose_shine: 6,
  };
  return m[t];
}

export function sheen(t: EmbroideryFlossType): number {
  const m: Record<EmbroideryFlossType, number> = {
    cotton_stranded_six: 4, silk_filament_sheen: 9, metallic_thread_sparkle: 10, wool_crewel_matte: 2, rayon_viscose_shine: 8,
  };
  return m[t];
}

export function flossCost(t: EmbroideryFlossType): number {
  const m: Record<EmbroideryFlossType, number> = {
    cotton_stranded_six: 1, silk_filament_sheen: 4, metallic_thread_sparkle: 2, wool_crewel_matte: 2, rayon_viscose_shine: 1,
  };
  return m[t];
}

export function divisible(t: EmbroideryFlossType): boolean {
  const m: Record<EmbroideryFlossType, boolean> = {
    cotton_stranded_six: true, silk_filament_sheen: true, metallic_thread_sparkle: false, wool_crewel_matte: false, rayon_viscose_shine: true,
  };
  return m[t];
}

export function washable(t: EmbroideryFlossType): boolean {
  const m: Record<EmbroideryFlossType, boolean> = {
    cotton_stranded_six: true, silk_filament_sheen: false, metallic_thread_sparkle: false, wool_crewel_matte: true, rayon_viscose_shine: true,
  };
  return m[t];
}

export function fiberContent(t: EmbroideryFlossType): string {
  const m: Record<EmbroideryFlossType, string> = {
    cotton_stranded_six: "mercerized_cotton_six_strand",
    silk_filament_sheen: "natural_silk_filament",
    metallic_thread_sparkle: "polyester_metallic_wrap",
    wool_crewel_matte: "fine_wool_single_ply",
    rayon_viscose_shine: "viscose_rayon_filament",
  };
  return m[t];
}

export function bestStitch(t: EmbroideryFlossType): string {
  const m: Record<EmbroideryFlossType, string> = {
    cotton_stranded_six: "cross_stitch_general",
    silk_filament_sheen: "satin_stitch_fine",
    metallic_thread_sparkle: "couching_accent_detail",
    wool_crewel_matte: "crewel_long_short",
    rayon_viscose_shine: "surface_embroidery_fill",
  };
  return m[t];
}

export function embroideryFlosses(): EmbroideryFlossType[] {
  return ["cotton_stranded_six", "silk_filament_sheen", "metallic_thread_sparkle", "wool_crewel_matte", "rayon_viscose_shine"];
}

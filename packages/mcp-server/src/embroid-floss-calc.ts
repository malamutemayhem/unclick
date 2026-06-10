export type EmbroidFlossType = "cotton_stranded_six" | "silk_filament_fine" | "pearl_cotton_twist" | "metallic_thread_shine" | "wool_crewel_thick";

export function colorRange(t: EmbroidFlossType): number {
  const m: Record<EmbroidFlossType, number> = {
    cotton_stranded_six: 10, silk_filament_fine: 8, pearl_cotton_twist: 7, metallic_thread_shine: 5, wool_crewel_thick: 6,
  };
  return m[t];
}

export function stitchCover(t: EmbroidFlossType): number {
  const m: Record<EmbroidFlossType, number> = {
    cotton_stranded_six: 8, silk_filament_fine: 6, pearl_cotton_twist: 9, metallic_thread_shine: 5, wool_crewel_thick: 10,
  };
  return m[t];
}

export function sheen(t: EmbroidFlossType): number {
  const m: Record<EmbroidFlossType, number> = {
    cotton_stranded_six: 5, silk_filament_fine: 9, pearl_cotton_twist: 7, metallic_thread_shine: 10, wool_crewel_thick: 3,
  };
  return m[t];
}

export function stitchEase(t: EmbroidFlossType): number {
  const m: Record<EmbroidFlossType, number> = {
    cotton_stranded_six: 9, silk_filament_fine: 6, pearl_cotton_twist: 8, metallic_thread_shine: 3, wool_crewel_thick: 7,
  };
  return m[t];
}

export function flossCost(t: EmbroidFlossType): number {
  const m: Record<EmbroidFlossType, number> = {
    cotton_stranded_six: 1, silk_filament_fine: 4, pearl_cotton_twist: 2, metallic_thread_shine: 3, wool_crewel_thick: 2,
  };
  return m[t];
}

export function divisible(t: EmbroidFlossType): boolean {
  const m: Record<EmbroidFlossType, boolean> = {
    cotton_stranded_six: true, silk_filament_fine: true, pearl_cotton_twist: false, metallic_thread_shine: false, wool_crewel_thick: false,
  };
  return m[t];
}

export function washable(t: EmbroidFlossType): boolean {
  const m: Record<EmbroidFlossType, boolean> = {
    cotton_stranded_six: true, silk_filament_fine: false, pearl_cotton_twist: true, metallic_thread_shine: false, wool_crewel_thick: true,
  };
  return m[t];
}

export function fiberType(t: EmbroidFlossType): string {
  const m: Record<EmbroidFlossType, string> = {
    cotton_stranded_six: "mercerized_cotton_strand",
    silk_filament_fine: "natural_silk_filament",
    pearl_cotton_twist: "twisted_cotton_cord",
    metallic_thread_shine: "polyester_metal_wrap",
    wool_crewel_thick: "fine_wool_ply",
  };
  return m[t];
}

export function bestStitch(t: EmbroidFlossType): string {
  const m: Record<EmbroidFlossType, string> = {
    cotton_stranded_six: "cross_stitch_general",
    silk_filament_fine: "silk_shading_detail",
    pearl_cotton_twist: "hardanger_drawn_thread",
    metallic_thread_shine: "highlight_accent_sparkle",
    wool_crewel_thick: "crewel_fill_texture",
  };
  return m[t];
}

export function embroidFlosses(): EmbroidFlossType[] {
  return ["cotton_stranded_six", "silk_filament_fine", "pearl_cotton_twist", "metallic_thread_shine", "wool_crewel_thick"];
}

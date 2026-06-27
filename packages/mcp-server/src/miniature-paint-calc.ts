export type MiniaturePaintType = "acrylic_water_based" | "contrast_one_coat" | "metallic_shimmer_effect" | "wash_shade_recess" | "speed_paint_quick";

export function coveragePower(t: MiniaturePaintType): number {
  const m: Record<MiniaturePaintType, number> = {
    acrylic_water_based: 8, contrast_one_coat: 6, metallic_shimmer_effect: 5, wash_shade_recess: 3, speed_paint_quick: 7,
  };
  return m[t];
}

export function detailControl(t: MiniaturePaintType): number {
  const m: Record<MiniaturePaintType, number> = {
    acrylic_water_based: 9, contrast_one_coat: 5, metallic_shimmer_effect: 7, wash_shade_recess: 8, speed_paint_quick: 4,
  };
  return m[t];
}

export function easeOfUse(t: MiniaturePaintType): number {
  const m: Record<MiniaturePaintType, number> = {
    acrylic_water_based: 7, contrast_one_coat: 10, metallic_shimmer_effect: 5, wash_shade_recess: 6, speed_paint_quick: 9,
  };
  return m[t];
}

export function colorRange(t: MiniaturePaintType): number {
  const m: Record<MiniaturePaintType, number> = {
    acrylic_water_based: 10, contrast_one_coat: 7, metallic_shimmer_effect: 5, wash_shade_recess: 6, speed_paint_quick: 8,
  };
  return m[t];
}

export function paintCost(t: MiniaturePaintType): number {
  const m: Record<MiniaturePaintType, number> = {
    acrylic_water_based: 3, contrast_one_coat: 5, metallic_shimmer_effect: 5, wash_shade_recess: 4, speed_paint_quick: 4,
  };
  return m[t];
}

export function needsPrimer(t: MiniaturePaintType): boolean {
  const m: Record<MiniaturePaintType, boolean> = {
    acrylic_water_based: true, contrast_one_coat: true, metallic_shimmer_effect: true, wash_shade_recess: false, speed_paint_quick: true,
  };
  return m[t];
}

export function airbrushReady(t: MiniaturePaintType): boolean {
  const m: Record<MiniaturePaintType, boolean> = {
    acrylic_water_based: true, contrast_one_coat: false, metallic_shimmer_effect: true, wash_shade_recess: false, speed_paint_quick: false,
  };
  return m[t];
}

export function finishType(t: MiniaturePaintType): string {
  const m: Record<MiniaturePaintType, string> = {
    acrylic_water_based: "matte_satin_smooth",
    contrast_one_coat: "shade_highlight_auto",
    metallic_shimmer_effect: "metallic_pearl_shimmer",
    wash_shade_recess: "transparent_pool_recess",
    speed_paint_quick: "satin_self_shade",
  };
  return m[t];
}

export function bestUse(t: MiniaturePaintType): string {
  const m: Record<MiniaturePaintType, string> = {
    acrylic_water_based: "detailed_layering_blend",
    contrast_one_coat: "batch_paint_army_fast",
    metallic_shimmer_effect: "armor_weapon_metallic",
    wash_shade_recess: "add_depth_shadow",
    speed_paint_quick: "beginner_quick_tabletop",
  };
  return m[t];
}

export function miniaturePaints(): MiniaturePaintType[] {
  return ["acrylic_water_based", "contrast_one_coat", "metallic_shimmer_effect", "wash_shade_recess", "speed_paint_quick"];
}

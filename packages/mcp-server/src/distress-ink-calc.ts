export type DistressInkType = "oxide_hybrid_react" | "classic_dye_fade" | "spray_mist_stain" | "crayon_rub_stick" | "paint_dabber_opaque";

export function blendEase(t: DistressInkType): number {
  const m: Record<DistressInkType, number> = {
    oxide_hybrid_react: 9, classic_dye_fade: 10, spray_mist_stain: 7, crayon_rub_stick: 6, paint_dabber_opaque: 5,
  };
  return m[t];
}

export function colorIntensity(t: DistressInkType): number {
  const m: Record<DistressInkType, number> = {
    oxide_hybrid_react: 9, classic_dye_fade: 6, spray_mist_stain: 7, crayon_rub_stick: 5, paint_dabber_opaque: 10,
  };
  return m[t];
}

export function waterReact(t: DistressInkType): number {
  const m: Record<DistressInkType, number> = {
    oxide_hybrid_react: 10, classic_dye_fade: 8, spray_mist_stain: 9, crayon_rub_stick: 4, paint_dabber_opaque: 3,
  };
  return m[t];
}

export function versatility(t: DistressInkType): number {
  const m: Record<DistressInkType, number> = {
    oxide_hybrid_react: 9, classic_dye_fade: 8, spray_mist_stain: 10, crayon_rub_stick: 6, paint_dabber_opaque: 7,
  };
  return m[t];
}

export function inkCost(t: DistressInkType): number {
  const m: Record<DistressInkType, number> = {
    oxide_hybrid_react: 3, classic_dye_fade: 2, spray_mist_stain: 3, crayon_rub_stick: 2, paint_dabber_opaque: 2,
  };
  return m[t];
}

export function waterSoluble(t: DistressInkType): boolean {
  const m: Record<DistressInkType, boolean> = {
    oxide_hybrid_react: true, classic_dye_fade: true, spray_mist_stain: true, crayon_rub_stick: true, paint_dabber_opaque: false,
  };
  return m[t];
}

export function opaque(t: DistressInkType): boolean {
  const m: Record<DistressInkType, boolean> = {
    oxide_hybrid_react: true, classic_dye_fade: false, spray_mist_stain: false, crayon_rub_stick: false, paint_dabber_opaque: true,
  };
  return m[t];
}

export function inkBase(t: DistressInkType): string {
  const m: Record<DistressInkType, string> = {
    oxide_hybrid_react: "dye_oxide_hybrid",
    classic_dye_fade: "water_based_dye",
    spray_mist_stain: "mica_dye_spray",
    crayon_rub_stick: "wax_pigment_stick",
    paint_dabber_opaque: "acrylic_paint_dab",
  };
  return m[t];
}

export function bestUse(t: DistressInkType): string {
  const m: Record<DistressInkType, string> = {
    oxide_hybrid_react: "oxidized_water_effect",
    classic_dye_fade: "ink_blend_edge_fade",
    spray_mist_stain: "background_spray_mist",
    crayon_rub_stick: "rub_texture_highlight",
    paint_dabber_opaque: "bold_color_cover",
  };
  return m[t];
}

export function distressInks(): DistressInkType[] {
  return ["oxide_hybrid_react", "classic_dye_fade", "spray_mist_stain", "crayon_rub_stick", "paint_dabber_opaque"];
}

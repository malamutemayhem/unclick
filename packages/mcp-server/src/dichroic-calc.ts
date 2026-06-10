export type DichroicType = "thin_film_clear" | "pattern_cap_texture" | "solid_black_back" | "crinkle_foil_shimmer" | "slide_film_art";

export function colorShift(t: DichroicType): number {
  const m: Record<DichroicType, number> = {
    thin_film_clear: 10, pattern_cap_texture: 8, solid_black_back: 9, crinkle_foil_shimmer: 7, slide_film_art: 6,
  };
  return m[t];
}

export function patternDetail(t: DichroicType): number {
  const m: Record<DichroicType, number> = {
    thin_film_clear: 4, pattern_cap_texture: 10, solid_black_back: 5, crinkle_foil_shimmer: 7, slide_film_art: 9,
  };
  return m[t];
}

export function brightness(t: DichroicType): number {
  const m: Record<DichroicType, number> = {
    thin_film_clear: 8, pattern_cap_texture: 7, solid_black_back: 10, crinkle_foil_shimmer: 9, slide_film_art: 6,
  };
  return m[t];
}

export function fuseEase(t: DichroicType): number {
  const m: Record<DichroicType, number> = {
    thin_film_clear: 9, pattern_cap_texture: 7, solid_black_back: 8, crinkle_foil_shimmer: 6, slide_film_art: 5,
  };
  return m[t];
}

export function glassCost(t: DichroicType): number {
  const m: Record<DichroicType, number> = {
    thin_film_clear: 4, pattern_cap_texture: 5, solid_black_back: 4, crinkle_foil_shimmer: 3, slide_film_art: 5,
  };
  return m[t];
}

export function transparent(t: DichroicType): boolean {
  const m: Record<DichroicType, boolean> = {
    thin_film_clear: true, pattern_cap_texture: false, solid_black_back: false, crinkle_foil_shimmer: false, slide_film_art: true,
  };
  return m[t];
}

export function textured(t: DichroicType): boolean {
  const m: Record<DichroicType, boolean> = {
    thin_film_clear: false, pattern_cap_texture: true, solid_black_back: false, crinkle_foil_shimmer: true, slide_film_art: false,
  };
  return m[t];
}

export function coatingType(t: DichroicType): string {
  const m: Record<DichroicType, string> = {
    thin_film_clear: "metallic_oxide_layer",
    pattern_cap_texture: "patterned_metal_coat",
    solid_black_back: "metal_oxide_on_black",
    crinkle_foil_shimmer: "crinkled_metal_foil",
    slide_film_art: "dichroic_slide_fused",
  };
  return m[t];
}

export function bestUse(t: DichroicType): string {
  const m: Record<DichroicType, string> = {
    thin_film_clear: "jewelry_pendant_cab",
    pattern_cap_texture: "accent_cap_layer",
    solid_black_back: "bold_color_display",
    crinkle_foil_shimmer: "texture_shimmer_piece",
    slide_film_art: "artistic_image_fuse",
  };
  return m[t];
}

export function dichroicGlass(): DichroicType[] {
  return ["thin_film_clear", "pattern_cap_texture", "solid_black_back", "crinkle_foil_shimmer", "slide_film_art"];
}

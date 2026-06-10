export type PictureFrameType = "wood_gallery_classic" | "metal_modern_thin" | "floating_acrylic" | "shadow_box_deep" | "clip_frameless_glass";

export function aestheticAppeal(t: PictureFrameType): number {
  const m: Record<PictureFrameType, number> = {
    wood_gallery_classic: 9, metal_modern_thin: 7, floating_acrylic: 8, shadow_box_deep: 10, clip_frameless_glass: 5,
  };
  return m[t];
}

export function durability(t: PictureFrameType): number {
  const m: Record<PictureFrameType, number> = {
    wood_gallery_classic: 8, metal_modern_thin: 9, floating_acrylic: 5, shadow_box_deep: 7, clip_frameless_glass: 4,
  };
  return m[t];
}

export function versatility(t: PictureFrameType): number {
  const m: Record<PictureFrameType, number> = {
    wood_gallery_classic: 7, metal_modern_thin: 8, floating_acrylic: 6, shadow_box_deep: 10, clip_frameless_glass: 5,
  };
  return m[t];
}

export function easySwap(t: PictureFrameType): number {
  const m: Record<PictureFrameType, number> = {
    wood_gallery_classic: 5, metal_modern_thin: 7, floating_acrylic: 4, shadow_box_deep: 3, clip_frameless_glass: 10,
  };
  return m[t];
}

export function frameCost(t: PictureFrameType): number {
  const m: Record<PictureFrameType, number> = {
    wood_gallery_classic: 6, metal_modern_thin: 4, floating_acrylic: 5, shadow_box_deep: 8, clip_frameless_glass: 2,
  };
  return m[t];
}

export function uvGlass(t: PictureFrameType): boolean {
  const m: Record<PictureFrameType, boolean> = {
    wood_gallery_classic: true, metal_modern_thin: false, floating_acrylic: false, shadow_box_deep: true, clip_frameless_glass: false,
  };
  return m[t];
}

export function matIncluded(t: PictureFrameType): boolean {
  const m: Record<PictureFrameType, boolean> = {
    wood_gallery_classic: true, metal_modern_thin: true, floating_acrylic: false, shadow_box_deep: false, clip_frameless_glass: false,
  };
  return m[t];
}

export function frameMaterial(t: PictureFrameType): string {
  const m: Record<PictureFrameType, string> = {
    wood_gallery_classic: "solid_hardwood_stained",
    metal_modern_thin: "extruded_aluminum_anodized",
    floating_acrylic: "clear_cast_acrylic_standoff",
    shadow_box_deep: "mdf_wrapped_deep_box",
    clip_frameless_glass: "tempered_glass_spring_clip",
  };
  return m[t];
}

export function bestDisplay(t: PictureFrameType): string {
  const m: Record<PictureFrameType, string> = {
    wood_gallery_classic: "family_portrait_gallery_wall",
    metal_modern_thin: "minimalist_poster_print",
    floating_acrylic: "modern_art_clean_float",
    shadow_box_deep: "memorabilia_3d_object",
    clip_frameless_glass: "quick_swap_photo_display",
  };
  return m[t];
}

export function pictureFrames(): PictureFrameType[] {
  return ["wood_gallery_classic", "metal_modern_thin", "floating_acrylic", "shadow_box_deep", "clip_frameless_glass"];
}

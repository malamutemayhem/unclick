export type ResinDyeType = "liquid_pigment_drop" | "mica_powder_shimmer" | "alcohol_ink_swirl" | "opaque_paste_solid" | "glow_phosphor_dark";

export function colorIntensity(t: ResinDyeType): number {
  const m: Record<ResinDyeType, number> = {
    liquid_pigment_drop: 9, mica_powder_shimmer: 7, alcohol_ink_swirl: 8, opaque_paste_solid: 10, glow_phosphor_dark: 6,
  };
  return m[t];
}

export function mixEase(t: ResinDyeType): number {
  const m: Record<ResinDyeType, number> = {
    liquid_pigment_drop: 10, mica_powder_shimmer: 7, alcohol_ink_swirl: 8, opaque_paste_solid: 6, glow_phosphor_dark: 5,
  };
  return m[t];
}

export function effectRange(t: ResinDyeType): number {
  const m: Record<ResinDyeType, number> = {
    liquid_pigment_drop: 6, mica_powder_shimmer: 10, alcohol_ink_swirl: 9, opaque_paste_solid: 4, glow_phosphor_dark: 8,
  };
  return m[t];
}

export function uvStability(t: ResinDyeType): number {
  const m: Record<ResinDyeType, number> = {
    liquid_pigment_drop: 8, mica_powder_shimmer: 9, alcohol_ink_swirl: 5, opaque_paste_solid: 10, glow_phosphor_dark: 6,
  };
  return m[t];
}

export function dyeCost(t: ResinDyeType): number {
  const m: Record<ResinDyeType, number> = {
    liquid_pigment_drop: 1, mica_powder_shimmer: 1, alcohol_ink_swirl: 2, opaque_paste_solid: 1, glow_phosphor_dark: 3,
  };
  return m[t];
}

export function transparent(t: ResinDyeType): boolean {
  const m: Record<ResinDyeType, boolean> = {
    liquid_pigment_drop: true, mica_powder_shimmer: false, alcohol_ink_swirl: true, opaque_paste_solid: false, glow_phosphor_dark: false,
  };
  return m[t];
}

export function glowsInDark(t: ResinDyeType): boolean {
  const m: Record<ResinDyeType, boolean> = {
    liquid_pigment_drop: false, mica_powder_shimmer: false, alcohol_ink_swirl: false, opaque_paste_solid: false, glow_phosphor_dark: true,
  };
  return m[t];
}

export function pigmentType(t: ResinDyeType): string {
  const m: Record<ResinDyeType, string> = {
    liquid_pigment_drop: "concentrated_liquid_dye",
    mica_powder_shimmer: "ground_mica_mineral",
    alcohol_ink_swirl: "dye_in_alcohol_base",
    opaque_paste_solid: "titanium_oxide_paste",
    glow_phosphor_dark: "strontium_aluminate",
  };
  return m[t];
}

export function bestEffect(t: ResinDyeType): string {
  const m: Record<ResinDyeType, string> = {
    liquid_pigment_drop: "transparent_tint_color",
    mica_powder_shimmer: "metallic_shimmer_shift",
    alcohol_ink_swirl: "petri_dish_bloom",
    opaque_paste_solid: "solid_color_block",
    glow_phosphor_dark: "night_glow_accent",
  };
  return m[t];
}

export function resinDyes(): ResinDyeType[] {
  return ["liquid_pigment_drop", "mica_powder_shimmer", "alcohol_ink_swirl", "opaque_paste_solid", "glow_phosphor_dark"];
}

export type ResinPigmentType = "liquid_dye_transparent" | "mica_powder_shimmer" | "alcohol_ink_swirl" | "opaque_paste_solid" | "glow_phosphor_dark";

export function colorIntensity(t: ResinPigmentType): number {
  const m: Record<ResinPigmentType, number> = {
    liquid_dye_transparent: 8, mica_powder_shimmer: 7, alcohol_ink_swirl: 9, opaque_paste_solid: 10, glow_phosphor_dark: 5,
  };
  return m[t];
}

export function transparency(t: ResinPigmentType): number {
  const m: Record<ResinPigmentType, number> = {
    liquid_dye_transparent: 10, mica_powder_shimmer: 6, alcohol_ink_swirl: 7, opaque_paste_solid: 1, glow_phosphor_dark: 4,
  };
  return m[t];
}

export function mixEase(t: ResinPigmentType): number {
  const m: Record<ResinPigmentType, number> = {
    liquid_dye_transparent: 10, mica_powder_shimmer: 7, alcohol_ink_swirl: 8, opaque_paste_solid: 6, glow_phosphor_dark: 5,
  };
  return m[t];
}

export function effectRange(t: ResinPigmentType): number {
  const m: Record<ResinPigmentType, number> = {
    liquid_dye_transparent: 6, mica_powder_shimmer: 9, alcohol_ink_swirl: 10, opaque_paste_solid: 4, glow_phosphor_dark: 8,
  };
  return m[t];
}

export function pigmentCost(t: ResinPigmentType): number {
  const m: Record<ResinPigmentType, number> = {
    liquid_dye_transparent: 2, mica_powder_shimmer: 3, alcohol_ink_swirl: 4, opaque_paste_solid: 2, glow_phosphor_dark: 5,
  };
  return m[t];
}

export function uvStable(t: ResinPigmentType): boolean {
  const m: Record<ResinPigmentType, boolean> = {
    liquid_dye_transparent: false, mica_powder_shimmer: true, alcohol_ink_swirl: false, opaque_paste_solid: true, glow_phosphor_dark: true,
  };
  return m[t];
}

export function specialEffect(t: ResinPigmentType): boolean {
  const m: Record<ResinPigmentType, boolean> = {
    liquid_dye_transparent: false, mica_powder_shimmer: true, alcohol_ink_swirl: true, opaque_paste_solid: false, glow_phosphor_dark: true,
  };
  return m[t];
}

export function pigmentBase(t: ResinPigmentType): string {
  const m: Record<ResinPigmentType, string> = {
    liquid_dye_transparent: "solvent_based_liquid",
    mica_powder_shimmer: "mineral_mica_ground",
    alcohol_ink_swirl: "alcohol_solvent_ink",
    opaque_paste_solid: "titanium_oxide_paste",
    glow_phosphor_dark: "strontium_aluminate",
  };
  return m[t];
}

export function bestUse(t: ResinPigmentType): string {
  const m: Record<ResinPigmentType, string> = {
    liquid_dye_transparent: "clear_tint_jewelry",
    mica_powder_shimmer: "shimmer_galaxy_pour",
    alcohol_ink_swirl: "petri_dish_cell_art",
    opaque_paste_solid: "solid_color_casting",
    glow_phosphor_dark: "night_glow_accent",
  };
  return m[t];
}

export function resinPigments(): ResinPigmentType[] {
  return ["liquid_dye_transparent", "mica_powder_shimmer", "alcohol_ink_swirl", "opaque_paste_solid", "glow_phosphor_dark"];
}

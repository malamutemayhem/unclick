export type GuitarSlideType = "glass_pyrex_smooth" | "brass_heavy_warm" | "chrome_steel_bright" | "ceramic_porcelain_mellow" | "bone_natural_vintage";

export function toneWarmth(t: GuitarSlideType): number {
  const m: Record<GuitarSlideType, number> = {
    glass_pyrex_smooth: 7, brass_heavy_warm: 10, chrome_steel_bright: 5, ceramic_porcelain_mellow: 8, bone_natural_vintage: 9,
  };
  return m[t];
}

export function sustain(t: GuitarSlideType): number {
  const m: Record<GuitarSlideType, number> = {
    glass_pyrex_smooth: 8, brass_heavy_warm: 10, chrome_steel_bright: 9, ceramic_porcelain_mellow: 7, bone_natural_vintage: 6,
  };
  return m[t];
}

export function controlEase(t: GuitarSlideType): number {
  const m: Record<GuitarSlideType, number> = {
    glass_pyrex_smooth: 8, brass_heavy_warm: 6, chrome_steel_bright: 7, ceramic_porcelain_mellow: 7, bone_natural_vintage: 5,
  };
  return m[t];
}

export function slideWeight(t: GuitarSlideType): number {
  const m: Record<GuitarSlideType, number> = {
    glass_pyrex_smooth: 4, brass_heavy_warm: 10, chrome_steel_bright: 8, ceramic_porcelain_mellow: 5, bone_natural_vintage: 3,
  };
  return m[t];
}

export function slideCost(t: GuitarSlideType): number {
  const m: Record<GuitarSlideType, number> = {
    glass_pyrex_smooth: 1, brass_heavy_warm: 2, chrome_steel_bright: 2, ceramic_porcelain_mellow: 3, bone_natural_vintage: 3,
  };
  return m[t];
}

export function noiseFree(t: GuitarSlideType): boolean {
  const m: Record<GuitarSlideType, boolean> = {
    glass_pyrex_smooth: true, brass_heavy_warm: false, chrome_steel_bright: false, ceramic_porcelain_mellow: true, bone_natural_vintage: true,
  };
  return m[t];
}

export function breakResist(t: GuitarSlideType): boolean {
  const m: Record<GuitarSlideType, boolean> = {
    glass_pyrex_smooth: false, brass_heavy_warm: true, chrome_steel_bright: true, ceramic_porcelain_mellow: false, bone_natural_vintage: false,
  };
  return m[t];
}

export function slideMaterial(t: GuitarSlideType): string {
  const m: Record<GuitarSlideType, string> = {
    glass_pyrex_smooth: "borosilicate_tempered",
    brass_heavy_warm: "solid_brass_machined",
    chrome_steel_bright: "chromium_plated_tube",
    ceramic_porcelain_mellow: "kiln_fired_ceramic",
    bone_natural_vintage: "polished_cattle_bone",
  };
  return m[t];
}

export function bestGenre(t: GuitarSlideType): string {
  const m: Record<GuitarSlideType, string> = {
    glass_pyrex_smooth: "delta_blues_acoustic",
    brass_heavy_warm: "electric_blues_rock",
    chrome_steel_bright: "country_pedal_steel",
    ceramic_porcelain_mellow: "folk_fingerpick_mellow",
    bone_natural_vintage: "hawaiian_slack_key",
  };
  return m[t];
}

export function guitarSlides(): GuitarSlideType[] {
  return ["glass_pyrex_smooth", "brass_heavy_warm", "chrome_steel_bright", "ceramic_porcelain_mellow", "bone_natural_vintage"];
}

export type BarenType = "bamboo_sheath_traditional" | "ball_bearing_modern" | "wooden_disc_flat" | "teflon_smooth_glide" | "murasaki_lacquer_pro";

export function pressureEven(t: BarenType): number {
  const m: Record<BarenType, number> = {
    bamboo_sheath_traditional: 8, ball_bearing_modern: 10, wooden_disc_flat: 6, teflon_smooth_glide: 9, murasaki_lacquer_pro: 9,
  };
  return m[t];
}

export function forceNeeded(t: BarenType): number {
  const m: Record<BarenType, number> = {
    bamboo_sheath_traditional: 6, ball_bearing_modern: 9, wooden_disc_flat: 4, teflon_smooth_glide: 8, murasaki_lacquer_pro: 7,
  };
  return m[t];
}

export function printClarity(t: BarenType): number {
  const m: Record<BarenType, number> = {
    bamboo_sheath_traditional: 9, ball_bearing_modern: 8, wooden_disc_flat: 6, teflon_smooth_glide: 7, murasaki_lacquer_pro: 10,
  };
  return m[t];
}

export function durability(t: BarenType): number {
  const m: Record<BarenType, number> = {
    bamboo_sheath_traditional: 5, ball_bearing_modern: 10, wooden_disc_flat: 8, teflon_smooth_glide: 9, murasaki_lacquer_pro: 7,
  };
  return m[t];
}

export function barenCost(t: BarenType): number {
  const m: Record<BarenType, number> = {
    bamboo_sheath_traditional: 2, ball_bearing_modern: 2, wooden_disc_flat: 1, teflon_smooth_glide: 1, murasaki_lacquer_pro: 4,
  };
  return m[t];
}

export function traditional(t: BarenType): boolean {
  const m: Record<BarenType, boolean> = {
    bamboo_sheath_traditional: true, ball_bearing_modern: false, wooden_disc_flat: false, teflon_smooth_glide: false, murasaki_lacquer_pro: true,
  };
  return m[t];
}

export function forLargePrint(t: BarenType): boolean {
  const m: Record<BarenType, boolean> = {
    bamboo_sheath_traditional: true, ball_bearing_modern: true, wooden_disc_flat: false, teflon_smooth_glide: true, murasaki_lacquer_pro: true,
  };
  return m[t];
}

export function surfaceType(t: BarenType): string {
  const m: Record<BarenType, string> = {
    bamboo_sheath_traditional: "twisted_bamboo_cord",
    ball_bearing_modern: "steel_ball_bearing_pad",
    wooden_disc_flat: "smooth_hardwood_face",
    teflon_smooth_glide: "ptfe_coated_disc",
    murasaki_lacquer_pro: "lacquered_bamboo_coil",
  };
  return m[t];
}

export function bestPrint(t: BarenType): string {
  const m: Record<BarenType, string> = {
    bamboo_sheath_traditional: "moku_hanga_woodblock",
    ball_bearing_modern: "large_linocut_edition",
    wooden_disc_flat: "small_stamp_card",
    teflon_smooth_glide: "collagraph_textured",
    murasaki_lacquer_pro: "ukiyo_e_fine_detail",
  };
  return m[t];
}

export function barens(): BarenType[] {
  return ["bamboo_sheath_traditional", "ball_bearing_modern", "wooden_disc_flat", "teflon_smooth_glide", "murasaki_lacquer_pro"];
}

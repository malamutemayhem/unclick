// glass-nugget-calc - glass nugget / gem types for mosaic

export type GlassNugget =
  | "flat_back_clear"
  | "round_dome_color"
  | "faceted_gem_sparkle"
  | "irregular_pebble_natural"
  | "millefiori_slice_pattern";

const DATA: Record<GlassNugget, {
  lightEffect: number; colorDepth: number; setEase: number; sizeRange: number;
  cost: number; transparent: boolean; handmade: boolean; cutProfile: string; bestUse: string;
}> = {
  flat_back_clear:          { lightEffect: 7, colorDepth: 5, setEase: 9, sizeRange: 8, cost: 3, transparent: true, handmade: false, cutProfile: "flat_polished_back", bestUse: "general_accent_piece" },
  round_dome_color:         { lightEffect: 8, colorDepth: 8, setEase: 7, sizeRange: 7, cost: 4, transparent: true, handmade: false, cutProfile: "smooth_dome_top", bestUse: "color_highlight_mosaic" },
  faceted_gem_sparkle:      { lightEffect: 10, colorDepth: 7, setEase: 6, sizeRange: 5, cost: 7, transparent: true, handmade: false, cutProfile: "multi_facet_cut", bestUse: "sparkle_accent_design" },
  irregular_pebble_natural: { lightEffect: 5, colorDepth: 6, setEase: 5, sizeRange: 9, cost: 2, transparent: false, handmade: false, cutProfile: "tumbled_irregular_shape", bestUse: "organic_texture_fill" },
  millefiori_slice_pattern: { lightEffect: 6, colorDepth: 10, setEase: 8, sizeRange: 4, cost: 9, transparent: false, handmade: true, cutProfile: "cross_section_cane", bestUse: "decorative_pattern_inlay" },
};

const get = (n: GlassNugget) => DATA[n];
export const lightEffect = (n: GlassNugget) => get(n).lightEffect;
export const colorDepth = (n: GlassNugget) => get(n).colorDepth;
export const setEase = (n: GlassNugget) => get(n).setEase;
export const sizeRange = (n: GlassNugget) => get(n).sizeRange;
export const nuggetCost = (n: GlassNugget) => get(n).cost;
export const transparent = (n: GlassNugget) => get(n).transparent;
export const handmade = (n: GlassNugget) => get(n).handmade;
export const cutProfile = (n: GlassNugget) => get(n).cutProfile;
export const bestUse = (n: GlassNugget) => get(n).bestUse;
export const glassNuggets = (): GlassNugget[] => Object.keys(DATA) as GlassNugget[];

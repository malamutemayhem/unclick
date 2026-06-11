// head-band-calc - bookbinding headband types

export type HeadBand =
  | "machine_band_basic"
  | "hand_sewn_silk"
  | "woven_linen_classic"
  | "leather_band_durable"
  | "decorative_band_pattern";

const DATA: Record<HeadBand, {
  decorativeValue: number; durability: number; attachStrength: number; colorRange: number;
  cost: number; handSewn: boolean; forFine: boolean; bandMaterial: string; bestUse: string;
}> = {
  machine_band_basic:       { decorativeValue: 3, durability: 5, attachStrength: 5, colorRange: 8, cost: 1, handSewn: false, forFine: false, bandMaterial: "machine_woven_strip", bestUse: "economy_case_bind" },
  hand_sewn_silk:           { decorativeValue: 10, durability: 7, attachStrength: 9, colorRange: 9, cost: 9, handSewn: true, forFine: true, bandMaterial: "silk_thread_wrap", bestUse: "luxury_fine_binding" },
  woven_linen_classic:      { decorativeValue: 7, durability: 9, attachStrength: 8, colorRange: 5, cost: 6, handSewn: true, forFine: true, bandMaterial: "linen_core_weave", bestUse: "traditional_hardcover" },
  leather_band_durable:     { decorativeValue: 6, durability: 10, attachStrength: 10, colorRange: 4, cost: 8, handSewn: false, forFine: false, bandMaterial: "thin_leather_strip", bestUse: "durable_heavy_volume" },
  decorative_band_pattern:  { decorativeValue: 9, durability: 6, attachStrength: 6, colorRange: 10, cost: 5, handSewn: false, forFine: false, bandMaterial: "printed_ribbon_strip", bestUse: "custom_pattern_accent" },
};

const get = (b: HeadBand) => DATA[b];
export const decorativeValue = (b: HeadBand) => get(b).decorativeValue;
export const durability = (b: HeadBand) => get(b).durability;
export const attachStrength = (b: HeadBand) => get(b).attachStrength;
export const colorRange = (b: HeadBand) => get(b).colorRange;
export const bandCost = (b: HeadBand) => get(b).cost;
export const handSewn = (b: HeadBand) => get(b).handSewn;
export const forFine = (b: HeadBand) => get(b).forFine;
export const bandMaterial = (b: HeadBand) => get(b).bandMaterial;
export const bestUse = (b: HeadBand) => get(b).bestUse;
export const headBands = (): HeadBand[] => Object.keys(DATA) as HeadBand[];

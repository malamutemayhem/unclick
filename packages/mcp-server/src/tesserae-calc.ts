// tesserae-calc - mosaic tesserae material types

export type Tesserae =
  | "glass_tesserae_vivid"
  | "stone_tesserae_natural"
  | "ceramic_tesserae_matte"
  | "marble_tesserae_classic"
  | "gold_tesserae_leaf";

const DATA: Record<Tesserae, {
  colorRange: number; cutEase: number; durability: number; lightReflect: number;
  cost: number; transparent: boolean; forOutdoor: boolean; material: string; bestUse: string;
}> = {
  glass_tesserae_vivid:    { colorRange: 10, cutEase: 6, durability: 7, lightReflect: 9, cost: 6, transparent: true, forOutdoor: false, material: "soda_lime_glass", bestUse: "vivid_indoor_mosaic" },
  stone_tesserae_natural:  { colorRange: 5, cutEase: 4, durability: 10, lightReflect: 4, cost: 5, transparent: false, forOutdoor: true, material: "natural_quarried_stone", bestUse: "durable_outdoor_mosaic" },
  ceramic_tesserae_matte:  { colorRange: 7, cutEase: 7, durability: 8, lightReflect: 3, cost: 4, transparent: false, forOutdoor: true, material: "glazed_ceramic_tile", bestUse: "general_floor_mosaic" },
  marble_tesserae_classic: { colorRange: 4, cutEase: 5, durability: 9, lightReflect: 6, cost: 7, transparent: false, forOutdoor: true, material: "polished_marble_cube", bestUse: "classic_roman_mosaic" },
  gold_tesserae_leaf:      { colorRange: 3, cutEase: 6, durability: 8, lightReflect: 10, cost: 10, transparent: false, forOutdoor: false, material: "gold_leaf_glass_sand", bestUse: "luxury_accent_mosaic" },
};

const get = (t: Tesserae) => DATA[t];
export const colorRange = (t: Tesserae) => get(t).colorRange;
export const cutEase = (t: Tesserae) => get(t).cutEase;
export const durability = (t: Tesserae) => get(t).durability;
export const lightReflect = (t: Tesserae) => get(t).lightReflect;
export const tessCost = (t: Tesserae) => get(t).cost;
export const transparent = (t: Tesserae) => get(t).transparent;
export const forOutdoor = (t: Tesserae) => get(t).forOutdoor;
export const material = (t: Tesserae) => get(t).material;
export const bestUse = (t: Tesserae) => get(t).bestUse;
export const tesseraes = (): Tesserae[] => Object.keys(DATA) as Tesserae[];

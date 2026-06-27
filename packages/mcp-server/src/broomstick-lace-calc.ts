// broomstick-lace-calc - broomstick lace tool types

export type BroomstickLace =
  | "wood_dowel_classic"
  | "knitting_needle_large"
  | "acrylic_rod_smooth"
  | "bamboo_stick_light"
  | "metal_rod_heavy";

const DATA: Record<BroomstickLace, {
  loopEven: number; slideSmooth: number; durability: number; sizeRange: number;
  cost: number; natural: boolean; lightweight: boolean; rodMaterial: string; bestUse: string;
}> = {
  wood_dowel_classic:      { loopEven: 7, slideSmooth: 6, durability: 7, sizeRange: 8, cost: 2, natural: true, lightweight: false, rodMaterial: "hardwood_dowel_rod", bestUse: "traditional_broomstick" },
  knitting_needle_large:   { loopEven: 8, slideSmooth: 9, durability: 8, sizeRange: 7, cost: 5, natural: false, lightweight: true, rodMaterial: "coated_aluminum_rod", bestUse: "smooth_loop_pickup" },
  acrylic_rod_smooth:      { loopEven: 9, slideSmooth: 10, durability: 6, sizeRange: 6, cost: 4, natural: false, lightweight: true, rodMaterial: "polished_acrylic_tube", bestUse: "easy_slide_loops" },
  bamboo_stick_light:      { loopEven: 7, slideSmooth: 7, durability: 5, sizeRange: 9, cost: 3, natural: true, lightweight: true, rodMaterial: "smooth_bamboo_stick", bestUse: "lightweight_natural_work" },
  metal_rod_heavy:         { loopEven: 8, slideSmooth: 8, durability: 10, sizeRange: 7, cost: 6, natural: false, lightweight: false, rodMaterial: "stainless_steel_rod", bestUse: "heavy_yarn_broomstick" },
};

const get = (b: BroomstickLace) => DATA[b];
export const loopEven = (b: BroomstickLace) => get(b).loopEven;
export const slideSmooth = (b: BroomstickLace) => get(b).slideSmooth;
export const durability = (b: BroomstickLace) => get(b).durability;
export const sizeRange = (b: BroomstickLace) => get(b).sizeRange;
export const rodCost = (b: BroomstickLace) => get(b).cost;
export const natural = (b: BroomstickLace) => get(b).natural;
export const lightweight = (b: BroomstickLace) => get(b).lightweight;
export const rodMaterial = (b: BroomstickLace) => get(b).rodMaterial;
export const bestUse = (b: BroomstickLace) => get(b).bestUse;
export const broomstickLaces = (): BroomstickLace[] => Object.keys(DATA) as BroomstickLace[];

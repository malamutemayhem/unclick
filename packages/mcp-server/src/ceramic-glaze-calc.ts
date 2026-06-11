export type CeramicGlazeType =
  | "earthenware_low_fire"
  | "stoneware_mid_fire"
  | "porcelain_high_fire"
  | "raku_rapid_cool"
  | "crystalline_zinc_silicate";

interface CeramicGlazeData {
  temperature: number;
  durability: number;
  gloss: number;
  colorRange: number;
  cgCost: number;
  foodSafe: boolean;
  forDinnerware: boolean;
  firing: string;
  bestUse: string;
}

const DATA: Record<CeramicGlazeType, CeramicGlazeData> = {
  earthenware_low_fire: {
    temperature: 3, durability: 4, gloss: 7, colorRange: 10, cgCost: 3,
    foodSafe: false, forDinnerware: false,
    firing: "cone_06_to_02_1000c_max",
    bestUse: "decorative_tile_bright_color_art",
  },
  stoneware_mid_fire: {
    temperature: 6, durability: 8, gloss: 7, colorRange: 7, cgCost: 5,
    foodSafe: true, forDinnerware: true,
    firing: "cone_4_to_8_1200c_mid",
    bestUse: "functional_pottery_mug_bowl",
  },
  porcelain_high_fire: {
    temperature: 10, durability: 10, gloss: 9, colorRange: 5, cgCost: 7,
    foodSafe: true, forDinnerware: true,
    firing: "cone_10_to_12_1300c_high",
    bestUse: "fine_dinnerware_translucent_body",
  },
  raku_rapid_cool: {
    temperature: 4, durability: 2, gloss: 6, colorRange: 8, cgCost: 4,
    foodSafe: false, forDinnerware: false,
    firing: "rapid_cool_reduction_luster",
    bestUse: "art_piece_metallic_luster_crackle",
  },
  crystalline_zinc_silicate: {
    temperature: 9, durability: 7, gloss: 10, colorRange: 6, cgCost: 9,
    foodSafe: false, forDinnerware: false,
    firing: "controlled_cool_crystal_growth",
    bestUse: "art_vase_crystal_pattern_display",
  },
};

function get(t: CeramicGlazeType): CeramicGlazeData {
  return DATA[t];
}

export const temperature = (t: CeramicGlazeType) => get(t).temperature;
export const durability = (t: CeramicGlazeType) => get(t).durability;
export const gloss = (t: CeramicGlazeType) => get(t).gloss;
export const colorRange = (t: CeramicGlazeType) => get(t).colorRange;
export const cgCost = (t: CeramicGlazeType) => get(t).cgCost;
export const foodSafe = (t: CeramicGlazeType) => get(t).foodSafe;
export const forDinnerware = (t: CeramicGlazeType) => get(t).forDinnerware;
export const firing = (t: CeramicGlazeType) => get(t).firing;
export const bestUse = (t: CeramicGlazeType) => get(t).bestUse;
export const ceramicGlazeTypes = (): CeramicGlazeType[] =>
  Object.keys(DATA) as CeramicGlazeType[];

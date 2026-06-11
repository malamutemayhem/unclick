// tablet-weave-calc - tablet/card weaving tablet types

export type TabletWeave =
  | "square_card_basic"
  | "hexagonal_card_complex"
  | "triangular_card_twill"
  | "double_hole_card"
  | "acrylic_card_smooth";

const DATA: Record<TabletWeave, {
  patternRange: number; turnEase: number; durability: number; threadCapacity: number;
  cost: number; multiHole: boolean; forComplex: boolean; cardShape: string; bestUse: string;
}> = {
  square_card_basic:      { patternRange: 7, turnEase: 8, durability: 7, threadCapacity: 7, cost: 3, multiHole: false, forComplex: false, cardShape: "four_hole_square", bestUse: "general_band_weave" },
  hexagonal_card_complex: { patternRange: 10, turnEase: 5, durability: 7, threadCapacity: 10, cost: 5, multiHole: true, forComplex: true, cardShape: "six_hole_hexagon", bestUse: "complex_pattern_band" },
  triangular_card_twill:  { patternRange: 6, turnEase: 9, durability: 6, threadCapacity: 5, cost: 3, multiHole: false, forComplex: false, cardShape: "three_hole_triangle", bestUse: "simple_twill_band" },
  double_hole_card:       { patternRange: 4, turnEase: 10, durability: 7, threadCapacity: 4, cost: 2, multiHole: false, forComplex: false, cardShape: "two_hole_simple", bestUse: "beginner_plain_band" },
  acrylic_card_smooth:    { patternRange: 7, turnEase: 9, durability: 9, threadCapacity: 7, cost: 6, multiHole: false, forComplex: false, cardShape: "smooth_acrylic_square", bestUse: "smooth_turn_weave" },
};

const get = (t: TabletWeave) => DATA[t];
export const patternRange = (t: TabletWeave) => get(t).patternRange;
export const turnEase = (t: TabletWeave) => get(t).turnEase;
export const durability = (t: TabletWeave) => get(t).durability;
export const threadCapacity = (t: TabletWeave) => get(t).threadCapacity;
export const tabletCost = (t: TabletWeave) => get(t).cost;
export const multiHole = (t: TabletWeave) => get(t).multiHole;
export const forComplex = (t: TabletWeave) => get(t).forComplex;
export const cardShape = (t: TabletWeave) => get(t).cardShape;
export const bestUse = (t: TabletWeave) => get(t).bestUse;
export const tabletWeaves = (): TabletWeave[] => Object.keys(DATA) as TabletWeave[];

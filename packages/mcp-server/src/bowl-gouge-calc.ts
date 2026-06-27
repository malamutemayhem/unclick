// bowl-gouge-calc - wood lathe bowl gouge types

export type BowlGouge =
  | "traditional_grind_std"
  | "swept_back_irish"
  | "bottom_feeder_deep"
  | "micro_bowl_detail"
  | "heavy_bowl_stock";

const DATA: Record<BowlGouge, {
  hollowReach: number; surfaceFinish: number; controlCut: number; durability: number;
  cost: number; forDeep: boolean; forBeginners: boolean; grindAngle: string; bestUse: string;
}> = {
  traditional_grind_std: { hollowReach: 7, surfaceFinish: 7, controlCut: 8, durability: 8, cost: 6, forDeep: false, forBeginners: true, grindAngle: "standard_40_degree", bestUse: "general_bowl_turning" },
  swept_back_irish:      { hollowReach: 9, surfaceFinish: 9, controlCut: 6, durability: 7, cost: 8, forDeep: true, forBeginners: false, grindAngle: "swept_back_60", bestUse: "deep_hollow_finish" },
  bottom_feeder_deep:    { hollowReach: 10, surfaceFinish: 6, controlCut: 5, durability: 9, cost: 7, forDeep: true, forBeginners: false, grindAngle: "steep_bottom_70", bestUse: "deep_vessel_bottom" },
  micro_bowl_detail:     { hollowReach: 5, surfaceFinish: 8, controlCut: 9, durability: 6, cost: 5, forDeep: false, forBeginners: true, grindAngle: "fine_detail_35", bestUse: "small_bowl_detail" },
  heavy_bowl_stock:      { hollowReach: 8, surfaceFinish: 5, controlCut: 7, durability: 10, cost: 9, forDeep: false, forBeginners: false, grindAngle: "aggressive_45", bestUse: "large_bowl_rough" },
};

const get = (g: BowlGouge) => DATA[g];
export const hollowReach = (g: BowlGouge) => get(g).hollowReach;
export const surfaceFinish = (g: BowlGouge) => get(g).surfaceFinish;
export const controlCut = (g: BowlGouge) => get(g).controlCut;
export const durability = (g: BowlGouge) => get(g).durability;
export const gougeCost = (g: BowlGouge) => get(g).cost;
export const forDeep = (g: BowlGouge) => get(g).forDeep;
export const forBeginners = (g: BowlGouge) => get(g).forBeginners;
export const grindAngle = (g: BowlGouge) => get(g).grindAngle;
export const bestUse = (g: BowlGouge) => get(g).bestUse;
export const bowlGouges = (): BowlGouge[] => Object.keys(DATA) as BowlGouge[];

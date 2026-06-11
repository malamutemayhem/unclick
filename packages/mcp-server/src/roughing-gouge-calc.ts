// roughing-gouge-calc - wood lathe roughing gouge types

export type RoughingGouge =
  | "standard_roughing_wide"
  | "continental_roughing_deep"
  | "fingernail_roughing_mod"
  | "mini_roughing_detail"
  | "heavy_roughing_stock";

const DATA: Record<RoughingGouge, {
  stockRemoval: number; surfaceFinish: number; controlEase: number; durability: number;
  cost: number; forBowl: boolean; forBeginners: boolean; fluteProfile: string; bestUse: string;
}> = {
  standard_roughing_wide:    { stockRemoval: 9, surfaceFinish: 5, controlEase: 8, durability: 8, cost: 5, forBowl: false, forBeginners: true, fluteProfile: "wide_u_channel", bestUse: "general_spindle_rough" },
  continental_roughing_deep: { stockRemoval: 10, surfaceFinish: 4, controlEase: 7, durability: 9, cost: 6, forBowl: false, forBeginners: false, fluteProfile: "deep_v_channel", bestUse: "heavy_stock_removal" },
  fingernail_roughing_mod:   { stockRemoval: 7, surfaceFinish: 8, controlEase: 6, durability: 7, cost: 7, forBowl: true, forBeginners: false, fluteProfile: "swept_fingernail", bestUse: "roughing_to_finish" },
  mini_roughing_detail:      { stockRemoval: 5, surfaceFinish: 7, controlEase: 9, durability: 6, cost: 4, forBowl: false, forBeginners: true, fluteProfile: "narrow_u_channel", bestUse: "small_spindle_rough" },
  heavy_roughing_stock:      { stockRemoval: 10, surfaceFinish: 3, controlEase: 5, durability: 10, cost: 8, forBowl: false, forBeginners: false, fluteProfile: "extra_wide_u", bestUse: "large_blank_round" },
};

const get = (g: RoughingGouge) => DATA[g];
export const stockRemoval = (g: RoughingGouge) => get(g).stockRemoval;
export const surfaceFinish = (g: RoughingGouge) => get(g).surfaceFinish;
export const controlEase = (g: RoughingGouge) => get(g).controlEase;
export const durability = (g: RoughingGouge) => get(g).durability;
export const gougeCost = (g: RoughingGouge) => get(g).cost;
export const forBowl = (g: RoughingGouge) => get(g).forBowl;
export const forBeginners = (g: RoughingGouge) => get(g).forBeginners;
export const fluteProfile = (g: RoughingGouge) => get(g).fluteProfile;
export const bestUse = (g: RoughingGouge) => get(g).bestUse;
export const roughingGouges = (): RoughingGouge[] => Object.keys(DATA) as RoughingGouge[];

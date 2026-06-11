export type GilderTipType =
  | "squirrel_hair_standard"
  | "badger_hair_fine"
  | "synthetic_hair_budget"
  | "wide_tip_large"
  | "narrow_tip_detail";

const specs: Record<GilderTipType, {
  pickupClean: number; controlPlace: number; staticHold: number;
  widthRange: number; cost: number; natural: boolean; forDetail: boolean;
  hairSource: string; use: string;
}> = {
  squirrel_hair_standard: {
    pickupClean: 90, controlPlace: 88, staticHold: 85,
    widthRange: 82, cost: 8, natural: true, forDetail: false,
    hairSource: "squirrel_tail_hair", use: "general_leaf_pickup",
  },
  badger_hair_fine: {
    pickupClean: 92, controlPlace: 90, staticHold: 88,
    widthRange: 78, cost: 12, natural: true, forDetail: true,
    hairSource: "badger_belly_hair", use: "fine_detail_placement",
  },
  synthetic_hair_budget: {
    pickupClean: 78, controlPlace: 80, staticHold: 75,
    widthRange: 80, cost: 4, natural: false, forDetail: false,
    hairSource: "nylon_synthetic_fiber", use: "beginner_practice_gild",
  },
  wide_tip_large: {
    pickupClean: 85, controlPlace: 82, staticHold: 82,
    widthRange: 95, cost: 10, natural: true, forDetail: false,
    hairSource: "squirrel_wide_cut", use: "large_area_coverage",
  },
  narrow_tip_detail: {
    pickupClean: 88, controlPlace: 92, staticHold: 85,
    widthRange: 70, cost: 9, natural: true, forDetail: true,
    hairSource: "fine_squirrel_strip", use: "narrow_line_gilding",
  },
};

export function pickupClean(t: GilderTipType): number { return specs[t].pickupClean; }
export function controlPlace(t: GilderTipType): number { return specs[t].controlPlace; }
export function staticHold(t: GilderTipType): number { return specs[t].staticHold; }
export function widthRange(t: GilderTipType): number { return specs[t].widthRange; }
export function tipCost(t: GilderTipType): number { return specs[t].cost; }
export function natural(t: GilderTipType): boolean { return specs[t].natural; }
export function forDetail(t: GilderTipType): boolean { return specs[t].forDetail; }
export function hairSource(t: GilderTipType): string { return specs[t].hairSource; }
export function bestUse(t: GilderTipType): string { return specs[t].use; }
export function gilderTips(): GilderTipType[] { return Object.keys(specs) as GilderTipType[]; }

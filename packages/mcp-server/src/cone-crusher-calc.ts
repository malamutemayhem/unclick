export type ConeCrusherType =
  | "standard_head_secondary"
  | "short_head_tertiary"
  | "gyradisc_fine_crush"
  | "spring_cone_legacy"
  | "hydraulic_cone_auto";

interface ConeCrusherData {
  capacity: number;
  productShape: number;
  reductionRatio: number;
  automation: number;
  ccCost: number;
  hydraulic: boolean;
  forFine: boolean;
  mantle: string;
  bestUse: string;
}

const DATA: Record<ConeCrusherType, ConeCrusherData> = {
  standard_head_secondary: {
    capacity: 9, productShape: 7, reductionRatio: 6, automation: 7, ccCost: 6,
    hydraulic: true, forFine: false,
    mantle: "standard_mantle_wide_feed_opening",
    bestUse: "secondary_crush_aggregate_mine_medium",
  },
  short_head_tertiary: {
    capacity: 6, productShape: 9, reductionRatio: 8, automation: 7, ccCost: 7,
    hydraulic: true, forFine: true,
    mantle: "short_head_steep_angle_fine_close",
    bestUse: "tertiary_crush_fine_aggregate_shape",
  },
  gyradisc_fine_crush: {
    capacity: 4, productShape: 10, reductionRatio: 9, automation: 6, ccCost: 8,
    hydraulic: false, forFine: true,
    mantle: "flat_disc_mantle_inter_particle_crush",
    bestUse: "very_fine_product_sand_manufacture",
  },
  spring_cone_legacy: {
    capacity: 7, productShape: 6, reductionRatio: 5, automation: 3, ccCost: 4,
    hydraulic: false, forFine: false,
    mantle: "spring_loaded_mantle_mechanical_release",
    bestUse: "budget_secondary_medium_hard_rock",
  },
  hydraulic_cone_auto: {
    capacity: 10, productShape: 8, reductionRatio: 7, automation: 10, ccCost: 9,
    hydraulic: true, forFine: false,
    mantle: "hydraulic_adjust_auto_clear_tramp_iron",
    bestUse: "high_capacity_auto_adjust_large_mine",
  },
};

function get(t: ConeCrusherType): ConeCrusherData {
  return DATA[t];
}

export const capacity = (t: ConeCrusherType) => get(t).capacity;
export const productShape = (t: ConeCrusherType) => get(t).productShape;
export const reductionRatio = (t: ConeCrusherType) => get(t).reductionRatio;
export const automation = (t: ConeCrusherType) => get(t).automation;
export const ccCost = (t: ConeCrusherType) => get(t).ccCost;
export const hydraulic = (t: ConeCrusherType) => get(t).hydraulic;
export const forFine = (t: ConeCrusherType) => get(t).forFine;
export const mantle = (t: ConeCrusherType) => get(t).mantle;
export const bestUse = (t: ConeCrusherType) => get(t).bestUse;
export const coneCrusherTypes = (): ConeCrusherType[] =>
  Object.keys(DATA) as ConeCrusherType[];

export type BallMillOreType =
  | "overflow_ball"
  | "grate_discharge"
  | "rod_mill"
  | "sag_mill"
  | "tower_mill";

interface BallMillOreData {
  grindFineness: number;
  throughput: number;
  energyEfficiency: number;
  mediaWear: number;
  bmCost: number;
  autogenous: boolean;
  forUltrafine: boolean;
  millConfig: string;
  bestUse: string;
}

const DATA: Record<BallMillOreType, BallMillOreData> = {
  overflow_ball: {
    grindFineness: 9, throughput: 8, energyEfficiency: 7, mediaWear: 6, bmCost: 7,
    autogenous: false, forUltrafine: false,
    millConfig: "overflow_ball_mill_slurry_overflow_discharge_fine_grind_wet",
    bestUse: "gold_copper_overflow_ball_mill_secondary_fine_grind_flotation",
  },
  grate_discharge: {
    grindFineness: 7, throughput: 9, energyEfficiency: 8, mediaWear: 7, bmCost: 8,
    autogenous: false, forUltrafine: false,
    millConfig: "grate_discharge_ball_mill_grate_plate_coarse_product_high_cap",
    bestUse: "iron_ore_grate_discharge_ball_mill_primary_grind_high_capacity",
  },
  rod_mill: {
    grindFineness: 6, throughput: 8, energyEfficiency: 8, mediaWear: 5, bmCost: 6,
    autogenous: false, forUltrafine: false,
    millConfig: "rod_mill_steel_rod_line_contact_grind_uniform_coarse_product",
    bestUse: "aggregate_rod_mill_uniform_coarse_grind_minimal_fines_sand",
  },
  sag_mill: {
    grindFineness: 6, throughput: 10, energyEfficiency: 9, mediaWear: 8, bmCost: 10,
    autogenous: true, forUltrafine: false,
    millConfig: "sag_mill_semi_autogenous_ore_media_large_diameter_primary_grind",
    bestUse: "large_mine_sag_mill_primary_grind_ore_itself_media_copper_gold",
  },
  tower_mill: {
    grindFineness: 10, throughput: 5, energyEfficiency: 9, mediaWear: 4, bmCost: 8,
    autogenous: false, forUltrafine: true,
    millConfig: "tower_mill_vertical_stirred_media_ultrafine_grind_regrind",
    bestUse: "regrind_tower_mill_ultrafine_grind_concentrate_leach_recovery",
  },
};

function get(t: BallMillOreType): BallMillOreData {
  return DATA[t];
}

export const grindFineness = (t: BallMillOreType) => get(t).grindFineness;
export const throughput = (t: BallMillOreType) => get(t).throughput;
export const energyEfficiency = (t: BallMillOreType) => get(t).energyEfficiency;
export const mediaWear = (t: BallMillOreType) => get(t).mediaWear;
export const bmCost = (t: BallMillOreType) => get(t).bmCost;
export const autogenous = (t: BallMillOreType) => get(t).autogenous;
export const forUltrafine = (t: BallMillOreType) => get(t).forUltrafine;
export const millConfig = (t: BallMillOreType) => get(t).millConfig;
export const bestUse = (t: BallMillOreType) => get(t).bestUse;
export const ballMillOreTypes = (): BallMillOreType[] =>
  Object.keys(DATA) as BallMillOreType[];

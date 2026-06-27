export type MaltMillType =
  | "two_roller"
  | "four_roller"
  | "six_roller"
  | "wet_mill"
  | "hammer_mill";

interface MaltMillData {
  grindConsistency: number;
  throughput: number;
  huskPreservation: number;
  adjustability: number;
  mmCost: number;
  wetProcess: boolean;
  forCraft: boolean;
  millConfig: string;
  bestUse: string;
}

const DATA: Record<MaltMillType, MaltMillData> = {
  two_roller: {
    grindConsistency: 6, throughput: 5, huskPreservation: 7, adjustability: 5, mmCost: 3,
    wetProcess: false, forCraft: true,
    millConfig: "two_roller_malt_mill_single_gap_gravity_feed_manual_adjust",
    bestUse: "small_craft_brewery_two_roller_malt_mill_homebrew_pilot_batch",
  },
  four_roller: {
    grindConsistency: 8, throughput: 7, huskPreservation: 9, adjustability: 8, mmCost: 6,
    wetProcess: false, forCraft: true,
    millConfig: "four_roller_malt_mill_two_gap_pre_break_husk_preserve_adjust",
    bestUse: "mid_size_craft_brewery_four_roller_mill_husk_intact_lauter_aid",
  },
  six_roller: {
    grindConsistency: 10, throughput: 10, huskPreservation: 10, adjustability: 10, mmCost: 9,
    wetProcess: false, forCraft: false,
    millConfig: "six_roller_malt_mill_three_gap_industrial_precision_grind_sieve",
    bestUse: "large_industrial_brewery_six_roller_mill_high_extract_precision",
  },
  wet_mill: {
    grindConsistency: 9, throughput: 8, huskPreservation: 10, adjustability: 7, mmCost: 8,
    wetProcess: true, forCraft: false,
    millConfig: "wet_mill_steep_condition_malt_hydrate_husk_gentle_grind_extract",
    bestUse: "large_brewery_wet_mill_steep_condition_maximum_husk_preservation",
  },
  hammer_mill: {
    grindConsistency: 7, throughput: 9, huskPreservation: 3, adjustability: 4, mmCost: 5,
    wetProcess: false, forCraft: false,
    millConfig: "hammer_mill_malt_impact_grind_fine_flour_mash_filter_process",
    bestUse: "mash_filter_brewery_hammer_mill_fine_grind_high_extract_yield",
  },
};

function get(t: MaltMillType): MaltMillData {
  return DATA[t];
}

export const grindConsistency = (t: MaltMillType) => get(t).grindConsistency;
export const throughput = (t: MaltMillType) => get(t).throughput;
export const huskPreservation = (t: MaltMillType) => get(t).huskPreservation;
export const adjustability = (t: MaltMillType) => get(t).adjustability;
export const mmCost = (t: MaltMillType) => get(t).mmCost;
export const wetProcess = (t: MaltMillType) => get(t).wetProcess;
export const forCraft = (t: MaltMillType) => get(t).forCraft;
export const millConfig = (t: MaltMillType) => get(t).millConfig;
export const bestUse = (t: MaltMillType) => get(t).bestUse;
export const maltMillTypes = (): MaltMillType[] =>
  Object.keys(DATA) as MaltMillType[];

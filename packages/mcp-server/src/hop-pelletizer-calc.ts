export type HopPelletizerType =
  | "hammer_mill_t90"
  | "cryo_separation"
  | "t45_enriched"
  | "whole_cone_press"
  | "isomerized_extract";

interface HopPelletizerData {
  alphaPreservation: number;
  aromaRetention: number;
  storageLife: number;
  processingSpeed: number;
  hpCost: number;
  cryogenic: boolean;
  forDryHop: boolean;
  pelletConfig: string;
  bestUse: string;
}

const DATA: Record<HopPelletizerType, HopPelletizerData> = {
  hammer_mill_t90: {
    alphaPreservation: 8, aromaRetention: 7, storageLife: 8, processingSpeed: 9, hpCost: 4,
    cryogenic: false, forDryHop: true,
    pelletConfig: "hammer_mill_grind_compress_t90_standard_pellet_6mm_diameter",
    bestUse: "standard_brewing_pellet_kettle_addition_bittering_flavor_hop",
  },
  cryo_separation: {
    alphaPreservation: 10, aromaRetention: 10, storageLife: 9, processingSpeed: 5, hpCost: 10,
    cryogenic: true, forDryHop: true,
    pelletConfig: "cryogenic_separation_lupulin_powder_concentrate_high_alpha_oil",
    bestUse: "ipa_double_ipa_lupulin_concentrate_intense_aroma_low_vegetal",
  },
  t45_enriched: {
    alphaPreservation: 9, aromaRetention: 9, storageLife: 8, processingSpeed: 6, hpCost: 8,
    cryogenic: true, forDryHop: true,
    pelletConfig: "sieved_enriched_pellet_t45_higher_lupulin_ratio_concentrated",
    bestUse: "craft_ipa_pale_ale_enriched_pellet_higher_alpha_less_matter",
  },
  whole_cone_press: {
    alphaPreservation: 6, aromaRetention: 8, storageLife: 5, processingSpeed: 7, hpCost: 3,
    cryogenic: false, forDryHop: false,
    pelletConfig: "whole_cone_bale_press_vacuum_sealed_nitrogen_flush_preserve",
    bestUse: "traditional_whole_cone_brewing_hop_back_filter_bed_infusion",
  },
  isomerized_extract: {
    alphaPreservation: 7, aromaRetention: 4, storageLife: 10, processingSpeed: 10, hpCost: 6,
    cryogenic: false, forDryHop: false,
    pelletConfig: "co2_extract_isomerized_liquid_standardized_alpha_acid_dosing",
    bestUse: "large_brewery_standardized_bittering_extract_consistent_ibu",
  },
};

function get(t: HopPelletizerType): HopPelletizerData {
  return DATA[t];
}

export const alphaPreservation = (t: HopPelletizerType) => get(t).alphaPreservation;
export const aromaRetention = (t: HopPelletizerType) => get(t).aromaRetention;
export const storageLife = (t: HopPelletizerType) => get(t).storageLife;
export const processingSpeed = (t: HopPelletizerType) => get(t).processingSpeed;
export const hpCost = (t: HopPelletizerType) => get(t).hpCost;
export const cryogenic = (t: HopPelletizerType) => get(t).cryogenic;
export const forDryHop = (t: HopPelletizerType) => get(t).forDryHop;
export const pelletConfig = (t: HopPelletizerType) => get(t).pelletConfig;
export const bestUse = (t: HopPelletizerType) => get(t).bestUse;
export const hopPelletizerTypes = (): HopPelletizerType[] =>
  Object.keys(DATA) as HopPelletizerType[];

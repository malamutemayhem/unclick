export type OliveCrusherType =
  | "stone_mill"
  | "hammer_crusher"
  | "disc_crusher"
  | "blade_crusher"
  | "de_pitter";

interface OliveCrusherData {
  pasteFineness: number;
  throughput: number;
  heatGeneration: number;
  polyphenolRetention: number;
  ocCost: number;
  continuous: boolean;
  forExtraVirgin: boolean;
  crusherConfig: string;
  bestUse: string;
}

const DATA: Record<OliveCrusherType, OliveCrusherData> = {
  stone_mill: {
    pasteFineness: 6, throughput: 4, heatGeneration: 9, polyphenolRetention: 10, ocCost: 5,
    continuous: false, forExtraVirgin: true,
    crusherConfig: "stone_mill_granite_wheel_slow_crush_olive_paste_traditional_cold",
    bestUse: "traditional_estate_stone_mill_slow_crush_premium_extra_virgin_cold",
  },
  hammer_crusher: {
    pasteFineness: 9, throughput: 10, heatGeneration: 5, polyphenolRetention: 7, ocCost: 6,
    continuous: true, forExtraVirgin: true,
    crusherConfig: "hammer_crusher_high_speed_impact_fine_olive_paste_modern_mill",
    bestUse: "modern_olive_mill_hammer_crusher_high_volume_continuous_process",
  },
  disc_crusher: {
    pasteFineness: 8, throughput: 8, heatGeneration: 7, polyphenolRetention: 8, ocCost: 5,
    continuous: true, forExtraVirgin: true,
    crusherConfig: "disc_crusher_toothed_plate_olive_moderate_speed_good_paste_quality",
    bestUse: "mid_size_olive_mill_disc_crusher_balanced_throughput_paste_quality",
  },
  blade_crusher: {
    pasteFineness: 10, throughput: 9, heatGeneration: 4, polyphenolRetention: 6, ocCost: 7,
    continuous: true, forExtraVirgin: false,
    crusherConfig: "blade_crusher_knife_mill_very_fine_paste_high_extraction_pomace",
    bestUse: "high_extraction_olive_mill_blade_crusher_maximum_oil_yield_pomace",
  },
  de_pitter: {
    pasteFineness: 7, throughput: 6, heatGeneration: 8, polyphenolRetention: 9, ocCost: 8,
    continuous: true, forExtraVirgin: true,
    crusherConfig: "de_pitter_crusher_pit_remove_flesh_only_crush_delicate_fruity_oil",
    bestUse: "premium_evoo_de_pitter_crush_flesh_only_delicate_fruity_low_bitter",
  },
};

function get(t: OliveCrusherType): OliveCrusherData {
  return DATA[t];
}

export const pasteFineness = (t: OliveCrusherType) => get(t).pasteFineness;
export const throughput = (t: OliveCrusherType) => get(t).throughput;
export const heatGeneration = (t: OliveCrusherType) => get(t).heatGeneration;
export const polyphenolRetention = (t: OliveCrusherType) => get(t).polyphenolRetention;
export const ocCost = (t: OliveCrusherType) => get(t).ocCost;
export const continuous = (t: OliveCrusherType) => get(t).continuous;
export const forExtraVirgin = (t: OliveCrusherType) => get(t).forExtraVirgin;
export const crusherConfig = (t: OliveCrusherType) => get(t).crusherConfig;
export const bestUse = (t: OliveCrusherType) => get(t).bestUse;
export const oliveCrusherTypes = (): OliveCrusherType[] =>
  Object.keys(DATA) as OliveCrusherType[];

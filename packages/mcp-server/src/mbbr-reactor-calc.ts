export type MbbrReactorType =
  | "pure_mbbr_aerobic"
  | "ifas_integrated_fixed"
  | "anoxic_denitrification"
  | "anaerobic_mbbr_biogas"
  | "mbr_membrane_bioreactor";

interface MbbrReactorData {
  removal: number;
  compactness: number;
  resilience: number;
  operability: number;
  mrCost: number;
  membraneRequired: boolean;
  forNutrientRemoval: boolean;
  media: string;
  bestUse: string;
}

const DATA: Record<MbbrReactorType, MbbrReactorData> = {
  pure_mbbr_aerobic: {
    removal: 8, compactness: 8, resilience: 9, operability: 9, mrCost: 5,
    membraneRequired: false, forNutrientRemoval: false,
    media: "pe_carrier_element_biofilm",
    bestUse: "bod_removal_industrial_municipal",
  },
  ifas_integrated_fixed: {
    removal: 9, compactness: 7, resilience: 8, operability: 7, mrCost: 6,
    membraneRequired: false, forNutrientRemoval: true,
    media: "fixed_media_activated_sludge_mix",
    bestUse: "upgrade_existing_activated_sludge",
  },
  anoxic_denitrification: {
    removal: 8, compactness: 8, resilience: 8, operability: 8, mrCost: 6,
    membraneRequired: false, forNutrientRemoval: true,
    media: "anoxic_carrier_denitrify_zone",
    bestUse: "nitrogen_removal_cold_climate",
  },
  anaerobic_mbbr_biogas: {
    removal: 7, compactness: 7, resilience: 7, operability: 6, mrCost: 7,
    membraneRequired: false, forNutrientRemoval: false,
    media: "anaerobic_carrier_granular_biofilm",
    bestUse: "high_strength_food_waste_biogas",
  },
  mbr_membrane_bioreactor: {
    removal: 10, compactness: 10, resilience: 7, operability: 5, mrCost: 10,
    membraneRequired: true, forNutrientRemoval: true,
    media: "submerged_uf_mf_membrane_module",
    bestUse: "reuse_quality_effluent_compact",
  },
};

function get(t: MbbrReactorType): MbbrReactorData {
  return DATA[t];
}

export const removal = (t: MbbrReactorType) => get(t).removal;
export const compactness = (t: MbbrReactorType) => get(t).compactness;
export const resilience = (t: MbbrReactorType) => get(t).resilience;
export const operability = (t: MbbrReactorType) => get(t).operability;
export const mrCost = (t: MbbrReactorType) => get(t).mrCost;
export const membraneRequired = (t: MbbrReactorType) => get(t).membraneRequired;
export const forNutrientRemoval = (t: MbbrReactorType) => get(t).forNutrientRemoval;
export const media = (t: MbbrReactorType) => get(t).media;
export const bestUse = (t: MbbrReactorType) => get(t).bestUse;
export const mbbrReactorTypes = (): MbbrReactorType[] =>
  Object.keys(DATA) as MbbrReactorType[];

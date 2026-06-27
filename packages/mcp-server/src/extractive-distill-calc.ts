export type ExtractiveDistillType =
  | "solvent_based_standard"
  | "salt_effect_electrolyte"
  | "ionic_liquid_green"
  | "hyperbranched_polymer"
  | "deep_eutectic_solvent";

interface ExtractiveDistillData {
  selectivity: number;
  solventRecovery: number;
  energyUse: number;
  envFriendly: number;
  edCost: number;
  greenSolvent: boolean;
  forAzeotrope: boolean;
  entrainer: string;
  bestUse: string;
}

const DATA: Record<ExtractiveDistillType, ExtractiveDistillData> = {
  solvent_based_standard: {
    selectivity: 8, solventRecovery: 8, energyUse: 5, envFriendly: 5, edCost: 5,
    greenSolvent: false, forAzeotrope: true,
    entrainer: "nmp_dmf_sulfolane_high_boiling_polar_solvent",
    bestUse: "butadiene_from_c4_toluene_aromatics_extraction",
  },
  salt_effect_electrolyte: {
    selectivity: 9, solventRecovery: 7, energyUse: 6, envFriendly: 6, edCost: 4,
    greenSolvent: false, forAzeotrope: true,
    entrainer: "calcium_chloride_potassium_acetate_salt_effect",
    bestUse: "ethanol_water_azeotrope_breaking_salt_effect",
  },
  ionic_liquid_green: {
    selectivity: 9, solventRecovery: 9, energyUse: 7, envFriendly: 9, edCost: 8,
    greenSolvent: true, forAzeotrope: true,
    entrainer: "imidazolium_pyridinium_ionic_liquid_negligible_vp",
    bestUse: "aromatics_extraction_green_process_near_zero_voc",
  },
  hyperbranched_polymer: {
    selectivity: 8, solventRecovery: 10, energyUse: 7, envFriendly: 8, edCost: 7,
    greenSolvent: true, forAzeotrope: true,
    entrainer: "hyperbranched_polyglycerol_high_selectivity",
    bestUse: "thf_water_alcohol_ether_azeotrope_separation",
  },
  deep_eutectic_solvent: {
    selectivity: 8, solventRecovery: 8, energyUse: 7, envFriendly: 10, edCost: 6,
    greenSolvent: true, forAzeotrope: true,
    entrainer: "choline_chloride_urea_deep_eutectic_natural",
    bestUse: "bio_based_separation_green_chemistry_renewable",
  },
};

function get(t: ExtractiveDistillType): ExtractiveDistillData {
  return DATA[t];
}

export const selectivity = (t: ExtractiveDistillType) => get(t).selectivity;
export const solventRecovery = (t: ExtractiveDistillType) => get(t).solventRecovery;
export const energyUse = (t: ExtractiveDistillType) => get(t).energyUse;
export const envFriendly = (t: ExtractiveDistillType) => get(t).envFriendly;
export const edCost = (t: ExtractiveDistillType) => get(t).edCost;
export const greenSolvent = (t: ExtractiveDistillType) => get(t).greenSolvent;
export const forAzeotrope = (t: ExtractiveDistillType) => get(t).forAzeotrope;
export const entrainer = (t: ExtractiveDistillType) => get(t).entrainer;
export const bestUse = (t: ExtractiveDistillType) => get(t).bestUse;
export const extractiveDistillTypes = (): ExtractiveDistillType[] =>
  Object.keys(DATA) as ExtractiveDistillType[];

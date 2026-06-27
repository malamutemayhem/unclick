export type AzeotropicDistillType =
  | "heterogeneous_decanter"
  | "homogeneous_entrainer"
  | "pressure_swing_binary"
  | "reactive_azeotropic"
  | "membrane_assisted_hybrid";

interface AzeotropicDistillData {
  separation: number;
  energyUse: number;
  solventLoad: number;
  flexibility: number;
  adCost: number;
  solventFree: boolean;
  forWaterRemoval: boolean;
  method: string;
  bestUse: string;
}

const DATA: Record<AzeotropicDistillType, AzeotropicDistillData> = {
  heterogeneous_decanter: {
    separation: 9, energyUse: 6, solventLoad: 6, flexibility: 7, adCost: 6,
    solventFree: false, forWaterRemoval: true,
    method: "entrainer_forms_heterogeneous_azeotrope_decant",
    bestUse: "ethanol_dehydration_isopropanol_cyclohexane",
  },
  homogeneous_entrainer: {
    separation: 8, energyUse: 5, solventLoad: 5, flexibility: 6, adCost: 5,
    solventFree: false, forWaterRemoval: false,
    method: "light_entrainer_homogeneous_azeotrope_overhead",
    bestUse: "acetic_acid_water_ethyl_acetate_entrainer",
  },
  pressure_swing_binary: {
    separation: 8, energyUse: 7, solventLoad: 10, flexibility: 8, adCost: 7,
    solventFree: true, forWaterRemoval: false,
    method: "two_columns_different_pressure_azeotrope_shift",
    bestUse: "thf_water_acetonitrile_pressure_sensitive_azeo",
  },
  reactive_azeotropic: {
    separation: 9, energyUse: 8, solventLoad: 8, flexibility: 5, adCost: 8,
    solventFree: false, forWaterRemoval: true,
    method: "reaction_in_column_converts_azeotrope_component",
    bestUse: "methyl_acetate_hydrolysis_esterification_combo",
  },
  membrane_assisted_hybrid: {
    separation: 9, energyUse: 9, solventLoad: 10, flexibility: 9, adCost: 9,
    solventFree: true, forWaterRemoval: true,
    method: "pervaporation_membrane_plus_distillation_hybrid",
    bestUse: "bioethanol_dehydration_energy_efficient_hybrid",
  },
};

function get(t: AzeotropicDistillType): AzeotropicDistillData {
  return DATA[t];
}

export const separation = (t: AzeotropicDistillType) => get(t).separation;
export const energyUse = (t: AzeotropicDistillType) => get(t).energyUse;
export const solventLoad = (t: AzeotropicDistillType) => get(t).solventLoad;
export const flexibility = (t: AzeotropicDistillType) => get(t).flexibility;
export const adCost = (t: AzeotropicDistillType) => get(t).adCost;
export const solventFree = (t: AzeotropicDistillType) => get(t).solventFree;
export const forWaterRemoval = (t: AzeotropicDistillType) => get(t).forWaterRemoval;
export const method = (t: AzeotropicDistillType) => get(t).method;
export const bestUse = (t: AzeotropicDistillType) => get(t).bestUse;
export const azeotropicDistillTypes = (): AzeotropicDistillType[] =>
  Object.keys(DATA) as AzeotropicDistillType[];

export type CompressorStageType =
  | "axial_subsonic_blade"
  | "centrifugal_radial_impeller"
  | "axial_centrifugal_combo"
  | "supersonic_transonic_fan"
  | "diagonal_mixed_flow";

const DATA: Record<CompressorStageType, {
  pressureRatio: number; efficiency: number; flowRate: number;
  surgMargin: number; csCost: number; multiStage: boolean;
  forAero: boolean; rotor: string; bestUse: string;
}> = {
  axial_subsonic_blade: {
    pressureRatio: 6, efficiency: 9, flowRate: 10,
    surgMargin: 7, csCost: 4, multiStage: true,
    forAero: true, rotor: "bladed_disk_airfoil_cascade",
    bestUse: "large_gas_turbine_hp_lp_compressor",
  },
  centrifugal_radial_impeller: {
    pressureRatio: 8, efficiency: 7, flowRate: 5,
    surgMargin: 9, csCost: 2, multiStage: false,
    forAero: false, rotor: "radial_impeller_vaned_diffuser",
    bestUse: "small_turboshaft_turbocharger",
  },
  axial_centrifugal_combo: {
    pressureRatio: 9, efficiency: 8, flowRate: 7,
    surgMargin: 8, csCost: 4, multiStage: true,
    forAero: true, rotor: "axial_stages_plus_centrifugal",
    bestUse: "turboprop_small_turbofan_compact",
  },
  supersonic_transonic_fan: {
    pressureRatio: 10, efficiency: 8, flowRate: 10,
    surgMargin: 5, csCost: 5, multiStage: false,
    forAero: true, rotor: "swept_blade_shock_structure",
    bestUse: "turbofan_front_fan_bypass_stage",
  },
  diagonal_mixed_flow: {
    pressureRatio: 7, efficiency: 8, flowRate: 7,
    surgMargin: 8, csCost: 3, multiStage: false,
    forAero: false, rotor: "mixed_flow_impeller_45deg_exit",
    bestUse: "process_gas_moderate_flow_ratio",
  },
};

const get = (t: CompressorStageType) => DATA[t];

export const pressureRatio = (t: CompressorStageType) => get(t).pressureRatio;
export const efficiency = (t: CompressorStageType) => get(t).efficiency;
export const flowRate = (t: CompressorStageType) => get(t).flowRate;
export const surgMargin = (t: CompressorStageType) => get(t).surgMargin;
export const csCost = (t: CompressorStageType) => get(t).csCost;
export const multiStage = (t: CompressorStageType) => get(t).multiStage;
export const forAero = (t: CompressorStageType) => get(t).forAero;
export const rotor = (t: CompressorStageType) => get(t).rotor;
export const bestUse = (t: CompressorStageType) => get(t).bestUse;
export const compressorStageTypes = (): CompressorStageType[] => Object.keys(DATA) as CompressorStageType[];

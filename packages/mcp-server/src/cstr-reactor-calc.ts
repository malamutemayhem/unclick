export type CstrReactorType =
  | "standard_batch_cstr"
  | "continuous_stirred_overflow"
  | "cascade_multi_stage"
  | "loop_reactor_recycle"
  | "gas_sparged_cstr";

interface CstrReactorData {
  mixing: number;
  heatControl: number;
  scalability: number;
  flexibility: number;
  crCost: number;
  continuous: boolean;
  forExotherm: boolean;
  agitator: string;
  bestUse: string;
}

const DATA: Record<CstrReactorType, CstrReactorData> = {
  standard_batch_cstr: {
    mixing: 9, heatControl: 8, scalability: 6, flexibility: 10, crCost: 5,
    continuous: false, forExotherm: true,
    agitator: "rushton_turbine_baffle_jacket_coil",
    bestUse: "pharma_fine_chem_multi_product_batch",
  },
  continuous_stirred_overflow: {
    mixing: 8, heatControl: 7, scalability: 8, flexibility: 6, crCost: 6,
    continuous: true, forExotherm: true,
    agitator: "pitched_blade_overflow_weir_steady",
    bestUse: "polymer_emulsion_steady_state_react",
  },
  cascade_multi_stage: {
    mixing: 7, heatControl: 8, scalability: 9, flexibility: 5, crCost: 8,
    continuous: true, forExotherm: true,
    agitator: "series_vessel_inter_stage_pump_pipe",
    bestUse: "wastewater_bio_treat_staged_conversion",
  },
  loop_reactor_recycle: {
    mixing: 10, heatControl: 10, scalability: 7, flexibility: 4, crCost: 9,
    continuous: true, forExotherm: true,
    agitator: "external_loop_pump_heat_exchanger",
    bestUse: "highly_exothermic_polymerize_gas_absorb",
  },
  gas_sparged_cstr: {
    mixing: 8, heatControl: 6, scalability: 8, flexibility: 5, crCost: 7,
    continuous: true, forExotherm: false,
    agitator: "gas_sparger_ring_self_aspirate_impeller",
    bestUse: "ferment_aerobic_bio_gas_liquid_react",
  },
};

function get(t: CstrReactorType): CstrReactorData {
  return DATA[t];
}

export const mixing = (t: CstrReactorType) => get(t).mixing;
export const heatControl = (t: CstrReactorType) => get(t).heatControl;
export const scalability = (t: CstrReactorType) => get(t).scalability;
export const flexibility = (t: CstrReactorType) => get(t).flexibility;
export const crCost = (t: CstrReactorType) => get(t).crCost;
export const continuous = (t: CstrReactorType) => get(t).continuous;
export const forExotherm = (t: CstrReactorType) => get(t).forExotherm;
export const agitator = (t: CstrReactorType) => get(t).agitator;
export const bestUse = (t: CstrReactorType) => get(t).bestUse;
export const cstrReactorTypes = (): CstrReactorType[] =>
  Object.keys(DATA) as CstrReactorType[];

export type ScrewCompressorType =
  | "oil_injected_single"
  | "oil_injected_variable"
  | "oil_free_dry_screw"
  | "oil_free_water_inject"
  | "twin_screw_process";

interface ScrewCompressorData {
  efficiency: number;
  reliability: number;
  turndown: number;
  noiseLevel: number;
  scCost: number;
  oilFree: boolean;
  forContinuous: boolean;
  mechanism: string;
  bestUse: string;
}

const DATA: Record<ScrewCompressorType, ScrewCompressorData> = {
  oil_injected_single: {
    efficiency: 7, reliability: 9, turndown: 6, noiseLevel: 6, scCost: 4,
    oilFree: false, forContinuous: true,
    mechanism: "twin_screw_oil_injected_fixed_speed_simple",
    bestUse: "workshop_air_general_industrial_compressed",
  },
  oil_injected_variable: {
    efficiency: 9, reliability: 9, turndown: 10, noiseLevel: 7, scCost: 6,
    oilFree: false, forContinuous: true,
    mechanism: "twin_screw_oil_injected_vsd_variable_load",
    bestUse: "variable_demand_factory_air_energy_saving",
  },
  oil_free_dry_screw: {
    efficiency: 7, reliability: 8, turndown: 7, noiseLevel: 5, scCost: 8,
    oilFree: true, forContinuous: true,
    mechanism: "twin_screw_dry_no_oil_contact_timing_gear",
    bestUse: "pharma_food_electronics_clean_air_critical",
  },
  oil_free_water_inject: {
    efficiency: 8, reliability: 7, turndown: 8, noiseLevel: 8, scCost: 7,
    oilFree: true, forContinuous: true,
    mechanism: "single_screw_water_injected_seal_cool",
    bestUse: "food_grade_air_sensitive_process_low_temp",
  },
  twin_screw_process: {
    efficiency: 8, reliability: 8, turndown: 7, noiseLevel: 6, scCost: 9,
    oilFree: true, forContinuous: true,
    mechanism: "process_gas_twin_screw_custom_material_seal",
    bestUse: "process_gas_biogas_vapor_recovery_chemical",
  },
};

function get(t: ScrewCompressorType): ScrewCompressorData {
  return DATA[t];
}

export const efficiency = (t: ScrewCompressorType) => get(t).efficiency;
export const reliability = (t: ScrewCompressorType) => get(t).reliability;
export const turndown = (t: ScrewCompressorType) => get(t).turndown;
export const noiseLevel = (t: ScrewCompressorType) => get(t).noiseLevel;
export const scCost = (t: ScrewCompressorType) => get(t).scCost;
export const oilFree = (t: ScrewCompressorType) => get(t).oilFree;
export const forContinuous = (t: ScrewCompressorType) => get(t).forContinuous;
export const mechanism = (t: ScrewCompressorType) => get(t).mechanism;
export const bestUse = (t: ScrewCompressorType) => get(t).bestUse;
export const screwCompressorTypes = (): ScrewCompressorType[] =>
  Object.keys(DATA) as ScrewCompressorType[];

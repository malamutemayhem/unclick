export type PiezoPressType =
  | "piezoresistive_silicon"
  | "piezoelectric_quartz"
  | "thin_film_sputtered"
  | "capacitive_ceramic"
  | "sapphire_high_perf";

interface PiezoPressData {
  accuracy: number;
  dynamicRange: number;
  longTermStab: number;
  tempEffect: number;
  ppCost: number;
  staticMeasure: boolean;
  forDynamic: boolean;
  element: string;
  bestUse: string;
}

const DATA: Record<PiezoPressType, PiezoPressData> = {
  piezoresistive_silicon: {
    accuracy: 8, dynamicRange: 7, longTermStab: 7, tempEffect: 5, ppCost: 4,
    staticMeasure: true, forDynamic: false,
    element: "silicon_strain_gauge_mems_diffuse",
    bestUse: "general_industrial_transmitter_4_20ma",
  },
  piezoelectric_quartz: {
    accuracy: 7, dynamicRange: 10, longTermStab: 6, tempEffect: 6, ppCost: 7,
    staticMeasure: false, forDynamic: true,
    element: "quartz_crystal_charge_output_dynamic",
    bestUse: "combustion_blast_hydraulic_shock_fast",
  },
  thin_film_sputtered: {
    accuracy: 9, dynamicRange: 6, longTermStab: 9, tempEffect: 8, ppCost: 6,
    staticMeasure: true, forDynamic: false,
    element: "sputtered_metal_film_on_steel_diaphragm",
    bestUse: "precision_test_calibrate_long_term_drift",
  },
  capacitive_ceramic: {
    accuracy: 9, dynamicRange: 5, longTermStab: 8, tempEffect: 7, ppCost: 5,
    staticMeasure: true, forDynamic: false,
    element: "alumina_ceramic_capacitance_gap_change",
    bestUse: "clean_gas_liquid_low_pressure_precise",
  },
  sapphire_high_perf: {
    accuracy: 10, dynamicRange: 7, longTermStab: 10, tempEffect: 9, ppCost: 9,
    staticMeasure: true, forDynamic: false,
    element: "sapphire_on_titanium_resonant_silicon",
    bestUse: "nuclear_subsea_extreme_environment_ref",
  },
};

function get(t: PiezoPressType): PiezoPressData {
  return DATA[t];
}

export const accuracy = (t: PiezoPressType) => get(t).accuracy;
export const dynamicRange = (t: PiezoPressType) => get(t).dynamicRange;
export const longTermStab = (t: PiezoPressType) => get(t).longTermStab;
export const tempEffect = (t: PiezoPressType) => get(t).tempEffect;
export const ppCost = (t: PiezoPressType) => get(t).ppCost;
export const staticMeasure = (t: PiezoPressType) => get(t).staticMeasure;
export const forDynamic = (t: PiezoPressType) => get(t).forDynamic;
export const element = (t: PiezoPressType) => get(t).element;
export const bestUse = (t: PiezoPressType) => get(t).bestUse;
export const piezoPressTypes = (): PiezoPressType[] =>
  Object.keys(DATA) as PiezoPressType[];

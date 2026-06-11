export type DiaphragmPumpType =
  | "air_operated_double"
  | "electric_single_diaphragm"
  | "hydraulic_high_pressure"
  | "metering_solenoid_driven"
  | "sanitary_ptfe_lined";

interface DiaphragmPumpData {
  flow: number;
  pressure: number;
  dryRun: number;
  selfPrime: number;
  dpCost: number;
  sealless: boolean;
  forChemical: boolean;
  material: string;
  bestUse: string;
}

const DATA: Record<DiaphragmPumpType, DiaphragmPumpData> = {
  air_operated_double: {
    flow: 8, pressure: 6, dryRun: 10, selfPrime: 10, dpCost: 5,
    sealless: true, forChemical: true,
    material: "polypropylene_teflon_diaphragm",
    bestUse: "chemical_transfer_drum_unloading",
  },
  electric_single_diaphragm: {
    flow: 6, pressure: 7, dryRun: 8, selfPrime: 8, dpCost: 6,
    sealless: true, forChemical: false,
    material: "thermoplastic_epdm_diaphragm",
    bestUse: "water_treatment_dosing_small",
  },
  hydraulic_high_pressure: {
    flow: 7, pressure: 10, dryRun: 5, selfPrime: 6, dpCost: 9,
    sealless: false, forChemical: false,
    material: "stainless_ptfe_high_cycle",
    bestUse: "high_pressure_slurry_pipeline",
  },
  metering_solenoid_driven: {
    flow: 3, pressure: 5, dryRun: 7, selfPrime: 7, dpCost: 4,
    sealless: true, forChemical: true,
    material: "pvc_head_ceramic_check_valve",
    bestUse: "precision_chemical_metering",
  },
  sanitary_ptfe_lined: {
    flow: 7, pressure: 6, dryRun: 9, selfPrime: 9, dpCost: 8,
    sealless: true, forChemical: true,
    material: "full_ptfe_wetted_fda_compliant",
    bestUse: "pharma_food_hygienic_transfer",
  },
};

function get(t: DiaphragmPumpType): DiaphragmPumpData {
  return DATA[t];
}

export const flow = (t: DiaphragmPumpType) => get(t).flow;
export const pressure = (t: DiaphragmPumpType) => get(t).pressure;
export const dryRun = (t: DiaphragmPumpType) => get(t).dryRun;
export const selfPrime = (t: DiaphragmPumpType) => get(t).selfPrime;
export const dpCost = (t: DiaphragmPumpType) => get(t).dpCost;
export const sealless = (t: DiaphragmPumpType) => get(t).sealless;
export const forChemical = (t: DiaphragmPumpType) => get(t).forChemical;
export const material = (t: DiaphragmPumpType) => get(t).material;
export const bestUse = (t: DiaphragmPumpType) => get(t).bestUse;
export const diaphragmPumpTypes = (): DiaphragmPumpType[] =>
  Object.keys(DATA) as DiaphragmPumpType[];

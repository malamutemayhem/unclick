export type StaticMixType =
  | "helical_element_kenics"
  | "plate_type_smx"
  | "corrugated_plate_smv"
  | "vortex_tab_insert"
  | "printed_circuit_micro";

interface StaticMixData {
  mixQuality: number;
  pressureDrop: number;
  versatility: number;
  selfClean: number;
  smCost: number;
  lowViscosity: boolean;
  forLaminar: boolean;
  geometry: string;
  bestUse: string;
}

const DATA: Record<StaticMixType, StaticMixData> = {
  helical_element_kenics: {
    mixQuality: 8, pressureDrop: 6, versatility: 9, selfClean: 8, smCost: 5,
    lowViscosity: false, forLaminar: true,
    geometry: "alternating_helical_twist_element",
    bestUse: "polymer_resin_laminar_viscous_blend",
  },
  plate_type_smx: {
    mixQuality: 9, pressureDrop: 5, versatility: 8, selfClean: 7, smCost: 6,
    lowViscosity: false, forLaminar: true,
    geometry: "crossed_bar_plate_split_recombine",
    bestUse: "adhesive_sealant_two_component_mix",
  },
  corrugated_plate_smv: {
    mixQuality: 9, pressureDrop: 7, versatility: 8, selfClean: 6, smCost: 7,
    lowViscosity: true, forLaminar: false,
    geometry: "corrugated_plate_stack_turbulent",
    bestUse: "water_treatment_gas_dispersion",
  },
  vortex_tab_insert: {
    mixQuality: 7, pressureDrop: 8, versatility: 7, selfClean: 9, smCost: 4,
    lowViscosity: true, forLaminar: false,
    geometry: "angled_tab_vortex_generate_pipe",
    bestUse: "pipeline_injection_chemical_dose",
  },
  printed_circuit_micro: {
    mixQuality: 10, pressureDrop: 4, versatility: 5, selfClean: 3, smCost: 10,
    lowViscosity: true, forLaminar: true,
    geometry: "etched_channel_micro_split_merge",
    bestUse: "microreactor_pharma_precise_reaction",
  },
};

function get(t: StaticMixType): StaticMixData {
  return DATA[t];
}

export const mixQuality = (t: StaticMixType) => get(t).mixQuality;
export const pressureDrop = (t: StaticMixType) => get(t).pressureDrop;
export const versatility = (t: StaticMixType) => get(t).versatility;
export const selfClean = (t: StaticMixType) => get(t).selfClean;
export const smCost = (t: StaticMixType) => get(t).smCost;
export const lowViscosity = (t: StaticMixType) => get(t).lowViscosity;
export const forLaminar = (t: StaticMixType) => get(t).forLaminar;
export const geometry = (t: StaticMixType) => get(t).geometry;
export const bestUse = (t: StaticMixType) => get(t).bestUse;
export const staticMixTypes = (): StaticMixType[] =>
  Object.keys(DATA) as StaticMixType[];

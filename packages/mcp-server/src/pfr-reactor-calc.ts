export type PfrReactorType =
  | "single_tube_lab"
  | "multi_tube_industrial"
  | "coiled_tube_compact"
  | "microreactor_flow"
  | "packed_tube_catalytic";

interface PfrReactorData {
  conversion: number;
  heatTransfer: number;
  mixingControl: number;
  scaleUp: number;
  prCost: number;
  continuous: boolean;
  forHighConversion: boolean;
  config: string;
  bestUse: string;
}

const DATA: Record<PfrReactorType, PfrReactorData> = {
  single_tube_lab: {
    conversion: 8, heatTransfer: 7, mixingControl: 9, scaleUp: 5, prCost: 3,
    continuous: true, forHighConversion: true,
    config: "single_tube_jacketed_isothermal_lab_scale",
    bestUse: "lab_kinetics_study_pilot_reaction_screening",
  },
  multi_tube_industrial: {
    conversion: 9, heatTransfer: 9, mixingControl: 8, scaleUp: 9, prCost: 7,
    continuous: true, forHighConversion: true,
    config: "multi_tube_shell_side_coolant_industrial",
    bestUse: "ethylene_oxide_phthalic_anhydride_exothermic",
  },
  coiled_tube_compact: {
    conversion: 8, heatTransfer: 8, mixingControl: 7, scaleUp: 7, prCost: 5,
    continuous: true, forHighConversion: false,
    config: "helical_coil_tube_compact_secondary_flow",
    bestUse: "polymer_precondensation_continuous_reaction",
  },
  microreactor_flow: {
    conversion: 9, heatTransfer: 10, mixingControl: 10, scaleUp: 4, prCost: 8,
    continuous: true, forHighConversion: true,
    config: "microchannel_etched_plate_sub_mm_flow_path",
    bestUse: "pharma_api_flow_chemistry_hazardous_reaction",
  },
  packed_tube_catalytic: {
    conversion: 10, heatTransfer: 8, mixingControl: 7, scaleUp: 8, prCost: 7,
    continuous: true, forHighConversion: true,
    config: "catalyst_packed_tube_multi_tube_shell_cooled",
    bestUse: "methanol_synthesis_fischer_tropsch_catalytic",
  },
};

function get(t: PfrReactorType): PfrReactorData {
  return DATA[t];
}

export const conversion = (t: PfrReactorType) => get(t).conversion;
export const heatTransfer = (t: PfrReactorType) => get(t).heatTransfer;
export const mixingControl = (t: PfrReactorType) => get(t).mixingControl;
export const scaleUp = (t: PfrReactorType) => get(t).scaleUp;
export const prCost = (t: PfrReactorType) => get(t).prCost;
export const continuous = (t: PfrReactorType) => get(t).continuous;
export const forHighConversion = (t: PfrReactorType) => get(t).forHighConversion;
export const config = (t: PfrReactorType) => get(t).config;
export const bestUse = (t: PfrReactorType) => get(t).bestUse;
export const pfrReactorTypes = (): PfrReactorType[] =>
  Object.keys(DATA) as PfrReactorType[];

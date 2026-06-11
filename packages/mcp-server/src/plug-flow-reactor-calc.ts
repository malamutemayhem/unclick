export type PlugFlowReactorType =
  | "single_tube_isothermal"
  | "multi_tube_shell_cool"
  | "coiled_tube_compact"
  | "microreactor_channel"
  | "oscillatory_baffled";

interface PlugFlowReactorData {
  conversion: number;
  heatTransfer: number;
  mixing: number;
  residence: number;
  prCost: number;
  continuous: boolean;
  forFastReact: boolean;
  geometry: string;
  bestUse: string;
}

const DATA: Record<PlugFlowReactorType, PlugFlowReactorData> = {
  single_tube_isothermal: {
    conversion: 8, heatTransfer: 5, mixing: 3, residence: 7, prCost: 3,
    continuous: true, forFastReact: false,
    geometry: "straight_tube_adiabatic_or_jacket",
    bestUse: "simple_liquid_phase_homogeneous_react",
  },
  multi_tube_shell_cool: {
    conversion: 9, heatTransfer: 9, mixing: 3, residence: 8, prCost: 7,
    continuous: true, forFastReact: true,
    geometry: "tube_bundle_shell_coolant_baffle",
    bestUse: "partial_oxidation_exothermic_catalytic",
  },
  coiled_tube_compact: {
    conversion: 8, heatTransfer: 8, mixing: 6, residence: 6, prCost: 5,
    continuous: true, forFastReact: false,
    geometry: "helical_coil_dean_vortex_secondary",
    bestUse: "polymerize_nanoparticle_compact_lab",
  },
  microreactor_channel: {
    conversion: 9, heatTransfer: 10, mixing: 10, residence: 4, prCost: 9,
    continuous: true, forFastReact: true,
    geometry: "etched_microchannel_laminate_plate",
    bestUse: "hazardous_fast_react_precise_control",
  },
  oscillatory_baffled: {
    conversion: 8, heatTransfer: 7, mixing: 9, residence: 9, prCost: 8,
    continuous: true, forFastReact: false,
    geometry: "baffled_tube_oscillate_piston_plug",
    bestUse: "crystallize_long_residence_narrow_rtd",
  },
};

function get(t: PlugFlowReactorType): PlugFlowReactorData {
  return DATA[t];
}

export const conversion = (t: PlugFlowReactorType) => get(t).conversion;
export const heatTransfer = (t: PlugFlowReactorType) => get(t).heatTransfer;
export const mixing = (t: PlugFlowReactorType) => get(t).mixing;
export const residence = (t: PlugFlowReactorType) => get(t).residence;
export const prCost = (t: PlugFlowReactorType) => get(t).prCost;
export const continuous = (t: PlugFlowReactorType) => get(t).continuous;
export const forFastReact = (t: PlugFlowReactorType) => get(t).forFastReact;
export const geometry = (t: PlugFlowReactorType) => get(t).geometry;
export const bestUse = (t: PlugFlowReactorType) => get(t).bestUse;
export const plugFlowReactorTypes = (): PlugFlowReactorType[] =>
  Object.keys(DATA) as PlugFlowReactorType[];

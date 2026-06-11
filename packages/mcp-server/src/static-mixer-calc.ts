export type StaticMixerType =
  | "helical_element_twist"
  | "plate_type_corrugated"
  | "kenics_alternating"
  | "smx_cross_bar"
  | "injector_mixer_inline";

interface StaticMixerData {
  mixQuality: number;
  pressureDrop: number;
  residence: number;
  maintenance: number;
  smCost: number;
  noMovingParts: boolean;
  forLaminar: boolean;
  element: string;
  bestUse: string;
}

const DATA: Record<StaticMixerType, StaticMixerData> = {
  helical_element_twist: {
    mixQuality: 7, pressureDrop: 5, residence: 6, maintenance: 10, smCost: 3,
    noMovingParts: true, forLaminar: true,
    element: "alternating_left_right_helical_twist",
    bestUse: "laminar_polymer_blend_viscous_stream",
  },
  plate_type_corrugated: {
    mixQuality: 8, pressureDrop: 7, residence: 5, maintenance: 9, smCost: 5,
    noMovingParts: true, forLaminar: false,
    element: "corrugated_plate_cross_flow_redirect",
    bestUse: "turbulent_gas_liquid_contact_absorb",
  },
  kenics_alternating: {
    mixQuality: 8, pressureDrop: 6, residence: 7, maintenance: 10, smCost: 4,
    noMovingParts: true, forLaminar: true,
    element: "twisted_element_alternating_90_degree",
    bestUse: "chemical_dosing_water_treat_blend",
  },
  smx_cross_bar: {
    mixQuality: 10, pressureDrop: 8, residence: 5, maintenance: 9, smCost: 6,
    noMovingParts: true, forLaminar: true,
    element: "crossed_bar_grid_split_recombine",
    bestUse: "high_viscosity_ratio_color_additive_mix",
  },
  injector_mixer_inline: {
    mixQuality: 6, pressureDrop: 4, residence: 3, maintenance: 10, smCost: 2,
    noMovingParts: true, forLaminar: false,
    element: "nozzle_jet_inject_turbulent_energy",
    bestUse: "dilution_ph_adjust_simple_inline_dose",
  },
};

function get(t: StaticMixerType): StaticMixerData {
  return DATA[t];
}

export const mixQuality = (t: StaticMixerType) => get(t).mixQuality;
export const pressureDrop = (t: StaticMixerType) => get(t).pressureDrop;
export const residence = (t: StaticMixerType) => get(t).residence;
export const maintenance = (t: StaticMixerType) => get(t).maintenance;
export const smCost = (t: StaticMixerType) => get(t).smCost;
export const noMovingParts = (t: StaticMixerType) => get(t).noMovingParts;
export const forLaminar = (t: StaticMixerType) => get(t).forLaminar;
export const element = (t: StaticMixerType) => get(t).element;
export const bestUse = (t: StaticMixerType) => get(t).bestUse;
export const staticMixerTypes = (): StaticMixerType[] =>
  Object.keys(DATA) as StaticMixerType[];

export type PlasmaNitridingType =
  | "dc_plasma_nitride"
  | "pulsed_plasma_nitride"
  | "active_screen"
  | "post_discharge"
  | "hybrid_nitrocarb";

interface PlasmaNitridingData {
  caseDepth: number;
  throughput: number;
  surfaceHardness: number;
  distortion: number;
  pnCost: number;
  lowTemp: boolean;
  forStainless: boolean;
  nitrideConfig: string;
  bestUse: string;
}

const DATA: Record<PlasmaNitridingType, PlasmaNitridingData> = {
  dc_plasma_nitride: {
    caseDepth: 7, throughput: 7, surfaceHardness: 8, distortion: 7, pnCost: 5,
    lowTemp: false, forStainless: false,
    nitrideConfig: "dc_plasma_nitriding_glow_discharge_cathodic_sputter_compound",
    bestUse: "tool_steel_dc_plasma_nitriding_glow_discharge_hard_compound_layer",
  },
  pulsed_plasma_nitride: {
    caseDepth: 8, throughput: 8, surfaceHardness: 9, distortion: 8, pnCost: 7,
    lowTemp: true, forStainless: true,
    nitrideConfig: "pulsed_plasma_nitriding_duty_cycle_control_uniform_arc_free",
    bestUse: "precision_part_pulsed_plasma_nitriding_uniform_low_distortion",
  },
  active_screen: {
    caseDepth: 7, throughput: 9, surfaceHardness: 8, distortion: 9, pnCost: 8,
    lowTemp: true, forStainless: true,
    nitrideConfig: "active_screen_plasma_nitriding_cage_cathode_no_edge_effect",
    bestUse: "batch_load_active_screen_plasma_nitriding_uniform_no_hollow",
  },
  post_discharge: {
    caseDepth: 6, throughput: 6, surfaceHardness: 7, distortion: 9, pnCost: 6,
    lowTemp: true, forStainless: true,
    nitrideConfig: "post_discharge_plasma_nitriding_remote_plasma_no_sputter_damage",
    bestUse: "sensitive_surface_post_discharge_plasma_nitriding_no_sputter",
  },
  hybrid_nitrocarb: {
    caseDepth: 9, throughput: 7, surfaceHardness: 9, distortion: 6, pnCost: 7,
    lowTemp: false, forStainless: false,
    nitrideConfig: "hybrid_nitrocarburizing_plasma_carbon_nitrogen_compound_epsilon",
    bestUse: "wear_resist_hybrid_nitrocarburizing_compound_epsilon_layer_thick",
  },
};

function get(t: PlasmaNitridingType): PlasmaNitridingData {
  return DATA[t];
}

export const caseDepth = (t: PlasmaNitridingType) => get(t).caseDepth;
export const throughput = (t: PlasmaNitridingType) => get(t).throughput;
export const surfaceHardness = (t: PlasmaNitridingType) => get(t).surfaceHardness;
export const distortion = (t: PlasmaNitridingType) => get(t).distortion;
export const pnCost = (t: PlasmaNitridingType) => get(t).pnCost;
export const lowTemp = (t: PlasmaNitridingType) => get(t).lowTemp;
export const forStainless = (t: PlasmaNitridingType) => get(t).forStainless;
export const nitrideConfig = (t: PlasmaNitridingType) => get(t).nitrideConfig;
export const bestUse = (t: PlasmaNitridingType) => get(t).bestUse;
export const plasmaNitridingTypes = (): PlasmaNitridingType[] =>
  Object.keys(DATA) as PlasmaNitridingType[];

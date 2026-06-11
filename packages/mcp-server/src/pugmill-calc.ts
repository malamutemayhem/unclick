export type PugmillType =
  | "single_shaft"
  | "twin_shaft"
  | "deairing_vacuum"
  | "extruding_auger"
  | "continuous_mixer";

interface PugmillData {
  mixingSpeed: number;
  homogeneity: number;
  throughput: number;
  moistureControl: number;
  pmCost: number;
  deairing: boolean;
  forExtrusion: boolean;
  millConfig: string;
  bestUse: string;
}

const DATA: Record<PugmillType, PugmillData> = {
  single_shaft: {
    mixingSpeed: 7, homogeneity: 6, throughput: 7, moistureControl: 6, pmCost: 5,
    deairing: false, forExtrusion: false,
    millConfig: "single_shaft_paddle_pugmill_clay_mix_transport_simple_batch",
    bestUse: "simple_clay_mixing_transport_brick_tile_single_shaft_pugmill",
  },
  twin_shaft: {
    mixingSpeed: 9, homogeneity: 9, throughput: 9, moistureControl: 8, pmCost: 8,
    deairing: false, forExtrusion: false,
    millConfig: "twin_shaft_counter_rotate_paddle_intensive_mix_high_throughput",
    bestUse: "intensive_clay_mix_reclaim_recycled_ceramic_twin_shaft_pugmill",
  },
  deairing_vacuum: {
    mixingSpeed: 7, homogeneity: 10, throughput: 8, moistureControl: 9, pmCost: 9,
    deairing: true, forExtrusion: true,
    millConfig: "deairing_vacuum_pugmill_remove_air_bubble_dense_clay_extrude",
    bestUse: "dense_air_free_clay_body_pottery_porcelain_vacuum_deairing_pug",
  },
  extruding_auger: {
    mixingSpeed: 8, homogeneity: 8, throughput: 10, moistureControl: 7, pmCost: 7,
    deairing: false, forExtrusion: true,
    millConfig: "extruding_auger_pugmill_continuous_clay_column_wire_cut_brick",
    bestUse: "continuous_brick_tile_extrusion_auger_pugmill_wire_cut_column",
  },
  continuous_mixer: {
    mixingSpeed: 10, homogeneity: 7, throughput: 10, moistureControl: 8, pmCost: 7,
    deairing: false, forExtrusion: false,
    millConfig: "continuous_mixer_pugmill_add_water_clay_batch_blend_reclaim",
    bestUse: "continuous_clay_blending_water_addition_reclaim_mix_pugmill",
  },
};

function get(t: PugmillType): PugmillData {
  return DATA[t];
}

export const mixingSpeed = (t: PugmillType) => get(t).mixingSpeed;
export const homogeneity = (t: PugmillType) => get(t).homogeneity;
export const throughput = (t: PugmillType) => get(t).throughput;
export const moistureControl = (t: PugmillType) => get(t).moistureControl;
export const pmCost = (t: PugmillType) => get(t).pmCost;
export const deairing = (t: PugmillType) => get(t).deairing;
export const forExtrusion = (t: PugmillType) => get(t).forExtrusion;
export const millConfig = (t: PugmillType) => get(t).millConfig;
export const bestUse = (t: PugmillType) => get(t).bestUse;
export const pugmillTypes = (): PugmillType[] =>
  Object.keys(DATA) as PugmillType[];

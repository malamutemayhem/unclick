export type DenseMediaSepType =
  | "drum_separator_coarse"
  | "cyclone_dms_fine"
  | "cone_separator_gravity"
  | "bath_separator_float_sink"
  | "larcodems_large_coal";

interface DenseMediaSepData {
  sharpness: number;
  capacity: number;
  sizeRange: number;
  mediaRecovery: number;
  dmCost: number;
  pressurized: boolean;
  forCoal: boolean;
  medium: string;
  bestUse: string;
}

const DATA: Record<DenseMediaSepType, DenseMediaSepData> = {
  drum_separator_coarse: {
    sharpness: 8, capacity: 9, sizeRange: 5, mediaRecovery: 8, dmCost: 6,
    pressurized: false, forCoal: true,
    medium: "magnetite_suspension_rotary_drum",
    bestUse: "coarse_coal_wash_lump_reject_stone",
  },
  cyclone_dms_fine: {
    sharpness: 10, capacity: 7, sizeRange: 8, mediaRecovery: 7, dmCost: 7,
    pressurized: true, forCoal: true,
    medium: "ferrosilicon_magnetite_cyclone_feed",
    bestUse: "fine_coal_diamond_ore_sharp_cut",
  },
  cone_separator_gravity: {
    sharpness: 6, capacity: 6, sizeRange: 4, mediaRecovery: 9, dmCost: 4,
    pressurized: false, forCoal: false,
    medium: "magnetite_cone_quiescent_settle",
    bestUse: "coarse_ore_preconcentrate_waste_reject",
  },
  bath_separator_float_sink: {
    sharpness: 7, capacity: 5, sizeRange: 3, mediaRecovery: 8, dmCost: 5,
    pressurized: false, forCoal: false,
    medium: "heavy_liquid_bath_float_sink_test",
    bestUse: "lab_pilot_washability_test_density",
  },
  larcodems_large_coal: {
    sharpness: 9, capacity: 10, sizeRange: 7, mediaRecovery: 8, dmCost: 8,
    pressurized: true, forCoal: true,
    medium: "large_coal_dense_medium_cyclone_vessel",
    bestUse: "large_coal_high_tonnage_wash_plant",
  },
};

function get(t: DenseMediaSepType): DenseMediaSepData {
  return DATA[t];
}

export const sharpness = (t: DenseMediaSepType) => get(t).sharpness;
export const capacity = (t: DenseMediaSepType) => get(t).capacity;
export const sizeRange = (t: DenseMediaSepType) => get(t).sizeRange;
export const mediaRecovery = (t: DenseMediaSepType) => get(t).mediaRecovery;
export const dmCost = (t: DenseMediaSepType) => get(t).dmCost;
export const pressurized = (t: DenseMediaSepType) => get(t).pressurized;
export const forCoal = (t: DenseMediaSepType) => get(t).forCoal;
export const medium = (t: DenseMediaSepType) => get(t).medium;
export const bestUse = (t: DenseMediaSepType) => get(t).bestUse;
export const denseMediaSepTypes = (): DenseMediaSepType[] =>
  Object.keys(DATA) as DenseMediaSepType[];

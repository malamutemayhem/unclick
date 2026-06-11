export type SpiralHeatType =
  | "type_1_both_spiral"
  | "type_2_one_crossflow"
  | "type_3_condenser"
  | "welded_high_pressure"
  | "self_cleaning_fouling";

interface SpiralHeatData {
  efficiency: number;
  foulingResist: number;
  pressure: number;
  compactness: number;
  shCost: number;
  selfCleaning: boolean;
  forSlurry: boolean;
  flow: string;
  bestUse: string;
}

const DATA: Record<SpiralHeatType, SpiralHeatData> = {
  type_1_both_spiral: {
    efficiency: 9, foulingResist: 9, pressure: 7, compactness: 9, shCost: 7,
    selfCleaning: true, forSlurry: true,
    flow: "counter_current_both_channels",
    bestUse: "sludge_digester_heating",
  },
  type_2_one_crossflow: {
    efficiency: 8, foulingResist: 7, pressure: 7, compactness: 8, shCost: 6,
    selfCleaning: false, forSlurry: false,
    flow: "one_spiral_one_crossflow",
    bestUse: "vapor_liquid_top_condenser",
  },
  type_3_condenser: {
    efficiency: 8, foulingResist: 6, pressure: 6, compactness: 8, shCost: 7,
    selfCleaning: false, forSlurry: false,
    flow: "vapor_in_center_condensate_spiral",
    bestUse: "vacuum_condenser_overhead_system",
  },
  welded_high_pressure: {
    efficiency: 8, foulingResist: 8, pressure: 10, compactness: 7, shCost: 9,
    selfCleaning: true, forSlurry: true,
    flow: "fully_welded_counter_current",
    bestUse: "refinery_high_pressure_process",
  },
  self_cleaning_fouling: {
    efficiency: 9, foulingResist: 10, pressure: 7, compactness: 9, shCost: 8,
    selfCleaning: true, forSlurry: true,
    flow: "single_channel_continuous_path",
    bestUse: "wastewater_heavy_fouling_fiber",
  },
};

function get(t: SpiralHeatType): SpiralHeatData {
  return DATA[t];
}

export const efficiency = (t: SpiralHeatType) => get(t).efficiency;
export const foulingResist = (t: SpiralHeatType) => get(t).foulingResist;
export const pressure = (t: SpiralHeatType) => get(t).pressure;
export const compactness = (t: SpiralHeatType) => get(t).compactness;
export const shCost = (t: SpiralHeatType) => get(t).shCost;
export const selfCleaning = (t: SpiralHeatType) => get(t).selfCleaning;
export const forSlurry = (t: SpiralHeatType) => get(t).forSlurry;
export const flow = (t: SpiralHeatType) => get(t).flow;
export const bestUse = (t: SpiralHeatType) => get(t).bestUse;
export const spiralHeatTypes = (): SpiralHeatType[] =>
  Object.keys(DATA) as SpiralHeatType[];

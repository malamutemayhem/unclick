export type SpiralHeatExType =
  | "type_i_both_spiral"
  | "type_ii_spiral_cross"
  | "type_iii_spiral_condenser"
  | "self_cleaning_slurry"
  | "multi_spiral_parallel";

interface SpiralHeatExData {
  heatTransfer: number;
  foulingResist: number;
  compactness: number;
  pressureDrop: number;
  shCost: number;
  selfClean: boolean;
  forSlurry: boolean;
  channel: string;
  bestUse: string;
}

const DATA: Record<SpiralHeatExType, SpiralHeatExData> = {
  type_i_both_spiral: {
    heatTransfer: 9, foulingResist: 9, compactness: 9, pressureDrop: 6, shCost: 7,
    selfClean: true, forSlurry: true,
    channel: "two_spiral_channels_countercurrent_seal",
    bestUse: "sludge_heat_recovery_fouling_service",
  },
  type_ii_spiral_cross: {
    heatTransfer: 7, foulingResist: 6, compactness: 8, pressureDrop: 5, shCost: 6,
    selfClean: false, forSlurry: false,
    channel: "one_spiral_one_crossflow_open_end",
    bestUse: "vapor_condense_low_pressure_drop",
  },
  type_iii_spiral_condenser: {
    heatTransfer: 8, foulingResist: 7, compactness: 8, pressureDrop: 4, shCost: 7,
    selfClean: false, forSlurry: false,
    channel: "spiral_coolant_open_vapor_column_mount",
    bestUse: "distillation_column_top_condenser",
  },
  self_cleaning_slurry: {
    heatTransfer: 8, foulingResist: 10, compactness: 7, pressureDrop: 7, shCost: 9,
    selfClean: true, forSlurry: true,
    channel: "wide_gap_spiral_abrasive_particle_pass",
    bestUse: "mining_tailings_high_solid_foul_duty",
  },
  multi_spiral_parallel: {
    heatTransfer: 9, foulingResist: 8, compactness: 6, pressureDrop: 5, shCost: 10,
    selfClean: true, forSlurry: true,
    channel: "parallel_spiral_units_common_header",
    bestUse: "large_capacity_pulp_paper_mill_heat",
  },
};

function get(t: SpiralHeatExType): SpiralHeatExData {
  return DATA[t];
}

export const heatTransfer = (t: SpiralHeatExType) => get(t).heatTransfer;
export const foulingResist = (t: SpiralHeatExType) => get(t).foulingResist;
export const compactness = (t: SpiralHeatExType) => get(t).compactness;
export const pressureDrop = (t: SpiralHeatExType) => get(t).pressureDrop;
export const shCost = (t: SpiralHeatExType) => get(t).shCost;
export const selfClean = (t: SpiralHeatExType) => get(t).selfClean;
export const forSlurry = (t: SpiralHeatExType) => get(t).forSlurry;
export const channel = (t: SpiralHeatExType) => get(t).channel;
export const bestUse = (t: SpiralHeatExType) => get(t).bestUse;
export const spiralHeatExTypes = (): SpiralHeatExType[] =>
  Object.keys(DATA) as SpiralHeatExType[];

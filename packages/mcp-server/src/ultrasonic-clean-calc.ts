export type UltrasonicCleanType =
  | "benchtop_tabletop_lab"
  | "industrial_immersion_tank"
  | "multi_stage_cascade"
  | "megasonic_high_freq"
  | "vapor_degreaser_combo";

interface UltrasonicCleanData {
  cleaning: number;
  speed: number;
  gentleness: number;
  throughput: number;
  ucCost: number;
  automated: boolean;
  forPrecision: boolean;
  frequency: string;
  bestUse: string;
}

const DATA: Record<UltrasonicCleanType, UltrasonicCleanData> = {
  benchtop_tabletop_lab: {
    cleaning: 7, speed: 7, gentleness: 8, throughput: 3, ucCost: 3,
    automated: false, forPrecision: true,
    frequency: "40_khz_general_purpose",
    bestUse: "lab_instrument_jewelry_small_part",
  },
  industrial_immersion_tank: {
    cleaning: 9, speed: 8, gentleness: 6, throughput: 8, ucCost: 6,
    automated: false, forPrecision: false,
    frequency: "25_40_khz_heavy_duty",
    bestUse: "engine_block_machined_part_deburr",
  },
  multi_stage_cascade: {
    cleaning: 10, speed: 7, gentleness: 7, throughput: 9, ucCost: 9,
    automated: true, forPrecision: true,
    frequency: "multi_freq_wash_rinse_dry",
    bestUse: "medical_device_aerospace_critical",
  },
  megasonic_high_freq: {
    cleaning: 8, speed: 6, gentleness: 10, throughput: 6, ucCost: 10,
    automated: true, forPrecision: true,
    frequency: "800_1000_khz_megasonic",
    bestUse: "semiconductor_wafer_photomask",
  },
  vapor_degreaser_combo: {
    cleaning: 9, speed: 9, gentleness: 7, throughput: 7, ucCost: 7,
    automated: false, forPrecision: false,
    frequency: "40_khz_solvent_vapor_phase",
    bestUse: "pcb_flux_removal_metal_degrease",
  },
};

function get(t: UltrasonicCleanType): UltrasonicCleanData {
  return DATA[t];
}

export const cleaning = (t: UltrasonicCleanType) => get(t).cleaning;
export const speed = (t: UltrasonicCleanType) => get(t).speed;
export const gentleness = (t: UltrasonicCleanType) => get(t).gentleness;
export const throughput = (t: UltrasonicCleanType) => get(t).throughput;
export const ucCost = (t: UltrasonicCleanType) => get(t).ucCost;
export const automated = (t: UltrasonicCleanType) => get(t).automated;
export const forPrecision = (t: UltrasonicCleanType) => get(t).forPrecision;
export const frequency = (t: UltrasonicCleanType) => get(t).frequency;
export const bestUse = (t: UltrasonicCleanType) => get(t).bestUse;
export const ultrasonicCleanTypes = (): UltrasonicCleanType[] =>
  Object.keys(DATA) as UltrasonicCleanType[];

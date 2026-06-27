export type CamshaftType =
  | "sohc_single_overhead"
  | "dohc_dual_overhead"
  | "ohv_pushrod_in_block"
  | "vvt_variable_valve_timing"
  | "desmodromic_positive_close";

const DATA: Record<CamshaftType, {
  revLimit: number; valvetrain: number; complexity: number;
  efficiency: number; cmCost: number; variableTiming: boolean;
  forPerformance: boolean; drive: string; bestUse: string;
}> = {
  sohc_single_overhead: {
    revLimit: 5, valvetrain: 5, complexity: 4,
    efficiency: 6, cmCost: 2, variableTiming: false,
    forPerformance: false, drive: "belt_chain_single_cam_rocker",
    bestUse: "economy_sedan_moderate_output",
  },
  dohc_dual_overhead: {
    revLimit: 8, valvetrain: 8, complexity: 6,
    efficiency: 8, cmCost: 3, variableTiming: false,
    forPerformance: true, drive: "chain_belt_dual_cam_bucket",
    bestUse: "sport_engine_four_valve_high_rev",
  },
  ohv_pushrod_in_block: {
    revLimit: 4, valvetrain: 3, complexity: 3,
    efficiency: 5, cmCost: 1, variableTiming: false,
    forPerformance: false, drive: "gear_chain_pushrod_rocker_arm",
    bestUse: "v8_truck_compact_low_profile",
  },
  vvt_variable_valve_timing: {
    revLimit: 9, valvetrain: 9, complexity: 8,
    efficiency: 10, cmCost: 4, variableTiming: true,
    forPerformance: true, drive: "cam_phaser_oil_pressure_ecm",
    bestUse: "modern_engine_broad_powerband",
  },
  desmodromic_positive_close: {
    revLimit: 10, valvetrain: 10, complexity: 9,
    efficiency: 7, cmCost: 5, variableTiming: false,
    forPerformance: true, drive: "twin_cam_closing_rocker_no_spring",
    bestUse: "ducati_motorcycle_extreme_rpm",
  },
};

const get = (t: CamshaftType) => DATA[t];

export const revLimit = (t: CamshaftType) => get(t).revLimit;
export const valvetrain = (t: CamshaftType) => get(t).valvetrain;
export const complexity = (t: CamshaftType) => get(t).complexity;
export const efficiency = (t: CamshaftType) => get(t).efficiency;
export const cmCost = (t: CamshaftType) => get(t).cmCost;
export const variableTiming = (t: CamshaftType) => get(t).variableTiming;
export const forPerformance = (t: CamshaftType) => get(t).forPerformance;
export const drive = (t: CamshaftType) => get(t).drive;
export const bestUse = (t: CamshaftType) => get(t).bestUse;
export const camshaftTypes = (): CamshaftType[] => Object.keys(DATA) as CamshaftType[];

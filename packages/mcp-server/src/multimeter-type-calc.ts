export type MultimeterType =
  | "handheld_dmm"
  | "bench_6_5_digit"
  | "bench_8_5_digit"
  | "electrometer_femto"
  | "clamp_meter_ac_dc";

const DATA: Record<MultimeterType, {
  resolution: number; accuracy: number; speed: number;
  inputZ: number; mmCost: number; trueRms: boolean;
  forCalLab: boolean; topology: string; bestUse: string;
}> = {
  handheld_dmm: {
    resolution: 4, accuracy: 5, speed: 6,
    inputZ: 5, mmCost: 1, trueRms: true,
    forCalLab: false, topology: "dual_slope_integrate",
    bestUse: "field_troubleshoot_general",
  },
  bench_6_5_digit: {
    resolution: 7, accuracy: 8, speed: 8,
    inputZ: 7, mmCost: 4, trueRms: true,
    forCalLab: false, topology: "multi_slope_rundown",
    bestUse: "production_test_station",
  },
  bench_8_5_digit: {
    resolution: 10, accuracy: 10, speed: 7,
    inputZ: 9, mmCost: 8, trueRms: true,
    forCalLab: true, topology: "charge_balance_sigma_delta",
    bestUse: "metrology_reference_std",
  },
  electrometer_femto: {
    resolution: 9, accuracy: 9, speed: 4,
    inputZ: 10, mmCost: 9, trueRms: false,
    forCalLab: true, topology: "feedback_picoamp_guard",
    bestUse: "leakage_current_measure",
  },
  clamp_meter_ac_dc: {
    resolution: 3, accuracy: 4, speed: 9,
    inputZ: 3, mmCost: 2, trueRms: true,
    forCalLab: false, topology: "hall_effect_jaw_sense",
    bestUse: "power_distribution_audit",
  },
};

const get = (t: MultimeterType) => DATA[t];

export const resolution = (t: MultimeterType) => get(t).resolution;
export const accuracy = (t: MultimeterType) => get(t).accuracy;
export const speed = (t: MultimeterType) => get(t).speed;
export const inputZ = (t: MultimeterType) => get(t).inputZ;
export const mmCost = (t: MultimeterType) => get(t).mmCost;
export const trueRms = (t: MultimeterType) => get(t).trueRms;
export const forCalLab = (t: MultimeterType) => get(t).forCalLab;
export const topology = (t: MultimeterType) => get(t).topology;
export const bestUse = (t: MultimeterType) => get(t).bestUse;
export const multimeterTypes = (): MultimeterType[] => Object.keys(DATA) as MultimeterType[];

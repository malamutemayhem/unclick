export type OpampType =
  | "cmos_rail_to_rail"
  | "jfet_low_noise"
  | "chopper_stabilized"
  | "current_feedback"
  | "fully_differential";

const DATA: Record<OpampType, {
  gbw: number; noise: number; slewRate: number;
  offsetDrift: number; opCost: number; railToRail: boolean;
  forPrecision: boolean; inputStage: string; bestUse: string;
}> = {
  cmos_rail_to_rail: {
    gbw: 6, noise: 5, slewRate: 6,
    offsetDrift: 6, opCost: 3, railToRail: true,
    forPrecision: false, inputStage: "cmos_complementary_pair",
    bestUse: "single_supply_sensor_frontend",
  },
  jfet_low_noise: {
    gbw: 8, noise: 9, slewRate: 7,
    offsetDrift: 5, opCost: 5, railToRail: false,
    forPrecision: true, inputStage: "jfet_differential_pair",
    bestUse: "audio_preamp_low_distortion",
  },
  chopper_stabilized: {
    gbw: 5, noise: 7, slewRate: 4,
    offsetDrift: 10, opCost: 6, railToRail: true,
    forPrecision: true, inputStage: "switched_chopper_modulator",
    bestUse: "dc_precision_strain_bridge",
  },
  current_feedback: {
    gbw: 10, noise: 4, slewRate: 10,
    offsetDrift: 3, opCost: 7, railToRail: false,
    forPrecision: false, inputStage: "complementary_bipolar_mirror",
    bestUse: "video_line_driver_75ohm",
  },
  fully_differential: {
    gbw: 9, noise: 8, slewRate: 9,
    offsetDrift: 7, opCost: 8, railToRail: true,
    forPrecision: true, inputStage: "diff_pair_common_mode_servo",
    bestUse: "adc_driver_differential_input",
  },
};

const get = (t: OpampType) => DATA[t];

export const gbw = (t: OpampType) => get(t).gbw;
export const noise = (t: OpampType) => get(t).noise;
export const slewRate = (t: OpampType) => get(t).slewRate;
export const offsetDrift = (t: OpampType) => get(t).offsetDrift;
export const opCost = (t: OpampType) => get(t).opCost;
export const railToRail = (t: OpampType) => get(t).railToRail;
export const forPrecision = (t: OpampType) => get(t).forPrecision;
export const inputStage = (t: OpampType) => get(t).inputStage;
export const bestUse = (t: OpampType) => get(t).bestUse;
export const opampTypes = (): OpampType[] => Object.keys(DATA) as OpampType[];

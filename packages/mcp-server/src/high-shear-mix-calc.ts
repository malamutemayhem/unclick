export type HighShearMixType =
  | "rotor_stator_batch"
  | "rotor_stator_inline"
  | "ultrasonic_probe"
  | "colloid_mill_gap"
  | "homogenizer_valve";

interface HighShearMixData {
  shearRate: number;
  particleSize: number;
  throughput: number;
  scalability: number;
  hsCost: number;
  inline: boolean;
  forEmulsion: boolean;
  mechanism: string;
  bestUse: string;
}

const DATA: Record<HighShearMixType, HighShearMixData> = {
  rotor_stator_batch: {
    shearRate: 8, particleSize: 7, throughput: 6, scalability: 8, hsCost: 5,
    inline: false, forEmulsion: true,
    mechanism: "rotor_blade_stator_screen_shear",
    bestUse: "cosmetic_cream_sauce_batch_emulsion",
  },
  rotor_stator_inline: {
    shearRate: 9, particleSize: 8, throughput: 9, scalability: 9, hsCost: 7,
    inline: true, forEmulsion: true,
    mechanism: "multi_stage_rotor_stator_pipe_flow",
    bestUse: "continuous_emulsion_dispersion_inline",
  },
  ultrasonic_probe: {
    shearRate: 10, particleSize: 10, throughput: 4, scalability: 5, hsCost: 8,
    inline: false, forEmulsion: true,
    mechanism: "piezo_horn_cavitation_micro_stream",
    bestUse: "nano_emulsion_cell_lysis_lab_scale",
  },
  colloid_mill_gap: {
    shearRate: 9, particleSize: 9, throughput: 7, scalability: 8, hsCost: 6,
    inline: true, forEmulsion: true,
    mechanism: "conical_rotor_stator_gap_shear",
    bestUse: "mustard_peanut_butter_fine_paste",
  },
  homogenizer_valve: {
    shearRate: 10, particleSize: 10, throughput: 8, scalability: 7, hsCost: 9,
    inline: true, forEmulsion: true,
    mechanism: "high_pressure_valve_gap_cavitate",
    bestUse: "milk_pharma_sub_micron_uniform",
  },
};

function get(t: HighShearMixType): HighShearMixData {
  return DATA[t];
}

export const shearRate = (t: HighShearMixType) => get(t).shearRate;
export const particleSize = (t: HighShearMixType) => get(t).particleSize;
export const throughput = (t: HighShearMixType) => get(t).throughput;
export const scalability = (t: HighShearMixType) => get(t).scalability;
export const hsCost = (t: HighShearMixType) => get(t).hsCost;
export const inline = (t: HighShearMixType) => get(t).inline;
export const forEmulsion = (t: HighShearMixType) => get(t).forEmulsion;
export const mechanism = (t: HighShearMixType) => get(t).mechanism;
export const bestUse = (t: HighShearMixType) => get(t).bestUse;
export const highShearMixTypes = (): HighShearMixType[] =>
  Object.keys(DATA) as HighShearMixType[];

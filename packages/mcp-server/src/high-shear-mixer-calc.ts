export type HighShearMixerType =
  | "rotor_stator_batch"
  | "rotor_stator_inline"
  | "colloid_mill_emulsion"
  | "high_pressure_homogenizer"
  | "ultrasonic_probe_nano";

interface HighShearMixerData {
  shearRate: number;
  dropletSize: number;
  throughput: number;
  versatility: number;
  hsCost: number;
  inline: boolean;
  forEmulsion: boolean;
  mechanism: string;
  bestUse: string;
}

const DATA: Record<HighShearMixerType, HighShearMixerData> = {
  rotor_stator_batch: {
    shearRate: 8, dropletSize: 7, throughput: 7, versatility: 9, hsCost: 5,
    inline: false, forEmulsion: true,
    mechanism: "rotor_stator_gap_batch_tank_mount",
    bestUse: "cosmetic_pharma_cream_lotion_batch_emulsion",
  },
  rotor_stator_inline: {
    shearRate: 9, dropletSize: 8, throughput: 9, versatility: 8, hsCost: 7,
    inline: true, forEmulsion: true,
    mechanism: "inline_rotor_stator_continuous_single_pass",
    bestUse: "continuous_emulsion_dispersion_deagglomerate",
  },
  colloid_mill_emulsion: {
    shearRate: 9, dropletSize: 9, throughput: 6, versatility: 5, hsCost: 6,
    inline: true, forEmulsion: true,
    mechanism: "conical_rotor_stator_adjustable_gap_shear",
    bestUse: "fine_emulsion_mustard_salad_dressing_pharma",
  },
  high_pressure_homogenizer: {
    shearRate: 10, dropletSize: 10, throughput: 7, versatility: 6, hsCost: 9,
    inline: true, forEmulsion: true,
    mechanism: "high_pressure_valve_cavitation_impingement",
    bestUse: "dairy_homogenize_nano_emulsion_cell_disrupt",
  },
  ultrasonic_probe_nano: {
    shearRate: 10, dropletSize: 10, throughput: 4, versatility: 7, hsCost: 8,
    inline: false, forEmulsion: false,
    mechanism: "ultrasonic_cavitation_probe_tip_sonicate",
    bestUse: "lab_nano_particle_dispersion_cell_lysis",
  },
};

function get(t: HighShearMixerType): HighShearMixerData {
  return DATA[t];
}

export const shearRate = (t: HighShearMixerType) => get(t).shearRate;
export const dropletSize = (t: HighShearMixerType) => get(t).dropletSize;
export const throughput = (t: HighShearMixerType) => get(t).throughput;
export const versatility = (t: HighShearMixerType) => get(t).versatility;
export const hsCost = (t: HighShearMixerType) => get(t).hsCost;
export const inline = (t: HighShearMixerType) => get(t).inline;
export const forEmulsion = (t: HighShearMixerType) => get(t).forEmulsion;
export const mechanism = (t: HighShearMixerType) => get(t).mechanism;
export const bestUse = (t: HighShearMixerType) => get(t).bestUse;
export const highShearMixerTypes = (): HighShearMixerType[] =>
  Object.keys(DATA) as HighShearMixerType[];

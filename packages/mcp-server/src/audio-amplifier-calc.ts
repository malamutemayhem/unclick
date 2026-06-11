export type AudioAmplifierType =
  | "class_a_single_ended"
  | "class_ab_push_pull"
  | "class_d_switching"
  | "class_h_rail_switch"
  | "tube_valve_triode";

const DATA: Record<AudioAmplifierType, {
  fidelity: number; efficiency: number; power: number;
  distortion: number; aaCost: number; solidState: boolean;
  forPortable: boolean; topology: string; bestUse: string;
}> = {
  class_a_single_ended: {
    fidelity: 10, efficiency: 2, power: 3,
    distortion: 1, aaCost: 5, solidState: true,
    forPortable: false, topology: "single_ended_constant_bias",
    bestUse: "audiophile_headphone_amp_preamp",
  },
  class_ab_push_pull: {
    fidelity: 8, efficiency: 5, power: 7,
    distortion: 3, aaCost: 3, solidState: true,
    forPortable: false, topology: "complementary_push_pull_bias",
    bestUse: "home_stereo_studio_monitor_amp",
  },
  class_d_switching: {
    fidelity: 7, efficiency: 9, power: 9,
    distortion: 4, aaCost: 2, solidState: true,
    forPortable: true, topology: "pwm_mosfet_half_bridge_filter",
    bestUse: "pa_system_subwoofer_portable",
  },
  class_h_rail_switch: {
    fidelity: 7, efficiency: 7, power: 10,
    distortion: 4, aaCost: 4, solidState: true,
    forPortable: false, topology: "multi_rail_voltage_tracking",
    bestUse: "high_power_touring_pa_concert",
  },
  tube_valve_triode: {
    fidelity: 9, efficiency: 2, power: 4,
    distortion: 5, aaCost: 5, solidState: false,
    forPortable: false, topology: "vacuum_tube_transformer_coupled",
    bestUse: "guitar_amp_audiophile_warm_tone",
  },
};

const get = (t: AudioAmplifierType) => DATA[t];

export const fidelity = (t: AudioAmplifierType) => get(t).fidelity;
export const efficiency = (t: AudioAmplifierType) => get(t).efficiency;
export const power = (t: AudioAmplifierType) => get(t).power;
export const distortion = (t: AudioAmplifierType) => get(t).distortion;
export const aaCost = (t: AudioAmplifierType) => get(t).aaCost;
export const solidState = (t: AudioAmplifierType) => get(t).solidState;
export const forPortable = (t: AudioAmplifierType) => get(t).forPortable;
export const topology = (t: AudioAmplifierType) => get(t).topology;
export const bestUse = (t: AudioAmplifierType) => get(t).bestUse;
export const audioAmplifierTypes = (): AudioAmplifierType[] => Object.keys(DATA) as AudioAmplifierType[];

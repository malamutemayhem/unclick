export type DacConverterType =
  | "resistor_string"
  | "r2r_ladder"
  | "current_steering"
  | "sigma_delta_dac"
  | "pwm_filtered";

const DATA: Record<DacConverterType, {
  resolution: number; speed: number; linearity: number;
  glitchEnergy: number; dacCost: number; monotonic: boolean;
  forAudio: boolean; architecture: string; bestUse: string;
}> = {
  resistor_string: { resolution: 6, speed: 5, linearity: 9, glitchEnergy: 8, dacCost: 3, monotonic: true, forAudio: false, architecture: "resistor_tap_select", bestUse: "precision_dc_set_point" },
  r2r_ladder: { resolution: 7, speed: 7, linearity: 7, glitchEnergy: 5, dacCost: 2, monotonic: false, forAudio: false, architecture: "binary_weighted_r2r", bestUse: "general_purpose_analog" },
  current_steering: { resolution: 9, speed: 10, linearity: 8, glitchEnergy: 4, dacCost: 8, monotonic: false, forAudio: false, architecture: "binary_current_switch", bestUse: "high_speed_rf_synthesis" },
  sigma_delta_dac: { resolution: 10, speed: 4, linearity: 10, glitchEnergy: 10, dacCost: 5, monotonic: true, forAudio: true, architecture: "oversampled_bitstream", bestUse: "audio_precision_output" },
  pwm_filtered: { resolution: 5, speed: 3, linearity: 5, glitchEnergy: 6, dacCost: 1, monotonic: true, forAudio: false, architecture: "pwm_lowpass_filter", bestUse: "mcu_analog_output_cheap" },
};

const get = (t: DacConverterType) => DATA[t];

export const resolution = (t: DacConverterType) => get(t).resolution;
export const speed = (t: DacConverterType) => get(t).speed;
export const linearity = (t: DacConverterType) => get(t).linearity;
export const glitchEnergy = (t: DacConverterType) => get(t).glitchEnergy;
export const dacCost = (t: DacConverterType) => get(t).dacCost;
export const monotonic = (t: DacConverterType) => get(t).monotonic;
export const forAudio = (t: DacConverterType) => get(t).forAudio;
export const architecture = (t: DacConverterType) => get(t).architecture;
export const bestUse = (t: DacConverterType) => get(t).bestUse;
export const dacConverters = (): DacConverterType[] => Object.keys(DATA) as DacConverterType[];

export type DacArchitecture =
  | "binary_weighted_r2r"
  | "segmented_thermometer"
  | "sigma_delta_1bit"
  | "current_steering"
  | "pwm_filtered";

const DATA: Record<DacArchitecture, {
  resolution: number; speed: number; glitch: number;
  linearity: number; dacCost: number; monotonic: boolean;
  forAudio: boolean; technique: string; bestUse: string;
}> = {
  binary_weighted_r2r: {
    resolution: 6, speed: 7, glitch: 4,
    linearity: 5, dacCost: 3, monotonic: false,
    forAudio: false, technique: "resistor_ladder_binary",
    bestUse: "waveform_generator",
  },
  segmented_thermometer: {
    resolution: 8, speed: 8, glitch: 9,
    linearity: 9, dacCost: 7, monotonic: true,
    forAudio: false, technique: "unary_decoded_cells",
    bestUse: "video_display_driver",
  },
  sigma_delta_1bit: {
    resolution: 10, speed: 3, glitch: 10,
    linearity: 10, dacCost: 4, monotonic: true,
    forAudio: true, technique: "oversampled_noise_shape",
    bestUse: "hi_fi_audio_output",
  },
  current_steering: {
    resolution: 7, speed: 10, glitch: 6,
    linearity: 7, dacCost: 8, monotonic: false,
    forAudio: false, technique: "switched_current_cell",
    bestUse: "5g_baseband_tx",
  },
  pwm_filtered: {
    resolution: 4, speed: 2, glitch: 7,
    linearity: 6, dacCost: 1, monotonic: true,
    forAudio: true, technique: "duty_cycle_lpf",
    bestUse: "motor_speed_setpoint",
  },
};

const get = (t: DacArchitecture) => DATA[t];

export const resolution = (t: DacArchitecture) => get(t).resolution;
export const speed = (t: DacArchitecture) => get(t).speed;
export const glitch = (t: DacArchitecture) => get(t).glitch;
export const linearity = (t: DacArchitecture) => get(t).linearity;
export const dacCost = (t: DacArchitecture) => get(t).dacCost;
export const monotonic = (t: DacArchitecture) => get(t).monotonic;
export const forAudio = (t: DacArchitecture) => get(t).forAudio;
export const technique = (t: DacArchitecture) => get(t).technique;
export const bestUse = (t: DacArchitecture) => get(t).bestUse;
export const dacArchitectures = (): DacArchitecture[] => Object.keys(DATA) as DacArchitecture[];

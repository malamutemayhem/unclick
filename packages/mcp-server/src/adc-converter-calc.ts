export type AdcConverterType =
  | "sar_general_purpose"
  | "sigma_delta_precision"
  | "flash_high_speed"
  | "pipeline_video_rate"
  | "dual_slope_meter";

const DATA: Record<AdcConverterType, {
  resolution: number; sampleRate: number; accuracy: number;
  powerDraw: number; adcCost: number; differential: boolean;
  forAudio: boolean; architecture: string; bestUse: string;
}> = {
  sar_general_purpose: { resolution: 7, sampleRate: 7, accuracy: 7, powerDraw: 7, adcCost: 3, differential: false, forAudio: false, architecture: "successive_approx_reg", bestUse: "mcu_sensor_readout" },
  sigma_delta_precision: { resolution: 10, sampleRate: 3, accuracy: 10, powerDraw: 5, adcCost: 6, differential: true, forAudio: true, architecture: "oversampled_modulator", bestUse: "precision_weight_scale" },
  flash_high_speed: { resolution: 3, sampleRate: 10, accuracy: 4, powerDraw: 2, adcCost: 9, differential: false, forAudio: false, architecture: "parallel_comparator_bank", bestUse: "radar_signal_capture" },
  pipeline_video_rate: { resolution: 6, sampleRate: 9, accuracy: 6, powerDraw: 3, adcCost: 7, differential: false, forAudio: false, architecture: "cascaded_stage_pipeline", bestUse: "video_digitize_stream" },
  dual_slope_meter: { resolution: 8, sampleRate: 2, accuracy: 9, powerDraw: 8, adcCost: 2, differential: true, forAudio: false, architecture: "integrating_dual_ramp", bestUse: "digital_multimeter" },
};

const get = (t: AdcConverterType) => DATA[t];

export const resolution = (t: AdcConverterType) => get(t).resolution;
export const sampleRate = (t: AdcConverterType) => get(t).sampleRate;
export const accuracy = (t: AdcConverterType) => get(t).accuracy;
export const powerDraw = (t: AdcConverterType) => get(t).powerDraw;
export const adcCost = (t: AdcConverterType) => get(t).adcCost;
export const differential = (t: AdcConverterType) => get(t).differential;
export const forAudio = (t: AdcConverterType) => get(t).forAudio;
export const architecture = (t: AdcConverterType) => get(t).architecture;
export const bestUse = (t: AdcConverterType) => get(t).bestUse;
export const adcConverters = (): AdcConverterType[] => Object.keys(DATA) as AdcConverterType[];

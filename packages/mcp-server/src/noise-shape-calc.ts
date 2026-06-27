export type NoiseShape =
  | "first_order_delta"
  | "second_order_mash"
  | "third_order_crfb"
  | "bandpass_centered"
  | "multi_bit_quantize";

const DATA: Record<NoiseShape, {
  snr: number; bandwidth: number; stability: number;
  complexity: number; nsCost: number; highOrder: boolean;
  forAudio: boolean; topology: string; bestUse: string;
}> = {
  first_order_delta: {
    snr: 4, bandwidth: 5, stability: 10,
    complexity: 9, nsCost: 1, highOrder: false,
    forAudio: true, topology: "single_integrator_fb",
    bestUse: "low_cost_voice_codec",
  },
  second_order_mash: {
    snr: 7, bandwidth: 7, stability: 9,
    complexity: 7, nsCost: 3, highOrder: true,
    forAudio: true, topology: "cascaded_1bit_stages",
    bestUse: "precision_adc_converter",
  },
  third_order_crfb: {
    snr: 9, bandwidth: 8, stability: 7,
    complexity: 5, nsCost: 5, highOrder: true,
    forAudio: true, topology: "feedforward_resonator",
    bestUse: "hi_fi_audio_dac",
  },
  bandpass_centered: {
    snr: 8, bandwidth: 4, stability: 6,
    complexity: 4, nsCost: 6, highOrder: true,
    forAudio: false, topology: "complex_pair_resonator",
    bestUse: "if_digitizer_radio",
  },
  multi_bit_quantize: {
    snr: 10, bandwidth: 9, stability: 8,
    complexity: 3, nsCost: 7, highOrder: true,
    forAudio: false, topology: "flash_adc_dac_mismatch",
    bestUse: "wideband_measurement_inst",
  },
};

const get = (t: NoiseShape) => DATA[t];

export const snr = (t: NoiseShape) => get(t).snr;
export const bandwidth = (t: NoiseShape) => get(t).bandwidth;
export const stability = (t: NoiseShape) => get(t).stability;
export const complexity = (t: NoiseShape) => get(t).complexity;
export const nsCost = (t: NoiseShape) => get(t).nsCost;
export const highOrder = (t: NoiseShape) => get(t).highOrder;
export const forAudio = (t: NoiseShape) => get(t).forAudio;
export const topology = (t: NoiseShape) => get(t).topology;
export const bestUse = (t: NoiseShape) => get(t).bestUse;
export const noiseShapes = (): NoiseShape[] => Object.keys(DATA) as NoiseShape[];

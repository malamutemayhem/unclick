export type RfFrontendType =
  | "direct_conversion"
  | "superheterodyne"
  | "low_if_digital"
  | "zero_if_homodyne"
  | "sampling_receiver";

const DATA: Record<RfFrontendType, {
  sensitivity: number; selectivity: number; dynamicRange: number;
  complexity: number; frontendCost: number; digital: boolean;
  forSdr: boolean; architecture: string; bestUse: string;
}> = {
  direct_conversion: { sensitivity: 7, selectivity: 6, dynamicRange: 6, complexity: 4, frontendCost: 3, digital: false, forSdr: false, architecture: "zero_if_mixer_bb", bestUse: "wifi_bluetooth_transceiver" },
  superheterodyne: { sensitivity: 9, selectivity: 10, dynamicRange: 9, complexity: 8, frontendCost: 6, digital: false, forSdr: false, architecture: "multi_stage_if_mix", bestUse: "high_perf_hf_receiver" },
  low_if_digital: { sensitivity: 8, selectivity: 7, dynamicRange: 7, complexity: 5, frontendCost: 4, digital: true, forSdr: true, architecture: "low_if_adc_dsp", bestUse: "digital_radio_dab_fm" },
  zero_if_homodyne: { sensitivity: 6, selectivity: 5, dynamicRange: 5, complexity: 3, frontendCost: 2, digital: false, forSdr: false, architecture: "homodyne_iq_demod", bestUse: "low_cost_ism_receiver" },
  sampling_receiver: { sensitivity: 8, selectivity: 8, dynamicRange: 10, complexity: 9, frontendCost: 8, digital: true, forSdr: true, architecture: "direct_rf_sampling", bestUse: "wideband_spectrum_monitor" },
};

const get = (t: RfFrontendType) => DATA[t];

export const sensitivity = (t: RfFrontendType) => get(t).sensitivity;
export const selectivity = (t: RfFrontendType) => get(t).selectivity;
export const dynamicRange = (t: RfFrontendType) => get(t).dynamicRange;
export const complexity = (t: RfFrontendType) => get(t).complexity;
export const frontendCost = (t: RfFrontendType) => get(t).frontendCost;
export const digital = (t: RfFrontendType) => get(t).digital;
export const forSdr = (t: RfFrontendType) => get(t).forSdr;
export const architecture = (t: RfFrontendType) => get(t).architecture;
export const bestUse = (t: RfFrontendType) => get(t).bestUse;
export const rfFrontends = (): RfFrontendType[] => Object.keys(DATA) as RfFrontendType[];

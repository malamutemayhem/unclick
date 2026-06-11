export type RfAmplifierType =
  | "lna_low_noise"
  | "pa_power_amp"
  | "vga_variable_gain"
  | "mmic_integrated"
  | "doherty_efficient";

const DATA: Record<RfAmplifierType, {
  noiseFigure: number; gain: number; efficiency: number;
  linearity: number; ampCost: number; broadband: boolean;
  forTransmit: boolean; topology: string; bestUse: string;
}> = {
  lna_low_noise: { noiseFigure: 10, gain: 6, efficiency: 5, linearity: 7, ampCost: 3, broadband: true, forTransmit: false, topology: "cascode_degenerate", bestUse: "receiver_front_end_sens" },
  pa_power_amp: { noiseFigure: 3, gain: 8, efficiency: 7, linearity: 6, ampCost: 5, broadband: false, forTransmit: true, topology: "class_ab_push_pull", bestUse: "handset_tx_output_stage" },
  vga_variable_gain: { noiseFigure: 6, gain: 7, efficiency: 5, linearity: 8, ampCost: 4, broadband: true, forTransmit: false, topology: "agc_voltage_ctrl", bestUse: "if_agc_chain_control" },
  mmic_integrated: { noiseFigure: 7, gain: 9, efficiency: 6, linearity: 7, ampCost: 6, broadband: true, forTransmit: true, topology: "gaas_gan_mmic_die", bestUse: "phased_array_element" },
  doherty_efficient: { noiseFigure: 4, gain: 7, efficiency: 10, linearity: 9, ampCost: 8, broadband: false, forTransmit: true, topology: "doherty_carrier_peak", bestUse: "5g_macro_base_station" },
};

const get = (t: RfAmplifierType) => DATA[t];

export const noiseFigure = (t: RfAmplifierType) => get(t).noiseFigure;
export const gain = (t: RfAmplifierType) => get(t).gain;
export const efficiency = (t: RfAmplifierType) => get(t).efficiency;
export const linearity = (t: RfAmplifierType) => get(t).linearity;
export const ampCost = (t: RfAmplifierType) => get(t).ampCost;
export const broadband = (t: RfAmplifierType) => get(t).broadband;
export const forTransmit = (t: RfAmplifierType) => get(t).forTransmit;
export const topology = (t: RfAmplifierType) => get(t).topology;
export const bestUse = (t: RfAmplifierType) => get(t).bestUse;
export const rfAmplifiers = (): RfAmplifierType[] => Object.keys(DATA) as RfAmplifierType[];

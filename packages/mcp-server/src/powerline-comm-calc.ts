export type PowerlineCommType =
  | "homeplug_av2"
  | "g3_plc_ofdm"
  | "prime_v1_4"
  | "hd_plc_wavelet"
  | "broadband_bpl";

const DATA: Record<PowerlineCommType, {
  throughput: number; range: number; reliability: number;
  latency: number; commCost: number; broadband: boolean;
  forSmartGrid: boolean; modulation: string; bestUse: string;
}> = {
  homeplug_av2: { throughput: 9, range: 5, reliability: 6, latency: 7, commCost: 4, broadband: true, forSmartGrid: false, modulation: "ofdm_mimo_beamform", bestUse: "home_network_no_cable" },
  g3_plc_ofdm: { throughput: 4, range: 8, reliability: 8, latency: 5, commCost: 3, broadband: false, forSmartGrid: true, modulation: "ofdm_cenelec_band", bestUse: "smart_meter_ami_grid" },
  prime_v1_4: { throughput: 4, range: 7, reliability: 7, latency: 5, commCost: 3, broadband: false, forSmartGrid: true, modulation: "ofdm_prime_spec", bestUse: "distribution_automation" },
  hd_plc_wavelet: { throughput: 8, range: 6, reliability: 7, latency: 6, commCost: 5, broadband: true, forSmartGrid: false, modulation: "wavelet_ofdm_hd", bestUse: "industrial_plc_backbone" },
  broadband_bpl: { throughput: 10, range: 4, reliability: 5, latency: 8, commCost: 6, broadband: true, forSmartGrid: false, modulation: "bpl_high_freq", bestUse: "last_mile_internet_access" },
};

const get = (t: PowerlineCommType) => DATA[t];

export const throughput = (t: PowerlineCommType) => get(t).throughput;
export const range = (t: PowerlineCommType) => get(t).range;
export const reliability = (t: PowerlineCommType) => get(t).reliability;
export const latency = (t: PowerlineCommType) => get(t).latency;
export const commCost = (t: PowerlineCommType) => get(t).commCost;
export const broadband = (t: PowerlineCommType) => get(t).broadband;
export const forSmartGrid = (t: PowerlineCommType) => get(t).forSmartGrid;
export const modulation = (t: PowerlineCommType) => get(t).modulation;
export const bestUse = (t: PowerlineCommType) => get(t).bestUse;
export const powerlineComms = (): PowerlineCommType[] => Object.keys(DATA) as PowerlineCommType[];

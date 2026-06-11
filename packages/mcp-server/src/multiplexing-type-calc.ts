export type MultiplexingType =
  | "tdm_time_division"
  | "wdm_wavelength_division"
  | "fdm_frequency_division"
  | "cdm_code_division"
  | "ofdm_orthogonal_freq";

const DATA: Record<MultiplexingType, {
  capacity: number; spectralEff: number; latency: number;
  complexity: number; mxCost: number; optical: boolean;
  forFiber: boolean; technique: string; bestUse: string;
}> = {
  tdm_time_division: {
    capacity: 6, spectralEff: 5, latency: 9,
    complexity: 3, mxCost: 2, optical: false,
    forFiber: false, technique: "time_slot_interleave",
    bestUse: "sonet_sdh_legacy_telecom_trunk",
  },
  wdm_wavelength_division: {
    capacity: 10, spectralEff: 9, latency: 8,
    complexity: 7, mxCost: 4, optical: true,
    forFiber: true, technique: "wavelength_lambda_multiplex",
    bestUse: "long_haul_fiber_backbone_dwdm",
  },
  fdm_frequency_division: {
    capacity: 5, spectralEff: 4, latency: 7,
    complexity: 2, mxCost: 1, optical: false,
    forFiber: false, technique: "frequency_band_subcarrier",
    bestUse: "cable_tv_analog_broadcast",
  },
  cdm_code_division: {
    capacity: 7, spectralEff: 7, latency: 6,
    complexity: 8, mxCost: 3, optical: false,
    forFiber: false, technique: "spreading_code_orthogonal",
    bestUse: "3g_cdma_mobile_multiple_access",
  },
  ofdm_orthogonal_freq: {
    capacity: 9, spectralEff: 10, latency: 5,
    complexity: 9, mxCost: 3, optical: false,
    forFiber: false, technique: "fft_subcarrier_orthogonal",
    bestUse: "4g_5g_wifi_broadband_wireless",
  },
};

const get = (t: MultiplexingType) => DATA[t];

export const capacity = (t: MultiplexingType) => get(t).capacity;
export const spectralEff = (t: MultiplexingType) => get(t).spectralEff;
export const latency = (t: MultiplexingType) => get(t).latency;
export const complexity = (t: MultiplexingType) => get(t).complexity;
export const mxCost = (t: MultiplexingType) => get(t).mxCost;
export const optical = (t: MultiplexingType) => get(t).optical;
export const forFiber = (t: MultiplexingType) => get(t).forFiber;
export const technique = (t: MultiplexingType) => get(t).technique;
export const bestUse = (t: MultiplexingType) => get(t).bestUse;
export const multiplexingTypes = (): MultiplexingType[] => Object.keys(DATA) as MultiplexingType[];

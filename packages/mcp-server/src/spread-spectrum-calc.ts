export type SpreadSpectrum =
  | "dsss_direct_sequence"
  | "fhss_frequency_hop"
  | "chirp_spread_lora"
  | "ofdm_orthogonal_fdm"
  | "thss_time_hopping";

const DATA: Record<SpreadSpectrum, {
  processingGain: number; jamResist: number; spectralEff: number;
  multipath: number; ssCost: number; cdmaCapable: boolean;
  forIot: boolean; spreading: string; bestUse: string;
}> = {
  dsss_direct_sequence: {
    processingGain: 9, jamResist: 9, spectralEff: 5,
    multipath: 7, ssCost: 3, cdmaCapable: true,
    forIot: false, spreading: "pseudorandom_chip_sequence",
    bestUse: "gps_satellite_navigation_signal",
  },
  fhss_frequency_hop: {
    processingGain: 7, jamResist: 10, spectralEff: 4,
    multipath: 5, ssCost: 2, cdmaCapable: false,
    forIot: true, spreading: "pseudorandom_hop_pattern",
    bestUse: "bluetooth_classic_interference",
  },
  chirp_spread_lora: {
    processingGain: 8, jamResist: 6, spectralEff: 3,
    multipath: 8, ssCost: 1, cdmaCapable: false,
    forIot: true, spreading: "linear_chirp_up_down",
    bestUse: "lorawan_long_range_iot_sensor",
  },
  ofdm_orthogonal_fdm: {
    processingGain: 5, jamResist: 4, spectralEff: 10,
    multipath: 10, ssCost: 4, cdmaCapable: false,
    forIot: false, spreading: "subcarrier_orthogonal_set",
    bestUse: "wifi_6_high_throughput_indoor",
  },
  thss_time_hopping: {
    processingGain: 6, jamResist: 8, spectralEff: 6,
    multipath: 6, ssCost: 3, cdmaCapable: true,
    forIot: false, spreading: "pseudorandom_pulse_position",
    bestUse: "uwb_precision_indoor_ranging",
  },
};

const get = (t: SpreadSpectrum) => DATA[t];

export const processingGain = (t: SpreadSpectrum) => get(t).processingGain;
export const jamResist = (t: SpreadSpectrum) => get(t).jamResist;
export const spectralEff = (t: SpreadSpectrum) => get(t).spectralEff;
export const multipath = (t: SpreadSpectrum) => get(t).multipath;
export const ssCost = (t: SpreadSpectrum) => get(t).ssCost;
export const cdmaCapable = (t: SpreadSpectrum) => get(t).cdmaCapable;
export const forIot = (t: SpreadSpectrum) => get(t).forIot;
export const spreading = (t: SpreadSpectrum) => get(t).spreading;
export const bestUse = (t: SpreadSpectrum) => get(t).bestUse;
export const spreadSpectrums = (): SpreadSpectrum[] => Object.keys(DATA) as SpreadSpectrum[];

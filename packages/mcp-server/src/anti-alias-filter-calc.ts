export type AntiAliasFilter =
  | "butterworth_flat"
  | "chebyshev_equiripple"
  | "bessel_linear_phase"
  | "elliptic_cauer"
  | "sallen_key_active";

const DATA: Record<AntiAliasFilter, {
  rolloff: number; passRipple: number; groupDelay: number;
  stopAtten: number; filterCost: number; active: boolean;
  forAdc: boolean; response: string; bestUse: string;
}> = {
  butterworth_flat: {
    rolloff: 5, passRipple: 10, groupDelay: 7,
    stopAtten: 5, filterCost: 3, active: false,
    forAdc: true, response: "maximally_flat_mag",
    bestUse: "general_adc_antialias",
  },
  chebyshev_equiripple: {
    rolloff: 8, passRipple: 4, groupDelay: 5,
    stopAtten: 7, filterCost: 4, active: false,
    forAdc: false, response: "equiripple_passband",
    bestUse: "rf_channel_select",
  },
  bessel_linear_phase: {
    rolloff: 3, passRipple: 9, groupDelay: 10,
    stopAtten: 3, filterCost: 3, active: false,
    forAdc: false, response: "linear_phase_delay",
    bestUse: "pulse_waveform_preserve",
  },
  elliptic_cauer: {
    rolloff: 10, passRipple: 3, groupDelay: 3,
    stopAtten: 10, filterCost: 5, active: false,
    forAdc: true, response: "equiripple_both_bands",
    bestUse: "oversampled_adc_sharp",
  },
  sallen_key_active: {
    rolloff: 6, passRipple: 8, groupDelay: 6,
    stopAtten: 6, filterCost: 6, active: true,
    forAdc: true, response: "voltage_follower_2pole",
    bestUse: "sensor_signal_condition",
  },
};

const get = (t: AntiAliasFilter) => DATA[t];

export const rolloff = (t: AntiAliasFilter) => get(t).rolloff;
export const passRipple = (t: AntiAliasFilter) => get(t).passRipple;
export const groupDelay = (t: AntiAliasFilter) => get(t).groupDelay;
export const stopAtten = (t: AntiAliasFilter) => get(t).stopAtten;
export const filterCost = (t: AntiAliasFilter) => get(t).filterCost;
export const active = (t: AntiAliasFilter) => get(t).active;
export const forAdc = (t: AntiAliasFilter) => get(t).forAdc;
export const response = (t: AntiAliasFilter) => get(t).response;
export const bestUse = (t: AntiAliasFilter) => get(t).bestUse;
export const antiAliasFilters = (): AntiAliasFilter[] => Object.keys(DATA) as AntiAliasFilter[];

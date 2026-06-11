export type LnaTopology =
  | "common_source_inductive"
  | "cascode_gain_boost"
  | "noise_cancelling"
  | "common_gate_wideband"
  | "balun_lna_mixer";

const DATA: Record<LnaTopology, {
  noiseFigure: number; gain: number; bandwidth: number;
  linearity: number; lnaCost: number; differential: boolean;
  forMmwave: boolean; technique: string; bestUse: string;
}> = {
  common_source_inductive: {
    noiseFigure: 9, gain: 8, bandwidth: 5,
    linearity: 6, lnaCost: 3, differential: false,
    forMmwave: false, technique: "source_degeneration_match",
    bestUse: "narrowband_wifi_rx",
  },
  cascode_gain_boost: {
    noiseFigure: 8, gain: 10, bandwidth: 6,
    linearity: 7, lnaCost: 4, differential: false,
    forMmwave: true, technique: "stacked_transistor_shield",
    bestUse: "5g_nr_front_end",
  },
  noise_cancelling: {
    noiseFigure: 10, gain: 7, bandwidth: 9,
    linearity: 8, lnaCost: 6, differential: true,
    forMmwave: false, technique: "feedforward_noise_subtract",
    bestUse: "sdr_wideband_receiver",
  },
  common_gate_wideband: {
    noiseFigure: 5, gain: 5, bandwidth: 10,
    linearity: 9, lnaCost: 2, differential: false,
    forMmwave: false, technique: "resistive_input_match",
    bestUse: "uwb_impulse_radio",
  },
  balun_lna_mixer: {
    noiseFigure: 7, gain: 9, bandwidth: 8,
    linearity: 7, lnaCost: 7, differential: true,
    forMmwave: true, technique: "active_balun_direct_convert",
    bestUse: "60ghz_phased_array",
  },
};

const get = (t: LnaTopology) => DATA[t];

export const noiseFigure = (t: LnaTopology) => get(t).noiseFigure;
export const gain = (t: LnaTopology) => get(t).gain;
export const bandwidth = (t: LnaTopology) => get(t).bandwidth;
export const linearity = (t: LnaTopology) => get(t).linearity;
export const lnaCost = (t: LnaTopology) => get(t).lnaCost;
export const differential = (t: LnaTopology) => get(t).differential;
export const forMmwave = (t: LnaTopology) => get(t).forMmwave;
export const technique = (t: LnaTopology) => get(t).technique;
export const bestUse = (t: LnaTopology) => get(t).bestUse;
export const lnaTopologies = (): LnaTopology[] => Object.keys(DATA) as LnaTopology[];

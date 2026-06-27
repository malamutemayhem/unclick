export type MixerType =
  | "passive_switch_ring"
  | "active_gilbert_cell"
  | "subharmonic_x2"
  | "sampling_mixer"
  | "harmonic_reject";

const DATA: Record<MixerType, {
  convGain: number; noiseFigure: number; linearity: number;
  loLeakage: number; mixCost: number; requiresLoDrive: boolean;
  forDirectConvert: boolean; topology: string; bestUse: string;
}> = {
  passive_switch_ring: {
    convGain: 3, noiseFigure: 7, linearity: 10,
    loLeakage: 8, mixCost: 2, requiresLoDrive: true,
    forDirectConvert: true, topology: "four_fet_commutating",
    bestUse: "high_dynamic_range_rx",
  },
  active_gilbert_cell: {
    convGain: 9, noiseFigure: 6, linearity: 6,
    loLeakage: 6, mixCost: 4, requiresLoDrive: false,
    forDirectConvert: false, topology: "cross_coupled_diff_pair",
    bestUse: "if_stage_superheterodyne",
  },
  subharmonic_x2: {
    convGain: 5, noiseFigure: 5, linearity: 7,
    loLeakage: 10, mixCost: 5, requiresLoDrive: false,
    forDirectConvert: true, topology: "anti_parallel_diode_pair",
    bestUse: "mmwave_lo_halving",
  },
  sampling_mixer: {
    convGain: 4, noiseFigure: 8, linearity: 9,
    loLeakage: 7, mixCost: 6, requiresLoDrive: true,
    forDirectConvert: true, topology: "track_and_hold_switch",
    bestUse: "wideband_sdr_digitizer",
  },
  harmonic_reject: {
    convGain: 7, noiseFigure: 7, linearity: 8,
    loLeakage: 9, mixCost: 7, requiresLoDrive: false,
    forDirectConvert: true, topology: "polyphase_weighted_sum",
    bestUse: "tv_tuner_harmonic_free",
  },
};

const get = (t: MixerType) => DATA[t];

export const convGain = (t: MixerType) => get(t).convGain;
export const noiseFigure = (t: MixerType) => get(t).noiseFigure;
export const linearity = (t: MixerType) => get(t).linearity;
export const loLeakage = (t: MixerType) => get(t).loLeakage;
export const mixCost = (t: MixerType) => get(t).mixCost;
export const requiresLoDrive = (t: MixerType) => get(t).requiresLoDrive;
export const forDirectConvert = (t: MixerType) => get(t).forDirectConvert;
export const topology = (t: MixerType) => get(t).topology;
export const bestUse = (t: MixerType) => get(t).bestUse;
export const mixerTypes = (): MixerType[] => Object.keys(DATA) as MixerType[];

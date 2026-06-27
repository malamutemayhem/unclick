export type ClockJitter =
  | "xo_tcxo_comp"
  | "ocxo_oven_ctrl"
  | "mems_resonator"
  | "si_pll_synth"
  | "atomic_rb_csac";

const DATA: Record<ClockJitter, {
  phaseJitter: number; freqStability: number; startupTime: number;
  powerDraw: number; clockCost: number; programmable: boolean;
  forTelecom: boolean; oscillator: string; bestUse: string;
}> = {
  xo_tcxo_comp: {
    phaseJitter: 5, freqStability: 6, startupTime: 7,
    powerDraw: 3, clockCost: 3, programmable: false,
    forTelecom: false, oscillator: "at_cut_quartz_comp",
    bestUse: "gps_reference_tcxo",
  },
  ocxo_oven_ctrl: {
    phaseJitter: 8, freqStability: 9, startupTime: 2,
    powerDraw: 8, clockCost: 7, programmable: false,
    forTelecom: true, oscillator: "sc_cut_oven_stab",
    bestUse: "telecom_stratum_3_holdover",
  },
  mems_resonator: {
    phaseJitter: 4, freqStability: 4, startupTime: 9,
    powerDraw: 2, clockCost: 2, programmable: true,
    forTelecom: false, oscillator: "silicon_mems_piezo",
    bestUse: "consumer_soc_clock",
  },
  si_pll_synth: {
    phaseJitter: 9, freqStability: 7, startupTime: 6,
    powerDraw: 5, clockCost: 5, programmable: true,
    forTelecom: true, oscillator: "dspll_any_freq_synth",
    bestUse: "jitter_cleaner_serdes",
  },
  atomic_rb_csac: {
    phaseJitter: 7, freqStability: 10, startupTime: 3,
    powerDraw: 6, clockCost: 10, programmable: false,
    forTelecom: true, oscillator: "rubidium_vapor_cell",
    bestUse: "gnss_denied_timing",
  },
};

const get = (t: ClockJitter) => DATA[t];

export const phaseJitter = (t: ClockJitter) => get(t).phaseJitter;
export const freqStability = (t: ClockJitter) => get(t).freqStability;
export const startupTime = (t: ClockJitter) => get(t).startupTime;
export const powerDraw = (t: ClockJitter) => get(t).powerDraw;
export const clockCost = (t: ClockJitter) => get(t).clockCost;
export const programmable = (t: ClockJitter) => get(t).programmable;
export const forTelecom = (t: ClockJitter) => get(t).forTelecom;
export const oscillator = (t: ClockJitter) => get(t).oscillator;
export const bestUse = (t: ClockJitter) => get(t).bestUse;
export const clockJitters = (): ClockJitter[] => Object.keys(DATA) as ClockJitter[];

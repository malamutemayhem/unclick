export type SerdesEq =
  | "ctle_continuous"
  | "ffe_feedforward"
  | "dfe_decision"
  | "pam4_mlse"
  | "cdr_baud_rate";

const DATA: Record<SerdesEq, {
  reach: number; powerEff: number; latency: number;
  complexity: number; eqCost: number; adaptive: boolean;
  forPam4: boolean; technique: string; bestUse: string;
}> = {
  ctle_continuous: {
    reach: 5, powerEff: 9, latency: 10,
    complexity: 3, eqCost: 2, adaptive: false,
    forPam4: false, technique: "analog_peaking_zero_pole",
    bestUse: "short_reach_chip_to_chip",
  },
  ffe_feedforward: {
    reach: 7, powerEff: 7, latency: 8,
    complexity: 5, eqCost: 4, adaptive: true,
    forPam4: true, technique: "pre_cursor_tap_cancel",
    bestUse: "tx_emphasis_backplane",
  },
  dfe_decision: {
    reach: 8, powerEff: 6, latency: 7,
    complexity: 7, eqCost: 5, adaptive: true,
    forPam4: true, technique: "post_cursor_feedback_loop",
    bestUse: "long_reach_copper_dac",
  },
  pam4_mlse: {
    reach: 10, powerEff: 3, latency: 4,
    complexity: 10, eqCost: 9, adaptive: true,
    forPam4: true, technique: "viterbi_sequence_estimate",
    bestUse: "112g_pam4_optical_dsp",
  },
  cdr_baud_rate: {
    reach: 6, powerEff: 8, latency: 9,
    complexity: 6, eqCost: 3, adaptive: true,
    forPam4: false, technique: "mueller_muller_timing",
    bestUse: "nrz_retimer_repeater",
  },
};

const get = (t: SerdesEq) => DATA[t];

export const reach = (t: SerdesEq) => get(t).reach;
export const powerEff = (t: SerdesEq) => get(t).powerEff;
export const latency = (t: SerdesEq) => get(t).latency;
export const complexity = (t: SerdesEq) => get(t).complexity;
export const eqCost = (t: SerdesEq) => get(t).eqCost;
export const adaptive = (t: SerdesEq) => get(t).adaptive;
export const forPam4 = (t: SerdesEq) => get(t).forPam4;
export const technique = (t: SerdesEq) => get(t).technique;
export const bestUse = (t: SerdesEq) => get(t).bestUse;
export const serdesEqs = (): SerdesEq[] => Object.keys(DATA) as SerdesEq[];

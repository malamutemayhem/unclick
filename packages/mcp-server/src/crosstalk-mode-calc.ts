export type CrosstalkMode =
  | "near_end_next"
  | "far_end_fext"
  | "alien_crosstalk"
  | "power_sum_psxt"
  | "differential_skew";

const DATA: Record<CrosstalkMode, {
  severity: number; freqDepend: number; predictability: number;
  mitigation: number; xtCost: number; shieldHelps: boolean;
  forDiffPair: boolean; mechanism: string; bestUse: string;
}> = {
  near_end_next: {
    severity: 8, freqDepend: 7, predictability: 7,
    mitigation: 6, xtCost: 4, shieldHelps: true,
    forDiffPair: true, mechanism: "capacitive_inductive_coupling",
    bestUse: "pcb_trace_spacing_rule",
  },
  far_end_fext: {
    severity: 6, freqDepend: 9, predictability: 8,
    mitigation: 7, xtCost: 5, shieldHelps: true,
    forDiffPair: true, mechanism: "forward_traveling_coupled",
    bestUse: "backplane_channel_budget",
  },
  alien_crosstalk: {
    severity: 7, freqDepend: 8, predictability: 4,
    mitigation: 3, xtCost: 7, shieldHelps: true,
    forDiffPair: false, mechanism: "cable_to_cable_radiated",
    bestUse: "10gbase_t_cat6a_margin",
  },
  power_sum_psxt: {
    severity: 9, freqDepend: 8, predictability: 6,
    mitigation: 5, xtCost: 6, shieldHelps: false,
    forDiffPair: false, mechanism: "aggregate_multi_disturber",
    bestUse: "connector_compliance_test",
  },
  differential_skew: {
    severity: 5, freqDepend: 10, predictability: 9,
    mitigation: 8, xtCost: 3, shieldHelps: false,
    forDiffPair: true, mechanism: "length_mismatch_mode_convert",
    bestUse: "usb4_lane_match_route",
  },
};

const get = (t: CrosstalkMode) => DATA[t];

export const severity = (t: CrosstalkMode) => get(t).severity;
export const freqDepend = (t: CrosstalkMode) => get(t).freqDepend;
export const predictability = (t: CrosstalkMode) => get(t).predictability;
export const mitigation = (t: CrosstalkMode) => get(t).mitigation;
export const xtCost = (t: CrosstalkMode) => get(t).xtCost;
export const shieldHelps = (t: CrosstalkMode) => get(t).shieldHelps;
export const forDiffPair = (t: CrosstalkMode) => get(t).forDiffPair;
export const mechanism = (t: CrosstalkMode) => get(t).mechanism;
export const bestUse = (t: CrosstalkMode) => get(t).bestUse;
export const crosstalkModes = (): CrosstalkMode[] => Object.keys(DATA) as CrosstalkMode[];

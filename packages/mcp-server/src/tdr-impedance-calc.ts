export type TdrImpedance =
  | "step_tdr_single"
  | "differential_tdr_pair"
  | "spread_spectrum_stdr"
  | "frequency_domain_tdr"
  | "vna_based_time_gate";

const DATA: Record<TdrImpedance, {
  resolution: number; dynamicRange: number; speed: number;
  accuracy: number; tdrCost: number; liveTraffic: boolean;
  forPcb: boolean; excitation: string; bestUse: string;
}> = {
  step_tdr_single: {
    resolution: 7, dynamicRange: 6, speed: 8,
    accuracy: 7, tdrCost: 4, liveTraffic: false,
    forPcb: true, excitation: "fast_edge_step_pulse",
    bestUse: "single_ended_trace_match",
  },
  differential_tdr_pair: {
    resolution: 8, dynamicRange: 7, speed: 7,
    accuracy: 8, tdrCost: 6, liveTraffic: false,
    forPcb: true, excitation: "balanced_diff_step",
    bestUse: "diff_pair_impedance_control",
  },
  spread_spectrum_stdr: {
    resolution: 5, dynamicRange: 8, speed: 9,
    accuracy: 6, tdrCost: 3, liveTraffic: true,
    forPcb: false, excitation: "pseudo_random_bit_seq",
    bestUse: "live_cable_fault_locate",
  },
  frequency_domain_tdr: {
    resolution: 9, dynamicRange: 9, speed: 5,
    accuracy: 9, tdrCost: 7, liveTraffic: false,
    forPcb: true, excitation: "swept_freq_ifft_convert",
    bestUse: "connector_via_discontinuity",
  },
  vna_based_time_gate: {
    resolution: 10, dynamicRange: 10, speed: 4,
    accuracy: 10, tdrCost: 9, liveTraffic: false,
    forPcb: true, excitation: "calibrated_s_param_gate",
    bestUse: "backplane_channel_extraction",
  },
};

const get = (t: TdrImpedance) => DATA[t];

export const resolution = (t: TdrImpedance) => get(t).resolution;
export const dynamicRange = (t: TdrImpedance) => get(t).dynamicRange;
export const speed = (t: TdrImpedance) => get(t).speed;
export const accuracy = (t: TdrImpedance) => get(t).accuracy;
export const tdrCost = (t: TdrImpedance) => get(t).tdrCost;
export const liveTraffic = (t: TdrImpedance) => get(t).liveTraffic;
export const forPcb = (t: TdrImpedance) => get(t).forPcb;
export const excitation = (t: TdrImpedance) => get(t).excitation;
export const bestUse = (t: TdrImpedance) => get(t).bestUse;
export const tdrImpedances = (): TdrImpedance[] => Object.keys(DATA) as TdrImpedance[];

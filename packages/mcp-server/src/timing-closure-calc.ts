export type TimingClosure =
  | "static_timing_sta"
  | "clock_domain_cdc"
  | "signal_integrity_si"
  | "power_aware_mvt"
  | "physical_aware_eco";

const DATA: Record<TimingClosure, {
  accuracy: number; runtime: number; coverage: number;
  automation: number; tcCost: number; signoff: boolean;
  forMultiClock: boolean; technique: string; bestUse: string;
}> = {
  static_timing_sta: {
    accuracy: 10, runtime: 7, coverage: 9,
    automation: 8, tcCost: 6, signoff: true,
    forMultiClock: false, technique: "graph_propagation_slack",
    bestUse: "setup_hold_signoff",
  },
  clock_domain_cdc: {
    accuracy: 8, runtime: 8, coverage: 7,
    automation: 6, tcCost: 5, signoff: true,
    forMultiClock: true, technique: "metastability_protocol_check",
    bestUse: "async_fifo_crossing_verify",
  },
  signal_integrity_si: {
    accuracy: 9, runtime: 4, coverage: 6,
    automation: 5, tcCost: 8, signoff: true,
    forMultiClock: false, technique: "crosstalk_glitch_delta_delay",
    bestUse: "aggressor_victim_noise_check",
  },
  power_aware_mvt: {
    accuracy: 8, runtime: 6, coverage: 8,
    automation: 7, tcCost: 7, signoff: true,
    forMultiClock: false, technique: "multi_vt_swap_leakage_tradeoff",
    bestUse: "power_timing_co_optimize",
  },
  physical_aware_eco: {
    accuracy: 7, runtime: 9, coverage: 5,
    automation: 9, tcCost: 4, signoff: false,
    forMultiClock: false, technique: "incremental_netlist_patch",
    bestUse: "post_silicon_bug_fix",
  },
};

const get = (t: TimingClosure) => DATA[t];

export const accuracy = (t: TimingClosure) => get(t).accuracy;
export const runtime = (t: TimingClosure) => get(t).runtime;
export const coverage = (t: TimingClosure) => get(t).coverage;
export const automation = (t: TimingClosure) => get(t).automation;
export const tcCost = (t: TimingClosure) => get(t).tcCost;
export const signoff = (t: TimingClosure) => get(t).signoff;
export const forMultiClock = (t: TimingClosure) => get(t).forMultiClock;
export const technique = (t: TimingClosure) => get(t).technique;
export const bestUse = (t: TimingClosure) => get(t).bestUse;
export const timingClosures = (): TimingClosure[] => Object.keys(DATA) as TimingClosure[];

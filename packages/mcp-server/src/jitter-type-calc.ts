export type JitterType =
  | "random_gaussian"
  | "deterministic_periodic"
  | "duty_cycle_distortion"
  | "bounded_uncorrelated"
  | "spread_spectrum";

const DATA: Record<JitterType, {
  magnitude: number; predictability: number; freqDepend: number;
  filterability: number; jitCost: number; correlated: boolean;
  forEmi: boolean; source: string; bestUse: string;
}> = {
  random_gaussian: {
    magnitude: 7, predictability: 2, freqDepend: 3,
    filterability: 3, jitCost: 6, correlated: false,
    forEmi: false, source: "thermal_shot_noise",
    bestUse: "ber_floor_analysis",
  },
  deterministic_periodic: {
    magnitude: 5, predictability: 10, freqDepend: 9,
    filterability: 9, jitCost: 4, correlated: true,
    forEmi: false, source: "crosstalk_spur_coupling",
    bestUse: "spur_identification_debug",
  },
  duty_cycle_distortion: {
    magnitude: 4, predictability: 8, freqDepend: 5,
    filterability: 7, jitCost: 3, correlated: true,
    forEmi: false, source: "rise_fall_time_mismatch",
    bestUse: "clock_duty_cycle_correct",
  },
  bounded_uncorrelated: {
    magnitude: 6, predictability: 5, freqDepend: 4,
    filterability: 5, jitCost: 5, correlated: false,
    forEmi: false, source: "isi_pattern_dependent",
    bestUse: "eye_margin_worst_case",
  },
  spread_spectrum: {
    magnitude: 8, predictability: 9, freqDepend: 8,
    filterability: 8, jitCost: 2, correlated: true,
    forEmi: true, source: "intentional_freq_modulation",
    bestUse: "emi_reduction_clock_spread",
  },
};

const get = (t: JitterType) => DATA[t];

export const magnitude = (t: JitterType) => get(t).magnitude;
export const predictability = (t: JitterType) => get(t).predictability;
export const freqDepend = (t: JitterType) => get(t).freqDepend;
export const filterability = (t: JitterType) => get(t).filterability;
export const jitCost = (t: JitterType) => get(t).jitCost;
export const correlated = (t: JitterType) => get(t).correlated;
export const forEmi = (t: JitterType) => get(t).forEmi;
export const source = (t: JitterType) => get(t).source;
export const bestUse = (t: JitterType) => get(t).bestUse;
export const jitterTypes = (): JitterType[] => Object.keys(DATA) as JitterType[];

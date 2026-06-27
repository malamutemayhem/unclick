export type PidTuning =
  | "ziegler_nichols"
  | "cohen_coon"
  | "relay_feedback"
  | "imc_internal_model"
  | "genetic_algorithm";

const DATA: Record<PidTuning, {
  settleTime: number; overshoot: number; robustness: number;
  easeOfUse: number; tuneCost: number; autoTune: boolean;
  forProcess: boolean; method: string; bestUse: string;
}> = {
  ziegler_nichols: {
    settleTime: 6, overshoot: 4, robustness: 5,
    easeOfUse: 8, tuneCost: 1, autoTune: false,
    forProcess: true, method: "ultimate_gain_period",
    bestUse: "quick_initial_estimate",
  },
  cohen_coon: {
    settleTime: 7, overshoot: 6, robustness: 7,
    easeOfUse: 7, tuneCost: 2, autoTune: false,
    forProcess: true, method: "process_reaction_curve",
    bestUse: "first_order_dead_time",
  },
  relay_feedback: {
    settleTime: 7, overshoot: 7, robustness: 8,
    easeOfUse: 6, tuneCost: 3, autoTune: true,
    forProcess: true, method: "relay_oscillation_test",
    bestUse: "online_auto_tune_plc",
  },
  imc_internal_model: {
    settleTime: 9, overshoot: 9, robustness: 9,
    easeOfUse: 5, tuneCost: 4, autoTune: false,
    forProcess: true, method: "model_inverse_filter",
    bestUse: "chemical_reactor_temp",
  },
  genetic_algorithm: {
    settleTime: 10, overshoot: 10, robustness: 8,
    easeOfUse: 3, tuneCost: 7, autoTune: true,
    forProcess: false, method: "evolutionary_optimization",
    bestUse: "multi_objective_nonlinear",
  },
};

const get = (t: PidTuning) => DATA[t];

export const settleTime = (t: PidTuning) => get(t).settleTime;
export const overshoot = (t: PidTuning) => get(t).overshoot;
export const robustness = (t: PidTuning) => get(t).robustness;
export const easeOfUse = (t: PidTuning) => get(t).easeOfUse;
export const tuneCost = (t: PidTuning) => get(t).tuneCost;
export const autoTune = (t: PidTuning) => get(t).autoTune;
export const forProcess = (t: PidTuning) => get(t).forProcess;
export const method = (t: PidTuning) => get(t).method;
export const bestUse = (t: PidTuning) => get(t).bestUse;
export const pidTunings = (): PidTuning[] => Object.keys(DATA) as PidTuning[];

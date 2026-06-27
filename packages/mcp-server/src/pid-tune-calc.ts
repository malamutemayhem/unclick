export type PidTune =
  | "ziegler_nichols_osc"
  | "cohen_coon_reaction"
  | "lambda_imc_model"
  | "relay_feedback_auto"
  | "robust_h_infinity";

const DATA: Record<PidTune, {
  speed: number; robustness: number; overshoot: number;
  modelReq: number; ptCost: number; autoTune: boolean;
  forProcess: boolean; method: string; bestUse: string;
}> = {
  ziegler_nichols_osc: {
    speed: 9, robustness: 4, overshoot: 3,
    modelReq: 3, ptCost: 1, autoTune: false,
    forProcess: true, method: "ultimate_gain_period",
    bestUse: "quick_commissioning_startup",
  },
  cohen_coon_reaction: {
    speed: 7, robustness: 6, overshoot: 5,
    modelReq: 5, ptCost: 2, autoTune: false,
    forProcess: true, method: "open_loop_step_response",
    bestUse: "self_regulating_thermal_loop",
  },
  lambda_imc_model: {
    speed: 5, robustness: 9, overshoot: 9,
    modelReq: 7, ptCost: 3, autoTune: false,
    forProcess: true, method: "internal_model_control",
    bestUse: "chemical_reactor_temp_hold",
  },
  relay_feedback_auto: {
    speed: 8, robustness: 7, overshoot: 6,
    modelReq: 4, ptCost: 5, autoTune: true,
    forProcess: true, method: "relay_oscillation_identify",
    bestUse: "dcs_autotuner_field_loop",
  },
  robust_h_infinity: {
    speed: 6, robustness: 10, overshoot: 10,
    modelReq: 10, ptCost: 8, autoTune: true,
    forProcess: false, method: "frequency_domain_optimization",
    bestUse: "flexible_structure_vibration",
  },
};

const get = (t: PidTune) => DATA[t];

export const speed = (t: PidTune) => get(t).speed;
export const robustness = (t: PidTune) => get(t).robustness;
export const overshoot = (t: PidTune) => get(t).overshoot;
export const modelReq = (t: PidTune) => get(t).modelReq;
export const ptCost = (t: PidTune) => get(t).ptCost;
export const autoTune = (t: PidTune) => get(t).autoTune;
export const forProcess = (t: PidTune) => get(t).forProcess;
export const method = (t: PidTune) => get(t).method;
export const bestUse = (t: PidTune) => get(t).bestUse;
export const pidTunes = (): PidTune[] => Object.keys(DATA) as PidTune[];

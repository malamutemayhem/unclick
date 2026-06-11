export type PidControl =
  | "classic_pid"
  | "cascade_dual_loop"
  | "feedforward_pid"
  | "adaptive_gain_sched"
  | "model_predictive";

const DATA: Record<PidControl, {
  responseTime: number; stability: number; disturbReject: number;
  tuningEase: number; pidCost: number; autoTune: boolean;
  forProcess: boolean; algorithm: string; bestUse: string;
}> = {
  classic_pid: {
    responseTime: 6, stability: 7, disturbReject: 6,
    tuningEase: 8, pidCost: 3, autoTune: false,
    forProcess: true, algorithm: "proportional_integral_deriv",
    bestUse: "single_loop_temp_control",
  },
  cascade_dual_loop: {
    responseTime: 8, stability: 8, disturbReject: 8,
    tuningEase: 5, pidCost: 5, autoTune: false,
    forProcess: true, algorithm: "inner_outer_loop",
    bestUse: "boiler_steam_pressure",
  },
  feedforward_pid: {
    responseTime: 9, stability: 7, disturbReject: 9,
    tuningEase: 4, pidCost: 6, autoTune: false,
    forProcess: true, algorithm: "measured_disturbance_comp",
    bestUse: "flow_ratio_mixing",
  },
  adaptive_gain_sched: {
    responseTime: 8, stability: 8, disturbReject: 7,
    tuningEase: 6, pidCost: 7, autoTune: true,
    forProcess: true, algorithm: "operating_point_table",
    bestUse: "nonlinear_ph_neutralize",
  },
  model_predictive: {
    responseTime: 9, stability: 9, disturbReject: 9,
    tuningEase: 3, pidCost: 9, autoTune: true,
    forProcess: false, algorithm: "receding_horizon_opt",
    bestUse: "multi_variable_refinery",
  },
};

const get = (t: PidControl) => DATA[t];

export const responseTime = (t: PidControl) => get(t).responseTime;
export const stability = (t: PidControl) => get(t).stability;
export const disturbReject = (t: PidControl) => get(t).disturbReject;
export const tuningEase = (t: PidControl) => get(t).tuningEase;
export const pidCost = (t: PidControl) => get(t).pidCost;
export const autoTune = (t: PidControl) => get(t).autoTune;
export const forProcess = (t: PidControl) => get(t).forProcess;
export const algorithm = (t: PidControl) => get(t).algorithm;
export const bestUse = (t: PidControl) => get(t).bestUse;
export const pidControls = (): PidControl[] => Object.keys(DATA) as PidControl[];

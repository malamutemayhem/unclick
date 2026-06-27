export type PidLoop =
  | "p_only_proportional"
  | "pi_integral"
  | "pid_classic"
  | "pid_cascade"
  | "fuzzy_pid_adaptive";

const DATA: Record<PidLoop, {
  settlingTime: number; overshoot: number; steadyState: number;
  robustness: number; loopCost: number; antiWindup: boolean;
  forMotion: boolean; tuning: string; bestUse: string;
}> = {
  p_only_proportional: {
    settlingTime: 4, overshoot: 3, steadyState: 3,
    robustness: 8, loopCost: 1, antiWindup: false,
    forMotion: false, tuning: "manual_gain_set",
    bestUse: "simple_level_control",
  },
  pi_integral: {
    settlingTime: 6, overshoot: 5, steadyState: 8,
    robustness: 7, loopCost: 3, antiWindup: true,
    forMotion: false, tuning: "ziegler_nichols_pi",
    bestUse: "flow_pressure_regulation",
  },
  pid_classic: {
    settlingTime: 8, overshoot: 7, steadyState: 9,
    robustness: 6, loopCost: 5, antiWindup: true,
    forMotion: true, tuning: "ziegler_nichols_pid",
    bestUse: "temperature_process_control",
  },
  pid_cascade: {
    settlingTime: 9, overshoot: 8, steadyState: 10,
    robustness: 5, loopCost: 8, antiWindup: true,
    forMotion: true, tuning: "inner_outer_sequential",
    bestUse: "precision_servo_positioning",
  },
  fuzzy_pid_adaptive: {
    settlingTime: 7, overshoot: 9, steadyState: 7,
    robustness: 9, loopCost: 9, antiWindup: true,
    forMotion: true, tuning: "self_tuning_rule_base",
    bestUse: "nonlinear_plant_adaptive",
  },
};

const get = (t: PidLoop) => DATA[t];

export const settlingTime = (t: PidLoop) => get(t).settlingTime;
export const overshoot = (t: PidLoop) => get(t).overshoot;
export const steadyState = (t: PidLoop) => get(t).steadyState;
export const robustness = (t: PidLoop) => get(t).robustness;
export const loopCost = (t: PidLoop) => get(t).loopCost;
export const antiWindup = (t: PidLoop) => get(t).antiWindup;
export const forMotion = (t: PidLoop) => get(t).forMotion;
export const tuning = (t: PidLoop) => get(t).tuning;
export const bestUse = (t: PidLoop) => get(t).bestUse;
export const pidLoops = (): PidLoop[] => Object.keys(DATA) as PidLoop[];

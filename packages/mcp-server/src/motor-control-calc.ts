export type MotorControl =
  | "v_f_scalar"
  | "direct_torque_dtc"
  | "field_oriented_foc"
  | "model_predictive_mpc"
  | "sliding_mode_smc";

const DATA: Record<MotorControl, {
  dynamicResp: number; efficiency: number; torqueAccuracy: number;
  complexity: number; mcCost: number; sensorless: boolean;
  forInduction: boolean; technique: string; bestUse: string;
}> = {
  v_f_scalar: {
    dynamicResp: 3, efficiency: 5, torqueAccuracy: 3,
    complexity: 10, mcCost: 1, sensorless: true,
    forInduction: true, technique: "voltage_frequency_ratio",
    bestUse: "pump_fan_constant_load",
  },
  direct_torque_dtc: {
    dynamicResp: 9, efficiency: 8, torqueAccuracy: 8,
    complexity: 5, mcCost: 5, sensorless: true,
    forInduction: true, technique: "hysteresis_flux_torque",
    bestUse: "crane_hoist_fast_reverse",
  },
  field_oriented_foc: {
    dynamicResp: 9, efficiency: 9, torqueAccuracy: 10,
    complexity: 4, mcCost: 6, sensorless: false,
    forInduction: true, technique: "rotor_flux_alignment",
    bestUse: "cnc_spindle_smooth_torque",
  },
  model_predictive_mpc: {
    dynamicResp: 10, efficiency: 10, torqueAccuracy: 10,
    complexity: 2, mcCost: 8, sensorless: false,
    forInduction: false, technique: "finite_set_horizon_opt",
    bestUse: "ev_powertrain_optimal",
  },
  sliding_mode_smc: {
    dynamicResp: 8, efficiency: 7, torqueAccuracy: 7,
    complexity: 5, mcCost: 4, sensorless: true,
    forInduction: false, technique: "switching_surface_reach",
    bestUse: "robust_load_disturbance",
  },
};

const get = (t: MotorControl) => DATA[t];

export const dynamicResp = (t: MotorControl) => get(t).dynamicResp;
export const efficiency = (t: MotorControl) => get(t).efficiency;
export const torqueAccuracy = (t: MotorControl) => get(t).torqueAccuracy;
export const complexity = (t: MotorControl) => get(t).complexity;
export const mcCost = (t: MotorControl) => get(t).mcCost;
export const sensorless = (t: MotorControl) => get(t).sensorless;
export const forInduction = (t: MotorControl) => get(t).forInduction;
export const technique = (t: MotorControl) => get(t).technique;
export const bestUse = (t: MotorControl) => get(t).bestUse;
export const motorControls = (): MotorControl[] => Object.keys(DATA) as MotorControl[];

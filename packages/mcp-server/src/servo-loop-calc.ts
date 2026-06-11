export type ServoLoop =
  | "position_pid"
  | "velocity_pi"
  | "current_torque"
  | "cascade_pvt"
  | "model_predictive";

const DATA: Record<ServoLoop, {
  bandwidth: number; stiffness: number; disturbReject: number;
  complexity: number; svCost: number; feedforward: boolean;
  forPrecision: boolean; controller: string; bestUse: string;
}> = {
  position_pid: {
    bandwidth: 5, stiffness: 6, disturbReject: 5,
    complexity: 4, svCost: 2, feedforward: false,
    forPrecision: false, controller: "proportional_integral_deriv",
    bestUse: "simple_positioning_stage",
  },
  velocity_pi: {
    bandwidth: 7, stiffness: 5, disturbReject: 7,
    complexity: 3, svCost: 2, feedforward: false,
    forPrecision: false, controller: "proportional_integral",
    bestUse: "spindle_speed_regulate",
  },
  current_torque: {
    bandwidth: 10, stiffness: 3, disturbReject: 8,
    complexity: 5, svCost: 3, feedforward: false,
    forPrecision: false, controller: "hysteresis_pwm_band",
    bestUse: "force_control_grinding",
  },
  cascade_pvt: {
    bandwidth: 8, stiffness: 9, disturbReject: 9,
    complexity: 7, svCost: 4, feedforward: true,
    forPrecision: true, controller: "nested_pos_vel_torque",
    bestUse: "cnc_axis_servo_drive",
  },
  model_predictive: {
    bandwidth: 7, stiffness: 8, disturbReject: 10,
    complexity: 10, svCost: 7, feedforward: true,
    forPrecision: true, controller: "receding_horizon_optim",
    bestUse: "multi_axis_coordinated",
  },
};

const get = (t: ServoLoop) => DATA[t];

export const bandwidth = (t: ServoLoop) => get(t).bandwidth;
export const stiffness = (t: ServoLoop) => get(t).stiffness;
export const disturbReject = (t: ServoLoop) => get(t).disturbReject;
export const complexity = (t: ServoLoop) => get(t).complexity;
export const svCost = (t: ServoLoop) => get(t).svCost;
export const feedforward = (t: ServoLoop) => get(t).feedforward;
export const forPrecision = (t: ServoLoop) => get(t).forPrecision;
export const controller = (t: ServoLoop) => get(t).controller;
export const bestUse = (t: ServoLoop) => get(t).bestUse;
export const servoLoops = (): ServoLoop[] => Object.keys(DATA) as ServoLoop[];

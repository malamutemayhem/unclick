export type TorqueLimiterType =
  | "friction_disc_slip"
  | "ball_detent_reset"
  | "shear_pin_sacrificial"
  | "magnetic_hysteresis"
  | "electronic_servo_limit";

interface TorqueLimiterData {
  precision: number;
  response: number;
  repeatability: number;
  torqueRange: number;
  tlCost: number;
  autoReset: boolean;
  forServo: boolean;
  element: string;
  bestUse: string;
}

const DATA: Record<TorqueLimiterType, TorqueLimiterData> = {
  friction_disc_slip: {
    precision: 6, response: 8, repeatability: 7, torqueRange: 9, tlCost: 4,
    autoReset: true, forServo: false,
    element: "friction_disc_spring_loaded_pair",
    bestUse: "general_overload_conveyor_mixer",
  },
  ball_detent_reset: {
    precision: 8, response: 10, repeatability: 9, torqueRange: 7, tlCost: 6,
    autoReset: true, forServo: false,
    element: "spring_loaded_ball_detent_pocket",
    bestUse: "packaging_bottling_precise_protect",
  },
  shear_pin_sacrificial: {
    precision: 5, response: 10, repeatability: 3, torqueRange: 10, tlCost: 2,
    autoReset: false, forServo: false,
    element: "sacrificial_shear_pin_hardened",
    bestUse: "pump_agitator_catastrophic_guard",
  },
  magnetic_hysteresis: {
    precision: 9, response: 7, repeatability: 10, torqueRange: 5, tlCost: 8,
    autoReset: true, forServo: false,
    element: "permanent_magnet_hysteresis_disc",
    bestUse: "tension_control_web_winding_unwind",
  },
  electronic_servo_limit: {
    precision: 10, response: 9, repeatability: 10, torqueRange: 8, tlCost: 10,
    autoReset: true, forServo: true,
    element: "servo_current_limit_encoder_feedback",
    bestUse: "robot_cobot_axis_torque_control",
  },
};

function get(t: TorqueLimiterType): TorqueLimiterData {
  return DATA[t];
}

export const precision = (t: TorqueLimiterType) => get(t).precision;
export const response = (t: TorqueLimiterType) => get(t).response;
export const repeatability = (t: TorqueLimiterType) => get(t).repeatability;
export const torqueRange = (t: TorqueLimiterType) => get(t).torqueRange;
export const tlCost = (t: TorqueLimiterType) => get(t).tlCost;
export const autoReset = (t: TorqueLimiterType) => get(t).autoReset;
export const forServo = (t: TorqueLimiterType) => get(t).forServo;
export const element = (t: TorqueLimiterType) => get(t).element;
export const bestUse = (t: TorqueLimiterType) => get(t).bestUse;
export const torqueLimiterTypes = (): TorqueLimiterType[] =>
  Object.keys(DATA) as TorqueLimiterType[];

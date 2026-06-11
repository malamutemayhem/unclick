export type ResolverSensor =
  | "brushless_resolver"
  | "optical_incremental"
  | "optical_absolute"
  | "hall_effect_3phase"
  | "inductive_encoder";

const DATA: Record<ResolverSensor, {
  resolution: number; accuracy: number; robustness: number;
  speed: number; sensCost: number; absolute: boolean;
  forServo: boolean; principle: string; bestUse: string;
}> = {
  brushless_resolver: {
    resolution: 7, accuracy: 8, robustness: 10,
    speed: 8, sensCost: 5, absolute: true,
    forServo: true, principle: "transformer_ratio_sine_cos",
    bestUse: "ev_traction_motor_position",
  },
  optical_incremental: {
    resolution: 10, accuracy: 9, robustness: 5,
    speed: 10, sensCost: 4, absolute: false,
    forServo: true, principle: "grating_photodetector_quad",
    bestUse: "cnc_spindle_high_speed",
  },
  optical_absolute: {
    resolution: 10, accuracy: 10, robustness: 5,
    speed: 8, sensCost: 8, absolute: true,
    forServo: true, principle: "gray_code_disc_multitrack",
    bestUse: "robot_joint_no_homing",
  },
  hall_effect_3phase: {
    resolution: 3, accuracy: 4, robustness: 9,
    speed: 7, sensCost: 1, absolute: true,
    forServo: false, principle: "magnetic_field_switch_digital",
    bestUse: "bldc_commutation_basic",
  },
  inductive_encoder: {
    resolution: 8, accuracy: 7, robustness: 8,
    speed: 9, sensCost: 3, absolute: true,
    forServo: true, principle: "eddy_current_pattern_coil",
    bestUse: "harsh_env_servo_feedback",
  },
};

const get = (t: ResolverSensor) => DATA[t];

export const resolution = (t: ResolverSensor) => get(t).resolution;
export const accuracy = (t: ResolverSensor) => get(t).accuracy;
export const robustness = (t: ResolverSensor) => get(t).robustness;
export const speed = (t: ResolverSensor) => get(t).speed;
export const sensCost = (t: ResolverSensor) => get(t).sensCost;
export const absolute = (t: ResolverSensor) => get(t).absolute;
export const forServo = (t: ResolverSensor) => get(t).forServo;
export const principle = (t: ResolverSensor) => get(t).principle;
export const bestUse = (t: ResolverSensor) => get(t).bestUse;
export const resolverSensors = (): ResolverSensor[] => Object.keys(DATA) as ResolverSensor[];

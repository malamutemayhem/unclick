export type ServoType =
  | "hobby_pwm_dc"
  | "industrial_ac_pmsm"
  | "direct_drive_torque"
  | "linear_voice_coil"
  | "piezo_ultrasonic";

const DATA: Record<ServoType, {
  torque: number; speed: number; precision: number;
  bandwidth: number; servoCost: number; gearless: boolean;
  forCnc: boolean; feedback: string; bestUse: string;
}> = {
  hobby_pwm_dc: {
    torque: 3, speed: 5, precision: 3,
    bandwidth: 4, servoCost: 1, gearless: false,
    forCnc: false, feedback: "potentiometer_analog",
    bestUse: "rc_model_steering",
  },
  industrial_ac_pmsm: {
    torque: 8, speed: 8, precision: 8,
    bandwidth: 7, servoCost: 6, gearless: false,
    forCnc: true, feedback: "resolver_sin_cos",
    bestUse: "cnc_axis_spindle",
  },
  direct_drive_torque: {
    torque: 10, speed: 4, precision: 10,
    bandwidth: 9, servoCost: 9, gearless: true,
    forCnc: true, feedback: "absolute_encoder_26bit",
    bestUse: "robot_joint_axis",
  },
  linear_voice_coil: {
    torque: 4, speed: 10, precision: 9,
    bandwidth: 10, servoCost: 7, gearless: true,
    forCnc: false, feedback: "linear_encoder_nm",
    bestUse: "pick_place_head",
  },
  piezo_ultrasonic: {
    torque: 5, speed: 3, precision: 10,
    bandwidth: 6, servoCost: 8, gearless: true,
    forCnc: false, feedback: "optical_encoder_high",
    bestUse: "telescope_fine_adjust",
  },
};

const get = (t: ServoType) => DATA[t];

export const torque = (t: ServoType) => get(t).torque;
export const speed = (t: ServoType) => get(t).speed;
export const precision = (t: ServoType) => get(t).precision;
export const bandwidth = (t: ServoType) => get(t).bandwidth;
export const servoCost = (t: ServoType) => get(t).servoCost;
export const gearless = (t: ServoType) => get(t).gearless;
export const forCnc = (t: ServoType) => get(t).forCnc;
export const feedback = (t: ServoType) => get(t).feedback;
export const bestUse = (t: ServoType) => get(t).bestUse;
export const servoTypes = (): ServoType[] => Object.keys(DATA) as ServoType[];

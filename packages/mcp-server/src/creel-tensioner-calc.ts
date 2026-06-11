export type CreelTensionerType =
  | "passive_brake"
  | "active_servo"
  | "dancer_arm"
  | "magnetic_hysteresis"
  | "pneumatic_disc";

interface CreelTensionerData {
  tensionAccuracy: number;
  throughput: number;
  responseTime: number;
  spoolCapacity: number;
  ctCost_: number;
  active: boolean;
  forHighSpeed: boolean;
  tensionerConfig: string;
  bestUse: string;
}

const DATA: Record<CreelTensionerType, CreelTensionerData> = {
  passive_brake: {
    tensionAccuracy: 5, throughput: 7, responseTime: 4, spoolCapacity: 8, ctCost_: 3,
    active: false, forHighSpeed: false,
    tensionerConfig: "passive_brake_creel_tensioner_friction_pad_spring_load_simple",
    bestUse: "basic_wind_passive_brake_creel_tensioner_friction_pad_low_cost",
  },
  active_servo: {
    tensionAccuracy: 9, throughput: 9, responseTime: 9, spoolCapacity: 7, ctCost_: 9,
    active: true, forHighSpeed: true,
    tensionerConfig: "active_servo_creel_tensioner_motor_feedback_loop_pid_constant",
    bestUse: "afp_feed_active_servo_creel_tensioner_pid_loop_constant_force",
  },
  dancer_arm: {
    tensionAccuracy: 7, throughput: 8, responseTime: 7, spoolCapacity: 8, ctCost_: 5,
    active: false, forHighSpeed: true,
    tensionerConfig: "dancer_arm_creel_tensioner_pivot_weight_accumulate_smooth_pull",
    bestUse: "winding_feed_dancer_arm_creel_tensioner_smooth_pull_absorb_jerk",
  },
  magnetic_hysteresis: {
    tensionAccuracy: 8, throughput: 7, responseTime: 8, spoolCapacity: 7, ctCost_: 7,
    active: true, forHighSpeed: false,
    tensionerConfig: "magnetic_hysteresis_creel_tensioner_eddy_brake_no_contact_wear",
    bestUse: "precision_tow_magnetic_hysteresis_creel_tensioner_no_wear_brake",
  },
  pneumatic_disc: {
    tensionAccuracy: 6, throughput: 8, responseTime: 6, spoolCapacity: 9, ctCost_: 4,
    active: true, forHighSpeed: false,
    tensionerConfig: "pneumatic_disc_creel_tensioner_air_caliper_adjust_remote_set",
    bestUse: "multi_spool_pneumatic_disc_creel_tensioner_air_set_creel_bank",
  },
};

function get(t: CreelTensionerType): CreelTensionerData {
  return DATA[t];
}

export const tensionAccuracy = (t: CreelTensionerType) => get(t).tensionAccuracy;
export const throughput = (t: CreelTensionerType) => get(t).throughput;
export const responseTime = (t: CreelTensionerType) => get(t).responseTime;
export const spoolCapacity = (t: CreelTensionerType) => get(t).spoolCapacity;
export const ctCost_ = (t: CreelTensionerType) => get(t).ctCost_;
export const active = (t: CreelTensionerType) => get(t).active;
export const forHighSpeed = (t: CreelTensionerType) => get(t).forHighSpeed;
export const tensionerConfig = (t: CreelTensionerType) => get(t).tensionerConfig;
export const bestUse = (t: CreelTensionerType) => get(t).bestUse;
export const creelTensionerTypes = (): CreelTensionerType[] =>
  Object.keys(DATA) as CreelTensionerType[];

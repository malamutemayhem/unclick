export type ActuatorPneumaticType =
  | "diaphragm_spring_return"
  | "piston_double_acting"
  | "scotch_yoke_quarter"
  | "rack_pinion_rotary"
  | "electro_pneumatic_pos";

interface ActuatorPneumaticData {
  thrust: number;
  speed: number;
  precision: number;
  failSafe: number;
  apCost: number;
  springReturn: boolean;
  forLinearValve: boolean;
  mechanism: string;
  bestUse: string;
}

const DATA: Record<ActuatorPneumaticType, ActuatorPneumaticData> = {
  diaphragm_spring_return: {
    thrust: 6, speed: 6, precision: 9, failSafe: 10, apCost: 5,
    springReturn: true, forLinearValve: true,
    mechanism: "rolling_diaphragm_spring_opposed_air_to_open_close",
    bestUse: "control_valve_throttling_process_loop_fail_safe",
  },
  piston_double_acting: {
    thrust: 9, speed: 8, precision: 7, failSafe: 4, apCost: 6,
    springReturn: false, forLinearValve: true,
    mechanism: "cylinder_piston_double_acting_solenoid_pilot_valve",
    bestUse: "large_valve_high_thrust_on_off_isolation_service",
  },
  scotch_yoke_quarter: {
    thrust: 10, speed: 7, precision: 6, failSafe: 7, apCost: 8,
    springReturn: true, forLinearValve: false,
    mechanism: "scotch_yoke_sliding_block_high_breakaway_torque",
    bestUse: "large_ball_butterfly_valve_pipeline_high_torque",
  },
  rack_pinion_rotary: {
    thrust: 7, speed: 8, precision: 7, failSafe: 7, apCost: 5,
    springReturn: true, forLinearValve: false,
    mechanism: "rack_and_pinion_gear_compact_quarter_turn_spring",
    bestUse: "small_medium_butterfly_ball_valve_general_quarter",
  },
  electro_pneumatic_pos: {
    thrust: 6, speed: 7, precision: 10, failSafe: 9, apCost: 8,
    springReturn: true, forLinearValve: true,
    mechanism: "positioner_feedback_i_p_converter_split_range",
    bestUse: "precision_control_loop_split_range_cascade_control",
  },
};

function get(t: ActuatorPneumaticType): ActuatorPneumaticData {
  return DATA[t];
}

export const thrust = (t: ActuatorPneumaticType) => get(t).thrust;
export const speed = (t: ActuatorPneumaticType) => get(t).speed;
export const precision = (t: ActuatorPneumaticType) => get(t).precision;
export const failSafe = (t: ActuatorPneumaticType) => get(t).failSafe;
export const apCost = (t: ActuatorPneumaticType) => get(t).apCost;
export const springReturn = (t: ActuatorPneumaticType) => get(t).springReturn;
export const forLinearValve = (t: ActuatorPneumaticType) => get(t).forLinearValve;
export const mechanism = (t: ActuatorPneumaticType) => get(t).mechanism;
export const bestUse = (t: ActuatorPneumaticType) => get(t).bestUse;
export const actuatorPneumaticTypes = (): ActuatorPneumaticType[] =>
  Object.keys(DATA) as ActuatorPneumaticType[];

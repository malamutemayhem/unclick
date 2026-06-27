export type PneumaticActuatorType =
  | "double_acting_cylinder"
  | "single_acting_spring_return"
  | "rotary_rack_pinion"
  | "rodless_band_magnetic"
  | "gripper_parallel_angular";

interface PneumaticActuatorData {
  force: number;
  speed: number;
  precision: number;
  reliability: number;
  paCost: number;
  springReturn: boolean;
  forValve: boolean;
  medium: string;
  bestUse: string;
}

const DATA: Record<PneumaticActuatorType, PneumaticActuatorData> = {
  double_acting_cylinder: {
    force: 8, speed: 9, precision: 6, reliability: 9, paCost: 4,
    springReturn: false, forValve: false,
    medium: "compressed_air_4_8_bar_dual_port",
    bestUse: "clamp_press_push_linear_motion",
  },
  single_acting_spring_return: {
    force: 7, speed: 7, precision: 5, reliability: 10, paCost: 3,
    springReturn: true, forValve: true,
    medium: "compressed_air_single_port_spring",
    bestUse: "fail_safe_valve_door_clamp",
  },
  rotary_rack_pinion: {
    force: 9, speed: 8, precision: 7, reliability: 9, paCost: 6,
    springReturn: false, forValve: true,
    medium: "compressed_air_rack_pinion_gear",
    bestUse: "quarter_turn_valve_damper_rotate",
  },
  rodless_band_magnetic: {
    force: 6, speed: 8, precision: 7, reliability: 8, paCost: 7,
    springReturn: false, forValve: false,
    medium: "magnetic_coupling_band_seal_air",
    bestUse: "long_stroke_transfer_compact_space",
  },
  gripper_parallel_angular: {
    force: 5, speed: 10, precision: 9, reliability: 8, paCost: 5,
    springReturn: false, forValve: false,
    medium: "compressed_air_piston_jaw_pair",
    bestUse: "robot_end_effector_pick_orient",
  },
};

function get(t: PneumaticActuatorType): PneumaticActuatorData {
  return DATA[t];
}

export const force = (t: PneumaticActuatorType) => get(t).force;
export const speed = (t: PneumaticActuatorType) => get(t).speed;
export const precision = (t: PneumaticActuatorType) => get(t).precision;
export const reliability = (t: PneumaticActuatorType) => get(t).reliability;
export const paCost = (t: PneumaticActuatorType) => get(t).paCost;
export const springReturn = (t: PneumaticActuatorType) => get(t).springReturn;
export const forValve = (t: PneumaticActuatorType) => get(t).forValve;
export const medium = (t: PneumaticActuatorType) => get(t).medium;
export const bestUse = (t: PneumaticActuatorType) => get(t).bestUse;
export const pneumaticActuatorTypes = (): PneumaticActuatorType[] =>
  Object.keys(DATA) as PneumaticActuatorType[];

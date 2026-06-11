export type ElectricActuatorType =
  | "linear_ball_screw"
  | "linear_lead_screw"
  | "rotary_servo_quarter"
  | "multi_turn_modulating"
  | "electric_cylinder_rod";

interface ElectricActuatorData {
  force: number;
  precision: number;
  speed: number;
  efficiency: number;
  eaCost: number;
  modulating: boolean;
  forValve: boolean;
  drive: string;
  bestUse: string;
}

const DATA: Record<ElectricActuatorType, ElectricActuatorData> = {
  linear_ball_screw: {
    force: 9, precision: 10, speed: 8, efficiency: 9, eaCost: 7,
    modulating: true, forValve: false,
    drive: "servo_motor_ball_screw_preloaded",
    bestUse: "cnc_press_fit_precise_position",
  },
  linear_lead_screw: {
    force: 7, precision: 7, speed: 6, efficiency: 6, eaCost: 4,
    modulating: true, forValve: false,
    drive: "stepper_motor_acme_lead_screw",
    bestUse: "gate_damper_simple_linear_travel",
  },
  rotary_servo_quarter: {
    force: 8, precision: 9, speed: 9, efficiency: 8, eaCost: 8,
    modulating: true, forValve: true,
    drive: "brushless_servo_harmonic_gear",
    bestUse: "modulating_valve_throttle_control",
  },
  multi_turn_modulating: {
    force: 10, precision: 8, speed: 5, efficiency: 7, eaCost: 6,
    modulating: true, forValve: true,
    drive: "ac_motor_worm_gear_reducer",
    bestUse: "gate_globe_valve_slow_precise",
  },
  electric_cylinder_rod: {
    force: 9, precision: 9, speed: 7, efficiency: 8, eaCost: 7,
    modulating: false, forValve: false,
    drive: "integrated_servo_planetary_rod",
    bestUse: "hydraulic_replacement_clean_linear",
  },
};

function get(t: ElectricActuatorType): ElectricActuatorData {
  return DATA[t];
}

export const force = (t: ElectricActuatorType) => get(t).force;
export const precision = (t: ElectricActuatorType) => get(t).precision;
export const speed = (t: ElectricActuatorType) => get(t).speed;
export const efficiency = (t: ElectricActuatorType) => get(t).efficiency;
export const eaCost = (t: ElectricActuatorType) => get(t).eaCost;
export const modulating = (t: ElectricActuatorType) => get(t).modulating;
export const forValve = (t: ElectricActuatorType) => get(t).forValve;
export const drive = (t: ElectricActuatorType) => get(t).drive;
export const bestUse = (t: ElectricActuatorType) => get(t).bestUse;
export const electricActuatorTypes = (): ElectricActuatorType[] =>
  Object.keys(DATA) as ElectricActuatorType[];

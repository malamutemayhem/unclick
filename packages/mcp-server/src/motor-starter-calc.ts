export type MotorStarterType =
  | "dol_direct_online"
  | "star_delta_reduced"
  | "soft_starter_thyristor"
  | "autotransformer_start"
  | "rotor_resistance_slip";

interface MotorStarterData {
  startingTorque: number;
  inrushCurrent: number;
  smoothness: number;
  controlRange: number;
  msCost: number;
  electronic: boolean;
  forLargeMotor: boolean;
  method: string;
  bestUse: string;
}

const DATA: Record<MotorStarterType, MotorStarterData> = {
  dol_direct_online: {
    startingTorque: 10, inrushCurrent: 2, smoothness: 2, controlRange: 2, msCost: 2,
    electronic: false, forLargeMotor: false,
    method: "contactor_overload_relay_direct_full_voltage",
    bestUse: "small_motor_pump_fan_below_7kw_simple_start",
  },
  star_delta_reduced: {
    startingTorque: 5, inrushCurrent: 6, smoothness: 5, controlRange: 3, msCost: 4,
    electronic: false, forLargeMotor: true,
    method: "star_delta_contactor_timer_transition_switch",
    bestUse: "medium_motor_centrifugal_load_reduced_inrush",
  },
  soft_starter_thyristor: {
    startingTorque: 7, inrushCurrent: 9, smoothness: 9, controlRange: 8, msCost: 7,
    electronic: true, forLargeMotor: true,
    method: "thyristor_scr_voltage_ramp_current_limit",
    bestUse: "conveyor_pump_compressor_smooth_acceleration",
  },
  autotransformer_start: {
    startingTorque: 7, inrushCurrent: 7, smoothness: 6, controlRange: 5, msCost: 6,
    electronic: false, forLargeMotor: true,
    method: "autotransformer_tap_65_80_percent_voltage",
    bestUse: "large_motor_high_inertia_load_tap_voltage_start",
  },
  rotor_resistance_slip: {
    startingTorque: 10, inrushCurrent: 8, smoothness: 7, controlRange: 7, msCost: 5,
    electronic: false, forLargeMotor: true,
    method: "wound_rotor_external_resistance_slip_ring",
    bestUse: "crane_hoist_wound_rotor_motor_high_start_torque",
  },
};

function get(t: MotorStarterType): MotorStarterData {
  return DATA[t];
}

export const startingTorque = (t: MotorStarterType) => get(t).startingTorque;
export const inrushCurrent = (t: MotorStarterType) => get(t).inrushCurrent;
export const smoothness = (t: MotorStarterType) => get(t).smoothness;
export const controlRange = (t: MotorStarterType) => get(t).controlRange;
export const msCost = (t: MotorStarterType) => get(t).msCost;
export const electronic = (t: MotorStarterType) => get(t).electronic;
export const forLargeMotor = (t: MotorStarterType) => get(t).forLargeMotor;
export const method = (t: MotorStarterType) => get(t).method;
export const bestUse = (t: MotorStarterType) => get(t).bestUse;
export const motorStarterTypes = (): MotorStarterType[] =>
  Object.keys(DATA) as MotorStarterType[];

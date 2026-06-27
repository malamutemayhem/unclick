export type SynchronousMotorType =
  | "wound_field_large"
  | "permanent_magnet_pm"
  | "reluctance_sr"
  | "hysteresis_precision"
  | "line_start_pmsm";

interface SynchronousMotorData {
  efficiency: number;
  powerFactor: number;
  torqueDensity: number;
  speedAccuracy: number;
  smCost: number;
  brushless: boolean;
  forPrecision: boolean;
  excitation: string;
  bestUse: string;
}

const DATA: Record<SynchronousMotorType, SynchronousMotorData> = {
  wound_field_large: {
    efficiency: 8, powerFactor: 10, torqueDensity: 7, speedAccuracy: 9, smCost: 8,
    brushless: false, forPrecision: false,
    excitation: "dc_field_winding_rotor_slip_ring_brushes",
    bestUse: "large_compressor_mill_power_factor_correction",
  },
  permanent_magnet_pm: {
    efficiency: 10, powerFactor: 9, torqueDensity: 10, speedAccuracy: 10, smCost: 9,
    brushless: true, forPrecision: true,
    excitation: "rare_earth_permanent_magnet_rotor_no_loss",
    bestUse: "ev_drive_robot_servo_high_efficiency_compact",
  },
  reluctance_sr: {
    efficiency: 8, powerFactor: 7, torqueDensity: 7, speedAccuracy: 8, smCost: 5,
    brushless: true, forPrecision: false,
    excitation: "salient_pole_reluctance_no_magnet_no_winding",
    bestUse: "pump_fan_drive_simple_robust_no_magnet_cost",
  },
  hysteresis_precision: {
    efficiency: 6, powerFactor: 8, torqueDensity: 5, speedAccuracy: 10, smCost: 7,
    brushless: true, forPrecision: true,
    excitation: "hysteresis_ring_rotor_self_starting_smooth",
    bestUse: "clock_drive_tape_transport_precision_timing",
  },
  line_start_pmsm: {
    efficiency: 9, powerFactor: 9, torqueDensity: 8, speedAccuracy: 9, smCost: 7,
    brushless: true, forPrecision: false,
    excitation: "pm_rotor_with_cage_bars_direct_line_start",
    bestUse: "retrofit_induction_motor_high_eff_drop_in",
  },
};

function get(t: SynchronousMotorType): SynchronousMotorData {
  return DATA[t];
}

export const efficiency = (t: SynchronousMotorType) => get(t).efficiency;
export const powerFactor = (t: SynchronousMotorType) => get(t).powerFactor;
export const torqueDensity = (t: SynchronousMotorType) => get(t).torqueDensity;
export const speedAccuracy = (t: SynchronousMotorType) => get(t).speedAccuracy;
export const smCost = (t: SynchronousMotorType) => get(t).smCost;
export const brushless = (t: SynchronousMotorType) => get(t).brushless;
export const forPrecision = (t: SynchronousMotorType) => get(t).forPrecision;
export const excitation = (t: SynchronousMotorType) => get(t).excitation;
export const bestUse = (t: SynchronousMotorType) => get(t).bestUse;
export const synchronousMotorTypes = (): SynchronousMotorType[] =>
  Object.keys(DATA) as SynchronousMotorType[];

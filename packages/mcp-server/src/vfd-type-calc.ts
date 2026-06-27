export type VfdType =
  | "volts_per_hz_scalar"
  | "sensorless_vector_foc"
  | "closed_loop_vector_encoder"
  | "regenerative_afr_braking"
  | "medium_voltage_multilevel";

const DATA: Record<VfdType, {
  torqueControl: number; speedRange: number; efficiency: number;
  harmonics: number; vfCost: number; encoderRequired: boolean;
  forPump: boolean; topology: string; bestUse: string;
}> = {
  volts_per_hz_scalar: {
    torqueControl: 4, speedRange: 6, efficiency: 6,
    harmonics: 4, vfCost: 1, encoderRequired: false,
    forPump: true, topology: "pwm_voltage_source_inverter",
    bestUse: "fan_pump_simple_speed_control",
  },
  sensorless_vector_foc: {
    torqueControl: 8, speedRange: 8, efficiency: 8,
    harmonics: 6, vfCost: 3, encoderRequired: false,
    forPump: true, topology: "foc_flux_observer_pwm",
    bestUse: "conveyor_compressor_process_drive",
  },
  closed_loop_vector_encoder: {
    torqueControl: 10, speedRange: 10, efficiency: 9,
    harmonics: 7, vfCost: 4, encoderRequired: true,
    forPump: false, topology: "foc_encoder_feedback_pwm",
    bestUse: "winder_extruder_precision_torque",
  },
  regenerative_afr_braking: {
    torqueControl: 8, speedRange: 9, efficiency: 10,
    harmonics: 8, vfCost: 5, encoderRequired: false,
    forPump: false, topology: "active_front_end_regen",
    bestUse: "elevator_crane_energy_recovery",
  },
  medium_voltage_multilevel: {
    torqueControl: 9, speedRange: 7, efficiency: 9,
    harmonics: 10, vfCost: 5, encoderRequired: false,
    forPump: true, topology: "cascaded_h_bridge_multilevel",
    bestUse: "mine_mill_large_motor_mv_drive",
  },
};

const get = (t: VfdType) => DATA[t];

export const torqueControl = (t: VfdType) => get(t).torqueControl;
export const speedRange = (t: VfdType) => get(t).speedRange;
export const efficiency = (t: VfdType) => get(t).efficiency;
export const harmonics = (t: VfdType) => get(t).harmonics;
export const vfCost = (t: VfdType) => get(t).vfCost;
export const encoderRequired = (t: VfdType) => get(t).encoderRequired;
export const forPump = (t: VfdType) => get(t).forPump;
export const topology = (t: VfdType) => get(t).topology;
export const bestUse = (t: VfdType) => get(t).bestUse;
export const vfdTypes = (): VfdType[] => Object.keys(DATA) as VfdType[];

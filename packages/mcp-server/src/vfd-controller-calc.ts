export type VfdControllerType =
  | "volts_per_hz"
  | "sensorless_vector"
  | "closed_loop_vector"
  | "direct_torque"
  | "regenerative_vfd";

interface VfdControllerData {
  speedAccuracy: number;
  throughput: number;
  torqueResponse: number;
  energySaving: number;
  vcCost: number;
  encoderRequired: boolean;
  forPump: boolean;
  controllerConfig: string;
  bestUse: string;
}

const DATA: Record<VfdControllerType, VfdControllerData> = {
  volts_per_hz: {
    speedAccuracy: 5, throughput: 8, torqueResponse: 4, energySaving: 7, vcCost: 4,
    encoderRequired: false, forPump: true,
    controllerConfig: "volts_per_hz_vfd_controller_scalar_control_simple_fan_pump_speed",
    bestUse: "hvac_fan_volts_per_hz_vfd_controller_simple_speed_energy_save",
  },
  sensorless_vector: {
    speedAccuracy: 7, throughput: 8, torqueResponse: 7, energySaving: 8, vcCost: 6,
    encoderRequired: false, forPump: true,
    controllerConfig: "sensorless_vector_vfd_controller_flux_estimate_no_encoder_torque",
    bestUse: "conveyor_drive_sensorless_vector_vfd_controller_torque_no_encoder",
  },
  closed_loop_vector: {
    speedAccuracy: 9, throughput: 8, torqueResponse: 9, energySaving: 8, vcCost: 8,
    encoderRequired: true, forPump: false,
    controllerConfig: "closed_loop_vector_vfd_controller_encoder_feedback_precise_torque",
    bestUse: "winder_tension_closed_loop_vector_vfd_controller_precise_torque",
  },
  direct_torque: {
    speedAccuracy: 8, throughput: 9, torqueResponse: 10, energySaving: 8, vcCost: 9,
    encoderRequired: false, forPump: false,
    controllerConfig: "direct_torque_vfd_controller_hysteresis_band_instant_torque_resp",
    bestUse: "crane_hoist_direct_torque_vfd_controller_instant_torque_response",
  },
  regenerative_vfd: {
    speedAccuracy: 8, throughput: 8, torqueResponse: 8, energySaving: 10, vcCost: 9,
    encoderRequired: false, forPump: false,
    controllerConfig: "regenerative_vfd_controller_active_front_end_brake_energy_return",
    bestUse: "elevator_drive_regenerative_vfd_controller_brake_energy_grid_feed",
  },
};

function get(t: VfdControllerType): VfdControllerData {
  return DATA[t];
}

export const speedAccuracy = (t: VfdControllerType) => get(t).speedAccuracy;
export const throughput = (t: VfdControllerType) => get(t).throughput;
export const torqueResponse = (t: VfdControllerType) => get(t).torqueResponse;
export const energySaving = (t: VfdControllerType) => get(t).energySaving;
export const vcCost = (t: VfdControllerType) => get(t).vcCost;
export const encoderRequired = (t: VfdControllerType) => get(t).encoderRequired;
export const forPump = (t: VfdControllerType) => get(t).forPump;
export const controllerConfig = (t: VfdControllerType) => get(t).controllerConfig;
export const bestUse = (t: VfdControllerType) => get(t).bestUse;
export const vfdControllerTypes = (): VfdControllerType[] =>
  Object.keys(DATA) as VfdControllerType[];

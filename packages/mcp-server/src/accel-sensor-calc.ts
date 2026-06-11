export type AccelSensorType =
  | "mems_capacitive"
  | "piezoelectric_charge"
  | "piezoresistive_dc"
  | "servo_force_balance"
  | "optical_fiber_accel";

const DATA: Record<AccelSensorType, {
  bandwidth: number; sensitivity: number; noiseFloor: number;
  shockSurvival: number; sensorCost: number; dcResponse: boolean;
  forVibration: boolean; sensingMethod: string; bestUse: string;
}> = {
  mems_capacitive: { bandwidth: 6, sensitivity: 7, noiseFloor: 7, shockSurvival: 8, sensorCost: 2, dcResponse: true, forVibration: false, sensingMethod: "comb_finger_capacitive", bestUse: "consumer_motion_detect" },
  piezoelectric_charge: { bandwidth: 10, sensitivity: 9, noiseFloor: 8, shockSurvival: 6, sensorCost: 6, dcResponse: false, forVibration: true, sensingMethod: "quartz_charge_mode", bestUse: "machine_vibration_monitor" },
  piezoresistive_dc: { bandwidth: 7, sensitivity: 6, noiseFloor: 5, shockSurvival: 10, sensorCost: 5, dcResponse: true, forVibration: false, sensingMethod: "silicon_strain_bridge", bestUse: "crash_test_high_g_shock" },
  servo_force_balance: { bandwidth: 4, sensitivity: 10, noiseFloor: 10, shockSurvival: 5, sensorCost: 9, dcResponse: true, forVibration: false, sensingMethod: "servo_feedback_coil", bestUse: "seismic_navigation_grade" },
  optical_fiber_accel: { bandwidth: 8, sensitivity: 8, noiseFloor: 9, shockSurvival: 7, sensorCost: 8, dcResponse: true, forVibration: true, sensingMethod: "fiber_bragg_strain", bestUse: "subsea_emf_free_monitor" },
};

const get = (t: AccelSensorType) => DATA[t];

export const bandwidth = (t: AccelSensorType) => get(t).bandwidth;
export const sensitivity = (t: AccelSensorType) => get(t).sensitivity;
export const noiseFloor = (t: AccelSensorType) => get(t).noiseFloor;
export const shockSurvival = (t: AccelSensorType) => get(t).shockSurvival;
export const sensorCost = (t: AccelSensorType) => get(t).sensorCost;
export const dcResponse = (t: AccelSensorType) => get(t).dcResponse;
export const forVibration = (t: AccelSensorType) => get(t).forVibration;
export const sensingMethod = (t: AccelSensorType) => get(t).sensingMethod;
export const bestUse = (t: AccelSensorType) => get(t).bestUse;
export const accelSensors = (): AccelSensorType[] => Object.keys(DATA) as AccelSensorType[];

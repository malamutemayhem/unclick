export type GyroSensorType =
  | "mems_vibrating"
  | "ring_laser_gyro"
  | "fiber_optic_gyro"
  | "hemispherical_res"
  | "dtg_dynamically_tuned";

const DATA: Record<GyroSensorType, {
  biasStability: number; bandwidth: number; scaleAccuracy: number;
  sizeWeight: number; gyroCost: number; solidState: boolean;
  forNavigation: boolean; sensingPrinciple: string; bestUse: string;
}> = {
  mems_vibrating: { biasStability: 4, bandwidth: 7, scaleAccuracy: 5, sizeWeight: 10, gyroCost: 1, solidState: true, forNavigation: false, sensingPrinciple: "coriolis_vibration", bestUse: "consumer_imu_motion" },
  ring_laser_gyro: { biasStability: 10, bandwidth: 9, scaleAccuracy: 10, sizeWeight: 3, gyroCost: 10, solidState: true, forNavigation: true, sensingPrinciple: "sagnac_laser_ring", bestUse: "aircraft_inertial_nav" },
  fiber_optic_gyro: { biasStability: 9, bandwidth: 8, scaleAccuracy: 9, sizeWeight: 5, gyroCost: 8, solidState: true, forNavigation: true, sensingPrinciple: "sagnac_fiber_coil", bestUse: "submarine_space_nav" },
  hemispherical_res: { biasStability: 8, bandwidth: 6, scaleAccuracy: 8, sizeWeight: 7, gyroCost: 7, solidState: true, forNavigation: true, sensingPrinciple: "wine_glass_resonance", bestUse: "satellite_attitude_ctrl" },
  dtg_dynamically_tuned: { biasStability: 7, bandwidth: 5, scaleAccuracy: 7, sizeWeight: 4, gyroCost: 6, solidState: false, forNavigation: true, sensingPrinciple: "spinning_rotor_gimbal", bestUse: "legacy_precision_platform" },
};

const get = (t: GyroSensorType) => DATA[t];

export const biasStability = (t: GyroSensorType) => get(t).biasStability;
export const bandwidth = (t: GyroSensorType) => get(t).bandwidth;
export const scaleAccuracy = (t: GyroSensorType) => get(t).scaleAccuracy;
export const sizeWeight = (t: GyroSensorType) => get(t).sizeWeight;
export const gyroCost = (t: GyroSensorType) => get(t).gyroCost;
export const solidState = (t: GyroSensorType) => get(t).solidState;
export const forNavigation = (t: GyroSensorType) => get(t).forNavigation;
export const sensingPrinciple = (t: GyroSensorType) => get(t).sensingPrinciple;
export const bestUse = (t: GyroSensorType) => get(t).bestUse;
export const gyroSensors = (): GyroSensorType[] => Object.keys(DATA) as GyroSensorType[];

export type GyroType =
  | "mems_vibrating"
  | "ring_laser"
  | "fiber_optic_fog"
  | "hemispherical_hrg"
  | "dtg_dynamically_tuned";

const DATA: Record<GyroType, {
  biasStability: number; scaleFactor: number; bandwidth: number;
  size: number; gyroCost: number; solidState: boolean;
  forNavigation: boolean; principle: string; bestUse: string;
}> = {
  mems_vibrating: {
    biasStability: 4, scaleFactor: 5, bandwidth: 8,
    size: 10, gyroCost: 1, solidState: true,
    forNavigation: false, principle: "coriolis_tuning_fork",
    bestUse: "consumer_imu_phone",
  },
  ring_laser: {
    biasStability: 10, scaleFactor: 10, bandwidth: 9,
    size: 3, gyroCost: 9, solidState: true,
    forNavigation: true, principle: "sagnac_counter_beam",
    bestUse: "inertial_nav_aircraft",
  },
  fiber_optic_fog: {
    biasStability: 9, scaleFactor: 9, bandwidth: 8,
    size: 4, gyroCost: 7, solidState: true,
    forNavigation: true, principle: "sagnac_fiber_coil",
    bestUse: "subsea_rov_heading",
  },
  hemispherical_hrg: {
    biasStability: 10, scaleFactor: 9, bandwidth: 7,
    size: 5, gyroCost: 10, solidState: true,
    forNavigation: true, principle: "standing_wave_precession",
    bestUse: "spacecraft_attitude_control",
  },
  dtg_dynamically_tuned: {
    biasStability: 8, scaleFactor: 8, bandwidth: 6,
    size: 4, gyroCost: 6, solidState: false,
    forNavigation: true, principle: "spinning_rotor_gimbal",
    bestUse: "missile_midcourse_guide",
  },
};

const get = (t: GyroType) => DATA[t];

export const biasStability = (t: GyroType) => get(t).biasStability;
export const scaleFactor = (t: GyroType) => get(t).scaleFactor;
export const bandwidth = (t: GyroType) => get(t).bandwidth;
export const size = (t: GyroType) => get(t).size;
export const gyroCost = (t: GyroType) => get(t).gyroCost;
export const solidState = (t: GyroType) => get(t).solidState;
export const forNavigation = (t: GyroType) => get(t).forNavigation;
export const principle = (t: GyroType) => get(t).principle;
export const bestUse = (t: GyroType) => get(t).bestUse;
export const gyroTypes = (): GyroType[] => Object.keys(DATA) as GyroType[];

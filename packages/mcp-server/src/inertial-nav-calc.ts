export type InertialNav =
  | "consumer_mems_6dof"
  | "tactical_fog"
  | "navigation_rlg"
  | "strategic_hemis"
  | "mems_aided_gnss";

const DATA: Record<InertialNav, {
  biasStability: number; arw: number; scaleFactor: number;
  surviveShock: number; navCost: number; gpsAided: boolean;
  forMilitary: boolean; gyroType: string; bestUse: string;
}> = {
  consumer_mems_6dof: {
    biasStability: 2, arw: 2, scaleFactor: 3,
    surviveShock: 8, navCost: 1, gpsAided: true,
    forMilitary: false, gyroType: "coriolis_vibrating",
    bestUse: "smartphone_dead_reckon",
  },
  tactical_fog: {
    biasStability: 6, arw: 7, scaleFactor: 7,
    surviveShock: 6, navCost: 6, gpsAided: false,
    forMilitary: true, gyroType: "fiber_optic_sagnac",
    bestUse: "guided_munition_nav",
  },
  navigation_rlg: {
    biasStability: 9, arw: 9, scaleFactor: 9,
    surviveShock: 5, navCost: 9, gpsAided: false,
    forMilitary: true, gyroType: "ring_laser_helium_neon",
    bestUse: "aircraft_ins_platform",
  },
  strategic_hemis: {
    biasStability: 10, arw: 10, scaleFactor: 10,
    surviveShock: 3, navCost: 10, gpsAided: false,
    forMilitary: true, gyroType: "hemispherical_resonator",
    bestUse: "submarine_strategic_nav",
  },
  mems_aided_gnss: {
    biasStability: 4, arw: 4, scaleFactor: 5,
    surviveShock: 9, navCost: 3, gpsAided: true,
    forMilitary: false, gyroType: "mems_kalman_fused",
    bestUse: "autonomous_vehicle_localize",
  },
};

const get = (t: InertialNav) => DATA[t];

export const biasStability = (t: InertialNav) => get(t).biasStability;
export const arw = (t: InertialNav) => get(t).arw;
export const scaleFactor = (t: InertialNav) => get(t).scaleFactor;
export const surviveShock = (t: InertialNav) => get(t).surviveShock;
export const navCost = (t: InertialNav) => get(t).navCost;
export const gpsAided = (t: InertialNav) => get(t).gpsAided;
export const forMilitary = (t: InertialNav) => get(t).forMilitary;
export const gyroType = (t: InertialNav) => get(t).gyroType;
export const bestUse = (t: InertialNav) => get(t).bestUse;
export const inertialNavs = (): InertialNav[] => Object.keys(DATA) as InertialNav[];

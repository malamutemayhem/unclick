export type MemsGyro =
  | "tuning_fork_vibrating"
  | "ring_resonator"
  | "hemispherical_wine_glass"
  | "mems_rlg_solid_state"
  | "fog_fiber_optic";

const DATA: Record<MemsGyro, {
  biasStability: number; angleRandom: number; bandwidth: number;
  scaleFactor: number; gyroCost: number; triaxial: boolean;
  forTactical: boolean; principle: string; bestUse: string;
}> = {
  tuning_fork_vibrating: {
    biasStability: 5, angleRandom: 5, bandwidth: 7,
    scaleFactor: 6, gyroCost: 2, triaxial: true,
    forTactical: false, principle: "coriolis_vibrating_tine",
    bestUse: "consumer_phone_imu",
  },
  ring_resonator: {
    biasStability: 7, angleRandom: 7, bandwidth: 8,
    scaleFactor: 8, gyroCost: 5, triaxial: true,
    forTactical: true, principle: "coriolis_ring_mode_split",
    bestUse: "automotive_escp_yaw",
  },
  hemispherical_wine_glass: {
    biasStability: 9, angleRandom: 9, bandwidth: 6,
    scaleFactor: 9, gyroCost: 8, triaxial: false,
    forTactical: true, principle: "standing_wave_precession",
    bestUse: "spacecraft_attitude_hold",
  },
  mems_rlg_solid_state: {
    biasStability: 8, angleRandom: 8, bandwidth: 9,
    scaleFactor: 7, gyroCost: 7, triaxial: false,
    forTactical: true, principle: "sagnac_effect_integrated",
    bestUse: "missile_ins_strapdown",
  },
  fog_fiber_optic: {
    biasStability: 10, angleRandom: 10, bandwidth: 7,
    scaleFactor: 10, gyroCost: 10, triaxial: false,
    forTactical: true, principle: "sagnac_fiber_coil_interferom",
    bestUse: "submarine_navigation_ins",
  },
};

const get = (t: MemsGyro) => DATA[t];

export const biasStability = (t: MemsGyro) => get(t).biasStability;
export const angleRandom = (t: MemsGyro) => get(t).angleRandom;
export const bandwidth = (t: MemsGyro) => get(t).bandwidth;
export const scaleFactor = (t: MemsGyro) => get(t).scaleFactor;
export const gyroCost = (t: MemsGyro) => get(t).gyroCost;
export const triaxial = (t: MemsGyro) => get(t).triaxial;
export const forTactical = (t: MemsGyro) => get(t).forTactical;
export const principle = (t: MemsGyro) => get(t).principle;
export const bestUse = (t: MemsGyro) => get(t).bestUse;
export const memsGyros = (): MemsGyro[] => Object.keys(DATA) as MemsGyro[];

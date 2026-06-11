export type ImuType =
  | "mems_consumer_6dof"
  | "mems_tactical_9dof"
  | "fog_fiber_optic_gyro"
  | "rlg_ring_laser_gyro"
  | "hemispherical_resonator";

const DATA: Record<ImuType, {
  accuracy: number; biasStability: number; bandwidth: number;
  shock: number; imCost: number; solidState: boolean;
  forNavigation: boolean; sensing: string; bestUse: string;
}> = {
  mems_consumer_6dof: {
    accuracy: 3, biasStability: 3, bandwidth: 8,
    shock: 9, imCost: 1, solidState: true,
    forNavigation: false, sensing: "coriolis_vibrating_mass",
    bestUse: "smartphone_motion_gaming_input",
  },
  mems_tactical_9dof: {
    accuracy: 6, biasStability: 6, bandwidth: 8,
    shock: 8, imCost: 3, solidState: true,
    forNavigation: true, sensing: "coriolis_enhanced_mems",
    bestUse: "drone_autopilot_stabilization",
  },
  fog_fiber_optic_gyro: {
    accuracy: 8, biasStability: 9, bandwidth: 7,
    shock: 6, imCost: 4, solidState: true,
    forNavigation: true, sensing: "sagnac_fiber_coil",
    bestUse: "ship_ins_north_finding",
  },
  rlg_ring_laser_gyro: {
    accuracy: 10, biasStability: 10, bandwidth: 9,
    shock: 5, imCost: 5, solidState: false,
    forNavigation: true, sensing: "sagnac_helium_neon_cavity",
    bestUse: "aircraft_inertial_reference_unit",
  },
  hemispherical_resonator: {
    accuracy: 9, biasStability: 10, bandwidth: 6,
    shock: 7, imCost: 5, solidState: true,
    forNavigation: true, sensing: "coriolis_quartz_hemisphere",
    bestUse: "satellite_attitude_determination",
  },
};

const get = (t: ImuType) => DATA[t];

export const accuracy = (t: ImuType) => get(t).accuracy;
export const biasStability = (t: ImuType) => get(t).biasStability;
export const bandwidth = (t: ImuType) => get(t).bandwidth;
export const shock = (t: ImuType) => get(t).shock;
export const imCost = (t: ImuType) => get(t).imCost;
export const solidState = (t: ImuType) => get(t).solidState;
export const forNavigation = (t: ImuType) => get(t).forNavigation;
export const sensing = (t: ImuType) => get(t).sensing;
export const bestUse = (t: ImuType) => get(t).bestUse;
export const imuTypes = (): ImuType[] => Object.keys(DATA) as ImuType[];

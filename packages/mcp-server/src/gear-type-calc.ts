export type GearType =
  | "spur_parallel_axis"
  | "helical_angled_tooth"
  | "bevel_intersecting_axis"
  | "worm_right_angle"
  | "planetary_epicyclic";

const DATA: Record<GearType, {
  efficiency: number; torqueCapacity: number; speed: number;
  noise: number; grCost: number; selfLocking: boolean;
  forPrecision: boolean; mesh: string; bestUse: string;
}> = {
  spur_parallel_axis: {
    efficiency: 9, torqueCapacity: 6, speed: 7,
    noise: 4, grCost: 1, selfLocking: false,
    forPrecision: false, mesh: "involute_straight_tooth",
    bestUse: "conveyor_belt_simple_drive",
  },
  helical_angled_tooth: {
    efficiency: 8, torqueCapacity: 8, speed: 9,
    noise: 8, grCost: 3, selfLocking: false,
    forPrecision: true, mesh: "involute_helix_gradual",
    bestUse: "automotive_transmission_stage",
  },
  bevel_intersecting_axis: {
    efficiency: 7, torqueCapacity: 7, speed: 6,
    noise: 5, grCost: 4, selfLocking: false,
    forPrecision: false, mesh: "spiral_bevel_cone_pitch",
    bestUse: "differential_axle_right_angle",
  },
  worm_right_angle: {
    efficiency: 4, torqueCapacity: 9, speed: 3,
    noise: 7, grCost: 2, selfLocking: true,
    forPrecision: false, mesh: "enveloping_worm_wheel",
    bestUse: "elevator_hoist_irreversible",
  },
  planetary_epicyclic: {
    efficiency: 9, torqueCapacity: 10, speed: 8,
    noise: 6, grCost: 5, selfLocking: false,
    forPrecision: true, mesh: "sun_planet_ring_compound",
    bestUse: "robot_joint_compact_high_ratio",
  },
};

const get = (t: GearType) => DATA[t];

export const efficiency = (t: GearType) => get(t).efficiency;
export const torqueCapacity = (t: GearType) => get(t).torqueCapacity;
export const speed = (t: GearType) => get(t).speed;
export const noise = (t: GearType) => get(t).noise;
export const grCost = (t: GearType) => get(t).grCost;
export const selfLocking = (t: GearType) => get(t).selfLocking;
export const forPrecision = (t: GearType) => get(t).forPrecision;
export const mesh = (t: GearType) => get(t).mesh;
export const bestUse = (t: GearType) => get(t).bestUse;
export const gearTypes = (): GearType[] => Object.keys(DATA) as GearType[];

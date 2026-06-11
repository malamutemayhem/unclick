export type GearboxType =
  | "spur_parallel"
  | "planetary_epicyclic"
  | "harmonic_strain_wave"
  | "cycloidal_eccentric"
  | "worm_right_angle";

const DATA: Record<GearboxType, {
  efficiency: number; torqueDensity: number; backlash: number;
  compactness: number; gbCost: number; selfLocking: boolean;
  forRobot: boolean; meshType: string; bestUse: string;
}> = {
  spur_parallel: {
    efficiency: 9, torqueDensity: 5, backlash: 4,
    compactness: 4, gbCost: 2, selfLocking: false,
    forRobot: false, meshType: "involute_external_mesh",
    bestUse: "conveyor_belt_linear",
  },
  planetary_epicyclic: {
    efficiency: 8, torqueDensity: 9, backlash: 6,
    compactness: 9, gbCost: 5, selfLocking: false,
    forRobot: true, meshType: "sun_planet_ring_mesh",
    bestUse: "robot_joint_compact",
  },
  harmonic_strain_wave: {
    efficiency: 7, torqueDensity: 10, backlash: 10,
    compactness: 10, gbCost: 8, selfLocking: false,
    forRobot: true, meshType: "flex_spline_wave_gen",
    bestUse: "cobot_precision_joint",
  },
  cycloidal_eccentric: {
    efficiency: 8, torqueDensity: 9, backlash: 9,
    compactness: 8, gbCost: 6, selfLocking: false,
    forRobot: true, meshType: "eccentric_roller_pin",
    bestUse: "heavy_load_servo_axis",
  },
  worm_right_angle: {
    efficiency: 5, torqueDensity: 7, backlash: 7,
    compactness: 6, gbCost: 3, selfLocking: true,
    forRobot: false, meshType: "helical_worm_wheel",
    bestUse: "hoist_elevator_brake",
  },
};

const get = (t: GearboxType) => DATA[t];

export const efficiency = (t: GearboxType) => get(t).efficiency;
export const torqueDensity = (t: GearboxType) => get(t).torqueDensity;
export const backlash = (t: GearboxType) => get(t).backlash;
export const compactness = (t: GearboxType) => get(t).compactness;
export const gbCost = (t: GearboxType) => get(t).gbCost;
export const selfLocking = (t: GearboxType) => get(t).selfLocking;
export const forRobot = (t: GearboxType) => get(t).forRobot;
export const meshType = (t: GearboxType) => get(t).meshType;
export const bestUse = (t: GearboxType) => get(t).bestUse;
export const gearboxTypes = (): GearboxType[] => Object.keys(DATA) as GearboxType[];

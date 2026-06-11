export type RotomoldType =
  | "biaxial_rock_roll"
  | "clamshell_shuttle"
  | "carousel_multi_arm"
  | "drop_arm_swing"
  | "oven_less_direct_heat";

interface RotomoldData {
  wallUniformity: number;
  sizeCapability: number;
  speed: number;
  toolingCost: number;
  rmCost: number;
  multiWall: boolean;
  forLargePart: boolean;
  heating: string;
  bestUse: string;
}

const DATA: Record<RotomoldType, RotomoldData> = {
  biaxial_rock_roll: {
    wallUniformity: 9, sizeCapability: 8, speed: 6, toolingCost: 4, rmCost: 5,
    multiWall: false, forLargePart: true,
    heating: "biaxial_rotation_gas_oven",
    bestUse: "water_tank_storage_vessel_large",
  },
  clamshell_shuttle: {
    wallUniformity: 7, sizeCapability: 9, speed: 7, toolingCost: 3, rmCost: 4,
    multiWall: false, forLargePart: true,
    heating: "shuttle_oven_open_close_clam",
    bestUse: "kayak_boat_hull_large_hollow",
  },
  carousel_multi_arm: {
    wallUniformity: 8, sizeCapability: 7, speed: 9, toolingCost: 7, rmCost: 6,
    multiWall: true, forLargePart: false,
    heating: "multi_arm_carousel_oven_cycle",
    bestUse: "playground_equipment_cooler_box",
  },
  drop_arm_swing: {
    wallUniformity: 8, sizeCapability: 10, speed: 5, toolingCost: 5, rmCost: 5,
    multiWall: false, forLargePart: true,
    heating: "swing_arm_independent_oven",
    bestUse: "septic_tank_industrial_drum",
  },
  oven_less_direct_heat: {
    wallUniformity: 6, sizeCapability: 6, speed: 8, toolingCost: 6, rmCost: 7,
    multiWall: false, forLargePart: false,
    heating: "direct_infrared_gas_flame_mold",
    bestUse: "small_part_rapid_prototype_short",
  },
};

function get(t: RotomoldType): RotomoldData {
  return DATA[t];
}

export const wallUniformity = (t: RotomoldType) => get(t).wallUniformity;
export const sizeCapability = (t: RotomoldType) => get(t).sizeCapability;
export const speed = (t: RotomoldType) => get(t).speed;
export const toolingCost = (t: RotomoldType) => get(t).toolingCost;
export const rmCost = (t: RotomoldType) => get(t).rmCost;
export const multiWall = (t: RotomoldType) => get(t).multiWall;
export const forLargePart = (t: RotomoldType) => get(t).forLargePart;
export const heating = (t: RotomoldType) => get(t).heating;
export const bestUse = (t: RotomoldType) => get(t).bestUse;
export const rotomoldTypes = (): RotomoldType[] =>
  Object.keys(DATA) as RotomoldType[];

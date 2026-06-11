export type DeltaRobotType =
  | "three_axis_pick_place"
  | "four_axis_rotary_wrist"
  | "six_axis_full_dof"
  | "hygienic_washdown_food"
  | "mini_delta_lab_pharma";

interface DeltaRobotData {
  speed: number;
  precision: number;
  payload: number;
  workspace: number;
  drCost: number;
  washdown: boolean;
  forFood: boolean;
  kinematics: string;
  bestUse: string;
}

const DATA: Record<DeltaRobotType, DeltaRobotData> = {
  three_axis_pick_place: {
    speed: 10, precision: 8, payload: 6, workspace: 7, drCost: 6,
    washdown: false, forFood: false,
    kinematics: "parallel_3_arm_linear_actuator",
    bestUse: "blister_pack_electronics_pick",
  },
  four_axis_rotary_wrist: {
    speed: 9, precision: 9, payload: 6, workspace: 7, drCost: 7,
    washdown: false, forFood: false,
    kinematics: "parallel_3_arm_plus_z_rotate",
    bestUse: "oriented_place_carton_tray_load",
  },
  six_axis_full_dof: {
    speed: 7, precision: 10, payload: 5, workspace: 6, drCost: 9,
    washdown: false, forFood: false,
    kinematics: "six_dof_parallel_stewart_hybrid",
    bestUse: "micro_assembly_optics_alignment",
  },
  hygienic_washdown_food: {
    speed: 9, precision: 8, payload: 7, workspace: 8, drCost: 8,
    washdown: true, forFood: true,
    kinematics: "stainless_ip69k_sealed_parallel",
    bestUse: "bakery_confectionery_fresh_pack",
  },
  mini_delta_lab_pharma: {
    speed: 8, precision: 10, payload: 3, workspace: 4, drCost: 5,
    washdown: false, forFood: false,
    kinematics: "compact_parallel_micro_actuator",
    bestUse: "vial_syringe_pipette_dispense",
  },
};

function get(t: DeltaRobotType): DeltaRobotData {
  return DATA[t];
}

export const speed = (t: DeltaRobotType) => get(t).speed;
export const precision = (t: DeltaRobotType) => get(t).precision;
export const payload = (t: DeltaRobotType) => get(t).payload;
export const workspace = (t: DeltaRobotType) => get(t).workspace;
export const drCost = (t: DeltaRobotType) => get(t).drCost;
export const washdown = (t: DeltaRobotType) => get(t).washdown;
export const forFood = (t: DeltaRobotType) => get(t).forFood;
export const kinematics = (t: DeltaRobotType) => get(t).kinematics;
export const bestUse = (t: DeltaRobotType) => get(t).bestUse;
export const deltaRobotTypes = (): DeltaRobotType[] =>
  Object.keys(DATA) as DeltaRobotType[];

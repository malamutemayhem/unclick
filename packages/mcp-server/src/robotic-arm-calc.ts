export type RoboticArmType =
  | "articulated_6_axis"
  | "scara_4_axis"
  | "delta_parallel_pick"
  | "cartesian_gantry"
  | "collaborative_cobot";

interface RoboticArmData {
  payload: number;
  speed: number;
  precision: number;
  reach: number;
  raCost: number;
  collaborative: boolean;
  forAssembly: boolean;
  axes: string;
  bestUse: string;
}

const DATA: Record<RoboticArmType, RoboticArmData> = {
  articulated_6_axis: {
    payload: 9, speed: 8, precision: 8, reach: 9, raCost: 7,
    collaborative: false, forAssembly: true,
    axes: "six_axis_revolute_joint",
    bestUse: "welding_painting_material_handling",
  },
  scara_4_axis: {
    payload: 5, speed: 9, precision: 9, reach: 5, raCost: 5,
    collaborative: false, forAssembly: true,
    axes: "four_axis_selective_compliance",
    bestUse: "pick_place_screw_drive_assembly",
  },
  delta_parallel_pick: {
    payload: 3, speed: 10, precision: 8, reach: 4, raCost: 6,
    collaborative: false, forAssembly: false,
    axes: "three_axis_parallel_linkage",
    bestUse: "high_speed_packaging_sorting",
  },
  cartesian_gantry: {
    payload: 10, speed: 6, precision: 9, reach: 10, raCost: 6,
    collaborative: false, forAssembly: false,
    axes: "three_axis_linear_xyz",
    bestUse: "large_workpiece_cnc_3d_printing",
  },
  collaborative_cobot: {
    payload: 4, speed: 5, precision: 8, reach: 6, raCost: 5,
    collaborative: true, forAssembly: true,
    axes: "six_axis_torque_sensing_safe",
    bestUse: "human_robot_shared_workspace",
  },
};

function get(t: RoboticArmType): RoboticArmData {
  return DATA[t];
}

export const payload = (t: RoboticArmType) => get(t).payload;
export const speed = (t: RoboticArmType) => get(t).speed;
export const precision = (t: RoboticArmType) => get(t).precision;
export const reach = (t: RoboticArmType) => get(t).reach;
export const raCost = (t: RoboticArmType) => get(t).raCost;
export const collaborative = (t: RoboticArmType) => get(t).collaborative;
export const forAssembly = (t: RoboticArmType) => get(t).forAssembly;
export const axes = (t: RoboticArmType) => get(t).axes;
export const bestUse = (t: RoboticArmType) => get(t).bestUse;
export const roboticArmTypes = (): RoboticArmType[] =>
  Object.keys(DATA) as RoboticArmType[];

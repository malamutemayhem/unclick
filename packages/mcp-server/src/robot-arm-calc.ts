export type RobotArm =
  | "scara_selective_comply"
  | "six_axis_articulated"
  | "delta_parallel_pick"
  | "cartesian_gantry"
  | "cobot_collaborative";

const DATA: Record<RobotArm, {
  speed: number; payload: number; precision: number;
  workspace: number; raCost: number; forceLimited: boolean;
  forAssembly: boolean; kinematics: string; bestUse: string;
}> = {
  scara_selective_comply: {
    speed: 9, payload: 5, precision: 8,
    workspace: 5, raCost: 4, forceLimited: false,
    forAssembly: true, kinematics: "rrt_four_axis_planar",
    bestUse: "electronics_pick_place_insert",
  },
  six_axis_articulated: {
    speed: 7, payload: 9, precision: 7,
    workspace: 10, raCost: 6, forceLimited: false,
    forAssembly: true, kinematics: "six_dof_revolute_chain",
    bestUse: "welding_painting_heavy_handling",
  },
  delta_parallel_pick: {
    speed: 10, payload: 3, precision: 6,
    workspace: 4, raCost: 5, forceLimited: false,
    forAssembly: false, kinematics: "three_arm_parallel_linkage",
    bestUse: "food_pharma_high_speed_sort",
  },
  cartesian_gantry: {
    speed: 5, payload: 10, precision: 9,
    workspace: 9, raCost: 3, forceLimited: false,
    forAssembly: false, kinematics: "xyz_linear_prismatic",
    bestUse: "cnc_3d_printer_large_format",
  },
  cobot_collaborative: {
    speed: 4, payload: 4, precision: 7,
    workspace: 6, raCost: 5, forceLimited: true,
    forAssembly: true, kinematics: "seven_dof_redundant_safe",
    bestUse: "human_assist_flexible_cell",
  },
};

const get = (t: RobotArm) => DATA[t];

export const speed = (t: RobotArm) => get(t).speed;
export const payload = (t: RobotArm) => get(t).payload;
export const precision = (t: RobotArm) => get(t).precision;
export const workspace = (t: RobotArm) => get(t).workspace;
export const raCost = (t: RobotArm) => get(t).raCost;
export const forceLimited = (t: RobotArm) => get(t).forceLimited;
export const forAssembly = (t: RobotArm) => get(t).forAssembly;
export const kinematics = (t: RobotArm) => get(t).kinematics;
export const bestUse = (t: RobotArm) => get(t).bestUse;
export const robotArms = (): RobotArm[] => Object.keys(DATA) as RobotArm[];

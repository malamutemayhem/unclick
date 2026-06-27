export type CollaborativeRobotType =
  | "force_limited_6_axis"
  | "dual_arm_bimanual"
  | "table_top_desktop"
  | "mobile_cobot_platform"
  | "vision_guided_pick";

interface CollaborativeRobotData {
  safety: number;
  payload: number;
  easeOfUse: number;
  flexibility: number;
  crCost__: number;
  fenceless: boolean;
  forSmallBatch: boolean;
  safetyMethod: string;
  bestUse: string;
}

const DATA: Record<CollaborativeRobotType, CollaborativeRobotData> = {
  force_limited_6_axis: {
    safety: 10, payload: 5, easeOfUse: 9, flexibility: 9, crCost__: 5,
    fenceless: true, forSmallBatch: true,
    safetyMethod: "force_torque_sensing_all_joints_power_speed_limit",
    bestUse: "small_parts_assembly_machine_tending_lab_automation",
  },
  dual_arm_bimanual: {
    safety: 10, payload: 3, easeOfUse: 7, flexibility: 10, crCost__: 8,
    fenceless: true, forSmallBatch: true,
    safetyMethod: "dual_arm_force_sensing_soft_cover_rounded_joints",
    bestUse: "electronics_assembly_two_hand_task_human_like_motion",
  },
  table_top_desktop: {
    safety: 10, payload: 2, easeOfUse: 10, flexibility: 6, crCost__: 3,
    fenceless: true, forSmallBatch: true,
    safetyMethod: "inherently_safe_low_mass_speed_limited_small_work",
    bestUse: "education_prototyping_micro_assembly_desktop_task",
  },
  mobile_cobot_platform: {
    safety: 9, payload: 5, easeOfUse: 8, flexibility: 10, crCost__: 9,
    fenceless: true, forSmallBatch: true,
    safetyMethod: "amr_base_lidar_safety_scanner_cobot_arm_mounted",
    bestUse: "multi_station_tending_logistics_autonomous_delivery",
  },
  vision_guided_pick: {
    safety: 9, payload: 6, easeOfUse: 8, flexibility: 8, crCost__: 7,
    fenceless: true, forSmallBatch: true,
    safetyMethod: "3d_vision_force_sensing_adaptive_grasp_bin_random",
    bestUse: "random_bin_picking_kitting_quality_inspection_sort",
  },
};

function get(t: CollaborativeRobotType): CollaborativeRobotData {
  return DATA[t];
}

export const safety = (t: CollaborativeRobotType) => get(t).safety;
export const payload = (t: CollaborativeRobotType) => get(t).payload;
export const easeOfUse = (t: CollaborativeRobotType) => get(t).easeOfUse;
export const flexibility = (t: CollaborativeRobotType) => get(t).flexibility;
export const crCost__ = (t: CollaborativeRobotType) => get(t).crCost__;
export const fenceless = (t: CollaborativeRobotType) => get(t).fenceless;
export const forSmallBatch = (t: CollaborativeRobotType) => get(t).forSmallBatch;
export const safetyMethod = (t: CollaborativeRobotType) => get(t).safetyMethod;
export const bestUse = (t: CollaborativeRobotType) => get(t).bestUse;
export const collaborativeRobotTypes = (): CollaborativeRobotType[] =>
  Object.keys(DATA) as CollaborativeRobotType[];

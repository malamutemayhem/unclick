export type CobotArmType =
  | "six_axis_cobot"
  | "seven_axis_cobot"
  | "dual_arm_cobot"
  | "mobile_cobot"
  | "palletize_cobot";

interface CobotArmData {
  payload: number;
  throughput: number;
  reach: number;
  repeatability: number;
  caCost: number;
  forceLimited: boolean;
  forAssembly: boolean;
  cobotConfig: string;
  bestUse: string;
}

const DATA: Record<CobotArmType, CobotArmData> = {
  six_axis_cobot: {
    payload: 7, throughput: 7, reach: 7, repeatability: 8, caCost: 6,
    forceLimited: true, forAssembly: true,
    cobotConfig: "six_axis_cobot_arm_torque_sensor_each_joint_force_limit_safe",
    bestUse: "machine_tend_six_axis_cobot_arm_load_unload_cnc_safe_shared",
  },
  seven_axis_cobot: {
    payload: 6, throughput: 6, reach: 8, repeatability: 8, caCost: 8,
    forceLimited: true, forAssembly: true,
    cobotConfig: "seven_axis_cobot_arm_redundant_joint_elbow_avoid_obstacle_reach",
    bestUse: "tight_cell_seven_axis_cobot_arm_obstacle_avoid_flexible_reach",
  },
  dual_arm_cobot: {
    payload: 5, throughput: 5, reach: 6, repeatability: 7, caCost: 9,
    forceLimited: true, forAssembly: true,
    cobotConfig: "dual_arm_cobot_two_arm_coordinate_bimanual_task_hand_like_grip",
    bestUse: "small_assembly_dual_arm_cobot_bimanual_insert_hold_tighten",
  },
  mobile_cobot: {
    payload: 6, throughput: 6, reach: 9, repeatability: 6, caCost: 9,
    forceLimited: true, forAssembly: false,
    cobotConfig: "mobile_cobot_arm_agv_base_arm_mount_roam_station_to_station",
    bestUse: "multi_station_mobile_cobot_arm_roam_floor_tend_several_machines",
  },
  palletize_cobot: {
    payload: 9, throughput: 8, reach: 8, repeatability: 7, caCost: 7,
    forceLimited: true, forAssembly: false,
    cobotConfig: "palletize_cobot_arm_high_payload_wide_reach_stack_box_pallet",
    bestUse: "end_of_line_palletize_cobot_arm_stack_case_pallet_safe_shared",
  },
};

function get(t: CobotArmType): CobotArmData {
  return DATA[t];
}

export const payload = (t: CobotArmType) => get(t).payload;
export const throughput = (t: CobotArmType) => get(t).throughput;
export const reach = (t: CobotArmType) => get(t).reach;
export const repeatability = (t: CobotArmType) => get(t).repeatability;
export const caCost = (t: CobotArmType) => get(t).caCost;
export const forceLimited = (t: CobotArmType) => get(t).forceLimited;
export const forAssembly = (t: CobotArmType) => get(t).forAssembly;
export const cobotConfig = (t: CobotArmType) => get(t).cobotConfig;
export const bestUse = (t: CobotArmType) => get(t).bestUse;
export const cobotArmTypes = (): CobotArmType[] =>
  Object.keys(DATA) as CobotArmType[];

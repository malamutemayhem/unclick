export type CobotType =
  | "six_axis_collaborative"
  | "four_axis_scara_cobot"
  | "dual_arm_bimanual"
  | "mobile_cobot_amr_base"
  | "desktop_micro_cobot";

interface CobotData {
  payload: number;
  reach: number;
  speed: number;
  safety: number;
  cbCost: number;
  forceLimited: boolean;
  forAssembly: boolean;
  safeguard: string;
  bestUse: string;
}

const DATA: Record<CobotType, CobotData> = {
  six_axis_collaborative: {
    payload: 8, reach: 8, speed: 7, safety: 9, cbCost: 7,
    forceLimited: true, forAssembly: true,
    safeguard: "power_force_limiting_iso_ts_15066",
    bestUse: "machine_tend_pick_place_assembly",
  },
  four_axis_scara_cobot: {
    payload: 6, reach: 6, speed: 9, safety: 8, cbCost: 5,
    forceLimited: true, forAssembly: true,
    safeguard: "speed_separation_monitoring",
    bestUse: "screw_drive_insert_place_fast",
  },
  dual_arm_bimanual: {
    payload: 5, reach: 7, speed: 6, safety: 10, cbCost: 9,
    forceLimited: true, forAssembly: true,
    safeguard: "dual_arm_force_torque_sensing",
    bestUse: "electronics_assembly_kitting_pack",
  },
  mobile_cobot_amr_base: {
    payload: 7, reach: 9, speed: 5, safety: 8, cbCost: 10,
    forceLimited: true, forAssembly: false,
    safeguard: "lidar_zone_safety_speed_control",
    bestUse: "multi_station_logistics_tend_move",
  },
  desktop_micro_cobot: {
    payload: 3, reach: 4, speed: 8, safety: 10, cbCost: 3,
    forceLimited: true, forAssembly: true,
    safeguard: "inherently_safe_low_mass_low_force",
    bestUse: "lab_bench_education_light_task",
  },
};

function get(t: CobotType): CobotData {
  return DATA[t];
}

export const payload = (t: CobotType) => get(t).payload;
export const reach = (t: CobotType) => get(t).reach;
export const speed = (t: CobotType) => get(t).speed;
export const safety = (t: CobotType) => get(t).safety;
export const cbCost = (t: CobotType) => get(t).cbCost;
export const forceLimited = (t: CobotType) => get(t).forceLimited;
export const forAssembly = (t: CobotType) => get(t).forAssembly;
export const safeguard = (t: CobotType) => get(t).safeguard;
export const bestUse = (t: CobotType) => get(t).bestUse;
export const cobotTypes = (): CobotType[] =>
  Object.keys(DATA) as CobotType[];

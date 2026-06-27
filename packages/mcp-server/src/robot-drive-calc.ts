export type RobotDrive =
  | "differential_two_wheel"
  | "mecanum_omnidirect"
  | "ackermann_steering"
  | "tracked_skid_steer"
  | "legged_quadruped";

const DATA: Record<RobotDrive, {
  maneuver: number; speed: number; terrainAbility: number;
  efficiency: number; rdCost: number; holonomic: boolean;
  forIndoor: boolean; locomotion: string; bestUse: string;
}> = {
  differential_two_wheel: {
    maneuver: 8, speed: 7, terrainAbility: 4,
    efficiency: 9, rdCost: 1, holonomic: false,
    forIndoor: true, locomotion: "left_right_wheel_diff_speed",
    bestUse: "warehouse_agv_line_follow",
  },
  mecanum_omnidirect: {
    maneuver: 10, speed: 5, terrainAbility: 3,
    efficiency: 6, rdCost: 4, holonomic: true,
    forIndoor: true, locomotion: "45_deg_roller_wheel_array",
    bestUse: "factory_floor_omnidirect_amr",
  },
  ackermann_steering: {
    maneuver: 4, speed: 10, terrainAbility: 6,
    efficiency: 10, rdCost: 3, holonomic: false,
    forIndoor: false, locomotion: "front_steer_rear_drive_axle",
    bestUse: "outdoor_delivery_road_vehicle",
  },
  tracked_skid_steer: {
    maneuver: 6, speed: 6, terrainAbility: 10,
    efficiency: 4, rdCost: 5, holonomic: false,
    forIndoor: false, locomotion: "continuous_track_diff_slip",
    bestUse: "construction_mine_rough_terrain",
  },
  legged_quadruped: {
    maneuver: 7, speed: 4, terrainAbility: 9,
    efficiency: 3, rdCost: 8, holonomic: false,
    forIndoor: false, locomotion: "four_leg_dynamic_gait_ctrl",
    bestUse: "inspection_stair_climb_uneven",
  },
};

const get = (t: RobotDrive) => DATA[t];

export const maneuver = (t: RobotDrive) => get(t).maneuver;
export const speed = (t: RobotDrive) => get(t).speed;
export const terrainAbility = (t: RobotDrive) => get(t).terrainAbility;
export const efficiency = (t: RobotDrive) => get(t).efficiency;
export const rdCost = (t: RobotDrive) => get(t).rdCost;
export const holonomic = (t: RobotDrive) => get(t).holonomic;
export const forIndoor = (t: RobotDrive) => get(t).forIndoor;
export const locomotion = (t: RobotDrive) => get(t).locomotion;
export const bestUse = (t: RobotDrive) => get(t).bestUse;
export const robotDrives = (): RobotDrive[] => Object.keys(DATA) as RobotDrive[];

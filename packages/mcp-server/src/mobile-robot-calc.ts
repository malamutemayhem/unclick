export type MobileRobotType =
  | "differential_drive_indoor"
  | "omnidirectional_mecanum"
  | "tracked_crawler_outdoor"
  | "legged_quadruped"
  | "aerial_drone_uav";

interface MobileRobotData {
  maneuverability: number;
  terrainCapability: number;
  payload: number;
  endurance: number;
  mrCost: number;
  allTerrain: boolean;
  forInspection: boolean;
  locomotion: string;
  bestUse: string;
}

const DATA: Record<MobileRobotType, MobileRobotData> = {
  differential_drive_indoor: {
    maneuverability: 8, terrainCapability: 3, payload: 7, endurance: 8, mrCost: 4,
    allTerrain: false, forInspection: false,
    locomotion: "two_wheel_differential_castor_lidar_slam_indoor",
    bestUse: "warehouse_logistics_hospital_delivery_floor_transport",
  },
  omnidirectional_mecanum: {
    maneuverability: 10, terrainCapability: 2, payload: 6, endurance: 7, mrCost: 6,
    allTerrain: false, forInspection: false,
    locomotion: "four_mecanum_wheel_holonomic_lateral_diagonal_move",
    bestUse: "tight_space_manufacturing_agv_precise_docking_align",
  },
  tracked_crawler_outdoor: {
    maneuverability: 5, terrainCapability: 10, payload: 8, endurance: 6, mrCost: 8,
    allTerrain: true, forInspection: true,
    locomotion: "continuous_track_rubber_or_steel_obstacle_climbing",
    bestUse: "bomb_disposal_mine_clearance_disaster_search_rescue",
  },
  legged_quadruped: {
    maneuverability: 9, terrainCapability: 9, payload: 4, endurance: 5, mrCost: 10,
    allTerrain: true, forInspection: true,
    locomotion: "four_leg_dynamic_balance_stair_climb_rough_terrain",
    bestUse: "oil_gas_plant_inspection_construction_site_survey",
  },
  aerial_drone_uav: {
    maneuverability: 10, terrainCapability: 10, payload: 2, endurance: 3, mrCost: 5,
    allTerrain: true, forInspection: true,
    locomotion: "multi_rotor_vtol_gps_vision_obstacle_avoidance",
    bestUse: "pipeline_powerline_roof_inspection_mapping_survey",
  },
};

function get(t: MobileRobotType): MobileRobotData {
  return DATA[t];
}

export const maneuverability = (t: MobileRobotType) => get(t).maneuverability;
export const terrainCapability = (t: MobileRobotType) => get(t).terrainCapability;
export const payload = (t: MobileRobotType) => get(t).payload;
export const endurance = (t: MobileRobotType) => get(t).endurance;
export const mrCost = (t: MobileRobotType) => get(t).mrCost;
export const allTerrain = (t: MobileRobotType) => get(t).allTerrain;
export const forInspection = (t: MobileRobotType) => get(t).forInspection;
export const locomotion = (t: MobileRobotType) => get(t).locomotion;
export const bestUse = (t: MobileRobotType) => get(t).bestUse;
export const mobileRobotTypes = (): MobileRobotType[] =>
  Object.keys(DATA) as MobileRobotType[];

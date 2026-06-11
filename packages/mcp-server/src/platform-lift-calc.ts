export type PlatformLiftType =
  | "boom_articulating"
  | "boom_telescopic_straight"
  | "mast_climbing_scaffold"
  | "personnel_basket_crane"
  | "aerial_truck_mount";

interface PlatformLiftData {
  reachHeight: number;
  horizontalReach: number;
  stability: number;
  setupSpeed: number;
  plCost: number;
  selfPropelled: boolean;
  forConstruction: boolean;
  platform: string;
  bestUse: string;
}

const DATA: Record<PlatformLiftType, PlatformLiftData> = {
  boom_articulating: {
    reachHeight: 8, horizontalReach: 9, stability: 7, setupSpeed: 7, plCost: 8,
    selfPropelled: true, forConstruction: true,
    platform: "articulated_boom_arm_jib_fly_rotating_basket",
    bestUse: "building_maintenance_over_obstacle_access_work",
  },
  boom_telescopic_straight: {
    reachHeight: 10, horizontalReach: 7, stability: 7, setupSpeed: 6, plCost: 9,
    selfPropelled: true, forConstruction: true,
    platform: "telescopic_straight_boom_single_basket_rotating",
    bestUse: "high_rise_construction_tower_crane_alternative",
  },
  mast_climbing_scaffold: {
    reachHeight: 9, horizontalReach: 5, stability: 9, setupSpeed: 4, plCost: 6,
    selfPropelled: false, forConstruction: true,
    platform: "rack_pinion_mast_climbing_adjustable_platform",
    bestUse: "facade_work_high_rise_cladding_long_duration_job",
  },
  personnel_basket_crane: {
    reachHeight: 10, horizontalReach: 10, stability: 6, setupSpeed: 3, plCost: 4,
    selfPropelled: false, forConstruction: false,
    platform: "suspended_basket_attached_to_mobile_crane_hook",
    bestUse: "emergency_rescue_short_duration_high_reach_task",
  },
  aerial_truck_mount: {
    reachHeight: 9, horizontalReach: 8, stability: 8, setupSpeed: 8, plCost: 8,
    selfPropelled: true, forConstruction: false,
    platform: "truck_chassis_mounted_insulated_boom_bucket",
    bestUse: "utility_line_work_street_light_tree_trimming",
  },
};

function get(t: PlatformLiftType): PlatformLiftData {
  return DATA[t];
}

export const reachHeight = (t: PlatformLiftType) => get(t).reachHeight;
export const horizontalReach = (t: PlatformLiftType) => get(t).horizontalReach;
export const stability = (t: PlatformLiftType) => get(t).stability;
export const setupSpeed = (t: PlatformLiftType) => get(t).setupSpeed;
export const plCost = (t: PlatformLiftType) => get(t).plCost;
export const selfPropelled = (t: PlatformLiftType) => get(t).selfPropelled;
export const forConstruction = (t: PlatformLiftType) => get(t).forConstruction;
export const platform = (t: PlatformLiftType) => get(t).platform;
export const bestUse = (t: PlatformLiftType) => get(t).bestUse;
export const platformLiftTypes = (): PlatformLiftType[] =>
  Object.keys(DATA) as PlatformLiftType[];

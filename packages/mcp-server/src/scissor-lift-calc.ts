export type ScissorLiftType =
  | "hydraulic_stationary"
  | "electric_mobile_slab"
  | "pneumatic_clean_room"
  | "diesel_rough_terrain"
  | "dock_leveler_pit";

interface ScissorLiftData {
  liftHeight: number;
  loadCapacity: number;
  platformSize: number;
  cycleSpeed: number;
  slCost: number;
  mobile: boolean;
  forOutdoor: boolean;
  mechanism: string;
  bestUse: string;
}

const DATA: Record<ScissorLiftType, ScissorLiftData> = {
  hydraulic_stationary: {
    liftHeight: 7, loadCapacity: 9, platformSize: 8, cycleSpeed: 6, slCost: 6,
    mobile: false, forOutdoor: false,
    mechanism: "hydraulic_cylinder_x_pattern_scissor_linkage",
    bestUse: "loading_dock_mezzanine_access_fixed_workstation",
  },
  electric_mobile_slab: {
    liftHeight: 8, loadCapacity: 6, platformSize: 7, cycleSpeed: 7, slCost: 7,
    mobile: true, forOutdoor: false,
    mechanism: "battery_electric_drive_hydraulic_lift_non_marking",
    bestUse: "warehouse_indoor_maintenance_ceiling_access_work",
  },
  pneumatic_clean_room: {
    liftHeight: 5, loadCapacity: 4, platformSize: 5, cycleSpeed: 8, slCost: 6,
    mobile: true, forOutdoor: false,
    mechanism: "air_bag_bellows_multi_stage_oil_free_clean_lift",
    bestUse: "cleanroom_electronics_lab_contamination_free_lift",
  },
  diesel_rough_terrain: {
    liftHeight: 9, loadCapacity: 8, platformSize: 9, cycleSpeed: 5, slCost: 9,
    mobile: true, forOutdoor: true,
    mechanism: "diesel_engine_four_wheel_drive_leveling_outrigger",
    bestUse: "construction_site_outdoor_elevated_platform_work",
  },
  dock_leveler_pit: {
    liftHeight: 3, loadCapacity: 10, platformSize: 8, cycleSpeed: 7, slCost: 5,
    mobile: false, forOutdoor: true,
    mechanism: "hydraulic_pit_mount_hinged_lip_truck_bed_bridge",
    bestUse: "loading_dock_truck_height_transition_forklift_access",
  },
};

function get(t: ScissorLiftType): ScissorLiftData {
  return DATA[t];
}

export const liftHeight = (t: ScissorLiftType) => get(t).liftHeight;
export const loadCapacity = (t: ScissorLiftType) => get(t).loadCapacity;
export const platformSize = (t: ScissorLiftType) => get(t).platformSize;
export const cycleSpeed = (t: ScissorLiftType) => get(t).cycleSpeed;
export const slCost = (t: ScissorLiftType) => get(t).slCost;
export const mobile = (t: ScissorLiftType) => get(t).mobile;
export const forOutdoor = (t: ScissorLiftType) => get(t).forOutdoor;
export const mechanism = (t: ScissorLiftType) => get(t).mechanism;
export const bestUse = (t: ScissorLiftType) => get(t).bestUse;
export const scissorLiftTypes = (): ScissorLiftType[] =>
  Object.keys(DATA) as ScissorLiftType[];

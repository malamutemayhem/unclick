export type AgvRobotType =
  | "unit_load_agv"
  | "forklift_agv"
  | "towing_tugger"
  | "amr_collaborative"
  | "heavy_payload";

interface AgvRobotData {
  payload: number;
  speed: number;
  navigation: number;
  flexibility: number;
  arCost: number;
  autonomous: boolean;
  forWarehouse: boolean;
  guidance: string;
  bestUse: string;
}

const DATA: Record<AgvRobotType, AgvRobotData> = {
  unit_load_agv: {
    payload: 7, speed: 7, navigation: 6, flexibility: 5, arCost: 6,
    autonomous: false, forWarehouse: true,
    guidance: "magnetic_tape_wire_guided_fixed_path_load_deck_transfer",
    bestUse: "manufacturing_floor_pallet_transfer_fixed_route_repetitive",
  },
  forklift_agv: {
    payload: 9, speed: 6, navigation: 7, flexibility: 7, arCost: 8,
    autonomous: true, forWarehouse: true,
    guidance: "laser_lidar_natural_feature_fork_lift_lower_stack_retrieve",
    bestUse: "warehouse_pallet_stacking_truck_loading_dock_to_rack_move",
  },
  towing_tugger: {
    payload: 10, speed: 8, navigation: 6, flexibility: 6, arCost: 5,
    autonomous: false, forWarehouse: true,
    guidance: "magnetic_wire_follow_train_cart_tow_pin_hitch_multi_drop",
    bestUse: "assembly_line_supply_milk_run_parts_delivery_multi_station",
  },
  amr_collaborative: {
    payload: 5, speed: 7, navigation: 10, flexibility: 10, arCost: 7,
    autonomous: true, forWarehouse: true,
    guidance: "slam_lidar_camera_dynamic_path_obstacle_avoidance_mapping",
    bestUse: "ecommerce_fulfillment_goods_to_person_flexible_warehouse",
  },
  heavy_payload: {
    payload: 10, speed: 4, navigation: 5, flexibility: 3, arCost: 10,
    autonomous: false, forWarehouse: false,
    guidance: "embedded_wire_laser_target_heavy_duty_platform_precision",
    bestUse: "automotive_body_shop_heavy_casting_roll_coil_transport",
  },
};

function get(t: AgvRobotType): AgvRobotData {
  return DATA[t];
}

export const payload = (t: AgvRobotType) => get(t).payload;
export const speed = (t: AgvRobotType) => get(t).speed;
export const navigation = (t: AgvRobotType) => get(t).navigation;
export const flexibility = (t: AgvRobotType) => get(t).flexibility;
export const arCost = (t: AgvRobotType) => get(t).arCost;
export const autonomous = (t: AgvRobotType) => get(t).autonomous;
export const forWarehouse = (t: AgvRobotType) => get(t).forWarehouse;
export const guidance = (t: AgvRobotType) => get(t).guidance;
export const bestUse = (t: AgvRobotType) => get(t).bestUse;
export const agvRobotTypes = (): AgvRobotType[] =>
  Object.keys(DATA) as AgvRobotType[];

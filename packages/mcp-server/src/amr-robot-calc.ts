export type AmrRobotType =
  | "diff_drive_warehouse"
  | "omnidirectional_mecanum"
  | "forklift_autonomous"
  | "tugger_tow_cart"
  | "goods_to_person_shelf";

interface AmrRobotData {
  payload: number;
  speed: number;
  navigation: number;
  flexibility: number;
  arCost: number;
  outdoor: boolean;
  forWarehouse: boolean;
  nav: string;
  bestUse: string;
}

const DATA: Record<AmrRobotType, AmrRobotData> = {
  diff_drive_warehouse: {
    payload: 7, speed: 8, navigation: 9, flexibility: 9, arCost: 6,
    outdoor: false, forWarehouse: true,
    nav: "lidar_slam_natural_feature",
    bestUse: "bin_tote_pallet_transport_aisle",
  },
  omnidirectional_mecanum: {
    payload: 5, speed: 7, navigation: 9, flexibility: 10, arCost: 8,
    outdoor: false, forWarehouse: false,
    nav: "lidar_camera_fusion_omni_move",
    bestUse: "tight_space_cleanroom_lab_move",
  },
  forklift_autonomous: {
    payload: 10, speed: 6, navigation: 8, flexibility: 6, arCost: 9,
    outdoor: true, forWarehouse: true,
    nav: "3d_lidar_reflector_pallet_detect",
    bestUse: "pallet_dock_load_unload_truck",
  },
  tugger_tow_cart: {
    payload: 9, speed: 7, navigation: 8, flexibility: 7, arCost: 5,
    outdoor: false, forWarehouse: true,
    nav: "magnetic_tape_qr_code_hybrid",
    bestUse: "line_side_delivery_milk_run",
  },
  goods_to_person_shelf: {
    payload: 8, speed: 9, navigation: 10, flexibility: 8, arCost: 7,
    outdoor: false, forWarehouse: true,
    nav: "grid_qr_slam_fleet_orchestrate",
    bestUse: "ecommerce_fulfillment_pick_tower",
  },
};

function get(t: AmrRobotType): AmrRobotData {
  return DATA[t];
}

export const payload = (t: AmrRobotType) => get(t).payload;
export const speed = (t: AmrRobotType) => get(t).speed;
export const navigation = (t: AmrRobotType) => get(t).navigation;
export const flexibility = (t: AmrRobotType) => get(t).flexibility;
export const arCost = (t: AmrRobotType) => get(t).arCost;
export const outdoor = (t: AmrRobotType) => get(t).outdoor;
export const forWarehouse = (t: AmrRobotType) => get(t).forWarehouse;
export const nav = (t: AmrRobotType) => get(t).nav;
export const bestUse = (t: AmrRobotType) => get(t).bestUse;
export const amrRobotTypes = (): AmrRobotType[] =>
  Object.keys(DATA) as AmrRobotType[];

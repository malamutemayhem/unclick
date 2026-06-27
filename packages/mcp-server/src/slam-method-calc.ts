export type SlamMethod =
  | "lidar_2d_scan_match"
  | "lidar_3d_loam"
  | "visual_orb_slam"
  | "visual_inertial_vins"
  | "graph_based_pose";

const DATA: Record<SlamMethod, {
  accuracy: number; speed: number; mapQuality: number;
  loopClosure: number; slamCost: number; gpuRequired: boolean;
  forOutdoor: boolean; frontend: string; bestUse: string;
}> = {
  lidar_2d_scan_match: {
    accuracy: 7, speed: 9, mapQuality: 5,
    loopClosure: 6, slamCost: 3, gpuRequired: false,
    forOutdoor: false, frontend: "icp_correlative_scan",
    bestUse: "warehouse_agv_floor",
  },
  lidar_3d_loam: {
    accuracy: 9, speed: 6, mapQuality: 9,
    loopClosure: 8, slamCost: 6, gpuRequired: false,
    forOutdoor: true, frontend: "edge_planar_feature",
    bestUse: "autonomous_vehicle_map",
  },
  visual_orb_slam: {
    accuracy: 7, speed: 7, mapQuality: 7,
    loopClosure: 9, slamCost: 4, gpuRequired: false,
    forOutdoor: true, frontend: "orb_feature_track_ba",
    bestUse: "ar_headset_tracking",
  },
  visual_inertial_vins: {
    accuracy: 8, speed: 8, mapQuality: 7,
    loopClosure: 7, slamCost: 5, gpuRequired: false,
    forOutdoor: true, frontend: "tightly_coupled_imu_cam",
    bestUse: "drone_gps_denied_nav",
  },
  graph_based_pose: {
    accuracy: 10, speed: 4, mapQuality: 10,
    loopClosure: 10, slamCost: 8, gpuRequired: true,
    forOutdoor: true, frontend: "factor_graph_optimizer",
    bestUse: "city_scale_hd_mapping",
  },
};

const get = (t: SlamMethod) => DATA[t];

export const accuracy = (t: SlamMethod) => get(t).accuracy;
export const speed = (t: SlamMethod) => get(t).speed;
export const mapQuality = (t: SlamMethod) => get(t).mapQuality;
export const loopClosure = (t: SlamMethod) => get(t).loopClosure;
export const slamCost = (t: SlamMethod) => get(t).slamCost;
export const gpuRequired = (t: SlamMethod) => get(t).gpuRequired;
export const forOutdoor = (t: SlamMethod) => get(t).forOutdoor;
export const frontend = (t: SlamMethod) => get(t).frontend;
export const bestUse = (t: SlamMethod) => get(t).bestUse;
export const slamMethods = (): SlamMethod[] => Object.keys(DATA) as SlamMethod[];

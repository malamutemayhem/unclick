export type AgvVehicleType =
  | "laser_guided_agv"
  | "magnetic_tape_guide"
  | "vision_guided_amr"
  | "inertial_nav_agv"
  | "rail_guided_agv";

interface AgvVehicleData {
  flexibility: number;
  payload: number;
  navAccuracy: number;
  throughput: number;
  agCost: number;
  autonomous: boolean;
  forOutdoor: boolean;
  guidance: string;
  bestUse: string;
}

const DATA: Record<AgvVehicleType, AgvVehicleData> = {
  laser_guided_agv: {
    flexibility: 8, payload: 8, navAccuracy: 9, throughput: 8, agCost: 8,
    autonomous: false, forOutdoor: false,
    guidance: "rotating_laser_scanner_reflector_triangulation",
    bestUse: "automotive_assembly_heavy_payload_fixed_route_transport",
  },
  magnetic_tape_guide: {
    flexibility: 3, payload: 7, navAccuracy: 7, throughput: 7, agCost: 4,
    autonomous: false, forOutdoor: false,
    guidance: "magnetic_tape_floor_path_sensor_follow_strip",
    bestUse: "simple_point_to_point_light_manufacturing_material_move",
  },
  vision_guided_amr: {
    flexibility: 10, payload: 5, navAccuracy: 8, throughput: 9, agCost: 7,
    autonomous: true, forOutdoor: false,
    guidance: "lidar_camera_slam_dynamic_path_obstacle_avoidance",
    bestUse: "ecommerce_warehouse_dynamic_picking_route_collaborative",
  },
  inertial_nav_agv: {
    flexibility: 6, payload: 9, navAccuracy: 7, throughput: 7, agCost: 7,
    autonomous: false, forOutdoor: true,
    guidance: "gyroscope_accelerometer_dead_reckoning_floor_magnet",
    bestUse: "outdoor_yard_container_port_heavy_transport_route",
  },
  rail_guided_agv: {
    flexibility: 2, payload: 10, navAccuracy: 10, throughput: 9, agCost: 9,
    autonomous: false, forOutdoor: true,
    guidance: "embedded_rail_track_fixed_path_powered_wheel",
    bestUse: "steel_mill_foundry_extreme_heavy_load_fixed_path",
  },
};

function get(t: AgvVehicleType): AgvVehicleData {
  return DATA[t];
}

export const flexibility = (t: AgvVehicleType) => get(t).flexibility;
export const payload = (t: AgvVehicleType) => get(t).payload;
export const navAccuracy = (t: AgvVehicleType) => get(t).navAccuracy;
export const throughput = (t: AgvVehicleType) => get(t).throughput;
export const agCost = (t: AgvVehicleType) => get(t).agCost;
export const autonomous = (t: AgvVehicleType) => get(t).autonomous;
export const forOutdoor = (t: AgvVehicleType) => get(t).forOutdoor;
export const guidance = (t: AgvVehicleType) => get(t).guidance;
export const bestUse = (t: AgvVehicleType) => get(t).bestUse;
export const agvVehicleTypes = (): AgvVehicleType[] =>
  Object.keys(DATA) as AgvVehicleType[];

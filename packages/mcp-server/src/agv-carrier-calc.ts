export type AgvCarrierType =
  | "magnetic_guide"
  | "laser_nav"
  | "natural_nav"
  | "rail_guided"
  | "autonomous_mobile";

interface AgvCarrierData {
  payload: number;
  throughput: number;
  flexibility: number;
  navigationAccuracy: number;
  agCost: number;
  infrastructureFree: boolean;
  forHeavyLoad: boolean;
  carrierConfig: string;
  bestUse: string;
}

const DATA: Record<AgvCarrierType, AgvCarrierData> = {
  magnetic_guide: {
    payload: 8, throughput: 7, flexibility: 3, navigationAccuracy: 8, agCost: 5,
    infrastructureFree: false, forHeavyLoad: true,
    carrierConfig: "magnetic_guide_agv_carrier_floor_tape_sensor_fixed_route_simple",
    bestUse: "assembly_line_magnetic_guide_agv_carrier_fixed_route_part_feed",
  },
  laser_nav: {
    payload: 7, throughput: 8, flexibility: 7, navigationAccuracy: 9, agCost: 7,
    infrastructureFree: false, forHeavyLoad: false,
    carrierConfig: "laser_nav_agv_carrier_reflector_scan_triangulate_precise_path",
    bestUse: "warehouse_pick_laser_nav_agv_carrier_reflector_precise_position",
  },
  natural_nav: {
    payload: 6, throughput: 7, flexibility: 9, navigationAccuracy: 7, agCost: 8,
    infrastructureFree: true, forHeavyLoad: false,
    carrierConfig: "natural_nav_agv_carrier_lidar_slam_map_no_reflector_no_tape",
    bestUse: "dynamic_floor_natural_nav_agv_carrier_slam_map_flexible_route",
  },
  rail_guided: {
    payload: 9, throughput: 9, flexibility: 2, navigationAccuracy: 9, agCost: 6,
    infrastructureFree: false, forHeavyLoad: true,
    carrierConfig: "rail_guided_agv_carrier_track_rail_heavy_load_fixed_loop_cycle",
    bestUse: "heavy_transfer_rail_guided_agv_carrier_multi_ton_press_to_press",
  },
  autonomous_mobile: {
    payload: 5, throughput: 8, flexibility: 9, navigationAccuracy: 8, agCost: 9,
    infrastructureFree: true, forHeavyLoad: false,
    carrierConfig: "autonomous_mobile_agv_carrier_vision_lidar_ai_plan_path_dynamic",
    bestUse: "mixed_traffic_autonomous_mobile_agv_carrier_ai_path_plan_avoid",
  },
};

function get(t: AgvCarrierType): AgvCarrierData {
  return DATA[t];
}

export const payload = (t: AgvCarrierType) => get(t).payload;
export const throughput = (t: AgvCarrierType) => get(t).throughput;
export const flexibility = (t: AgvCarrierType) => get(t).flexibility;
export const navigationAccuracy = (t: AgvCarrierType) => get(t).navigationAccuracy;
export const agCost = (t: AgvCarrierType) => get(t).agCost;
export const infrastructureFree = (t: AgvCarrierType) => get(t).infrastructureFree;
export const forHeavyLoad = (t: AgvCarrierType) => get(t).forHeavyLoad;
export const carrierConfig = (t: AgvCarrierType) => get(t).carrierConfig;
export const bestUse = (t: AgvCarrierType) => get(t).bestUse;
export const agvCarrierTypes = (): AgvCarrierType[] =>
  Object.keys(DATA) as AgvCarrierType[];

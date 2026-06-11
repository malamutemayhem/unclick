export type SafetyScannerType =
  | "laser_area_scanner"
  | "radar_safety_sensor"
  | "time_of_flight_3d"
  | "ultrasonic_safety"
  | "vision_safe_camera";

interface SafetyScannerData {
  fieldRange: number;
  angularCoverage: number;
  resolution: number;
  environmentalTolerance: number;
  ssCost_: number;
  outdoorRated: boolean;
  forAgvProtection: boolean;
  technology: string;
  bestUse: string;
}

const DATA: Record<SafetyScannerType, SafetyScannerData> = {
  laser_area_scanner: {
    fieldRange: 8, angularCoverage: 9, resolution: 9, environmentalTolerance: 6, ssCost_: 7,
    outdoorRated: false, forAgvProtection: true,
    technology: "lidar_time_of_flight_2d_scanning_mirror_270_deg",
    bestUse: "agv_amr_collision_avoidance_robot_cell_area_guard",
  },
  radar_safety_sensor: {
    fieldRange: 9, angularCoverage: 7, resolution: 5, environmentalTolerance: 10, ssCost_: 8,
    outdoorRated: true, forAgvProtection: false,
    technology: "fmcw_radar_24ghz_or_77ghz_dust_rain_fog_immune",
    bestUse: "outdoor_heavy_machinery_port_crane_dust_fog_area",
  },
  time_of_flight_3d: {
    fieldRange: 7, angularCoverage: 8, resolution: 8, environmentalTolerance: 5, ssCost_: 9,
    outdoorRated: false, forAgvProtection: true,
    technology: "tof_camera_depth_map_3d_zone_configurable_safe",
    bestUse: "collaborative_robot_zone_human_detection_3d_space",
  },
  ultrasonic_safety: {
    fieldRange: 4, angularCoverage: 5, resolution: 3, environmentalTolerance: 8, ssCost_: 3,
    outdoorRated: true, forAgvProtection: false,
    technology: "ultrasonic_transducer_echo_ranging_simple_zone",
    bestUse: "vehicle_reversing_aid_dock_door_proximity_simple",
  },
  vision_safe_camera: {
    fieldRange: 6, angularCoverage: 8, resolution: 10, environmentalTolerance: 5, ssCost_: 8,
    outdoorRated: false, forAgvProtection: false,
    technology: "stereo_camera_sil2_image_processing_body_detect",
    bestUse: "press_safeguard_palletizer_zone_body_hand_classify",
  },
};

function get(t: SafetyScannerType): SafetyScannerData {
  return DATA[t];
}

export const fieldRange = (t: SafetyScannerType) => get(t).fieldRange;
export const angularCoverage = (t: SafetyScannerType) => get(t).angularCoverage;
export const resolution = (t: SafetyScannerType) => get(t).resolution;
export const environmentalTolerance = (t: SafetyScannerType) => get(t).environmentalTolerance;
export const ssCost_ = (t: SafetyScannerType) => get(t).ssCost_;
export const outdoorRated = (t: SafetyScannerType) => get(t).outdoorRated;
export const forAgvProtection = (t: SafetyScannerType) => get(t).forAgvProtection;
export const technology = (t: SafetyScannerType) => get(t).technology;
export const bestUse = (t: SafetyScannerType) => get(t).bestUse;
export const safetyScannerTypes = (): SafetyScannerType[] =>
  Object.keys(DATA) as SafetyScannerType[];

export type LaserTrackerType =
  | "absolute_distance"
  | "interferometric"
  | "six_dof_probe"
  | "portable_arm_hybrid"
  | "indoor_gps";

interface LaserTrackerData {
  accuracy: number;
  range: number;
  portability: number;
  measureSpeed: number;
  ltCost: number;
  singlePerson: boolean;
  forLargeScale: boolean;
  technology: string;
  bestUse: string;
}

const DATA: Record<LaserTrackerType, LaserTrackerData> = {
  absolute_distance: {
    accuracy: 9, range: 9, portability: 8, measureSpeed: 9, ltCost: 8,
    singlePerson: true, forLargeScale: true,
    technology: "adm_laser_absolute_distance_no_beam_break_recover_auto",
    bestUse: "aircraft_assembly_jig_alignment_large_weldment_ship_hull",
  },
  interferometric: {
    accuracy: 10, range: 8, portability: 7, measureSpeed: 8, ltCost: 9,
    singlePerson: true, forLargeScale: true,
    technology: "laser_interferometer_fringe_count_highest_accuracy_beam_break",
    bestUse: "precision_machine_tool_calibration_reference_standard_lab",
  },
  six_dof_probe: {
    accuracy: 9, range: 8, portability: 8, measureSpeed: 10, ltCost: 10,
    singlePerson: true, forLargeScale: true,
    technology: "tracker_plus_6dof_smart_probe_measure_hidden_point_inside",
    bestUse: "complex_assembly_hidden_feature_bore_alignment_robot_cal",
  },
  portable_arm_hybrid: {
    accuracy: 7, range: 5, portability: 10, measureSpeed: 8, ltCost: 6,
    singlePerson: true, forLargeScale: false,
    technology: "articulated_arm_encoder_touch_probe_laser_scan_combo",
    bestUse: "first_article_inspection_reverse_engineering_shop_floor",
  },
  indoor_gps: {
    accuracy: 6, range: 10, portability: 6, measureSpeed: 7, ltCost: 9,
    singlePerson: false, forLargeScale: true,
    technology: "multiple_transmitter_fan_beam_laser_triangulate_large_volume",
    bestUse: "factory_floor_multi_station_simultaneous_measure_huge_area",
  },
};

function get(t: LaserTrackerType): LaserTrackerData {
  return DATA[t];
}

export const accuracy = (t: LaserTrackerType) => get(t).accuracy;
export const range = (t: LaserTrackerType) => get(t).range;
export const portability = (t: LaserTrackerType) => get(t).portability;
export const measureSpeed = (t: LaserTrackerType) => get(t).measureSpeed;
export const ltCost = (t: LaserTrackerType) => get(t).ltCost;
export const singlePerson = (t: LaserTrackerType) => get(t).singlePerson;
export const forLargeScale = (t: LaserTrackerType) => get(t).forLargeScale;
export const technology = (t: LaserTrackerType) => get(t).technology;
export const bestUse = (t: LaserTrackerType) => get(t).bestUse;
export const laserTrackerTypes = (): LaserTrackerType[] =>
  Object.keys(DATA) as LaserTrackerType[];

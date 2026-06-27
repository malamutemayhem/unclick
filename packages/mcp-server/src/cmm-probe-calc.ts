export type CmmProbeType =
  | "touch_trigger"
  | "scanning_analog"
  | "non_contact_laser"
  | "vision_camera"
  | "multi_sensor";

interface CmmProbeData {
  accuracy: number;
  measureSpeed: number;
  surfaceDetail: number;
  probeLife: number;
  cpCost: number;
  contactless: boolean;
  forFreeform: boolean;
  sensingMethod: string;
  bestUse: string;
}

const DATA: Record<CmmProbeType, CmmProbeData> = {
  touch_trigger: {
    accuracy: 8, measureSpeed: 7, surfaceDetail: 5, probeLife: 8, cpCost: 4,
    contactless: false, forFreeform: false,
    sensingMethod: "ruby_stylus_tip_kinematic_seat_trigger_signal_on_contact",
    bestUse: "prismatic_part_hole_position_diameter_plane_datum_gd_and_t",
  },
  scanning_analog: {
    accuracy: 10, measureSpeed: 9, surfaceDetail: 9, probeLife: 7, cpCost: 7,
    contactless: false, forFreeform: true,
    sensingMethod: "continuous_contact_deflection_analog_signal_dense_point_cloud",
    bestUse: "turbine_blade_gear_tooth_cam_profile_complex_surface_scan",
  },
  non_contact_laser: {
    accuracy: 7, measureSpeed: 10, surfaceDetail: 8, probeLife: 10, cpCost: 8,
    contactless: true, forFreeform: true,
    sensingMethod: "laser_line_triangulation_stripe_scan_dense_cloud_non_touch",
    bestUse: "soft_material_sheet_metal_reverse_engineering_rapid_scan",
  },
  vision_camera: {
    accuracy: 7, measureSpeed: 10, surfaceDetail: 6, probeLife: 10, cpCost: 6,
    contactless: true, forFreeform: false,
    sensingMethod: "ccd_camera_edge_detect_pattern_recognition_2d_feature",
    bestUse: "flat_part_pcb_gasket_micro_feature_2d_edge_measurement",
  },
  multi_sensor: {
    accuracy: 9, measureSpeed: 8, surfaceDetail: 8, probeLife: 8, cpCost: 10,
    contactless: false, forFreeform: true,
    sensingMethod: "combine_touch_laser_vision_auto_change_best_sensor_per_feature",
    bestUse: "complex_assembly_mixed_feature_one_setup_multi_technology",
  },
};

function get(t: CmmProbeType): CmmProbeData {
  return DATA[t];
}

export const accuracy = (t: CmmProbeType) => get(t).accuracy;
export const measureSpeed = (t: CmmProbeType) => get(t).measureSpeed;
export const surfaceDetail = (t: CmmProbeType) => get(t).surfaceDetail;
export const probeLife = (t: CmmProbeType) => get(t).probeLife;
export const cpCost = (t: CmmProbeType) => get(t).cpCost;
export const contactless = (t: CmmProbeType) => get(t).contactless;
export const forFreeform = (t: CmmProbeType) => get(t).forFreeform;
export const sensingMethod = (t: CmmProbeType) => get(t).sensingMethod;
export const bestUse = (t: CmmProbeType) => get(t).bestUse;
export const cmmProbeTypes = (): CmmProbeType[] =>
  Object.keys(DATA) as CmmProbeType[];

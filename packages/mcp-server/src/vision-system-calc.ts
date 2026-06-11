export type VisionSystemType =
  | "2d_area_scan"
  | "3d_structured_light"
  | "line_scan_web"
  | "thermal_infrared"
  | "hyperspectral_imaging";

interface VisionSystemData {
  resolution: number;
  speed: number;
  depthPerception: number;
  lighting: number;
  vsCost: number;
  threeD: boolean;
  forDefectDetection: boolean;
  sensor: string;
  bestUse: string;
}

const DATA: Record<VisionSystemType, VisionSystemData> = {
  "2d_area_scan": {
    resolution: 9, speed: 8, depthPerception: 2, lighting: 7, vsCost: 5,
    threeD: false, forDefectDetection: true,
    sensor: "cmos_global_shutter_monochrome_or_color_gige_usb3",
    bestUse: "label_verification_barcode_reading_presence_check",
  },
  "3d_structured_light": {
    resolution: 8, speed: 6, depthPerception: 10, lighting: 5, vsCost: 8,
    threeD: true, forDefectDetection: true,
    sensor: "stereo_pair_projector_fringe_pattern_point_cloud",
    bestUse: "bin_picking_volume_measurement_robot_guidance_3d",
  },
  line_scan_web: {
    resolution: 10, speed: 10, depthPerception: 2, lighting: 9, vsCost: 7,
    threeD: false, forDefectDetection: true,
    sensor: "linear_ccd_high_pixel_count_continuous_web_scan",
    bestUse: "print_inspection_textile_defect_continuous_web_check",
  },
  thermal_infrared: {
    resolution: 5, speed: 7, depthPerception: 1, lighting: 10, vsCost: 8,
    threeD: false, forDefectDetection: true,
    sensor: "uncooled_microbolometer_lwir_8_14um_thermal_map",
    bestUse: "hot_spot_detection_electrical_panel_thermal_audit",
  },
  hyperspectral_imaging: {
    resolution: 7, speed: 4, depthPerception: 1, lighting: 6, vsCost: 10,
    threeD: false, forDefectDetection: true,
    sensor: "pushbroom_vnir_swir_spectral_band_chemical_map",
    bestUse: "food_sorting_pharma_blend_mineral_classification",
  },
};

function get(t: VisionSystemType): VisionSystemData {
  return DATA[t];
}

export const resolution = (t: VisionSystemType) => get(t).resolution;
export const speed = (t: VisionSystemType) => get(t).speed;
export const depthPerception = (t: VisionSystemType) => get(t).depthPerception;
export const lighting = (t: VisionSystemType) => get(t).lighting;
export const vsCost = (t: VisionSystemType) => get(t).vsCost;
export const threeD = (t: VisionSystemType) => get(t).threeD;
export const forDefectDetection = (t: VisionSystemType) => get(t).forDefectDetection;
export const sensor = (t: VisionSystemType) => get(t).sensor;
export const bestUse = (t: VisionSystemType) => get(t).bestUse;
export const visionSystemTypes = (): VisionSystemType[] =>
  Object.keys(DATA) as VisionSystemType[];

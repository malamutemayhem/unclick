export type OpticalComparatorType =
  | "profile_projector"
  | "digital_comparator"
  | "video_comparator"
  | "floor_model"
  | "benchtop_overlay";

interface OpticalComparatorData {
  magnification: number;
  throughput: number;
  edgeDetection: number;
  measureRange: number;
  ocCost: number;
  digital: boolean;
  forProfile: boolean;
  comparatorConfig: string;
  bestUse: string;
}

const DATA: Record<OpticalComparatorType, OpticalComparatorData> = {
  profile_projector: {
    magnification: 7, throughput: 7, edgeDetection: 7, measureRange: 7, ocCost: 5,
    digital: false, forProfile: true,
    comparatorConfig: "profile_projector_optical_comparator_lamp_lens_screen_overlay_chart",
    bestUse: "thread_profile_projector_optical_comparator_overlay_go_no_go",
  },
  digital_comparator: {
    magnification: 8, throughput: 8, edgeDetection: 9, measureRange: 8, ocCost: 7,
    digital: true, forProfile: true,
    comparatorConfig: "digital_optical_comparator_camera_edge_detect_auto_measure_report",
    bestUse: "stamped_part_digital_optical_comparator_auto_edge_detect_report",
  },
  video_comparator: {
    magnification: 9, throughput: 6, edgeDetection: 9, measureRange: 6, ocCost: 8,
    digital: true, forProfile: true,
    comparatorConfig: "video_optical_comparator_high_mag_camera_sub_pixel_edge_measure",
    bestUse: "micro_part_video_optical_comparator_sub_pixel_fine_feature_check",
  },
  floor_model: {
    magnification: 6, throughput: 7, edgeDetection: 6, measureRange: 9, ocCost: 6,
    digital: false, forProfile: true,
    comparatorConfig: "floor_model_optical_comparator_large_screen_30_inch_heavy_part",
    bestUse: "large_forging_floor_model_optical_comparator_big_screen_profile",
  },
  benchtop_overlay: {
    magnification: 7, throughput: 8, edgeDetection: 7, measureRange: 5, ocCost: 3,
    digital: false, forProfile: false,
    comparatorConfig: "benchtop_overlay_optical_comparator_small_screen_chart_quick_check",
    bestUse: "incoming_inspect_benchtop_overlay_optical_comparator_quick_check",
  },
};

function get(t: OpticalComparatorType): OpticalComparatorData {
  return DATA[t];
}

export const magnification = (t: OpticalComparatorType) => get(t).magnification;
export const throughput = (t: OpticalComparatorType) => get(t).throughput;
export const edgeDetection = (t: OpticalComparatorType) => get(t).edgeDetection;
export const measureRange = (t: OpticalComparatorType) => get(t).measureRange;
export const ocCost = (t: OpticalComparatorType) => get(t).ocCost;
export const digital = (t: OpticalComparatorType) => get(t).digital;
export const forProfile = (t: OpticalComparatorType) => get(t).forProfile;
export const comparatorConfig = (t: OpticalComparatorType) => get(t).comparatorConfig;
export const bestUse = (t: OpticalComparatorType) => get(t).bestUse;
export const opticalComparatorTypes = (): OpticalComparatorType[] =>
  Object.keys(DATA) as OpticalComparatorType[];

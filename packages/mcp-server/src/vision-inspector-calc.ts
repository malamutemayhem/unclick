export type VisionInspectorType =
  | "2d_camera"
  | "3d_structured_light"
  | "line_scan"
  | "multispectral"
  | "deep_learning_vision";

interface VisionInspectorData {
  defectDetection: number;
  throughput: number;
  fieldOfView: number;
  classAccuracy: number;
  viCost: number;
  volumetric: boolean;
  forInline: boolean;
  inspectorConfig: string;
  bestUse: string;
}

const DATA: Record<VisionInspectorType, VisionInspectorData> = {
  "2d_camera": {
    defectDetection: 7, throughput: 9, fieldOfView: 8, classAccuracy: 7, viCost: 4,
    volumetric: false, forInline: true,
    inspectorConfig: "2d_camera_vision_inspector_area_scan_backlight_edge_defect_pass",
    bestUse: "label_check_2d_camera_vision_inspector_presence_orient_barcode",
  },
  "3d_structured_light": {
    defectDetection: 9, throughput: 6, fieldOfView: 6, classAccuracy: 8, viCost: 8,
    volumetric: true, forInline: false,
    inspectorConfig: "3d_structured_light_vision_inspector_fringe_project_point_cloud",
    bestUse: "weld_bead_3d_structured_light_vision_inspector_height_profile",
  },
  line_scan: {
    defectDetection: 8, throughput: 9, fieldOfView: 9, classAccuracy: 7, viCost: 6,
    volumetric: false, forInline: true,
    inspectorConfig: "line_scan_vision_inspector_linear_array_continuous_web_conveyor",
    bestUse: "web_inspect_line_scan_vision_inspector_continuous_fabric_surface",
  },
  multispectral: {
    defectDetection: 9, throughput: 5, fieldOfView: 6, classAccuracy: 9, viCost: 9,
    volumetric: false, forInline: false,
    inspectorConfig: "multispectral_vision_inspector_nir_uv_vis_band_material_classify",
    bestUse: "food_sort_multispectral_vision_inspector_contaminate_detect_nir",
  },
  deep_learning_vision: {
    defectDetection: 9, throughput: 8, fieldOfView: 7, classAccuracy: 9, viCost: 8,
    volumetric: false, forInline: true,
    inspectorConfig: "deep_learning_vision_inspector_cnn_model_trained_defect_classify",
    bestUse: "cosmetic_check_deep_learning_vision_inspector_scratch_dent_stain",
  },
};

function get(t: VisionInspectorType): VisionInspectorData {
  return DATA[t];
}

export const defectDetection = (t: VisionInspectorType) => get(t).defectDetection;
export const throughput = (t: VisionInspectorType) => get(t).throughput;
export const fieldOfView = (t: VisionInspectorType) => get(t).fieldOfView;
export const classAccuracy = (t: VisionInspectorType) => get(t).classAccuracy;
export const viCost = (t: VisionInspectorType) => get(t).viCost;
export const volumetric = (t: VisionInspectorType) => get(t).volumetric;
export const forInline = (t: VisionInspectorType) => get(t).forInline;
export const inspectorConfig = (t: VisionInspectorType) => get(t).inspectorConfig;
export const bestUse = (t: VisionInspectorType) => get(t).bestUse;
export const visionInspectorTypes = (): VisionInspectorType[] =>
  Object.keys(DATA) as VisionInspectorType[];

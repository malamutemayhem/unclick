export type AoiInspectionType =
  | "inline_2d"
  | "inline_3d"
  | "offline_bench"
  | "dual_side"
  | "ai_deep_learning";

interface AoiInspectionData {
  defectDetection: number;
  speed: number;
  falseCallRate: number;
  coverage: number;
  aiCost: number;
  threeD: boolean;
  forSolderJoint: boolean;
  imaging: string;
  bestUse: string;
}

const DATA: Record<AoiInspectionType, AoiInspectionData> = {
  inline_2d: {
    defectDetection: 7, speed: 9, falseCallRate: 5, coverage: 7, aiCost: 5,
    threeD: false, forSolderJoint: true,
    imaging: "multi_angle_led_camera_color_image_pattern_match_2d_scan",
    bestUse: "standard_smt_line_post_reflow_solder_defect_screening",
  },
  inline_3d: {
    defectDetection: 9, speed: 8, falseCallRate: 8, coverage: 9, aiCost: 8,
    threeD: true, forSolderJoint: true,
    imaging: "structured_light_moiré_fringe_height_measurement_3d_model",
    bestUse: "advanced_smt_line_solder_volume_height_coplanarity_check",
  },
  offline_bench: {
    defectDetection: 8, speed: 4, falseCallRate: 7, coverage: 8, aiCost: 4,
    threeD: false, forSolderJoint: true,
    imaging: "manual_load_high_resolution_camera_zoom_offline_review",
    bestUse: "first_article_inspection_prototype_verify_sample_audit",
  },
  dual_side: {
    defectDetection: 9, speed: 7, falseCallRate: 8, coverage: 10, aiCost: 9,
    threeD: true, forSolderJoint: true,
    imaging: "top_bottom_simultaneous_scan_flip_free_double_sided_pcb",
    bestUse: "double_sided_smt_assembly_bottom_component_full_coverage",
  },
  ai_deep_learning: {
    defectDetection: 10, speed: 8, falseCallRate: 10, coverage: 9, aiCost: 10,
    threeD: true, forSolderJoint: true,
    imaging: "deep_learning_neural_network_adaptive_defect_classify_auto",
    bestUse: "zero_defect_automotive_medical_ai_trained_false_call_reduce",
  },
};

function get(t: AoiInspectionType): AoiInspectionData {
  return DATA[t];
}

export const defectDetection = (t: AoiInspectionType) => get(t).defectDetection;
export const speed = (t: AoiInspectionType) => get(t).speed;
export const falseCallRate = (t: AoiInspectionType) => get(t).falseCallRate;
export const coverage = (t: AoiInspectionType) => get(t).coverage;
export const aiCost = (t: AoiInspectionType) => get(t).aiCost;
export const threeD = (t: AoiInspectionType) => get(t).threeD;
export const forSolderJoint = (t: AoiInspectionType) => get(t).forSolderJoint;
export const imaging = (t: AoiInspectionType) => get(t).imaging;
export const bestUse = (t: AoiInspectionType) => get(t).bestUse;
export const aoiInspectionTypes = (): AoiInspectionType[] =>
  Object.keys(DATA) as AoiInspectionType[];

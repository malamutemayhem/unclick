export type AoiInspectorType =
  | "inline_2d"
  | "inline_3d"
  | "offline_bench"
  | "dual_lane"
  | "ai_deep_learning";

interface AoiInspectorData {
  defectCoverage: number;
  inspectionSpeed: number;
  falseCallRate: number;
  programTime: number;
  aoiCost: number;
  threeD: boolean;
  forSolderJoint: boolean;
  imaging: string;
  bestUse: string;
}

const DATA: Record<AoiInspectorType, AoiInspectorData> = {
  inline_2d: {
    defectCoverage: 7, inspectionSpeed: 9, falseCallRate: 6, programTime: 7, aoiCost: 5,
    threeD: false, forSolderJoint: true,
    imaging: "multi_angle_led_color_camera_pattern_match_component_check",
    bestUse: "standard_smt_line_component_presence_polarity_marking_check",
  },
  inline_3d: {
    defectCoverage: 10, inspectionSpeed: 8, falseCallRate: 9, programTime: 8, aoiCost: 8,
    threeD: true, forSolderJoint: true,
    imaging: "structured_light_moiri_fringe_height_measure_solder_profile",
    bestUse: "high_reliability_automotive_medical_solder_volume_height",
  },
  offline_bench: {
    defectCoverage: 8, inspectionSpeed: 4, falseCallRate: 7, programTime: 5, aoiCost: 3,
    threeD: false, forSolderJoint: true,
    imaging: "manual_load_camera_microscope_rework_verify_sample_inspect",
    bestUse: "prototype_rework_verification_sample_audit_first_article",
  },
  dual_lane: {
    defectCoverage: 9, inspectionSpeed: 10, falseCallRate: 8, programTime: 8, aoiCost: 9,
    threeD: true, forSolderJoint: true,
    imaging: "dual_conveyor_simultaneous_inspect_two_board_parallel_scan",
    bestUse: "high_volume_dual_lane_smt_line_maximum_throughput_output",
  },
  ai_deep_learning: {
    defectCoverage: 10, inspectionSpeed: 8, falseCallRate: 10, programTime: 9, aoiCost: 10,
    threeD: true, forSolderJoint: true,
    imaging: "deep_learning_neural_net_train_on_defect_library_adaptive",
    bestUse: "complex_board_flexible_circuit_new_product_intro_low_false",
  },
};

function get(t: AoiInspectorType): AoiInspectorData {
  return DATA[t];
}

export const defectCoverage = (t: AoiInspectorType) => get(t).defectCoverage;
export const inspectionSpeed = (t: AoiInspectorType) => get(t).inspectionSpeed;
export const falseCallRate = (t: AoiInspectorType) => get(t).falseCallRate;
export const programTime = (t: AoiInspectorType) => get(t).programTime;
export const aoiCost = (t: AoiInspectorType) => get(t).aoiCost;
export const threeD = (t: AoiInspectorType) => get(t).threeD;
export const forSolderJoint = (t: AoiInspectorType) => get(t).forSolderJoint;
export const imaging = (t: AoiInspectorType) => get(t).imaging;
export const bestUse = (t: AoiInspectorType) => get(t).bestUse;
export const aoiInspectorTypes = (): AoiInspectorType[] =>
  Object.keys(DATA) as AoiInspectorType[];

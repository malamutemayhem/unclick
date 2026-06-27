export type FabricDraperType =
  | "diaphragm_form"
  | "stamp_drape"
  | "sequential_clamp"
  | "robot_end_effector"
  | "manual_hand_drape";

interface FabricDraperData {
  drapeConformity: number;
  throughput: number;
  wrinkleControl: number;
  shearAngle: number;
  fdCost_: number;
  automated: boolean;
  forDoubleContour: boolean;
  draperConfig: string;
  bestUse: string;
}

const DATA: Record<FabricDraperType, FabricDraperData> = {
  diaphragm_form: {
    drapeConformity: 9, throughput: 6, wrinkleControl: 9, shearAngle: 9, fdCost_: 7,
    automated: true, forDoubleContour: true,
    draperConfig: "diaphragm_form_fabric_draper_silicone_membrane_vacuum_pull_down",
    bestUse: "deep_cowl_diaphragm_form_fabric_draper_membrane_vacuum_conform",
  },
  stamp_drape: {
    drapeConformity: 7, throughput: 9, wrinkleControl: 6, shearAngle: 6, fdCost_: 8,
    automated: true, forDoubleContour: false,
    draperConfig: "stamp_drape_fabric_draper_matched_punch_die_hot_press_fast",
    bestUse: "thermoplastic_panel_stamp_drape_fabric_draper_hot_press_rapid",
  },
  sequential_clamp: {
    drapeConformity: 8, throughput: 7, wrinkleControl: 8, shearAngle: 8, fdCost_: 8,
    automated: true, forDoubleContour: true,
    draperConfig: "sequential_clamp_fabric_draper_gripper_array_staged_pull_order",
    bestUse: "complex_rib_sequential_clamp_fabric_draper_staged_gripper_pull",
  },
  robot_end_effector: {
    drapeConformity: 8, throughput: 7, wrinkleControl: 7, shearAngle: 7, fdCost_: 9,
    automated: true, forDoubleContour: true,
    draperConfig: "robot_end_effector_fabric_draper_suction_cup_array_6_axis_arm",
    bestUse: "mixed_shape_robot_end_effector_fabric_draper_suction_flexible",
  },
  manual_hand_drape: {
    drapeConformity: 6, throughput: 3, wrinkleControl: 5, shearAngle: 7, fdCost_: 2,
    automated: false, forDoubleContour: false,
    draperConfig: "manual_hand_drape_fabric_draper_hand_smooth_debulk_iron_tack",
    bestUse: "prototype_layup_manual_hand_drape_fabric_draper_hand_smooth",
  },
};

function get(t: FabricDraperType): FabricDraperData {
  return DATA[t];
}

export const drapeConformity = (t: FabricDraperType) => get(t).drapeConformity;
export const throughput = (t: FabricDraperType) => get(t).throughput;
export const wrinkleControl = (t: FabricDraperType) => get(t).wrinkleControl;
export const shearAngle = (t: FabricDraperType) => get(t).shearAngle;
export const fdCost_ = (t: FabricDraperType) => get(t).fdCost_;
export const automated = (t: FabricDraperType) => get(t).automated;
export const forDoubleContour = (t: FabricDraperType) => get(t).forDoubleContour;
export const draperConfig = (t: FabricDraperType) => get(t).draperConfig;
export const bestUse = (t: FabricDraperType) => get(t).bestUse;
export const fabricDraperTypes = (): FabricDraperType[] =>
  Object.keys(DATA) as FabricDraperType[];

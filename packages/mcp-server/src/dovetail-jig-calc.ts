export type DovetailJigType =
  | "half_blind_fixed"
  | "through_dovetail"
  | "variable_spacing"
  | "box_joint_finger"
  | "router_template";

interface DovetailJigData {
  jointStrength: number;
  setupSpeed: number;
  pinSpacing: number;
  repeatAccuracy: number;
  djCost: number;
  adjustable: boolean;
  forDrawer: boolean;
  jigConfig: string;
  bestUse: string;
}

const DATA: Record<DovetailJigType, DovetailJigData> = {
  half_blind_fixed: {
    jointStrength: 8, setupSpeed: 9, pinSpacing: 5, repeatAccuracy: 9, djCost: 4,
    adjustable: false, forDrawer: true,
    jigConfig: "fixed_template_half_blind_dovetail_router_guide_single_pass",
    bestUse: "drawer_front_half_blind_joint_production_cabinet_fast_setup",
  },
  through_dovetail: {
    jointStrength: 10, setupSpeed: 6, pinSpacing: 7, repeatAccuracy: 8, djCost: 6,
    adjustable: false, forDrawer: false,
    jigConfig: "through_dovetail_template_both_boards_visible_tail_pin_interlock",
    bestUse: "fine_furniture_box_chest_visible_through_dovetail_decorative",
  },
  variable_spacing: {
    jointStrength: 9, setupSpeed: 5, pinSpacing: 10, repeatAccuracy: 7, djCost: 8,
    adjustable: true, forDrawer: true,
    jigConfig: "adjustable_finger_guide_variable_pin_spacing_custom_layout_set",
    bestUse: "custom_furniture_variable_pin_size_hand_cut_look_router_made",
  },
  box_joint_finger: {
    jointStrength: 7, setupSpeed: 10, pinSpacing: 6, repeatAccuracy: 10, djCost: 3,
    adjustable: false, forDrawer: false,
    jigConfig: "indexing_pin_fence_box_joint_finger_joint_equal_spacing_cut",
    bestUse: "box_crate_finger_joint_simple_strong_glue_joint_table_saw_jig",
  },
  router_template: {
    jointStrength: 9, setupSpeed: 7, pinSpacing: 8, repeatAccuracy: 9, djCost: 9,
    adjustable: true, forDrawer: true,
    jigConfig: "precision_router_template_guide_bushing_depth_stop_dust_port",
    bestUse: "professional_cabinet_shop_precision_dovetail_all_joint_types",
  },
};

function get(t: DovetailJigType): DovetailJigData {
  return DATA[t];
}

export const jointStrength = (t: DovetailJigType) => get(t).jointStrength;
export const setupSpeed = (t: DovetailJigType) => get(t).setupSpeed;
export const pinSpacing = (t: DovetailJigType) => get(t).pinSpacing;
export const repeatAccuracy = (t: DovetailJigType) => get(t).repeatAccuracy;
export const djCost = (t: DovetailJigType) => get(t).djCost;
export const adjustable = (t: DovetailJigType) => get(t).adjustable;
export const forDrawer = (t: DovetailJigType) => get(t).forDrawer;
export const jigConfig = (t: DovetailJigType) => get(t).jigConfig;
export const bestUse = (t: DovetailJigType) => get(t).bestUse;
export const dovetailJigTypes = (): DovetailJigType[] =>
  Object.keys(DATA) as DovetailJigType[];

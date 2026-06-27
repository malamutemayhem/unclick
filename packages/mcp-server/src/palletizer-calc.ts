export type PalletizerType =
  | "conventional_high_level"
  | "conventional_low_level"
  | "robotic_articulated_arm"
  | "layer_forming_sweep"
  | "column_stacking_inline";

interface PalletizerData {
  speed: number;
  flexibility: number;
  footprint: number;
  reliability: number;
  plCost: number;
  multiSku: boolean;
  forHeavyCase: boolean;
  method: string;
  bestUse: string;
}

const DATA: Record<PalletizerType, PalletizerData> = {
  conventional_high_level: {
    speed: 10, flexibility: 5, footprint: 4, reliability: 10, plCost: 8,
    multiSku: false, forHeavyCase: true,
    method: "row_forming_high_level_infeed",
    bestUse: "beverage_case_high_speed_uniform",
  },
  conventional_low_level: {
    speed: 8, flexibility: 6, footprint: 6, reliability: 9, plCost: 6,
    multiSku: false, forHeavyCase: true,
    method: "floor_level_gravity_pattern",
    bestUse: "bag_box_moderate_speed_line",
  },
  robotic_articulated_arm: {
    speed: 7, flexibility: 10, footprint: 8, reliability: 8, plCost: 9,
    multiSku: true, forHeavyCase: false,
    method: "6_axis_robot_vacuum_gripper",
    bestUse: "mixed_sku_ecommerce_variety",
  },
  layer_forming_sweep: {
    speed: 9, flexibility: 7, footprint: 5, reliability: 9, plCost: 7,
    multiSku: false, forHeavyCase: true,
    method: "sweep_arm_full_layer_place",
    bestUse: "canned_goods_tray_layer_stack",
  },
  column_stacking_inline: {
    speed: 6, flexibility: 4, footprint: 9, reliability: 8, plCost: 4,
    multiSku: false, forHeavyCase: false,
    method: "inline_vertical_stack_column",
    bestUse: "small_carton_compact_line_end",
  },
};

function get(t: PalletizerType): PalletizerData {
  return DATA[t];
}

export const speed = (t: PalletizerType) => get(t).speed;
export const flexibility = (t: PalletizerType) => get(t).flexibility;
export const footprint = (t: PalletizerType) => get(t).footprint;
export const reliability = (t: PalletizerType) => get(t).reliability;
export const plCost = (t: PalletizerType) => get(t).plCost;
export const multiSku = (t: PalletizerType) => get(t).multiSku;
export const forHeavyCase = (t: PalletizerType) => get(t).forHeavyCase;
export const method = (t: PalletizerType) => get(t).method;
export const bestUse = (t: PalletizerType) => get(t).bestUse;
export const palletizerTypes = (): PalletizerType[] =>
  Object.keys(DATA) as PalletizerType[];

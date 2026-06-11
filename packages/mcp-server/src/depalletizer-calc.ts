export type DepalletizerType =
  | "sweep_depal"
  | "robot_depal"
  | "vacuum_depal"
  | "clamp_depal"
  | "layer_depal";

interface DepalletizerData {
  speed: number;
  throughput: number;
  gentleness: number;
  flexibility: number;
  ddCost: number;
  mixedSku: boolean;
  forFragile: boolean;
  depalConfig: string;
  bestUse: string;
}

const DATA: Record<DepalletizerType, DepalletizerData> = {
  sweep_depal: {
    speed: 9, throughput: 9, gentleness: 5, flexibility: 5, ddCost: 7,
    mixedSku: false, forFragile: false,
    depalConfig: "sweep_depalletizer_push_bar_slide_layer_onto_conveyor_high_speed",
    bestUse: "can_line_sweep_depalletizer_high_speed_full_layer_push_conveyor",
  },
  robot_depal: {
    speed: 7, throughput: 7, gentleness: 8, flexibility: 9, ddCost: 9,
    mixedSku: true, forFragile: true,
    depalConfig: "robot_depalletizer_vision_pick_place_mixed_sku_flexible_gripper",
    bestUse: "mixed_case_robot_depalletizer_vision_pick_flexible_sku_variety",
  },
  vacuum_depal: {
    speed: 8, throughput: 8, gentleness: 7, flexibility: 7, ddCost: 7,
    mixedSku: false, forFragile: true,
    depalConfig: "vacuum_depalletizer_suction_cup_lift_layer_gentle_handle_sheet",
    bestUse: "glass_jar_vacuum_depalletizer_suction_gentle_lift_layer_fragile",
  },
  clamp_depal: {
    speed: 8, throughput: 8, gentleness: 6, flexibility: 6, ddCost: 6,
    mixedSku: false, forFragile: false,
    depalConfig: "clamp_depalletizer_side_squeeze_grip_row_column_transfer_feed",
    bestUse: "carton_feed_clamp_depalletizer_side_grip_row_transfer_uniform",
  },
  layer_depal: {
    speed: 9, throughput: 9, gentleness: 7, flexibility: 5, ddCost: 8,
    mixedSku: false, forFragile: false,
    depalConfig: "layer_depalletizer_full_layer_lift_slip_sheet_remove_descend",
    bestUse: "bottle_line_layer_depalletizer_full_layer_lift_slip_sheet_feed",
  },
};

function get(t: DepalletizerType): DepalletizerData {
  return DATA[t];
}

export const speed = (t: DepalletizerType) => get(t).speed;
export const throughput = (t: DepalletizerType) => get(t).throughput;
export const gentleness = (t: DepalletizerType) => get(t).gentleness;
export const flexibility = (t: DepalletizerType) => get(t).flexibility;
export const ddCost = (t: DepalletizerType) => get(t).ddCost;
export const mixedSku = (t: DepalletizerType) => get(t).mixedSku;
export const forFragile = (t: DepalletizerType) => get(t).forFragile;
export const depalConfig = (t: DepalletizerType) => get(t).depalConfig;
export const bestUse = (t: DepalletizerType) => get(t).bestUse;
export const depalletizerTypes = (): DepalletizerType[] =>
  Object.keys(DATA) as DepalletizerType[];

export type PlyCutterType =
  | "gerber_single"
  | "gerber_multi"
  | "zund_modular"
  | "eastman_conveyor"
  | "manual_template";

interface PlyCutterData {
  cutPrecision: number;
  throughput: number;
  materialRange: number;
  nestUtilization: number;
  pcCost_: number;
  automated: boolean;
  forDryFabric: boolean;
  cutterConfig: string;
  bestUse: string;
}

const DATA: Record<PlyCutterType, PlyCutterData> = {
  gerber_single: {
    cutPrecision: 9, throughput: 7, materialRange: 8, nestUtilization: 9, pcCost_: 7,
    automated: true, forDryFabric: true,
    cutterConfig: "gerber_single_ply_cutter_vacuum_table_rotary_blade_single_ply",
    bestUse: "carbon_fabric_gerber_single_ply_cutter_rotary_blade_dry_fiber",
  },
  gerber_multi: {
    cutPrecision: 7, throughput: 9, materialRange: 7, nestUtilization: 8, pcCost_: 8,
    automated: true, forDryFabric: true,
    cutterConfig: "gerber_multi_ply_cutter_compressed_stack_straight_knife_batch",
    bestUse: "glass_cloth_gerber_multi_ply_cutter_stack_cut_high_volume_kits",
  },
  zund_modular: {
    cutPrecision: 9, throughput: 8, materialRange: 9, nestUtilization: 9, pcCost_: 9,
    automated: true, forDryFabric: true,
    cutterConfig: "zund_modular_ply_cutter_multi_tool_head_kiss_cut_through_cut",
    bestUse: "mixed_media_zund_modular_ply_cutter_multi_tool_flexible_setup",
  },
  eastman_conveyor: {
    cutPrecision: 8, throughput: 9, materialRange: 7, nestUtilization: 8, pcCost_: 8,
    automated: true, forDryFabric: false,
    cutterConfig: "eastman_conveyor_ply_cutter_continuous_feed_roll_to_cut_inline",
    bestUse: "production_kit_eastman_conveyor_ply_cutter_continuous_feed_line",
  },
  manual_template: {
    cutPrecision: 5, throughput: 3, materialRange: 6, nestUtilization: 5, pcCost_: 2,
    automated: false, forDryFabric: true,
    cutterConfig: "manual_template_ply_cutter_hand_shears_template_guide_bench",
    bestUse: "prototype_ply_manual_template_ply_cutter_hand_shears_one_off",
  },
};

function get(t: PlyCutterType): PlyCutterData {
  return DATA[t];
}

export const cutPrecision = (t: PlyCutterType) => get(t).cutPrecision;
export const throughput = (t: PlyCutterType) => get(t).throughput;
export const materialRange = (t: PlyCutterType) => get(t).materialRange;
export const nestUtilization = (t: PlyCutterType) => get(t).nestUtilization;
export const pcCost_ = (t: PlyCutterType) => get(t).pcCost_;
export const automated = (t: PlyCutterType) => get(t).automated;
export const forDryFabric = (t: PlyCutterType) => get(t).forDryFabric;
export const cutterConfig = (t: PlyCutterType) => get(t).cutterConfig;
export const bestUse = (t: PlyCutterType) => get(t).bestUse;
export const plyCutterTypes = (): PlyCutterType[] =>
  Object.keys(DATA) as PlyCutterType[];

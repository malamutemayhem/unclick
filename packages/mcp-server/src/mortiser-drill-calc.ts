export type MortiserDrillType =
  | "hollow_chisel"
  | "chain_mortiser"
  | "slot_mortiser"
  | "oscillating_mortiser"
  | "cnc_mortiser";

interface MortiserDrillData {
  cutPrecision: number;
  cuttingSpeed: number;
  mortiseDepth: number;
  surfaceFinish: number;
  mdCost: number;
  automated: boolean;
  forThrough: boolean;
  drillConfig: string;
  bestUse: string;
}

const DATA: Record<MortiserDrillType, MortiserDrillData> = {
  hollow_chisel: {
    cutPrecision: 8, cuttingSpeed: 6, mortiseDepth: 7, surfaceFinish: 8, mdCost: 4,
    automated: false, forThrough: false,
    drillConfig: "hollow_square_chisel_auger_bit_inside_plunge_square_mortise",
    bestUse: "furniture_frame_mortise_tenon_joint_square_hole_bench_mortiser",
  },
  chain_mortiser: {
    cutPrecision: 7, cuttingSpeed: 9, mortiseDepth: 10, surfaceFinish: 6, mdCost: 6,
    automated: false, forThrough: true,
    drillConfig: "continuous_chain_cutter_bar_deep_slot_mortise_timber_frame_cut",
    bestUse: "timber_frame_deep_mortise_post_beam_structural_joint_fast_cut",
  },
  slot_mortiser: {
    cutPrecision: 9, cuttingSpeed: 7, mortiseDepth: 8, surfaceFinish: 9, mdCost: 7,
    automated: false, forThrough: false,
    drillConfig: "horizontal_slot_drill_bit_x_y_table_travel_elongated_mortise",
    bestUse: "elongated_slot_mortise_loose_tenon_domino_style_joint_precise",
  },
  oscillating_mortiser: {
    cutPrecision: 8, cuttingSpeed: 8, mortiseDepth: 7, surfaceFinish: 7, mdCost: 5,
    automated: false, forThrough: false,
    drillConfig: "oscillating_chisel_bit_reciprocate_cut_clean_wall_mortise_hole",
    bestUse: "clean_wall_mortise_door_lock_hinge_recess_oscillating_action",
  },
  cnc_mortiser: {
    cutPrecision: 10, cuttingSpeed: 10, mortiseDepth: 9, surfaceFinish: 10, mdCost: 10,
    automated: true, forThrough: true,
    drillConfig: "cnc_servo_driven_multi_axis_auto_mortise_program_batch_repeat",
    bestUse: "production_mortise_batch_run_window_door_frame_cnc_programmed",
  },
};

function get(t: MortiserDrillType): MortiserDrillData {
  return DATA[t];
}

export const cutPrecision = (t: MortiserDrillType) => get(t).cutPrecision;
export const cuttingSpeed = (t: MortiserDrillType) => get(t).cuttingSpeed;
export const mortiseDepth = (t: MortiserDrillType) => get(t).mortiseDepth;
export const surfaceFinish = (t: MortiserDrillType) => get(t).surfaceFinish;
export const mdCost = (t: MortiserDrillType) => get(t).mdCost;
export const automated = (t: MortiserDrillType) => get(t).automated;
export const forThrough = (t: MortiserDrillType) => get(t).forThrough;
export const drillConfig = (t: MortiserDrillType) => get(t).drillConfig;
export const bestUse = (t: MortiserDrillType) => get(t).bestUse;
export const mortiserDrillTypes = (): MortiserDrillType[] =>
  Object.keys(DATA) as MortiserDrillType[];

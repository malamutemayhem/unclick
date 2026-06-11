export type PalletizerRobotType =
  | "articulated_arm"
  | "gantry_cartesian"
  | "layer_former"
  | "cobot_collaborative"
  | "inline_sweep";

interface PalletizerRobotData {
  palletizeSpeed: number;
  payloadCapacity: number;
  patternFlexibility: number;
  floorSpace: number;
  prCost: number;
  collaborative: boolean;
  forMixed: boolean;
  robotConfig: string;
  bestUse: string;
}

const DATA: Record<PalletizerRobotType, PalletizerRobotData> = {
  articulated_arm: {
    palletizeSpeed: 9, payloadCapacity: 8, patternFlexibility: 10, floorSpace: 7, prCost: 8,
    collaborative: false, forMixed: true,
    robotConfig: "six_axis_articulated_arm_end_of_arm_tool_pick_place_stack_auto",
    bestUse: "multi_sku_mixed_pallet_flexible_pattern_end_of_line_robotic",
  },
  gantry_cartesian: {
    palletizeSpeed: 8, payloadCapacity: 10, floorSpace: 5, patternFlexibility: 7, prCost: 9,
    collaborative: false, forMixed: false,
    robotConfig: "overhead_gantry_xyz_cartesian_heavy_payload_layer_pick_place",
    bestUse: "heavy_bag_sack_pallet_high_payload_overhead_gantry_pick_place",
  },
  layer_former: {
    palletizeSpeed: 10, payloadCapacity: 9, patternFlexibility: 6, floorSpace: 4, prCost: 10,
    collaborative: false, forMixed: false,
    robotConfig: "row_form_layer_push_sweep_elevator_lift_full_layer_stack_fast",
    bestUse: "high_speed_uniform_case_full_layer_palletize_beverage_canning",
  },
  cobot_collaborative: {
    palletizeSpeed: 5, payloadCapacity: 4, patternFlexibility: 9, floorSpace: 10, prCost: 5,
    collaborative: true, forMixed: true,
    robotConfig: "collaborative_robot_arm_force_limited_safe_human_workspace_pal",
    bestUse: "small_facility_mixed_sku_human_safe_collaborative_palletizing",
  },
  inline_sweep: {
    palletizeSpeed: 8, payloadCapacity: 7, patternFlexibility: 5, floorSpace: 6, prCost: 6,
    collaborative: false, forMixed: false,
    robotConfig: "inline_row_conveyor_sweep_arm_push_row_to_pallet_layer_by_row",
    bestUse: "single_sku_inline_sweep_arm_row_push_simple_pattern_mid_speed",
  },
};

function get(t: PalletizerRobotType): PalletizerRobotData {
  return DATA[t];
}

export const palletizeSpeed = (t: PalletizerRobotType) => get(t).palletizeSpeed;
export const payloadCapacity = (t: PalletizerRobotType) => get(t).payloadCapacity;
export const patternFlexibility = (t: PalletizerRobotType) => get(t).patternFlexibility;
export const floorSpace = (t: PalletizerRobotType) => get(t).floorSpace;
export const prCost = (t: PalletizerRobotType) => get(t).prCost;
export const collaborative = (t: PalletizerRobotType) => get(t).collaborative;
export const forMixed = (t: PalletizerRobotType) => get(t).forMixed;
export const robotConfig = (t: PalletizerRobotType) => get(t).robotConfig;
export const bestUse = (t: PalletizerRobotType) => get(t).bestUse;
export const palletizerRobotTypes = (): PalletizerRobotType[] =>
  Object.keys(DATA) as PalletizerRobotType[];

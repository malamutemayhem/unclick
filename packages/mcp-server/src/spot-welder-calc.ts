export type SpotWelderType =
  | "rocker_arm_spot"
  | "press_type_spot"
  | "portable_gun_spot"
  | "multi_head_spot"
  | "servo_driven_spot";

interface SpotWelderData {
  weldStrength: number;
  throughput: number;
  pressureControl: number;
  repeatability: number;
  swCost_: number;
  programmable: boolean;
  forAutomotive: boolean;
  welderConfig: string;
  bestUse: string;
}

const DATA: Record<SpotWelderType, SpotWelderData> = {
  rocker_arm_spot: {
    weldStrength: 6, throughput: 7, pressureControl: 5, repeatability: 6, swCost_: 3,
    programmable: false, forAutomotive: false,
    welderConfig: "rocker_arm_spot_welder_pivot_action_simple_sheet_metal_join",
    bestUse: "sheet_metal_shop_rocker_arm_spot_welder_simple_manual_join_fast",
  },
  press_type_spot: {
    weldStrength: 8, throughput: 8, pressureControl: 8, repeatability: 8, swCost_: 6,
    programmable: true, forAutomotive: true,
    welderConfig: "press_type_spot_welder_pneumatic_cylinder_consistent_force_auto",
    bestUse: "panel_assembly_press_type_spot_welder_consistent_force_reliable",
  },
  portable_gun_spot: {
    weldStrength: 6, throughput: 6, pressureControl: 5, repeatability: 5, swCost_: 4,
    programmable: false, forAutomotive: true,
    welderConfig: "portable_gun_spot_welder_handheld_transformer_reach_awkward_spot",
    bestUse: "auto_body_repair_portable_gun_spot_welder_reach_tight_space_flex",
  },
  multi_head_spot: {
    weldStrength: 9, throughput: 10, pressureControl: 9, repeatability: 10, swCost_: 9,
    programmable: true, forAutomotive: true,
    welderConfig: "multi_head_spot_welder_gang_electrode_simultaneous_multi_point",
    bestUse: "auto_body_line_multi_head_spot_welder_simultaneous_weld_high_speed",
  },
  servo_driven_spot: {
    weldStrength: 10, throughput: 9, pressureControl: 10, repeatability: 10, swCost_: 10,
    programmable: true, forAutomotive: true,
    welderConfig: "servo_driven_spot_welder_force_profile_adaptive_monitor_quality",
    bestUse: "advanced_auto_servo_driven_spot_welder_adaptive_force_quality_log",
  },
};

function get(t: SpotWelderType): SpotWelderData {
  return DATA[t];
}

export const weldStrength = (t: SpotWelderType) => get(t).weldStrength;
export const throughput = (t: SpotWelderType) => get(t).throughput;
export const pressureControl = (t: SpotWelderType) => get(t).pressureControl;
export const repeatability = (t: SpotWelderType) => get(t).repeatability;
export const swCost_ = (t: SpotWelderType) => get(t).swCost_;
export const programmable = (t: SpotWelderType) => get(t).programmable;
export const forAutomotive = (t: SpotWelderType) => get(t).forAutomotive;
export const welderConfig = (t: SpotWelderType) => get(t).welderConfig;
export const bestUse = (t: SpotWelderType) => get(t).bestUse;
export const spotWelderTypes = (): SpotWelderType[] =>
  Object.keys(DATA) as SpotWelderType[];

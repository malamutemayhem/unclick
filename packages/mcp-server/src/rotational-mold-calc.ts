export type RotationalMoldType =
  | "rock_and_roll"
  | "shuttle_machine"
  | "carousel_three_arm"
  | "clamshell"
  | "drop_arm";

interface RotationalMoldData {
  partSize: number;
  wallControl: number;
  throughput: number;
  moldComplexity: number;
  rmCost_: number;
  multiArm: boolean;
  forLargePart: boolean;
  rotation: string;
  bestUse: string;
}

const DATA: Record<RotationalMoldType, RotationalMoldData> = {
  rock_and_roll: {
    partSize: 10, wallControl: 6, throughput: 4, moldComplexity: 4, rmCost_: 5,
    multiArm: false, forLargePart: true,
    rotation: "single_axis_rock_plus_rotation_elongated_shape_canoe_tank",
    bestUse: "long_narrow_tank_canoe_kayak_pipe_elongated_hollow_part",
  },
  shuttle_machine: {
    partSize: 7, wallControl: 7, throughput: 6, moldComplexity: 6, rmCost_: 6,
    multiArm: false, forLargePart: true,
    rotation: "biaxial_rotation_shuttle_between_oven_cool_station_swap",
    bestUse: "medium_large_tank_playground_equipment_general_rotomold",
  },
  carousel_three_arm: {
    partSize: 8, wallControl: 8, throughput: 10, moldComplexity: 7, rmCost_: 9,
    multiArm: true, forLargePart: true,
    rotation: "three_arm_carousel_simultaneous_heat_cool_load_cycle_time",
    bestUse: "high_volume_water_tank_bin_pallet_production_rotomolding",
  },
  clamshell: {
    partSize: 5, wallControl: 7, throughput: 5, moldComplexity: 5, rmCost_: 4,
    multiArm: false, forLargePart: false,
    rotation: "clamshell_oven_open_close_compact_footprint_lab_prototype",
    bestUse: "small_run_prototype_lab_trial_compact_machine_low_volume",
  },
  drop_arm: {
    partSize: 9, wallControl: 8, throughput: 8, moldComplexity: 8, rmCost_: 8,
    multiArm: true, forLargePart: true,
    rotation: "independent_drop_arm_different_mold_size_mix_flexible_run",
    bestUse: "mixed_mold_size_custom_product_range_flexible_production",
  },
};

function get(t: RotationalMoldType): RotationalMoldData {
  return DATA[t];
}

export const partSize = (t: RotationalMoldType) => get(t).partSize;
export const wallControl = (t: RotationalMoldType) => get(t).wallControl;
export const throughput = (t: RotationalMoldType) => get(t).throughput;
export const moldComplexity = (t: RotationalMoldType) => get(t).moldComplexity;
export const rmCost_ = (t: RotationalMoldType) => get(t).rmCost_;
export const multiArm = (t: RotationalMoldType) => get(t).multiArm;
export const forLargePart = (t: RotationalMoldType) => get(t).forLargePart;
export const rotation = (t: RotationalMoldType) => get(t).rotation;
export const bestUse = (t: RotationalMoldType) => get(t).bestUse;
export const rotationalMoldTypes = (): RotationalMoldType[] =>
  Object.keys(DATA) as RotationalMoldType[];

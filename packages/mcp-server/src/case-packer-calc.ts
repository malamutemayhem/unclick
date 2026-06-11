export type CasePackerType =
  | "drop_packer"
  | "wrap_around"
  | "side_load"
  | "top_load_robotic"
  | "pick_and_place";

interface CasePackerData {
  speed: number;
  gentleness: number;
  flexibility: number;
  footprint: number;
  cpCost: number;
  automated: boolean;
  forFragile: boolean;
  mechanism: string;
  bestUse: string;
}

const DATA: Record<CasePackerType, CasePackerData> = {
  drop_packer: {
    speed: 10, gentleness: 5, flexibility: 6, footprint: 7, cpCost: 5,
    automated: true, forFragile: false,
    mechanism: "gravity_drop_partition_insert_vertical_load_high_speed",
    bestUse: "canned_beverage_bottle_jar_high_speed_drop_into_case",
  },
  wrap_around: {
    speed: 9, gentleness: 7, flexibility: 7, footprint: 8, cpCost: 7,
    automated: true, forFragile: false,
    mechanism: "flat_blank_wrap_fold_glue_around_product_group_inline",
    bestUse: "beverage_multipak_dairy_carton_retail_ready_tray_display",
  },
  side_load: {
    speed: 8, gentleness: 8, flexibility: 8, footprint: 6, cpCost: 7,
    automated: true, forFragile: true,
    mechanism: "horizontal_push_side_load_bucket_chain_gentle_transfer",
    bestUse: "cereal_box_pouch_bag_carton_horizontal_side_load_case",
  },
  top_load_robotic: {
    speed: 7, gentleness: 9, flexibility: 10, footprint: 8, cpCost: 9,
    automated: true, forFragile: true,
    mechanism: "delta_robot_top_load_vacuum_gripper_gentle_place_pattern",
    bestUse: "bakery_confection_cosmetic_fragile_product_pattern_pack",
  },
  pick_and_place: {
    speed: 6, gentleness: 10, flexibility: 9, footprint: 7, cpCost: 8,
    automated: true, forFragile: true,
    mechanism: "servo_pick_place_head_collate_group_orient_precision_load",
    bestUse: "pharmaceutical_vial_syringe_medical_device_precise_orient",
  },
};

function get(t: CasePackerType): CasePackerData {
  return DATA[t];
}

export const speed = (t: CasePackerType) => get(t).speed;
export const gentleness = (t: CasePackerType) => get(t).gentleness;
export const flexibility = (t: CasePackerType) => get(t).flexibility;
export const footprint = (t: CasePackerType) => get(t).footprint;
export const cpCost = (t: CasePackerType) => get(t).cpCost;
export const automated = (t: CasePackerType) => get(t).automated;
export const forFragile = (t: CasePackerType) => get(t).forFragile;
export const mechanism = (t: CasePackerType) => get(t).mechanism;
export const bestUse = (t: CasePackerType) => get(t).bestUse;
export const casePackerTypes = (): CasePackerType[] =>
  Object.keys(DATA) as CasePackerType[];

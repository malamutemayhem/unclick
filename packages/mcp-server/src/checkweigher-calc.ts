export type CheckweigherType =
  | "inline_belt"
  | "combination_multihead"
  | "dynamic_high_speed"
  | "static_platform"
  | "in_motion_conveyor";

interface CheckweigherData {
  speed: number;
  accuracy: number;
  productRange: number;
  rejection: number;
  cwCost: number;
  dynamic: boolean;
  forFood: boolean;
  sensor: string;
  bestUse: string;
}

const DATA: Record<CheckweigherType, CheckweigherData> = {
  inline_belt: {
    speed: 8, accuracy: 8, productRange: 8, rejection: 8, cwCost: 6,
    dynamic: true, forFood: true,
    sensor: "strain_gauge_load_cell_belt_conveyor_inline_weigh_reject",
    bestUse: "food_package_weight_compliance_overfill_underfill_reject",
  },
  combination_multihead: {
    speed: 10, accuracy: 10, productRange: 9, rejection: 9, cwCost: 9,
    dynamic: true, forFood: true,
    sensor: "multihead_combination_weigher_radial_feeder_target_weight",
    bestUse: "snack_confection_frozen_food_precise_target_weight_fill",
  },
  dynamic_high_speed: {
    speed: 10, accuracy: 7, productRange: 7, rejection: 9, cwCost: 8,
    dynamic: true, forFood: true,
    sensor: "emfr_electromagnetic_force_restoration_high_speed_cell",
    bestUse: "high_speed_beverage_pharma_carton_line_100_plus_per_minute",
  },
  static_platform: {
    speed: 3, accuracy: 10, productRange: 10, rejection: 5, cwCost: 4,
    dynamic: false, forFood: false,
    sensor: "precision_platform_scale_static_weigh_manual_place_read",
    bestUse: "quality_lab_spot_check_heavy_item_manual_verification",
  },
  in_motion_conveyor: {
    speed: 9, accuracy: 8, productRange: 9, rejection: 8, cwCost: 7,
    dynamic: true, forFood: true,
    sensor: "dual_interval_conveyor_in_motion_weigh_auto_zero_track",
    bestUse: "parcel_logistics_postal_dim_weight_sorting_auto_label",
  },
};

function get(t: CheckweigherType): CheckweigherData {
  return DATA[t];
}

export const speed = (t: CheckweigherType) => get(t).speed;
export const accuracy = (t: CheckweigherType) => get(t).accuracy;
export const productRange = (t: CheckweigherType) => get(t).productRange;
export const rejection = (t: CheckweigherType) => get(t).rejection;
export const cwCost = (t: CheckweigherType) => get(t).cwCost;
export const dynamic = (t: CheckweigherType) => get(t).dynamic;
export const forFood = (t: CheckweigherType) => get(t).forFood;
export const sensor = (t: CheckweigherType) => get(t).sensor;
export const bestUse = (t: CheckweigherType) => get(t).bestUse;
export const checkweigherTypes = (): CheckweigherType[] =>
  Object.keys(DATA) as CheckweigherType[];

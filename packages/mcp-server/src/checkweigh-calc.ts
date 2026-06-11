export type CheckweighType =
  | "static_platform_bench"
  | "in_motion_belt_conveyor"
  | "combination_multi_head"
  | "catchweight_price_label"
  | "statistical_sampling_batch";

interface CheckweighData {
  accuracy: number;
  speed: number;
  range: number;
  rejection: number;
  cwCost: number;
  dynamic: boolean;
  forHighSpeed: boolean;
  loadCell: string;
  bestUse: string;
}

const DATA: Record<CheckweighType, CheckweighData> = {
  static_platform_bench: {
    accuracy: 10, speed: 3, range: 9, rejection: 5, cwCost: 3,
    dynamic: false, forHighSpeed: false,
    loadCell: "strain_gauge_platform_cell",
    bestUse: "manual_qc_spot_check_packing",
  },
  in_motion_belt_conveyor: {
    accuracy: 8, speed: 9, range: 8, rejection: 9, cwCost: 7,
    dynamic: true, forHighSpeed: true,
    loadCell: "electromagnetic_force_restoration",
    bestUse: "packaging_line_fill_weight_check",
  },
  combination_multi_head: {
    accuracy: 9, speed: 10, range: 6, rejection: 8, cwCost: 10,
    dynamic: true, forHighSpeed: true,
    loadCell: "multi_head_radial_feeder_cell",
    bestUse: "snack_salad_mixed_product_weigh",
  },
  catchweight_price_label: {
    accuracy: 8, speed: 8, range: 7, rejection: 7, cwCost: 6,
    dynamic: true, forHighSpeed: false,
    loadCell: "single_point_off_center_load",
    bestUse: "meat_seafood_deli_price_per_kg",
  },
  statistical_sampling_batch: {
    accuracy: 9, speed: 4, range: 10, rejection: 4, cwCost: 4,
    dynamic: false, forHighSpeed: false,
    loadCell: "precision_analytical_balance",
    bestUse: "pharma_batch_compliance_sampling",
  },
};

function get(t: CheckweighType): CheckweighData {
  return DATA[t];
}

export const accuracy = (t: CheckweighType) => get(t).accuracy;
export const speed = (t: CheckweighType) => get(t).speed;
export const range = (t: CheckweighType) => get(t).range;
export const rejection = (t: CheckweighType) => get(t).rejection;
export const cwCost = (t: CheckweighType) => get(t).cwCost;
export const dynamic = (t: CheckweighType) => get(t).dynamic;
export const forHighSpeed = (t: CheckweighType) => get(t).forHighSpeed;
export const loadCell = (t: CheckweighType) => get(t).loadCell;
export const bestUse = (t: CheckweighType) => get(t).bestUse;
export const checkweighTypes = (): CheckweighType[] =>
  Object.keys(DATA) as CheckweighType[];

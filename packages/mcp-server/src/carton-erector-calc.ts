export type CartonErectorType =
  | "semi_auto_manual"
  | "full_auto_hotmelt"
  | "full_auto_tape"
  | "random_size"
  | "tray_former";

interface CartonErectorData {
  erectSpeed: number;
  sizeRange: number;
  sealQuality: number;
  changeoverTime: number;
  ceCost: number;
  automated: boolean;
  forRandom: boolean;
  erectConfig: string;
  bestUse: string;
}

const DATA: Record<CartonErectorType, CartonErectorData> = {
  semi_auto_manual: {
    erectSpeed: 4, sizeRange: 8, sealQuality: 6, changeoverTime: 9, ceCost: 2,
    automated: false, forRandom: false,
    erectConfig: "operator_load_flat_blank_machine_fold_seal_bottom_semi_assist",
    bestUse: "low_volume_varied_product_manual_load_semi_auto_bottom_seal",
  },
  full_auto_hotmelt: {
    erectSpeed: 9, sizeRange: 7, sealQuality: 9, changeoverTime: 6, ceCost: 7,
    automated: true, forRandom: false,
    erectConfig: "magazine_feed_vacuum_erect_hot_melt_glue_seal_bottom_flap_auto",
    bestUse: "high_speed_production_line_uniform_carton_hotmelt_seal_strong",
  },
  full_auto_tape: {
    erectSpeed: 8, sizeRange: 7, sealQuality: 8, changeoverTime: 7, ceCost: 6,
    automated: true, forRandom: false,
    erectConfig: "magazine_feed_erect_tape_seal_bottom_flaps_pressure_sensitive",
    bestUse: "standard_production_line_rsc_carton_tape_seal_cost_effective",
  },
  random_size: {
    erectSpeed: 7, sizeRange: 10, sealQuality: 8, changeoverTime: 10, ceCost: 10,
    automated: true, forRandom: true,
    erectConfig: "servo_driven_auto_adjust_size_on_fly_random_carton_erect_seal",
    bestUse: "ecommerce_fulfillment_random_size_right_size_carton_on_demand",
  },
  tray_former: {
    erectSpeed: 10, sizeRange: 5, sealQuality: 7, changeoverTime: 5, ceCost: 8,
    automated: true, forRandom: false,
    erectConfig: "die_cut_blank_form_tray_glue_corner_wrap_around_shrink_sleeve",
    bestUse: "beverage_produce_tray_wrap_around_display_ready_retail_package",
  },
};

function get(t: CartonErectorType): CartonErectorData {
  return DATA[t];
}

export const erectSpeed = (t: CartonErectorType) => get(t).erectSpeed;
export const sizeRange = (t: CartonErectorType) => get(t).sizeRange;
export const sealQuality = (t: CartonErectorType) => get(t).sealQuality;
export const changeoverTime = (t: CartonErectorType) => get(t).changeoverTime;
export const ceCost = (t: CartonErectorType) => get(t).ceCost;
export const automated = (t: CartonErectorType) => get(t).automated;
export const forRandom = (t: CartonErectorType) => get(t).forRandom;
export const erectConfig = (t: CartonErectorType) => get(t).erectConfig;
export const bestUse = (t: CartonErectorType) => get(t).bestUse;
export const cartonErectorTypes = (): CartonErectorType[] =>
  Object.keys(DATA) as CartonErectorType[];

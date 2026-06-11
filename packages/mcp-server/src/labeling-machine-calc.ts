export type LabelingMachineType =
  | "pressure_sensitive"
  | "shrink_sleeve"
  | "wet_glue"
  | "hot_melt_glue"
  | "print_apply";

interface LabelingMachineData {
  speed: number;
  accuracy: number;
  labelRange: number;
  changeover: number;
  lmCost: number;
  fullWrap: boolean;
  forRoundBottle: boolean;
  application: string;
  bestUse: string;
}

const DATA: Record<LabelingMachineType, LabelingMachineData> = {
  pressure_sensitive: {
    speed: 8, accuracy: 9, labelRange: 8, changeover: 9, lmCost: 5,
    fullWrap: false, forRoundBottle: true,
    application: "peel_and_stick_self_adhesive_label_roll_fed_wipe",
    bestUse: "bottle_label_front_back_wrap_pharma_cosmetic_food",
  },
  shrink_sleeve: {
    speed: 9, accuracy: 7, labelRange: 6, changeover: 6, lmCost: 7,
    fullWrap: true, forRoundBottle: true,
    application: "heat_shrink_pet_film_sleeve_full_body_360_degree",
    bestUse: "beverage_bottle_full_body_tamper_band_contour_shape",
  },
  wet_glue: {
    speed: 10, accuracy: 7, labelRange: 7, changeover: 5, lmCost: 6,
    fullWrap: false, forRoundBottle: true,
    application: "paper_label_glue_roller_or_palette_high_speed_rotary",
    bestUse: "beer_bottle_wine_label_high_speed_rotary_line",
  },
  hot_melt_glue: {
    speed: 10, accuracy: 7, labelRange: 7, changeover: 5, lmCost: 7,
    fullWrap: true, forRoundBottle: true,
    application: "opp_label_hot_melt_adhesive_wrap_around_rotary",
    bestUse: "pet_bottle_water_soft_drink_high_speed_wrap_label",
  },
  print_apply: {
    speed: 6, accuracy: 8, labelRange: 5, changeover: 8, lmCost: 8,
    fullWrap: false, forRoundBottle: false,
    application: "thermal_transfer_print_then_apply_variable_data",
    bestUse: "carton_pallet_label_barcode_lot_date_variable_info",
  },
};

function get(t: LabelingMachineType): LabelingMachineData {
  return DATA[t];
}

export const speed = (t: LabelingMachineType) => get(t).speed;
export const accuracy = (t: LabelingMachineType) => get(t).accuracy;
export const labelRange = (t: LabelingMachineType) => get(t).labelRange;
export const changeover = (t: LabelingMachineType) => get(t).changeover;
export const lmCost = (t: LabelingMachineType) => get(t).lmCost;
export const fullWrap = (t: LabelingMachineType) => get(t).fullWrap;
export const forRoundBottle = (t: LabelingMachineType) => get(t).forRoundBottle;
export const application = (t: LabelingMachineType) => get(t).application;
export const bestUse = (t: LabelingMachineType) => get(t).bestUse;
export const labelingMachineTypes = (): LabelingMachineType[] =>
  Object.keys(DATA) as LabelingMachineType[];

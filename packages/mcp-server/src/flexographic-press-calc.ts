export type FlexographicPressType =
  | "central_impression"
  | "stack_type"
  | "inline"
  | "unit_type"
  | "sleeve_technology";

interface FlexographicPressData {
  speed: number;
  printQuality: number;
  registration: number;
  changeover: number;
  fpCost: number;
  uvCapable: boolean;
  forPackaging: boolean;
  impression: string;
  bestUse: string;
}

const DATA: Record<FlexographicPressType, FlexographicPressData> = {
  central_impression: {
    speed: 9, printQuality: 9, registration: 10, changeover: 5, fpCost: 9,
    uvCapable: true, forPackaging: true,
    impression: "single_common_impression_cylinder_multi_color_tight_register",
    bestUse: "flexible_packaging_film_pouch_snack_bag_shrink_label",
  },
  stack_type: {
    speed: 7, printQuality: 7, registration: 7, changeover: 7, fpCost: 6,
    uvCapable: true, forPackaging: true,
    impression: "stacked_print_stations_individual_impression_drum",
    bestUse: "corrugated_box_paper_bag_tissue_wrap_general_purpose",
  },
  inline: {
    speed: 8, printQuality: 8, registration: 8, changeover: 6, fpCost: 8,
    uvCapable: true, forPackaging: true,
    impression: "inline_horizontal_stations_web_converting_combined",
    bestUse: "label_stock_tag_stock_ticket_multiprocess_inline_die_cut",
  },
  unit_type: {
    speed: 6, printQuality: 7, registration: 6, changeover: 8, fpCost: 5,
    uvCapable: false, forPackaging: false,
    impression: "individual_modular_print_deck_add_remove_stations",
    bestUse: "newspaper_directory_book_cover_short_run_commercial",
  },
  sleeve_technology: {
    speed: 10, printQuality: 9, registration: 9, changeover: 10, fpCost: 10,
    uvCapable: true, forPackaging: true,
    impression: "seamless_polymer_sleeve_gearless_servo_quick_change",
    bestUse: "high_volume_repeat_length_flexible_packaging_beverage_carton",
  },
};

function get(t: FlexographicPressType): FlexographicPressData {
  return DATA[t];
}

export const speed = (t: FlexographicPressType) => get(t).speed;
export const printQuality = (t: FlexographicPressType) => get(t).printQuality;
export const registration = (t: FlexographicPressType) => get(t).registration;
export const changeover = (t: FlexographicPressType) => get(t).changeover;
export const fpCost = (t: FlexographicPressType) => get(t).fpCost;
export const uvCapable = (t: FlexographicPressType) => get(t).uvCapable;
export const forPackaging = (t: FlexographicPressType) => get(t).forPackaging;
export const impression = (t: FlexographicPressType) => get(t).impression;
export const bestUse = (t: FlexographicPressType) => get(t).bestUse;
export const flexographicPressTypes = (): FlexographicPressType[] =>
  Object.keys(DATA) as FlexographicPressType[];

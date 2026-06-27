export type FlatScreenPrintType =
  | "manual_table"
  | "semi_auto_carousel"
  | "automatic_flatbed"
  | "walk_in_large_format"
  | "precision_textile";

interface FlatScreenPrintData {
  printDetail: number;
  throughput: number;
  colorLayers: number;
  registrationAccuracy: number;
  fspCost: number;
  automated: boolean;
  forLargeRepeat: boolean;
  tableConfig: string;
  bestUse: string;
}

const DATA: Record<FlatScreenPrintType, FlatScreenPrintData> = {
  manual_table: {
    printDetail: 7, throughput: 3, colorLayers: 6, registrationAccuracy: 5, fspCost: 2,
    automated: false, forLargeRepeat: true,
    tableConfig: "manual_screen_hinge_clamp_hand_squeegee_table_print_station",
    bestUse: "artisan_small_batch_hand_print_craft_studio_custom_design",
  },
  semi_auto_carousel: {
    printDetail: 8, throughput: 6, colorLayers: 8, registrationAccuracy: 7, fspCost: 5,
    automated: false, forLargeRepeat: false,
    tableConfig: "carousel_multi_station_semi_auto_platen_rotate_index_print",
    bestUse: "garment_tshirt_screen_print_multi_color_apparel_decoration",
  },
  automatic_flatbed: {
    printDetail: 9, throughput: 8, colorLayers: 10, registrationAccuracy: 9, fspCost: 8,
    automated: true, forLargeRepeat: true,
    tableConfig: "auto_flatbed_conveyor_screen_lower_squeeze_lift_index_repeat",
    bestUse: "high_quality_textile_print_large_repeat_curtain_upholstery",
  },
  walk_in_large_format: {
    printDetail: 8, throughput: 5, colorLayers: 6, registrationAccuracy: 6, fspCost: 6,
    automated: false, forLargeRepeat: true,
    tableConfig: "large_format_walk_in_frame_oversize_screen_banner_panel_print",
    bestUse: "large_format_banner_flag_panel_oversize_screen_print_display",
  },
  precision_textile: {
    printDetail: 10, throughput: 9, colorLayers: 10, registrationAccuracy: 10, fspCost: 10,
    automated: true, forLargeRepeat: true,
    tableConfig: "precision_rail_guide_auto_register_camera_vision_fine_textile",
    bestUse: "premium_silk_scarf_high_fashion_precise_register_fine_detail",
  },
};

function get(t: FlatScreenPrintType): FlatScreenPrintData {
  return DATA[t];
}

export const printDetail = (t: FlatScreenPrintType) => get(t).printDetail;
export const throughput = (t: FlatScreenPrintType) => get(t).throughput;
export const colorLayers = (t: FlatScreenPrintType) => get(t).colorLayers;
export const registrationAccuracy = (t: FlatScreenPrintType) => get(t).registrationAccuracy;
export const fspCost = (t: FlatScreenPrintType) => get(t).fspCost;
export const automated = (t: FlatScreenPrintType) => get(t).automated;
export const forLargeRepeat = (t: FlatScreenPrintType) => get(t).forLargeRepeat;
export const tableConfig = (t: FlatScreenPrintType) => get(t).tableConfig;
export const bestUse = (t: FlatScreenPrintType) => get(t).bestUse;
export const flatScreenPrintTypes = (): FlatScreenPrintType[] =>
  Object.keys(DATA) as FlatScreenPrintType[];

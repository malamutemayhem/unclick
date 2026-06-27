export type ScreenPrinterType =
  | "flatbed_manual"
  | "flatbed_auto"
  | "cylinder_rotary"
  | "carousel_textile"
  | "smt_stencil";

interface ScreenPrinterData {
  printPrecision: number;
  throughput: number;
  inkDeposit: number;
  setupSpeed: number;
  spCost: number;
  automated: boolean;
  forTextile: boolean;
  printerConfig: string;
  bestUse: string;
}

const DATA: Record<ScreenPrinterType, ScreenPrinterData> = {
  flatbed_manual: {
    printPrecision: 6, throughput: 3, inkDeposit: 8, setupSpeed: 9, spCost: 2,
    automated: false, forTextile: true,
    printerConfig: "flatbed_manual_screen_printer_hinge_clamp_squeegee_hand_pull",
    bestUse: "art_studio_flatbed_manual_screen_printer_poster_small_batch",
  },
  flatbed_auto: {
    printPrecision: 8, throughput: 7, inkDeposit: 9, setupSpeed: 7, spCost: 7,
    automated: true, forTextile: false,
    printerConfig: "flatbed_auto_screen_printer_servo_squeegee_vacuum_table_precise",
    bestUse: "industrial_flatbed_auto_screen_printer_signage_decal_circuit",
  },
  cylinder_rotary: {
    printPrecision: 8, throughput: 10, inkDeposit: 7, setupSpeed: 5, spCost: 9,
    automated: true, forTextile: false,
    printerConfig: "cylinder_rotary_screen_printer_nickel_screen_continuous_web",
    bestUse: "wallpaper_fabric_cylinder_rotary_screen_continuous_web_print",
  },
  carousel_textile: {
    printPrecision: 7, throughput: 8, inkDeposit: 9, setupSpeed: 6, spCost: 6,
    automated: true, forTextile: true,
    printerConfig: "carousel_textile_screen_printer_multi_station_rotate_index",
    bestUse: "garment_shop_carousel_screen_printer_multi_color_t_shirt",
  },
  smt_stencil: {
    printPrecision: 10, throughput: 9, inkDeposit: 10, setupSpeed: 7, spCost: 10,
    automated: true, forTextile: false,
    printerConfig: "smt_stencil_screen_printer_vision_align_solder_paste_pcb_pad",
    bestUse: "electronics_smt_stencil_printer_solder_paste_pcb_assembly",
  },
};

function get(t: ScreenPrinterType): ScreenPrinterData {
  return DATA[t];
}

export const printPrecision = (t: ScreenPrinterType) => get(t).printPrecision;
export const throughput = (t: ScreenPrinterType) => get(t).throughput;
export const inkDeposit = (t: ScreenPrinterType) => get(t).inkDeposit;
export const setupSpeed = (t: ScreenPrinterType) => get(t).setupSpeed;
export const spCost = (t: ScreenPrinterType) => get(t).spCost;
export const automated = (t: ScreenPrinterType) => get(t).automated;
export const forTextile = (t: ScreenPrinterType) => get(t).forTextile;
export const printerConfig = (t: ScreenPrinterType) => get(t).printerConfig;
export const bestUse = (t: ScreenPrinterType) => get(t).bestUse;
export const screenPrinterTypes = (): ScreenPrinterType[] =>
  Object.keys(DATA) as ScreenPrinterType[];

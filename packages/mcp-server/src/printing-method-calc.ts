export type PrintingMethodType =
  | "screen_print_rotary"
  | "digital_inkjet_dtg"
  | "sublimation_transfer"
  | "block_print_hand"
  | "discharge_print_bleach";

const DATA: Record<PrintingMethodType, {
  detail: number; speed: number; colorRange: number;
  handfeel: number; pmCost: number; digital: boolean;
  forSmallRun: boolean; application: string; bestUse: string;
}> = {
  screen_print_rotary: {
    detail: 7, speed: 10, colorRange: 7,
    handfeel: 6, pmCost: 2, digital: false,
    forSmallRun: false, application: "rotary_screen_paste_squeegee",
    bestUse: "high_volume_apparel_furnishing",
  },
  digital_inkjet_dtg: {
    detail: 10, speed: 4, colorRange: 10,
    handfeel: 9, pmCost: 4, digital: true,
    forSmallRun: true, application: "piezo_drop_on_demand_ink",
    bestUse: "custom_tshirt_photo_quality",
  },
  sublimation_transfer: {
    detail: 9, speed: 7, colorRange: 9,
    handfeel: 10, pmCost: 3, digital: true,
    forSmallRun: true, application: "heat_transfer_dye_gas_phase",
    bestUse: "sportswear_polyester_all_over",
  },
  block_print_hand: {
    detail: 5, speed: 1, colorRange: 4,
    handfeel: 8, pmCost: 5, digital: false,
    forSmallRun: true, application: "carved_block_hand_stamp",
    bestUse: "artisan_heritage_cotton_fabric",
  },
  discharge_print_bleach: {
    detail: 6, speed: 6, colorRange: 3,
    handfeel: 9, pmCost: 3, digital: false,
    forSmallRun: false, application: "chemical_dye_removal_recolor",
    bestUse: "soft_hand_dark_ground_tshirt",
  },
};

const get = (t: PrintingMethodType) => DATA[t];

export const detail = (t: PrintingMethodType) => get(t).detail;
export const speed = (t: PrintingMethodType) => get(t).speed;
export const colorRange = (t: PrintingMethodType) => get(t).colorRange;
export const handfeel = (t: PrintingMethodType) => get(t).handfeel;
export const pmCost = (t: PrintingMethodType) => get(t).pmCost;
export const digital = (t: PrintingMethodType) => get(t).digital;
export const forSmallRun = (t: PrintingMethodType) => get(t).forSmallRun;
export const application = (t: PrintingMethodType) => get(t).application;
export const bestUse = (t: PrintingMethodType) => get(t).bestUse;
export const printingMethodTypes = (): PrintingMethodType[] => Object.keys(DATA) as PrintingMethodType[];

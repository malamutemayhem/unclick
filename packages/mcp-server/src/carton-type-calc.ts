export type CartonType =
  | "rsc_regular_slotted"
  | "fol_full_overlap"
  | "die_cut_custom"
  | "telescope_two_piece"
  | "wraparound_blanket";

const DATA: Record<CartonType, {
  strength: number; protection: number; packSpeed: number;
  printability: number; ctCost: number; onepiece: boolean;
  forHeavy: boolean; closure: string; bestUse: string;
}> = {
  rsc_regular_slotted: {
    strength: 7, protection: 7, packSpeed: 9,
    printability: 6, ctCost: 1, onepiece: true,
    forHeavy: false, closure: "flap_tape_or_staple",
    bestUse: "general_shipping_warehouse_pick",
  },
  fol_full_overlap: {
    strength: 9, protection: 9, packSpeed: 6,
    printability: 5, ctCost: 3, onepiece: true,
    forHeavy: true, closure: "full_overlap_bottom_flap",
    bestUse: "heavy_canned_goods_hardware",
  },
  die_cut_custom: {
    strength: 6, protection: 8, packSpeed: 7,
    printability: 10, ctCost: 4, onepiece: true,
    forHeavy: false, closure: "tuck_end_auto_lock_tab",
    bestUse: "retail_display_ready_cosmetics",
  },
  telescope_two_piece: {
    strength: 8, protection: 9, packSpeed: 5,
    printability: 7, ctCost: 3, onepiece: false,
    forHeavy: true, closure: "lid_slides_over_base",
    bestUse: "appliance_furniture_two_piece",
  },
  wraparound_blanket: {
    strength: 6, protection: 6, packSpeed: 10,
    printability: 8, ctCost: 2, onepiece: true,
    forHeavy: false, closure: "wrap_glue_around_product",
    bestUse: "book_media_tray_pack_line",
  },
};

const get = (t: CartonType) => DATA[t];

export const strength = (t: CartonType) => get(t).strength;
export const protection = (t: CartonType) => get(t).protection;
export const packSpeed = (t: CartonType) => get(t).packSpeed;
export const printability = (t: CartonType) => get(t).printability;
export const ctCost = (t: CartonType) => get(t).ctCost;
export const onepiece = (t: CartonType) => get(t).onepiece;
export const forHeavy = (t: CartonType) => get(t).forHeavy;
export const closure = (t: CartonType) => get(t).closure;
export const bestUse = (t: CartonType) => get(t).bestUse;
export const cartonTypes = (): CartonType[] => Object.keys(DATA) as CartonType[];

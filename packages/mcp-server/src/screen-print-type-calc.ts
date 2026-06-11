export type ScreenPrintType =
  | "flatbed_manual_clamp"
  | "flatbed_automatic_cylinder"
  | "rotary_screen_continuous"
  | "pad_transfer_indirect"
  | "stencil_solder_paste_smt";

interface ScreenPrintData {
  speed: number;
  inkDeposit: number;
  detail: number;
  versatility: number;
  spCost: number;
  rotary: boolean;
  forTextile: boolean;
  mesh: string;
  bestUse: string;
}

const DATA: Record<ScreenPrintType, ScreenPrintData> = {
  flatbed_manual_clamp: {
    speed: 3, inkDeposit: 8, detail: 6, versatility: 9, spCost: 2,
    rotary: false, forTextile: true,
    mesh: "polyester_mesh_photo_emulsion",
    bestUse: "short_run_tshirt_poster_art",
  },
  flatbed_automatic_cylinder: {
    speed: 7, inkDeposit: 8, detail: 7, versatility: 8, spCost: 6,
    rotary: false, forTextile: true,
    mesh: "polyester_mesh_auto_flood_stroke",
    bestUse: "medium_run_apparel_signage",
  },
  rotary_screen_continuous: {
    speed: 10, inkDeposit: 7, detail: 6, versatility: 4, spCost: 8,
    rotary: true, forTextile: true,
    mesh: "nickel_cylinder_laser_engrave",
    bestUse: "high_volume_textile_wallpaper_roll",
  },
  pad_transfer_indirect: {
    speed: 8, inkDeposit: 4, detail: 9, versatility: 7, spCost: 5,
    rotary: false, forTextile: false,
    mesh: "etched_cliche_silicone_pad",
    bestUse: "curved_object_bottle_cap_pen",
  },
  stencil_solder_paste_smt: {
    speed: 6, inkDeposit: 9, detail: 8, versatility: 2, spCost: 7,
    rotary: false, forTextile: false,
    mesh: "laser_cut_stainless_stencil",
    bestUse: "pcb_solder_paste_smt_assembly",
  },
};

function get(t: ScreenPrintType): ScreenPrintData {
  return DATA[t];
}

export const speed = (t: ScreenPrintType) => get(t).speed;
export const inkDeposit = (t: ScreenPrintType) => get(t).inkDeposit;
export const detail = (t: ScreenPrintType) => get(t).detail;
export const versatility = (t: ScreenPrintType) => get(t).versatility;
export const spCost = (t: ScreenPrintType) => get(t).spCost;
export const rotary = (t: ScreenPrintType) => get(t).rotary;
export const forTextile = (t: ScreenPrintType) => get(t).forTextile;
export const mesh = (t: ScreenPrintType) => get(t).mesh;
export const bestUse = (t: ScreenPrintType) => get(t).bestUse;
export const screenPrintTypes = (): ScreenPrintType[] =>
  Object.keys(DATA) as ScreenPrintType[];

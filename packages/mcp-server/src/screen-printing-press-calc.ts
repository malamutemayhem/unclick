export type ScreenPrintingPressType =
  | "flatbed"
  | "cylinder"
  | "rotary"
  | "carousel_textile"
  | "inline_industrial";

interface ScreenPrintingPressData {
  speed: number;
  inkDeposit: number;
  versatility: number;
  registration: number;
  spCost: number;
  multiColor: boolean;
  forTextile: boolean;
  mesh: string;
  bestUse: string;
}

const DATA: Record<ScreenPrintingPressType, ScreenPrintingPressData> = {
  flatbed: {
    speed: 4, inkDeposit: 10, versatility: 9, registration: 7, spCost: 4,
    multiColor: false, forTextile: false,
    mesh: "tensioned_polyester_mesh_frame_flat_vacuum_bed_squeegee",
    bestUse: "signage_poster_circuit_board_thick_substrate_decal",
  },
  cylinder: {
    speed: 7, inkDeposit: 8, versatility: 7, registration: 8, spCost: 6,
    multiColor: true, forTextile: false,
    mesh: "flat_screen_over_impression_cylinder_semi_rotary_feed",
    bestUse: "corrugated_carton_rigid_board_point_of_sale_display",
  },
  rotary: {
    speed: 9, inkDeposit: 7, versatility: 6, registration: 9, spCost: 8,
    multiColor: true, forTextile: false,
    mesh: "nickel_rotary_screen_continuous_web_inline_stations",
    bestUse: "wallpaper_textile_roll_label_continuous_pattern_repeat",
  },
  carousel_textile: {
    speed: 6, inkDeposit: 9, versatility: 8, registration: 8, spCost: 5,
    multiColor: true, forTextile: true,
    mesh: "multi_station_carousel_pallet_index_flash_cure_between",
    bestUse: "t_shirt_garment_apparel_spot_color_plastisol_ink",
  },
  inline_industrial: {
    speed: 10, inkDeposit: 7, versatility: 5, registration: 9, spCost: 9,
    multiColor: true, forTextile: false,
    mesh: "servo_driven_inline_screen_uv_cure_high_speed_web",
    bestUse: "container_bottle_tube_cylindrical_object_uv_ink_cure",
  },
};

function get(t: ScreenPrintingPressType): ScreenPrintingPressData {
  return DATA[t];
}

export const speed = (t: ScreenPrintingPressType) => get(t).speed;
export const inkDeposit = (t: ScreenPrintingPressType) => get(t).inkDeposit;
export const versatility = (t: ScreenPrintingPressType) => get(t).versatility;
export const registration = (t: ScreenPrintingPressType) => get(t).registration;
export const spCost = (t: ScreenPrintingPressType) => get(t).spCost;
export const multiColor = (t: ScreenPrintingPressType) => get(t).multiColor;
export const forTextile = (t: ScreenPrintingPressType) => get(t).forTextile;
export const mesh = (t: ScreenPrintingPressType) => get(t).mesh;
export const bestUse = (t: ScreenPrintingPressType) => get(t).bestUse;
export const screenPrintingPressTypes = (): ScreenPrintingPressType[] =>
  Object.keys(DATA) as ScreenPrintingPressType[];

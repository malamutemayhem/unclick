export type WayfindingType =
  | "static_printed_sign"
  | "illuminated_directory_board"
  | "digital_interactive_kiosk"
  | "mobile_ar_navigation"
  | "tactile_braille_ada";

interface WayfindingData {
  clarity: number;
  flexibility: number;
  accessibility: number;
  engagement: number;
  wfCost: number;
  digital: boolean;
  forAda: boolean;
  medium: string;
  bestUse: string;
}

const DATA: Record<WayfindingType, WayfindingData> = {
  static_printed_sign: {
    clarity: 7, flexibility: 3, accessibility: 5, engagement: 4, wfCost: 2,
    digital: false, forAda: false,
    medium: "vinyl_acrylic_panel_mounted",
    bestUse: "small_office_building_lobby",
  },
  illuminated_directory_board: {
    clarity: 8, flexibility: 5, accessibility: 6, engagement: 5, wfCost: 5,
    digital: false, forAda: false,
    medium: "backlit_led_tenant_directory",
    bestUse: "multi_tenant_office_lobby",
  },
  digital_interactive_kiosk: {
    clarity: 9, flexibility: 10, accessibility: 8, engagement: 9, wfCost: 8,
    digital: true, forAda: true,
    medium: "touchscreen_cms_real_time_map",
    bestUse: "hospital_campus_large_venue",
  },
  mobile_ar_navigation: {
    clarity: 8, flexibility: 10, accessibility: 7, engagement: 10, wfCost: 9,
    digital: true, forAda: false,
    medium: "smartphone_ar_overlay_beacon",
    bestUse: "airport_convention_center_campus",
  },
  tactile_braille_ada: {
    clarity: 6, flexibility: 2, accessibility: 10, engagement: 3, wfCost: 4,
    digital: false, forAda: true,
    medium: "raised_letter_braille_tactile_map",
    bestUse: "code_required_ada_egress_route",
  },
};

function get(t: WayfindingType): WayfindingData {
  return DATA[t];
}

export const clarity = (t: WayfindingType) => get(t).clarity;
export const flexibility = (t: WayfindingType) => get(t).flexibility;
export const accessibility = (t: WayfindingType) => get(t).accessibility;
export const engagement = (t: WayfindingType) => get(t).engagement;
export const wfCost = (t: WayfindingType) => get(t).wfCost;
export const digital = (t: WayfindingType) => get(t).digital;
export const forAda = (t: WayfindingType) => get(t).forAda;
export const medium = (t: WayfindingType) => get(t).medium;
export const bestUse = (t: WayfindingType) => get(t).bestUse;
export const wayfindingTypes = (): WayfindingType[] =>
  Object.keys(DATA) as WayfindingType[];

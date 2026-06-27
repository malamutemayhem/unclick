export type DigitalSignageType =
  | "indoor_commercial_display"
  | "outdoor_high_bright"
  | "interactive_touch_kiosk"
  | "menu_board_qsr"
  | "transparent_oled_showcase";

interface DigitalSignageData {
  brightness: number;
  durability: number;
  interactivity: number;
  content: number;
  dgCost: number;
  touchEnabled: boolean;
  forOutdoor: boolean;
  panel: string;
  bestUse: string;
}

const DATA: Record<DigitalSignageType, DigitalSignageData> = {
  indoor_commercial_display: {
    brightness: 6, durability: 7, interactivity: 3, content: 8, dgCost: 4,
    touchEnabled: false, forOutdoor: false,
    panel: "ips_lcd_43_55in_500nit_247",
    bestUse: "retail_lobby_wayfinding_info",
  },
  outdoor_high_bright: {
    brightness: 10, durability: 10, interactivity: 3, content: 7, dgCost: 8,
    touchEnabled: false, forOutdoor: true,
    panel: "lcd_ip65_2500nit_anti_glare",
    bestUse: "bus_shelter_storefront_window",
  },
  interactive_touch_kiosk: {
    brightness: 7, durability: 8, interactivity: 10, content: 9, dgCost: 7,
    touchEnabled: true, forOutdoor: false,
    panel: "pcap_touch_43in_tempered_glass",
    bestUse: "museum_directory_self_service",
  },
  menu_board_qsr: {
    brightness: 7, durability: 8, interactivity: 4, content: 10, dgCost: 5,
    touchEnabled: false, forOutdoor: false,
    panel: "commercial_lcd_49in_portrait",
    bestUse: "fast_food_drive_thru_menu",
  },
  transparent_oled_showcase: {
    brightness: 5, durability: 6, interactivity: 6, content: 8, dgCost: 10,
    touchEnabled: false, forOutdoor: false,
    panel: "transparent_oled_55in_38pct",
    bestUse: "luxury_retail_product_showcase",
  },
};

function get(t: DigitalSignageType): DigitalSignageData {
  return DATA[t];
}

export const brightness = (t: DigitalSignageType) => get(t).brightness;
export const durability = (t: DigitalSignageType) => get(t).durability;
export const interactivity = (t: DigitalSignageType) => get(t).interactivity;
export const content = (t: DigitalSignageType) => get(t).content;
export const dgCost = (t: DigitalSignageType) => get(t).dgCost;
export const touchEnabled = (t: DigitalSignageType) => get(t).touchEnabled;
export const forOutdoor = (t: DigitalSignageType) => get(t).forOutdoor;
export const panel = (t: DigitalSignageType) => get(t).panel;
export const bestUse = (t: DigitalSignageType) => get(t).bestUse;
export const digitalSignageTypes = (): DigitalSignageType[] =>
  Object.keys(DATA) as DigitalSignageType[];

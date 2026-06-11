export type DisplayPanel =
  | "ips_lcd"
  | "amoled_ltpo"
  | "microled_direct"
  | "eink_epaper"
  | "miniled_backlit";

const DATA: Record<DisplayPanel, {
  brightness: number; contrast: number; colorGamut: number;
  responseTime: number; panelCost: number; selfEmissive: boolean;
  forOutdoor: boolean; technology: string; bestUse: string;
}> = {
  ips_lcd: {
    brightness: 6, contrast: 5, colorGamut: 6,
    responseTime: 5, panelCost: 3, selfEmissive: false,
    forOutdoor: false, technology: "in_plane_switching",
    bestUse: "office_monitor_27in",
  },
  amoled_ltpo: {
    brightness: 8, contrast: 10, colorGamut: 9,
    responseTime: 10, panelCost: 7, selfEmissive: true,
    forOutdoor: false, technology: "organic_led_ltpo_vrr",
    bestUse: "flagship_phone_screen",
  },
  microled_direct: {
    brightness: 10, contrast: 10, colorGamut: 10,
    responseTime: 10, panelCost: 10, selfEmissive: true,
    forOutdoor: true, technology: "inorganic_led_chip",
    bestUse: "large_format_signage",
  },
  eink_epaper: {
    brightness: 3, contrast: 6, colorGamut: 2,
    responseTime: 1, panelCost: 5, selfEmissive: false,
    forOutdoor: true, technology: "electrophoretic_bw",
    bestUse: "ebook_reader_shelf",
  },
  miniled_backlit: {
    brightness: 9, contrast: 8, colorGamut: 8,
    responseTime: 6, panelCost: 6, selfEmissive: false,
    forOutdoor: false, technology: "local_dimming_zone",
    bestUse: "creator_hdr_display",
  },
};

const get = (t: DisplayPanel) => DATA[t];

export const brightness = (t: DisplayPanel) => get(t).brightness;
export const contrast = (t: DisplayPanel) => get(t).contrast;
export const colorGamut = (t: DisplayPanel) => get(t).colorGamut;
export const responseTime = (t: DisplayPanel) => get(t).responseTime;
export const panelCost = (t: DisplayPanel) => get(t).panelCost;
export const selfEmissive = (t: DisplayPanel) => get(t).selfEmissive;
export const forOutdoor = (t: DisplayPanel) => get(t).forOutdoor;
export const technology = (t: DisplayPanel) => get(t).technology;
export const bestUse = (t: DisplayPanel) => get(t).bestUse;
export const displayPanels = (): DisplayPanel[] => Object.keys(DATA) as DisplayPanel[];

export type EpaperType =
  | "eink_electrophoretic"
  | "cholesteric_lcd_bist"
  | "electrowetting_color"
  | "electrochromic_film"
  | "interferometric_imod";

const DATA: Record<EpaperType, {
  contrast: number; refreshRate: number; colorDepth: number;
  powerHold: number; epCost: number; bistable: boolean;
  forSignage: boolean; mechanism: string; bestUse: string;
}> = {
  eink_electrophoretic: {
    contrast: 9, refreshRate: 3, colorDepth: 4,
    powerHold: 10, epCost: 4, bistable: true,
    forSignage: true, mechanism: "charged_pigment_microcapsule",
    bestUse: "ereader_book_long_battery",
  },
  cholesteric_lcd_bist: {
    contrast: 7, refreshRate: 5, colorDepth: 5,
    powerHold: 9, epCost: 5, bistable: true,
    forSignage: true, mechanism: "helical_pitch_bragg_reflect",
    bestUse: "shelf_label_full_color_retail",
  },
  electrowetting_color: {
    contrast: 8, refreshRate: 8, colorDepth: 8,
    powerHold: 6, epCost: 7, bistable: false,
    forSignage: false, mechanism: "oil_water_contact_angle_shift",
    bestUse: "video_capable_outdoor_display",
  },
  electrochromic_film: {
    contrast: 5, refreshRate: 2, colorDepth: 3,
    powerHold: 8, epCost: 3, bistable: true,
    forSignage: true, mechanism: "ion_intercalation_color_change",
    bestUse: "smart_window_tint_control",
  },
  interferometric_imod: {
    contrast: 6, refreshRate: 7, colorDepth: 7,
    powerHold: 7, epCost: 8, bistable: true,
    forSignage: false, mechanism: "fabry_perot_mems_cavity",
    bestUse: "sunlight_readable_wearable",
  },
};

const get = (t: EpaperType) => DATA[t];

export const contrast = (t: EpaperType) => get(t).contrast;
export const refreshRate = (t: EpaperType) => get(t).refreshRate;
export const colorDepth = (t: EpaperType) => get(t).colorDepth;
export const powerHold = (t: EpaperType) => get(t).powerHold;
export const epCost = (t: EpaperType) => get(t).epCost;
export const bistable = (t: EpaperType) => get(t).bistable;
export const forSignage = (t: EpaperType) => get(t).forSignage;
export const mechanism = (t: EpaperType) => get(t).mechanism;
export const bestUse = (t: EpaperType) => get(t).bestUse;
export const epaperTypes = (): EpaperType[] => Object.keys(DATA) as EpaperType[];

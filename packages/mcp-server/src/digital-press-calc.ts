export type DigitalPressType =
  | "electrophotographic_toner"
  | "production_inkjet_web"
  | "uv_flatbed_wide_format"
  | "nano_graphic_led_offset"
  | "indigo_liquid_electro_ink";

interface DigitalPressData {
  speed: number;
  quality: number;
  variableData: number;
  mediaRange: number;
  dpCost: number;
  inkBased: boolean;
  forShortRun: boolean;
  imaging: string;
  bestUse: string;
}

const DATA: Record<DigitalPressType, DigitalPressData> = {
  electrophotographic_toner: {
    speed: 7, quality: 8, variableData: 10, mediaRange: 7, dpCost: 6,
    inkBased: false, forShortRun: true,
    imaging: "laser_photoconductor_toner_fuse",
    bestUse: "office_document_book_on_demand",
  },
  production_inkjet_web: {
    speed: 10, quality: 7, variableData: 10, mediaRange: 6, dpCost: 8,
    inkBased: true, forShortRun: false,
    imaging: "piezo_drop_high_speed_web",
    bestUse: "transactional_direct_mail_newspaper",
  },
  uv_flatbed_wide_format: {
    speed: 5, quality: 8, variableData: 9, mediaRange: 10, dpCost: 7,
    inkBased: true, forShortRun: true,
    imaging: "piezo_uv_cure_flatbed_rigid",
    bestUse: "signage_display_rigid_substrate",
  },
  nano_graphic_led_offset: {
    speed: 9, quality: 9, variableData: 8, mediaRange: 8, dpCost: 9,
    inkBased: true, forShortRun: false,
    imaging: "nano_ink_blanket_led_dry",
    bestUse: "offset_quality_digital_packaging",
  },
  indigo_liquid_electro_ink: {
    speed: 6, quality: 10, variableData: 10, mediaRange: 8, dpCost: 8,
    inkBased: true, forShortRun: true,
    imaging: "liquid_electro_ink_offset_blanket",
    bestUse: "photo_book_label_packaging_premium",
  },
};

function get(t: DigitalPressType): DigitalPressData {
  return DATA[t];
}

export const speed = (t: DigitalPressType) => get(t).speed;
export const quality = (t: DigitalPressType) => get(t).quality;
export const variableData = (t: DigitalPressType) => get(t).variableData;
export const mediaRange = (t: DigitalPressType) => get(t).mediaRange;
export const dpCost = (t: DigitalPressType) => get(t).dpCost;
export const inkBased = (t: DigitalPressType) => get(t).inkBased;
export const forShortRun = (t: DigitalPressType) => get(t).forShortRun;
export const imaging = (t: DigitalPressType) => get(t).imaging;
export const bestUse = (t: DigitalPressType) => get(t).bestUse;
export const digitalPressTypes = (): DigitalPressType[] =>
  Object.keys(DATA) as DigitalPressType[];

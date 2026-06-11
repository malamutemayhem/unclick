export type FlexographicPrintType =
  | "ci_central_impression"
  | "stack_type_vertical"
  | "inline_horizontal_web"
  | "sleeve_seamless_cylinder"
  | "uv_flexo_energy_cure";

interface FlexoData {
  speed: number;
  quality: number;
  versatility: number;
  registration: number;
  fpCost: number;
  rotary: boolean;
  forPackaging: boolean;
  plate: string;
  bestUse: string;
}

const DATA: Record<FlexographicPrintType, FlexoData> = {
  ci_central_impression: {
    speed: 9, quality: 8, versatility: 7, registration: 9, fpCost: 8,
    rotary: true, forPackaging: true,
    plate: "photopolymer_flexible_relief",
    bestUse: "film_packaging_multicolor_register",
  },
  stack_type_vertical: {
    speed: 7, quality: 6, versatility: 8, registration: 6, fpCost: 5,
    rotary: true, forPackaging: true,
    plate: "photopolymer_sheet_mounted",
    bestUse: "paper_bag_corrugated_simple",
  },
  inline_horizontal_web: {
    speed: 8, quality: 7, versatility: 9, registration: 7, fpCost: 7,
    rotary: true, forPackaging: false,
    plate: "photopolymer_digital_direct",
    bestUse: "label_tag_inline_converting",
  },
  sleeve_seamless_cylinder: {
    speed: 9, quality: 9, versatility: 5, registration: 9, fpCost: 9,
    rotary: true, forPackaging: true,
    plate: "seamless_sleeve_laser_engrave",
    bestUse: "continuous_pattern_wallpaper_wrap",
  },
  uv_flexo_energy_cure: {
    speed: 7, quality: 9, versatility: 6, registration: 8, fpCost: 7,
    rotary: true, forPackaging: true,
    plate: "photopolymer_uv_optimized",
    bestUse: "shrink_sleeve_metallic_film",
  },
};

function get(t: FlexographicPrintType): FlexoData {
  return DATA[t];
}

export const speed = (t: FlexographicPrintType) => get(t).speed;
export const quality = (t: FlexographicPrintType) => get(t).quality;
export const versatility = (t: FlexographicPrintType) => get(t).versatility;
export const registration = (t: FlexographicPrintType) => get(t).registration;
export const fpCost = (t: FlexographicPrintType) => get(t).fpCost;
export const rotary = (t: FlexographicPrintType) => get(t).rotary;
export const forPackaging = (t: FlexographicPrintType) => get(t).forPackaging;
export const plate = (t: FlexographicPrintType) => get(t).plate;
export const bestUse = (t: FlexographicPrintType) => get(t).bestUse;
export const flexographicPrintTypes = (): FlexographicPrintType[] =>
  Object.keys(DATA) as FlexographicPrintType[];

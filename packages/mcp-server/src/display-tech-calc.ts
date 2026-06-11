export type DisplayTech =
  | "ips_lcd"
  | "va_lcd"
  | "amoled_ltpo"
  | "microled_direct"
  | "eink_electrophoretic";

const DATA: Record<DisplayTech, {
  contrast: number; brightness: number; responseTime: number;
  colorAccuracy: number; dispCost: number; selfEmissive: boolean;
  forHdr: boolean; backlight: string; bestUse: string;
}> = {
  ips_lcd: {
    contrast: 5, brightness: 8, responseTime: 6,
    colorAccuracy: 9, dispCost: 3, selfEmissive: false,
    forHdr: false, backlight: "edge_lit_led",
    bestUse: "professional_color_grading",
  },
  va_lcd: {
    contrast: 7, brightness: 7, responseTime: 5,
    colorAccuracy: 7, dispCost: 2, selfEmissive: false,
    forHdr: false, backlight: "direct_lit_local_dimming",
    bestUse: "high_contrast_cinema",
  },
  amoled_ltpo: {
    contrast: 10, brightness: 9, responseTime: 10,
    colorAccuracy: 8, dispCost: 7, selfEmissive: true,
    forHdr: true, backlight: "none_self_emissive",
    bestUse: "smartphone_flagship",
  },
  microled_direct: {
    contrast: 10, brightness: 10, responseTime: 10,
    colorAccuracy: 9, dispCost: 10, selfEmissive: true,
    forHdr: true, backlight: "none_inorganic_led",
    bestUse: "large_format_signage",
  },
  eink_electrophoretic: {
    contrast: 6, brightness: 3, responseTime: 2,
    colorAccuracy: 3, dispCost: 4, selfEmissive: false,
    forHdr: false, backlight: "reflective_ambient",
    bestUse: "ereader_low_power",
  },
};

const get = (t: DisplayTech) => DATA[t];

export const contrast = (t: DisplayTech) => get(t).contrast;
export const brightness = (t: DisplayTech) => get(t).brightness;
export const responseTime = (t: DisplayTech) => get(t).responseTime;
export const colorAccuracy = (t: DisplayTech) => get(t).colorAccuracy;
export const dispCost = (t: DisplayTech) => get(t).dispCost;
export const selfEmissive = (t: DisplayTech) => get(t).selfEmissive;
export const forHdr = (t: DisplayTech) => get(t).forHdr;
export const backlight = (t: DisplayTech) => get(t).backlight;
export const bestUse = (t: DisplayTech) => get(t).bestUse;
export const displayTechs = (): DisplayTech[] => Object.keys(DATA) as DisplayTech[];

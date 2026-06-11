export type OledType =
  | "pmoled_passive"
  | "amoled_rgb_stripe"
  | "amoled_pentile"
  | "woled_white_cf"
  | "qd_oled_quantum";

const DATA: Record<OledType, {
  lifetime: number; brightness: number; resolution: number;
  efficiency: number; oledCost: number; flexible: boolean;
  forTv: boolean; emitter: string; bestUse: string;
}> = {
  pmoled_passive: {
    lifetime: 5, brightness: 4, resolution: 3,
    efficiency: 6, oledCost: 2, flexible: true,
    forTv: false, emitter: "simple_organic_stripe",
    bestUse: "wearable_small_display",
  },
  amoled_rgb_stripe: {
    lifetime: 7, brightness: 8, resolution: 9,
    efficiency: 7, oledCost: 6, flexible: true,
    forTv: false, emitter: "fine_metal_mask_rgb",
    bestUse: "smartphone_high_ppi",
  },
  amoled_pentile: {
    lifetime: 8, brightness: 7, resolution: 7,
    efficiency: 8, oledCost: 5, flexible: true,
    forTv: false, emitter: "diamond_pixel_subpixel",
    bestUse: "vr_headset_panel",
  },
  woled_white_cf: {
    lifetime: 9, brightness: 9, resolution: 6,
    efficiency: 5, oledCost: 7, flexible: false,
    forTv: true, emitter: "white_tandem_color_filter",
    bestUse: "large_panel_tv",
  },
  qd_oled_quantum: {
    lifetime: 7, brightness: 10, resolution: 8,
    efficiency: 9, oledCost: 9, flexible: false,
    forTv: true, emitter: "blue_oled_qd_conversion",
    bestUse: "hdr_gaming_monitor",
  },
};

const get = (t: OledType) => DATA[t];

export const lifetime = (t: OledType) => get(t).lifetime;
export const brightness = (t: OledType) => get(t).brightness;
export const resolution = (t: OledType) => get(t).resolution;
export const efficiency = (t: OledType) => get(t).efficiency;
export const oledCost = (t: OledType) => get(t).oledCost;
export const flexible = (t: OledType) => get(t).flexible;
export const forTv = (t: OledType) => get(t).forTv;
export const emitter = (t: OledType) => get(t).emitter;
export const bestUse = (t: OledType) => get(t).bestUse;
export const oledTypes = (): OledType[] => Object.keys(DATA) as OledType[];

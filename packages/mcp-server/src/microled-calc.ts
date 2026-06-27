export type MicroLed =
  | "mass_transfer_stamp"
  | "monolithic_gan_on_si"
  | "color_convert_qd"
  | "vertical_nanorod"
  | "laser_lift_selective";

const DATA: Record<MicroLed, {
  brightness: number; pixelDensity: number; efficiency: number;
  yield_: number; mlCost: number; fullColor: boolean;
  forAr: boolean; process: string; bestUse: string;
}> = {
  mass_transfer_stamp: {
    brightness: 8, pixelDensity: 7, efficiency: 7,
    yield_: 6, mlCost: 6, fullColor: true,
    forAr: false, process: "elastomer_pdms_pick_place",
    bestUse: "large_format_direct_view_wall",
  },
  monolithic_gan_on_si: {
    brightness: 9, pixelDensity: 10, efficiency: 8,
    yield_: 5, mlCost: 8, fullColor: false,
    forAr: true, process: "cmos_backplane_gan_epitaxy",
    bestUse: "ar_glasses_near_eye_display",
  },
  color_convert_qd: {
    brightness: 7, pixelDensity: 9, efficiency: 6,
    yield_: 8, mlCost: 7, fullColor: true,
    forAr: true, process: "blue_led_qd_photoresist_layer",
    bestUse: "smartwatch_high_ppi_panel",
  },
  vertical_nanorod: {
    brightness: 10, pixelDensity: 8, efficiency: 9,
    yield_: 4, mlCost: 10, fullColor: true,
    forAr: true, process: "selective_area_growth_nanowire",
    bestUse: "next_gen_native_rgb_micro",
  },
  laser_lift_selective: {
    brightness: 8, pixelDensity: 6, efficiency: 7,
    yield_: 9, mlCost: 4, fullColor: true,
    forAr: false, process: "laser_release_sapphire_carrier",
    bestUse: "flexible_foldable_amoled_replace",
  },
};

const get = (t: MicroLed) => DATA[t];

export const brightness = (t: MicroLed) => get(t).brightness;
export const pixelDensity = (t: MicroLed) => get(t).pixelDensity;
export const efficiency = (t: MicroLed) => get(t).efficiency;
export const yield_ = (t: MicroLed) => get(t).yield_;
export const mlCost = (t: MicroLed) => get(t).mlCost;
export const fullColor = (t: MicroLed) => get(t).fullColor;
export const forAr = (t: MicroLed) => get(t).forAr;
export const process = (t: MicroLed) => get(t).process;
export const bestUse = (t: MicroLed) => get(t).bestUse;
export const microLeds = (): MicroLed[] => Object.keys(DATA) as MicroLed[];

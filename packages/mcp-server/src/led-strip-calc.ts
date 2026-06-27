export type LedStripType = "rgb_color_basic" | "rgbw_warm_white" | "cob_seamless" | "neon_flex_tube" | "addressable_pixel";

export function colorOptions(t: LedStripType): number {
  const m: Record<LedStripType, number> = {
    rgb_color_basic: 7, rgbw_warm_white: 8, cob_seamless: 4, neon_flex_tube: 5, addressable_pixel: 10,
  };
  return m[t];
}

export function brightnessEven(t: LedStripType): number {
  const m: Record<LedStripType, number> = {
    rgb_color_basic: 5, rgbw_warm_white: 7, cob_seamless: 10, neon_flex_tube: 9, addressable_pixel: 6,
  };
  return m[t];
}

export function installEase(t: LedStripType): number {
  const m: Record<LedStripType, number> = {
    rgb_color_basic: 9, rgbw_warm_white: 8, cob_seamless: 7, neon_flex_tube: 5, addressable_pixel: 6,
  };
  return m[t];
}

export function effectRange(t: LedStripType): number {
  const m: Record<LedStripType, number> = {
    rgb_color_basic: 5, rgbw_warm_white: 4, cob_seamless: 2, neon_flex_tube: 3, addressable_pixel: 10,
  };
  return m[t];
}

export function stripCost(t: LedStripType): number {
  const m: Record<LedStripType, number> = {
    rgb_color_basic: 2, rgbw_warm_white: 4, cob_seamless: 6, neon_flex_tube: 7, addressable_pixel: 8,
  };
  return m[t];
}

export function cuttable(t: LedStripType): boolean {
  const m: Record<LedStripType, boolean> = {
    rgb_color_basic: true, rgbw_warm_white: true, cob_seamless: true, neon_flex_tube: false, addressable_pixel: true,
  };
  return m[t];
}

export function waterproof(t: LedStripType): boolean {
  const m: Record<LedStripType, boolean> = {
    rgb_color_basic: false, rgbw_warm_white: false, cob_seamless: false, neon_flex_tube: true, addressable_pixel: false,
  };
  return m[t];
}

export function chipType(t: LedStripType): string {
  const m: Record<LedStripType, string> = {
    rgb_color_basic: "smd_5050_rgb_chip",
    rgbw_warm_white: "smd_5050_rgbw_four",
    cob_seamless: "chip_on_board_dense",
    neon_flex_tube: "smd_silicone_diffuse",
    addressable_pixel: "ws2812b_individual",
  };
  return m[t];
}

export function bestSetup(t: LedStripType): string {
  const m: Record<LedStripType, string> = {
    rgb_color_basic: "tv_backlight_accent",
    rgbw_warm_white: "kitchen_under_cabinet",
    cob_seamless: "cove_ceiling_no_dots",
    neon_flex_tube: "outdoor_sign_contour",
    addressable_pixel: "gaming_room_reactive",
  };
  return m[t];
}

export function ledStrips(): LedStripType[] {
  return ["rgb_color_basic", "rgbw_warm_white", "cob_seamless", "neon_flex_tube", "addressable_pixel"];
}

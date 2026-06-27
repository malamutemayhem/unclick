export type LicensePlateFrameType = "plastic_snap_basic" | "stainless_steel_chrome" | "carbon_fiber_premium" | "silicone_flex_protector" | "led_lighted_accent";

export function durability(t: LicensePlateFrameType): number {
  const m: Record<LicensePlateFrameType, number> = {
    plastic_snap_basic: 4, stainless_steel_chrome: 9, carbon_fiber_premium: 10, silicone_flex_protector: 7, led_lighted_accent: 6,
  };
  return m[t];
}

export function styleAppeal(t: LicensePlateFrameType): number {
  const m: Record<LicensePlateFrameType, number> = {
    plastic_snap_basic: 3, stainless_steel_chrome: 8, carbon_fiber_premium: 10, silicone_flex_protector: 4, led_lighted_accent: 7,
  };
  return m[t];
}

export function plateProtection(t: LicensePlateFrameType): number {
  const m: Record<LicensePlateFrameType, number> = {
    plastic_snap_basic: 5, stainless_steel_chrome: 7, carbon_fiber_premium: 8, silicone_flex_protector: 10, led_lighted_accent: 6,
  };
  return m[t];
}

export function installEase(t: LicensePlateFrameType): number {
  const m: Record<LicensePlateFrameType, number> = {
    plastic_snap_basic: 10, stainless_steel_chrome: 7, carbon_fiber_premium: 7, silicone_flex_protector: 9, led_lighted_accent: 4,
  };
  return m[t];
}

export function frameCost(t: LicensePlateFrameType): number {
  const m: Record<LicensePlateFrameType, number> = {
    plastic_snap_basic: 1, stainless_steel_chrome: 4, carbon_fiber_premium: 7, silicone_flex_protector: 2, led_lighted_accent: 5,
  };
  return m[t];
}

export function rustProof(t: LicensePlateFrameType): boolean {
  const m: Record<LicensePlateFrameType, boolean> = {
    plastic_snap_basic: true, stainless_steel_chrome: true, carbon_fiber_premium: true, silicone_flex_protector: true, led_lighted_accent: false,
  };
  return m[t];
}

export function hasLighting(t: LicensePlateFrameType): boolean {
  const m: Record<LicensePlateFrameType, boolean> = {
    plastic_snap_basic: false, stainless_steel_chrome: false, carbon_fiber_premium: false, silicone_flex_protector: false, led_lighted_accent: true,
  };
  return m[t];
}

export function frameMaterial(t: LicensePlateFrameType): string {
  const m: Record<LicensePlateFrameType, string> = {
    plastic_snap_basic: "abs_plastic_molded",
    stainless_steel_chrome: "stainless_304_polished",
    carbon_fiber_premium: "real_carbon_fiber_weave",
    silicone_flex_protector: "silicone_rubber_bumper",
    led_lighted_accent: "acrylic_led_strip_inset",
  };
  return m[t];
}

export function bestVehicle(t: LicensePlateFrameType): string {
  const m: Record<LicensePlateFrameType, string> = {
    plastic_snap_basic: "any_vehicle_budget",
    stainless_steel_chrome: "classic_sedan_truck",
    carbon_fiber_premium: "sports_car_luxury",
    silicone_flex_protector: "bumper_scratch_prevent",
    led_lighted_accent: "show_car_custom_build",
  };
  return m[t];
}

export function licensePlateFrames(): LicensePlateFrameType[] {
  return ["plastic_snap_basic", "stainless_steel_chrome", "carbon_fiber_premium", "silicone_flex_protector", "led_lighted_accent"];
}

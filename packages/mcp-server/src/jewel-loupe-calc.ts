export type JewelLoupeType = "triplet_10x_standard" | "doublet_20x_detail" | "handheld_led_light" | "headband_binocular_free" | "digital_usb_screen";

export function magnification(t: JewelLoupeType): number {
  const m: Record<JewelLoupeType, number> = {
    triplet_10x_standard: 6, doublet_20x_detail: 9, handheld_led_light: 7, headband_binocular_free: 5, digital_usb_screen: 10,
  };
  return m[t];
}

export function opticalClarity(t: JewelLoupeType): number {
  const m: Record<JewelLoupeType, number> = {
    triplet_10x_standard: 10, doublet_20x_detail: 7, handheld_led_light: 6, headband_binocular_free: 8, digital_usb_screen: 5,
  };
  return m[t];
}

export function fieldOfView(t: JewelLoupeType): number {
  const m: Record<JewelLoupeType, number> = {
    triplet_10x_standard: 8, doublet_20x_detail: 5, handheld_led_light: 7, headband_binocular_free: 9, digital_usb_screen: 6,
  };
  return m[t];
}

export function handsFree(t: JewelLoupeType): number {
  const m: Record<JewelLoupeType, number> = {
    triplet_10x_standard: 2, doublet_20x_detail: 2, handheld_led_light: 3, headband_binocular_free: 10, digital_usb_screen: 8,
  };
  return m[t];
}

export function loupeCost(t: JewelLoupeType): number {
  const m: Record<JewelLoupeType, number> = {
    triplet_10x_standard: 2, doublet_20x_detail: 2, handheld_led_light: 2, headband_binocular_free: 3, digital_usb_screen: 4,
  };
  return m[t];
}

export function hasLight(t: JewelLoupeType): boolean {
  const m: Record<JewelLoupeType, boolean> = {
    triplet_10x_standard: false, doublet_20x_detail: false, handheld_led_light: true, headband_binocular_free: false, digital_usb_screen: true,
  };
  return m[t];
}

export function portable(t: JewelLoupeType): boolean {
  const m: Record<JewelLoupeType, boolean> = {
    triplet_10x_standard: true, doublet_20x_detail: true, handheld_led_light: true, headband_binocular_free: false, digital_usb_screen: false,
  };
  return m[t];
}

export function lensType(t: JewelLoupeType): string {
  const m: Record<JewelLoupeType, string> = {
    triplet_10x_standard: "achromatic_triplet_glass",
    doublet_20x_detail: "cemented_doublet_glass",
    handheld_led_light: "single_element_acrylic",
    headband_binocular_free: "binocular_glass_pair",
    digital_usb_screen: "digital_sensor_lens",
  };
  return m[t];
}

export function bestUse(t: JewelLoupeType): string {
  const m: Record<JewelLoupeType, string> = {
    triplet_10x_standard: "gem_grading_standard",
    doublet_20x_detail: "inclusion_detail_check",
    handheld_led_light: "quick_field_inspect",
    headband_binocular_free: "bench_work_soldering",
    digital_usb_screen: "photo_document_share",
  };
  return m[t];
}

export function jewelLoupes(): JewelLoupeType[] {
  return ["triplet_10x_standard", "doublet_20x_detail", "handheld_led_light", "headband_binocular_free", "digital_usb_screen"];
}

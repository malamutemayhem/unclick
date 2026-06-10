export type FlashUnit = "built_in_popup" | "hotshoe_speedlight" | "studio_strobe" | "ring_flash" | "off_camera_bare";

export function lightPower(f: FlashUnit): number {
  const m: Record<FlashUnit, number> = {
    built_in_popup: 2, hotshoe_speedlight: 6, studio_strobe: 10, ring_flash: 5, off_camera_bare: 8,
  };
  return m[f];
}

export function recycleTime(f: FlashUnit): number {
  const m: Record<FlashUnit, number> = {
    built_in_popup: 4, hotshoe_speedlight: 6, studio_strobe: 9, ring_flash: 7, off_camera_bare: 8,
  };
  return m[f];
}

export function lightQuality(f: FlashUnit): number {
  const m: Record<FlashUnit, number> = {
    built_in_popup: 3, hotshoe_speedlight: 7, studio_strobe: 10, ring_flash: 8, off_camera_bare: 9,
  };
  return m[f];
}

export function portabilityScore(f: FlashUnit): number {
  const m: Record<FlashUnit, number> = {
    built_in_popup: 10, hotshoe_speedlight: 8, studio_strobe: 2, ring_flash: 6, off_camera_bare: 4,
  };
  return m[f];
}

export function unitCost(f: FlashUnit): number {
  const m: Record<FlashUnit, number> = {
    built_in_popup: 0, hotshoe_speedlight: 5, studio_strobe: 9, ring_flash: 7, off_camera_bare: 6,
  };
  return m[f];
}

export function requiresAcPower(f: FlashUnit): boolean {
  const m: Record<FlashUnit, boolean> = {
    built_in_popup: false, hotshoe_speedlight: false, studio_strobe: true, ring_flash: false, off_camera_bare: false,
  };
  return m[f];
}

export function ttlCapable(f: FlashUnit): boolean {
  const m: Record<FlashUnit, boolean> = {
    built_in_popup: true, hotshoe_speedlight: true, studio_strobe: false, ring_flash: true, off_camera_bare: false,
  };
  return m[f];
}

export function mountType(f: FlashUnit): string {
  const m: Record<FlashUnit, string> = {
    built_in_popup: "camera_body_integrated", hotshoe_speedlight: "standard_iso_hotshoe",
    studio_strobe: "bowens_s_mount_stand", ring_flash: "lens_barrel_ring_adapter",
    off_camera_bare: "light_stand_umbrella_mount",
  };
  return m[f];
}

export function bestApplication(f: FlashUnit): string {
  const m: Record<FlashUnit, string> = {
    built_in_popup: "casual_fill_snapshot", hotshoe_speedlight: "event_wedding_portable",
    studio_strobe: "portrait_product_studio", ring_flash: "macro_beauty_even_light",
    off_camera_bare: "creative_dramatic_lighting",
  };
  return m[f];
}

export function flashUnits(): FlashUnit[] {
  return ["built_in_popup", "hotshoe_speedlight", "studio_strobe", "ring_flash", "off_camera_bare"];
}

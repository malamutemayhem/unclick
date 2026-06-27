export type DeskFanType = "usb_clip_on" | "bladeless_mini_tower" | "retro_metal_tilt" | "dual_blade_quiet" | "mist_spray_cool";

export function airflow(t: DeskFanType): number {
  const m: Record<DeskFanType, number> = {
    usb_clip_on: 4, bladeless_mini_tower: 8, retro_metal_tilt: 7, dual_blade_quiet: 6, mist_spray_cool: 5,
  };
  return m[t];
}

export function noiseLevel(t: DeskFanType): number {
  const m: Record<DeskFanType, number> = {
    usb_clip_on: 8, bladeless_mini_tower: 9, retro_metal_tilt: 5, dual_blade_quiet: 10, mist_spray_cool: 7,
  };
  return m[t];
}

export function portability(t: DeskFanType): number {
  const m: Record<DeskFanType, number> = {
    usb_clip_on: 10, bladeless_mini_tower: 6, retro_metal_tilt: 4, dual_blade_quiet: 7, mist_spray_cool: 8,
  };
  return m[t];
}

export function aestheticAppeal(t: DeskFanType): number {
  const m: Record<DeskFanType, number> = {
    usb_clip_on: 4, bladeless_mini_tower: 9, retro_metal_tilt: 10, dual_blade_quiet: 6, mist_spray_cool: 5,
  };
  return m[t];
}

export function fanCost(t: DeskFanType): number {
  const m: Record<DeskFanType, number> = {
    usb_clip_on: 2, bladeless_mini_tower: 8, retro_metal_tilt: 6, dual_blade_quiet: 5, mist_spray_cool: 4,
  };
  return m[t];
}

export function usbPowered(t: DeskFanType): boolean {
  const m: Record<DeskFanType, boolean> = {
    usb_clip_on: true, bladeless_mini_tower: false, retro_metal_tilt: false, dual_blade_quiet: true, mist_spray_cool: true,
  };
  return m[t];
}

export function oscillates(t: DeskFanType): boolean {
  const m: Record<DeskFanType, boolean> = {
    usb_clip_on: false, bladeless_mini_tower: true, retro_metal_tilt: false, dual_blade_quiet: true, mist_spray_cool: false,
  };
  return m[t];
}

export function motorType(t: DeskFanType): string {
  const m: Record<DeskFanType, string> = {
    usb_clip_on: "micro_dc_brushless_5v",
    bladeless_mini_tower: "brushless_impeller_air_multiply",
    retro_metal_tilt: "ac_motor_metal_blade",
    dual_blade_quiet: "dual_dc_counter_rotate",
    mist_spray_cool: "centrifugal_mist_atomizer",
  };
  return m[t];
}

export function bestSpot(t: DeskFanType): string {
  const m: Record<DeskFanType, string> = {
    usb_clip_on: "laptop_monitor_clip_spot",
    bladeless_mini_tower: "office_desk_quiet_zone",
    retro_metal_tilt: "studio_workshop_decor",
    dual_blade_quiet: "bedroom_nightstand_sleep",
    mist_spray_cool: "outdoor_patio_humid_cool",
  };
  return m[t];
}

export function deskFans(): DeskFanType[] {
  return ["usb_clip_on", "bladeless_mini_tower", "retro_metal_tilt", "dual_blade_quiet", "mist_spray_cool"];
}

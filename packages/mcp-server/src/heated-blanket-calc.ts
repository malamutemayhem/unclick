export type HeatedBlanketType = "electric_wired" | "usb_powered_throw" | "battery_cordless" | "weighted_heated_combo" | "heated_mattress_pad";

export function heatEvenness(t: HeatedBlanketType): number {
  const m: Record<HeatedBlanketType, number> = {
    electric_wired: 8, usb_powered_throw: 5, battery_cordless: 4, weighted_heated_combo: 7, heated_mattress_pad: 10,
  };
  return m[t];
}

export function portability(t: HeatedBlanketType): number {
  const m: Record<HeatedBlanketType, number> = {
    electric_wired: 3, usb_powered_throw: 8, battery_cordless: 10, weighted_heated_combo: 2, heated_mattress_pad: 1,
  };
  return m[t];
}

export function heatLevels(t: HeatedBlanketType): number {
  const m: Record<HeatedBlanketType, number> = {
    electric_wired: 10, usb_powered_throw: 4, battery_cordless: 3, weighted_heated_combo: 7, heated_mattress_pad: 9,
  };
  return m[t];
}

export function softness(t: HeatedBlanketType): number {
  const m: Record<HeatedBlanketType, number> = {
    electric_wired: 7, usb_powered_throw: 8, battery_cordless: 6, weighted_heated_combo: 9, heated_mattress_pad: 5,
  };
  return m[t];
}

export function blanketCost(t: HeatedBlanketType): number {
  const m: Record<HeatedBlanketType, number> = {
    electric_wired: 4, usb_powered_throw: 3, battery_cordless: 6, weighted_heated_combo: 8, heated_mattress_pad: 7,
  };
  return m[t];
}

export function machineWash(t: HeatedBlanketType): boolean {
  const m: Record<HeatedBlanketType, boolean> = {
    electric_wired: true, usb_powered_throw: true, battery_cordless: false, weighted_heated_combo: true, heated_mattress_pad: true,
  };
  return m[t];
}

export function autoShutoff(t: HeatedBlanketType): boolean {
  const m: Record<HeatedBlanketType, boolean> = {
    electric_wired: true, usb_powered_throw: false, battery_cordless: true, weighted_heated_combo: true, heated_mattress_pad: true,
  };
  return m[t];
}

export function heatingElement(t: HeatedBlanketType): string {
  const m: Record<HeatedBlanketType, string> = {
    electric_wired: "thin_wire_micro_fleece",
    usb_powered_throw: "carbon_fiber_usb_pad",
    battery_cordless: "rechargeable_lithium_cell",
    weighted_heated_combo: "wire_glass_bead_dual",
    heated_mattress_pad: "flat_wire_quilted_pad",
  };
  return m[t];
}

export function bestUse(t: HeatedBlanketType): string {
  const m: Record<HeatedBlanketType, string> = {
    electric_wired: "bedroom_all_night_sleep",
    usb_powered_throw: "office_desk_lap_warm",
    battery_cordless: "outdoor_camping_stadium",
    weighted_heated_combo: "anxiety_relief_cozy",
    heated_mattress_pad: "cold_sleeper_pre_warm_bed",
  };
  return m[t];
}

export function heatedBlankets(): HeatedBlanketType[] {
  return ["electric_wired", "usb_powered_throw", "battery_cordless", "weighted_heated_combo", "heated_mattress_pad"];
}

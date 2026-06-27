export type Headlamp = "basic_led" | "rechargeable_usb" | "high_lumen_spot" | "red_light_preserve" | "hybrid_dual";

export function brightness(h: Headlamp): number {
  const m: Record<Headlamp, number> = {
    basic_led: 4, rechargeable_usb: 7, high_lumen_spot: 10, red_light_preserve: 2, hybrid_dual: 8,
  };
  return m[h];
}

export function batteryDuration(h: Headlamp): number {
  const m: Record<Headlamp, number> = {
    basic_led: 8, rechargeable_usb: 6, high_lumen_spot: 3, red_light_preserve: 10, hybrid_dual: 7,
  };
  return m[h];
}

export function beamDistance(h: Headlamp): number {
  const m: Record<Headlamp, number> = {
    basic_led: 4, rechargeable_usb: 6, high_lumen_spot: 10, red_light_preserve: 2, hybrid_dual: 8,
  };
  return m[h];
}

export function weightGrams(h: Headlamp): number {
  const m: Record<Headlamp, number> = {
    basic_led: 3, rechargeable_usb: 5, high_lumen_spot: 8, red_light_preserve: 2, hybrid_dual: 7,
  };
  return m[h];
}

export function lampCost(h: Headlamp): number {
  const m: Record<Headlamp, number> = {
    basic_led: 2, rechargeable_usb: 5, high_lumen_spot: 8, red_light_preserve: 4, hybrid_dual: 7,
  };
  return m[h];
}

export function usbRechargeable(h: Headlamp): boolean {
  const m: Record<Headlamp, boolean> = {
    basic_led: false, rechargeable_usb: true, high_lumen_spot: true, red_light_preserve: false, hybrid_dual: true,
  };
  return m[h];
}

export function hasRedMode(h: Headlamp): boolean {
  const m: Record<Headlamp, boolean> = {
    basic_led: false, rechargeable_usb: true, high_lumen_spot: false, red_light_preserve: true, hybrid_dual: true,
  };
  return m[h];
}

export function ledType(h: Headlamp): string {
  const m: Record<Headlamp, string> = {
    basic_led: "single_white_cob_chip", rechargeable_usb: "cree_xpg3_flood_spot",
    high_lumen_spot: "osram_boost_hx_thrower", red_light_preserve: "deep_red_620nm_low_power",
    hybrid_dual: "dual_cree_flood_and_spot",
  };
  return m[h];
}

export function bestActivity(h: Headlamp): string {
  const m: Record<Headlamp, string> = {
    basic_led: "casual_camping_around_camp", rechargeable_usb: "hiking_trail_running",
    high_lumen_spot: "caving_search_rescue_night", red_light_preserve: "astronomy_night_vision",
    hybrid_dual: "mountaineering_multi_use",
  };
  return m[h];
}

export function headlamps(): Headlamp[] {
  return ["basic_led", "rechargeable_usb", "high_lumen_spot", "red_light_preserve", "hybrid_dual"];
}

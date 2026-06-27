export type Turntable = "belt_drive" | "direct_drive" | "idler_wheel" | "usb_digital" | "portable_suitcase";

export function soundFidelity(t: Turntable): number {
  const m: Record<Turntable, number> = {
    belt_drive: 9, direct_drive: 8, idler_wheel: 7, usb_digital: 5, portable_suitcase: 3,
  };
  return m[t];
}

export function speedStability(t: Turntable): number {
  const m: Record<Turntable, number> = {
    belt_drive: 7, direct_drive: 10, idler_wheel: 6, usb_digital: 8, portable_suitcase: 4,
  };
  return m[t];
}

export function vibrationIsolation(t: Turntable): number {
  const m: Record<Turntable, number> = {
    belt_drive: 9, direct_drive: 6, idler_wheel: 5, usb_digital: 7, portable_suitcase: 3,
  };
  return m[t];
}

export function torque(t: Turntable): number {
  const m: Record<Turntable, number> = {
    belt_drive: 4, direct_drive: 10, idler_wheel: 8, usb_digital: 5, portable_suitcase: 2,
  };
  return m[t];
}

export function tableCost(t: Turntable): number {
  const m: Record<Turntable, number> = {
    belt_drive: 6, direct_drive: 8, idler_wheel: 7, usb_digital: 4, portable_suitcase: 2,
  };
  return m[t];
}

export function hasPreamp(t: Turntable): boolean {
  const m: Record<Turntable, boolean> = {
    belt_drive: false, direct_drive: false, idler_wheel: false, usb_digital: true, portable_suitcase: true,
  };
  return m[t];
}

export function djCapable(t: Turntable): boolean {
  const m: Record<Turntable, boolean> = {
    belt_drive: false, direct_drive: true, idler_wheel: false, usb_digital: false, portable_suitcase: false,
  };
  return m[t];
}

export function driveSystem(t: Turntable): string {
  const m: Record<Turntable, string> = {
    belt_drive: "elastomer_belt_motor_isolated", direct_drive: "quartz_locked_platter_motor",
    idler_wheel: "rubber_wheel_rim_contact", usb_digital: "belt_motor_adc_converter",
    portable_suitcase: "small_dc_motor_built_in_amp",
  };
  return m[t];
}

export function bestUser(t: Turntable): string {
  const m: Record<Turntable, string> = {
    belt_drive: "audiophile_home_listening", direct_drive: "dj_club_scratching",
    idler_wheel: "vintage_collector_warm_tone", usb_digital: "digitize_vinyl_collection",
    portable_suitcase: "casual_retro_gift_starter",
  };
  return m[t];
}

export function turntables(): Turntable[] {
  return ["belt_drive", "direct_drive", "idler_wheel", "usb_digital", "portable_suitcase"];
}
